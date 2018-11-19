import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../../../+tasks/services/task.service';
import { FormGroup, FormControl } from '@angular/forms';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ITask } from '../../../+tasks/models/Task';
import { status } from '../../../models/status';
import * as moment from 'moment';
import { ICategory } from '../../../models/Category';
import { CategoryService } from '../../../services/category.service';
import { tap } from 'rxjs/operators';
import { IUser } from '../../../user/models/User';
import { UserService } from '../../../user/services/user.service';

@Component({
    selector: 'app-all-tasks',
    templateUrl: './all-tasks.component.html',
    styleUrls: ['./all-tasks.component.css'],
})
export class AllTasksComponent implements OnInit {
    public tasks: ITask[] = [];
    public categories: ICategory[];
    public users: IUser[];
    public statuses = status;

    @ViewChild(InfiniteScrollDirective)
    infiniteScroll: InfiniteScrollDirective;
    @ViewChild('start')
    start: ElementRef;
    @ViewChild('end')
    end: ElementRef;


    public minDate: Date;
    public maxDate: Date;

    public batch = 30;

    public filterForm: FormGroup = new FormGroup({
        users: new FormControl(''),
        status: new FormControl(''),
        categories: new FormControl(''),
        start: new FormControl(''),
        end: new FormControl(''),
        pattern: new FormControl('')
    });

    constructor(private taskService: TaskService, private categoryService: CategoryService, private userService: UserService) {

    }

    public search(pattern: string): void {
        this.filterForm.controls['pattern'].setValue(pattern);

        this.filterChange();
    }

    public filterChange(): void {
        this.tasks = [];
        this.infiniteScroll.ngOnDestroy();
        this.infiniteScroll.setup();
        this.getAllTasks();
    }

    public deleteTask(taskId): void {
        this.taskService.deleteTask(taskId).subscribe((data) => {
            this.tasks = this.tasks.filter((task: ITask, index, arr) => {
                return task.id !== taskId;
            });
        });
    }

    public startDateChange(): void {
        this.minDate = new Date(this.start.nativeElement.value);
    }

    public endDateChange(): void {
        this.maxDate = new Date(this.end.nativeElement.value);
    }

    public getAllTasks(): void {
        const categoryFormValue = this.filterForm.controls['categories'].value;

        const categories: ICategory = categoryFormValue ? categoryFormValue : '';

        const filterFormUsers = this.filterForm.controls['users'].value;

        const users: number[] = filterFormUsers ? filterFormUsers : '';

        const start = this.filterForm.controls['start'].value;
        const end = this.filterForm.controls['end'].value;

        const pattern = this.filterForm.controls['pattern'].value;

        const filter = {
            users,
            status: this.filterForm.controls['status'].value,
            categories,
            startDate: start ? moment(start).format('YYYY-MM-DD kk:mm:ss') : '',
            endDate: end ? moment(end).format('YYYY-MM-DD kk:mm:ss') : '',
            pattern: pattern ? pattern : ''
        };

        this.taskService.getTasksForAdmin(filter, this.tasks.length, this.batch).subscribe((tasks: ITask[]) => {
            this.tasks = this.tasks.concat(tasks);
        });
    }


    ngOnInit(): void {
        this.userService.getAllUsers().subscribe((users) => {
            this.users = users;
        });

        this.categoryService.getAllCategories().pipe(
            tap((categories) => {
                this.categories = categories;
            })
        ).subscribe(() => {
            this.getAllTasks();
        });
    }

    public reset(): void {
        this.filterForm.reset();

        this.tasks = [];

        this.infiniteScroll.ngOnDestroy();
        this.infiniteScroll.setup();

        this.minDate = null;
        this.maxDate = null;

        this.getAllTasks();
    }
}
