import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITask } from '../../../../../+tasks/models/Task';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
    @Input() public tasks: ITask[];
    @Output() public deleteTask: EventEmitter<number> = new EventEmitter<number>();

    constructor() {

    }

    public delete(taskId): void {
        this.deleteTask.emit(taskId);
    }

    ngOnInit(): void {

    }
}
