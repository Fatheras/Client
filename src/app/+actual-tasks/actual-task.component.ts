import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { ITask } from './models/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './services/category.service';
import { ICategory } from './models/Category';

@Component({
  selector: 'app-actual-task',
  templateUrl: './actual-task.component.html',
  styleUrls: ['./actual-task.component.css']
})
export class ActualTaskComponent implements OnInit {
  public tasks: ITask[];
  public currentCategory: ICategory;
  // public currentCategory: string;
  public categories: ICategory[] = [{ name: 'ALL' }];

  constructor(private taskService: TaskService, private route: ActivatedRoute,
    private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getAllCategories();
    const id = this.route.snapshot.paramMap.get('id');

    if (+id) {
      this.categoryService.getCategory(+id).subscribe((category) => {
        this.currentCategory = category;
      });
    } else if (id === 'all') {
      this.currentCategory = this.categories[0];
    }
    this.route.paramMap.subscribe((body: any) => {
      if (+body.params.id) {
        this.getAllTasks(body.params.id);
      } else if (body.params.id === 'all') {
        this.getAllTasks();
      } else {
        this.router.navigate(['/category', 'all', 'tasks']);
      }
    });
  }

  getAllTasks(category: number = 0): void {
    this.taskService.getAllTasks(category)
      .subscribe((tasks: ITask[]) => {
        this.tasks = tasks;
        // if (!category) {
        //   this.currentCategory = this.categories[0];
        // } else {
        //   this.categoryService.getCategory(category).subscribe((data: ICategory) => {
        //     this.currentCategory = data;
        //   });
        // }
      });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories: ICategory[]) => {
      this.categories = [this.categories[0], ...categories];
    });
  }
  // getAllCategories() {
  //   this.categoryService.getAllCategories().subscribe((categories: ICategory[]) => {
  //     this.categories = [this.categories[0], ...categories];
  //   });
  // }
  getCurrentCategory(category: ICategory) {  // event handler CurrentCategory takes category: ICategory
    if (!category.name) {
      this.categoryService.getCategory(category.id).subscribe((data: ICategory) => {
            this.currentCategory = data;
          });
    } else {
      this.currentCategory = category;
    }
    // if (!+category) {
    //   this.currentCategory = this.categories[0];
    // } else {
    //   this.categoryService.getCategory(+category).subscribe((data: ICategory) => {
    //     this.currentCategory = data;
    //   });
    // }
  }

  /*getCategory(category: number) {  // event handler CurrentCategory takes category: ICategory
    if (!+category) {
      this.currentCategory = this.categories[0];
    } else {
      this.categoryService.getCategory(+category).subscribe((data: ICategory) => {
        this.currentCategory = data;
      });
    }
  } */
}
