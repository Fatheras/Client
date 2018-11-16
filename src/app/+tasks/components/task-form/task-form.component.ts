import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MyErrorStateMatcher } from '../../../models/errors/error.matcher';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { ICategory } from '../../../models/Category';
import { ITask } from '../../models/task';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
    private _task: ITask;
    public categories: ICategory[];

    @Input() public set task(model: ITask) {
        if (model) {
            this.taskForm.patchValue(model);
        }
    }

    public get task() {
        this._task = {
            title: this.taskForm.controls['title'].value,
            description: this.taskForm.controls['description'].value,
            categoryId: this.taskForm.controls['categoryId'].value,
            people: this.taskForm.controls['people'].value,
            cost: this.taskForm.controls['cost'].value,
            time: moment(this.taskForm.controls['time'].value).format('YYYY-MM-DD kk:mm:ss'),
        };

        return this._task;
    }

    @Output() public sub: EventEmitter<ITask> = new EventEmitter<ITask>();

    public minTime: Date;

    public currentTime = new Date(new Date().getTime() + 1000 * 60 * 60);

    public taskForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        categoryId: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        people: new FormControl('', [Validators.required, Validators.max(5), Validators.min(1), Validators.pattern('^[0-9]*$')]),
        description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        time: new FormControl(this.currentTime.toISOString(), [Validators.required, this.whenValidator.bind(this)]),
        cost: new FormControl(1, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]),
    });

    public matcher = new MyErrorStateMatcher();

    constructor(private route: ActivatedRoute) {
        this.categories = this.route.snapshot.data.categories;
    }

    ngOnInit(): void {
        let day: Date = new Date();
        this.minTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 1, day.getMinutes());

        this.taskForm.controls['time'].patchValue(
            new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1, day.getHours(), day.getMinutes())
        );

        interval(1000).subscribe(() => {
            day = new Date();
            this.minTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 1, day.getMinutes());
            this.taskForm.controls['time'].updateValueAndValidity();
        });
    }

    private whenValidator(control: FormControl) {
        if (this && control.value && this.minTime && new Date(control.value).getTime() < this.minTime.getTime()) {
            return {
                whenErr: true,
            };
        }

        return;
    }

    public send() {
        this.sub.emit(this.task);
    }
}
