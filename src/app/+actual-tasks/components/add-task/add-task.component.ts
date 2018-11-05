import { Component, Output, EventEmitter, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/Category';
import { MyErrorStateMatcher } from '../../../+authentication/models/errors/error.matcher';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from '../../../../../node_modules/moment/moment';
import { interval } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';







@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
    public categories: ICategory[];

    public minWhen: Date;

    public currentTime = new Date(new Date().getTime() + 1000 * 60 * 60);

    constructor(private categoryService: CategoryService, private taskService: TaskService, private router: Router) {

    }

    public addTaskForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        category: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        people: new FormControl('', [Validators.required, Validators.max(5), Validators.min(1), Validators.pattern('^[0-9]*$')]),
        description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        when: new FormControl(this.currentTime.toISOString(), [Validators.required, this.whenValidator.bind(this)]),
        cost: new FormControl(1, [Validators.required, Validators.pattern(/^[^0.]\d*\.?\d*$/)]),
    });


    public matcher = new MyErrorStateMatcher();

    ngOnInit(): void {
        this.categoryService.getAllCategories().subscribe((categories) => {
            this.categories = categories;
        });

        let day: Date = new Date();
        this.minWhen = new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 1, day.getMinutes());

        interval(1000).subscribe(() => {
            day = new Date();
            this.minWhen = new Date(day.getFullYear(), day.getMonth(), day.getDate(), day.getHours() + 1, day.getMinutes());
            this.addTaskForm.controls['when'].updateValueAndValidity();
        });

    }

    whenValidator(control: FormControl) {
        if (this && control.value && this.minWhen && new Date(control.value).getTime() < this.minWhen.getTime()) {
            return {
                whenErr: true,
            };
        }

        return;
    }

    addTask() {
        const categoryName = this.addTaskForm.controls['category'].value;

        const time = moment(this.addTaskForm.controls['when'].value).format('YYYY-MM-DDTkk:mm:ssZ');
        const category = this.categories.find((el, index, arr) => {
            return el.name === categoryName;
        });

        this.taskService.addTask({
            title: this.addTaskForm.controls['title'].value,
            description: this.addTaskForm.controls['description'].value,
            category: category.id.toString(),
            people: this.addTaskForm.controls['people'].value,
            cost: this.addTaskForm.controls['cost'].value,
            time,
        }).subscribe(() => {
            this.router.navigate(['category', 'all', 'tasks']);
        });
    }
}
