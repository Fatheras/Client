import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../../+tasks/services/task.service';
import { CategoryService } from '../../../services/category.service';
import { FormControl } from '@angular/forms';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ITask } from '../../../+tasks/models/Task';
import { Router } from '@angular/router';
import { ICategory } from '../../../models/Category';
import { RoleService } from '../../../+authentication/services/role.service';
import { Role } from '../../../models/Role';

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

    public categoriesControl: FormControl = new FormControl('');
    public categories: ICategory[] = [];

    public pattern: FormControl = new FormControl('');

    public getCategories;

    constructor(
        private taskService: TaskService,
        private categoryService: CategoryService,
        private router: Router,
        private roleService: RoleService,
    ) { }

    public categoryChange(): void {
        this.tasks = [];
        this.infiniteScroll.ngOnDestroy();
        this.infiniteScroll.setup();
        this.getTasksByCategories();
    }

    ngOnInit(): void {
        switch (this.roleService.Role) {
            case Role.Manager: {
                this.getCategories = this.categoryService.getManagerCategories.bind(this.categoryService);
                break;
            }
            case Role.Admin: {
                this.getCategories = this.categoryService.getAllCategories.bind(this.categoryService);
                break;
            }
        }

        this.getCategories().subscribe((categories: ICategory[]) => {
            this.categories = categories;

            this.getTasksByCategories();
        });
    }

    public getTasksByCategories(): void {
        const filter = {
            pattern: this.pattern.value,
            categories: this.categoriesControl.value,
        };

        this.taskService.getTasksForManager(filter, this.tasks.length, this.batch).subscribe((tasks: ITask[]) => {
            this.tasks = this.tasks.concat(tasks);
        });
    }

    public search(pattern: string): void {
        this.pattern.setValue(pattern);

        this.categoryChange();
    }

    public change($event) {
        this.taskService.updateTaskStatus($event.taskId, $event.status).subscribe(() => {
            this.tasks = this.tasks.filter((task) => task.id !== $event.taskId);
        });
    }
}
