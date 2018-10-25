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
  public categories: ICategory[] = [{ name: 'ALL' }];

  constructor(private taskService: TaskService, private route: ActivatedRoute,
    private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getAllCategories();
    this.route.paramMap.subscribe((body: any) => {
     const id = body.params.id;
      if (+id) {
        this.getAllTasks(id);
      } else if (id === 'all') {
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
      });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe((categories: ICategory[]) => {
      this.categories = [this.categories[0], ...categories];
      const id = +this.route.snapshot.paramMap.get('id');
      const result = this.categories.find((category: ICategory, index, array) => {
        return category.id === id;
      });

      this.currentCategory = result ? result : categories[0];
    });
  }

  getCurrentCategory(category: ICategory) {
    this.currentCategory = category;
  }
}
