import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/+actual-tasks/services/task.service';
import { ITask } from 'src/app/+actual-tasks/models/Task';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})

export class TaskListComponent {}
/*export class TaskListComponent implements OnInit {

    tasks: ITask[];
    constructor(private taskService: TaskService) { }

    ngOnInit() {
        this.getTasks();
    }

    getTasks(): void {
        this.taskService.getTasks()
            .subscribe((tasks: ITask[]) => { this.tasks = tasks; });
    }
} */
