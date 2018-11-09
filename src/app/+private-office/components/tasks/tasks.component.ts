import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../../../+tasks/services/task.service';
import { CategoryService } from '../../../services/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import * as moment from 'moment';
import { debounceTime } from 'rxjs/operators';
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
        category: new FormControl(''),
        start: new FormControl(''),
        end: new FormControl(''),
        pattern: new FormControl('')
    });

    public pattern = new FormControl('');

    constructor(private taskService: TaskService, private categoryService: CategoryService, private router: Router) {

    }

    filterChange() {
        this.tasks = [];
        this.infiniteScroll.ngOnDestroy();
        this.infiniteScroll.setup();
        this.getUserTasks();
    }

    ngOnInit(): void {
        status.forEach((el, i, arr) => {
            this.statuses.push(el.viewValue);
        });

        this.pattern.valueChanges.pipe(
                debounceTime(500),
            ).subscribe((data) => {
                this.filterChange();
            });

        this.categoryService.getAllCategories().subscribe((categories) => {
            this.categories = categories;

            this.getUserTasks();
        });
    }

    getUserTasks() {
        const category = this.categories.find((el, i, arr) => {
            return el.name === this.filterForm.controls['category'].value;
        });

        const categoryId = category ? category.id : '';

        const _status = status.find((el, i, arr) => {
            return el.viewValue === this.filterForm.controls['status'].value;
        });

        const statusId = _status ? _status.value : '';

        const start = this.filterForm.controls['start'].value;
        const end = this.filterForm.controls['end'].value;


        const pattern = this.pattern.value;
        const filter = {
            status: statusId,
            category: categoryId,
            startDate: start ? moment(start).format('YYYY-MM-DD kk:mm:ss') : '',
            endDate: end ? moment(end).format('YYYY-MM-DD kk:mm:ss') : '',
            pattern: pattern ? pattern : ''
        };

        this.taskService.getUserTasks(filter, this.tasks.length, this.batch).subscribe((tasks) => {
            this.tasks = this.tasks.concat(tasks);
        });
    }

    public startDateChange() {
        this.minDate = new Date(this.start.nativeElement.value);
    }

    public endDateChange() {
        this.maxDate = new Date(this.end.nativeElement.value);
    }

    public updateTask() {
        this.router.navigate(['tasks', 'edit']);
    }

    public deleteTask(taskId) {
        this.taskService.deleteTask(taskId).subscribe(() => {
            this.tasks = this.tasks.filter((task: ITask, index, arr) => {
                return task.id !== taskId;
              });
        });
    }

    public reset() {
        this.filterForm.reset();

        this.tasks = [];

        this.infiniteScroll.ngOnDestroy();
        this.infiniteScroll.setup();

        this.minDate = null;
        this.maxDate = null;

        this.getUserTasks();
    }
}
