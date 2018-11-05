import { Component, OnInit, ViewChild, OnDestroy, ViewEncapsulation, DoCheck } from '@angular/core';
import { TaskService } from './services/task.service';
import { ITask } from './models/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './services/category.service';
import { ICategory } from './models/Category';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Observable, forkJoin, Subscription } from 'rxjs';
import { throttleTime, mergeMap, scan, map, tap, zip, finalize, switchMap } from 'rxjs/operators';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { DealService } from './services/deal-service';
import { AuthenticationService } from '../+authentication/services/authentication.service';
import * as moment from '../../../node_modules/moment/moment';
import { TokenService } from '../+authentication/services/token.service';


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
    const token = this.tokenService.getToken();

    this.dealService.addDeal(token, taskId).subscribe(() => {
      this.tasks = this.tasks.filter((task: ITask, index, arr) => {
        return task.id !== taskId;
      });
    });
  }
}
