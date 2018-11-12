import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MyErrorStateMatcher } from '../../../models/errors/error.matcher';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { ICategory } from '../../../models/Category';
import { ITask } from '../../models/task';
import { ActivatedRoute } from '@angular/router';

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
            category: this.taskForm.controls['category'].value,
            people: this.taskForm.controls['people'].value,
            cost: this.taskForm.controls['cost'].value,
            time: this.taskForm.controls['time'].value,
        };

        return this._task;
    }

    @Output() public submit: EventEmitter<ITask> = new EventEmitter<ITask>();

    public minWhen: Date;

    public currentTime = new Date(new Date().getTime() + 1000 * 60 * 60);

    public taskForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        category: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        people: new FormControl('', [Validators.required, Validators.max(5), Validators.min(1), Validators.pattern('^[0-9]*$')]),
        description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        time: new FormControl(this.currentTime.toISOString(), [Validators.required, this.whenValidator.bind(this)]),
        cost: new FormControl(1, [Validators.required, Validators.pattern(/^[^0.]\d*\.?\d*$/)]),
    });

    public matcher = new MyErrorStateMatcher();

    constructor(private route: ActivatedRoute) {
        this.categories = this.route.snapshot.data.categories;
    }

    ngOnInit(): void {
        let day: Date = new Date();
        this.minWhen = new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 1, day.getMinutes());

        interval(1000).subscribe(() => {
            day = new Date();
            this.minWhen = new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 1, day.getMinutes());
            this.taskForm.controls['when'].updateValueAndValidity();
        });
    }

    private whenValidator(control: FormControl) {
        if (this && control.value && this.minWhen && new Date(control.value).getTime() < this.minWhen.getTime()) {
            return {
                whenErr: true,
            };
        }

        return;
    }

    public send() {
        this.submit.emit(this.task);
    }
}
