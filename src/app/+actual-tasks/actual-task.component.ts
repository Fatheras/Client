import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TaskService } from '../+tasks/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { DealService } from '../services/deal-service';
import { TokenService } from '../+authentication/services/token.service';
import { ITask } from '../+tasks/models/Task';
import { ICategory } from '../models/Category';


@Component({
  selector: 'app-actual-task',
  templateUrl: './actual-task.component.html',
  styleUrls: ['./actual-task.component.css'],
})
export class ActualTaskComponent implements OnInit, OnDestroy {
  @ViewChild(InfiniteScrollDirective)
  infiniteScroll: InfiniteScrollDirective;

  public tasks: ITask[];
  public currentCategory: ICategory;
  public categories: ICategory[] = [{ name: 'ALL' }];
  public taskSub: Subscription;

  public batch = 30;

  constructor(private taskService: TaskService, private route: ActivatedRoute,
    private categoryService: CategoryService, private router: Router, public dealService: DealService
    , private tokenService: TokenService) {

  }

  public ngOnInit() {
    this.getAllCategories();

    this.taskSub = this.route.params.subscribe((params: { id: string }) => {
      this.tasks = [];

      const id: string = params.id;

      if (!(+id) && id !== 'all') {
        this.router.navigate(['category', 'all', 'tasks']);
      } else {
        this.infiniteScroll.ngOnDestroy();
        this.infiniteScroll.setup();
        this.getAllTasks(+id);
      }
    });
  }

  public ngOnDestroy(): void {
    this.taskSub.unsubscribe();
  }

  public getAllCategories() {
    this.categoryService.getAllCategories()
      .subscribe(
        (categories: ICategory[]) => {
          const id = +this.route.snapshot.params.id;

          this.categories = [this.categories[0], ...categories];

          const result = this.categories.find((category: ICategory, index, array) => {
            return category.id === id;
          });

          this.currentCategory = result ? result : this.categories[0];
        }
      );
  }

  public getAllTasks(categoryId: number): void {
    this.taskService.getAllTasks(categoryId, this.tasks.length, this.batch)
      .subscribe((tasks: ITask[]) => {
        this.tasks = this.tasks.concat(tasks);
      });
  }

  public getCurrentCategory(category: ICategory) {
    if (!(category === this.currentCategory)) {
      this.currentCategory = category;
    }
  }

  public addDeal(taskId) {
    const token = this.tokenService.Token;

    this.dealService.addDeal(token, taskId).subscribe(() => {
      this.tasks = this.tasks.filter((task: ITask, index, arr) => {
        return task.id !== taskId;
      });
    });
  }
}
