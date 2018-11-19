import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../../../+tasks/services/task.service';
import { CategoryService } from '../../../services/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import * as moment from 'moment';
import { ITask } from '../../../+tasks/models/Task';
import { ICategory } from '../../../models/Category';
import { status } from '../../../models/status';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
    public tasks: ITask[] = [];
    public categories: ICategory[];
    public statuses = [];

    @ViewChild(InfiniteScrollDirective)
    infiniteScroll: InfiniteScrollDirective;
    @ViewChild('start')
    start: ElementRef;
    @ViewChild('end')
    end: ElementRef;


    public minDate: Date;
    public maxDate: Date;

    public batch = 30;

    public filterForm = new FormGroup({
        status: new FormControl(''),
        categories: new FormControl(''),
        start: new FormControl(''),
        end: new FormControl(''),
        pattern: new FormControl('')
    });

    constructor(private taskService: TaskService, private categoryService: CategoryService, private router: Router) {

    }

    public search(pattern): void {
        this.filterForm.controls['pattern'].setValue(pattern);

        this.filterChange();
    }

    public filterChange(): void {
        this.tasks = [];
        this.infiniteScroll.ngOnDestroy();
        this.infiniteScroll.setup();
        this.getUserTasks();
    }

    ngOnInit(): void {
        status.forEach((el, i, arr) => {
            this.statuses.push(el.viewValue);
        });

        this.categoryService.getAllCategories().subscribe((categories) => {
            this.categories = categories;

            this.getUserTasks();
        });
    }

    public getUserTasks(): void {
        const categoriesFormValue  = this.filterForm.controls['categories'].value;
        const categories =  categoriesFormValue ? categoriesFormValue : '';

        const _status = status.find((el, i, arr) => {
            return el.viewValue === this.filterForm.controls['status'].value;
        });

        const statusId = _status ? _status.value : '';

        const start = this.filterForm.controls['start'].value;
        const end = this.filterForm.controls['end'].value;

        const pattern = this.filterForm.controls['pattern'].value;

        const filter = {
            status: statusId,
            categories,
            startDate: start ? moment(start).format('YYYY-MM-DD kk:mm:ss') : '',
            endDate: end ? moment(end).format('YYYY-MM-DD kk:mm:ss') : '',
            pattern: pattern ? pattern : ''
        };

        this.taskService.getUserTasks(filter, this.tasks.length, this.batch).subscribe((tasks) => {
            this.tasks = this.tasks.concat(tasks);
        });
    }

    public startDateChange(): void {
        this.minDate = new Date(this.start.nativeElement.value);
    }

    public endDateChange(): void {
        this.maxDate = new Date(this.end.nativeElement.value);
    }

    public updateTask(): void {
        this.router.navigate(['tasks', 'edit']);
    }

    public deleteTask(taskId): void {
        this.taskService.deleteTask(taskId).subscribe((data) => {
            this.tasks = this.tasks.filter((task: ITask, index, arr) => {
                return task.id !== taskId;
            });
        });
    }

    public reset(): void {
        this.filterForm.reset();

        this.tasks = [];

        this.infiniteScroll.ngOnDestroy();
        this.infiniteScroll.setup();

        this.minDate = null;
        this.maxDate = null;

        this.getUserTasks();
    }
}
