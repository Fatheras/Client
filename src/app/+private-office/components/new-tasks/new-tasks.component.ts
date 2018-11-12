import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../../../+tasks/services/task.service';
import { CategoryService } from '../../../services/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ITask } from '../../../+tasks/models/Task';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-tasks',
    templateUrl: './new-tasks.component.html',
    styleUrls: ['./new-tasks.component.css'],
})
export class NewTasksComponent implements OnInit {
    public tasks: ITask[] = [];

    @ViewChild(InfiniteScrollDirective)
    infiniteScroll: InfiniteScrollDirective;

    public batch = 30;

    public categories = new FormControl('');

    constructor(private taskService: TaskService, private categoryService: CategoryService, private router: Router) {

    }

    categoryChange() {
        this.tasks = [];
        this.infiniteScroll.ngOnDestroy();
        this.infiniteScroll.setup();
        this.getTasksByCategories();
    }

    ngOnInit(): void {
        this.categoryService.getAllCategories().subscribe((categories) => {
            this.categories.patchValue(categories);

            this.getTasksByCategories();
        });
    }

    getTasksByCategories() {
        this.taskService.getTasksByCategories(this.categories.value, this.tasks.length, this.batch).subscribe((tasks) => {
            this.tasks = this.tasks.concat(tasks);
        });
    }
}
