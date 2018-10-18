import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { ITask } from '../../../models/task';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {

    @Input() tasks: ITask[];

    constructor(private taskService: TaskService) {

    }

    ngOnInit() {
        this.getTasks();
    }

    getTasks(): void {
        this.taskService.getTasks()
            .subscribe((tasks: ITask[]) => { this.tasks = tasks; });
    }
}
