import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from './services/task.service';
import { ITask } from './models/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './services/category.service';
import { ICategory } from './models/Category';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { throttleTime, mergeMap, scan, map, tap, zip, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-actual-task',
  templateUrl: './actual-task.component.html',
  styleUrls: ['./actual-task.component.css']
})
export class ActualTaskComponent implements OnInit {
  public tasks: ITask[] = [];
  public currentCategory: ICategory;
  public categories: ICategory[] = [{ name: 'ALL' }];

  public batch = 30;

  constructor(private taskService: TaskService, private route: ActivatedRoute,
    private categoryService: CategoryService, private router: Router) {

  }

  public ngOnInit() {
    this.getAllCategories();
  }

  public getAllCategories() {
    const id = +this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/category', 'all', 'tasks']);
    }

    this.categoryService.getAllCategories().pipe(
      finalize(() => {
        this.route.paramMap.subscribe((body: any) => {
          this.tasks = [];
          this.getAllTasks();
        });
      })
    ).subscribe((categories: ICategory[]) => {
      this.categories = [this.categories[0], ...categories];

      const result = this.categories.find((category: ICategory, index, array) => {
        return category.id === id;
      });

      this.currentCategory = result ? result : this.categories[0];
    });
  }

  public getAllTasks(category: number = 0): void {
    this.taskService.getAllTasks(this.currentCategory.id, this.tasks.length, this.batch)
      .subscribe((tasks: ITask[]) => {
        this.tasks = this.tasks.concat(tasks);
      });
  }

  public getCurrentCategory(category: ICategory) {
    if (!(category === this.currentCategory)) {
      this.currentCategory = category;
    }
  }
}
