import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITask } from '../../../../../+tasks/models/Task';

@Component({
    selector: 'app-all-task-list',
    templateUrl: './all-task-list.component.html',
    styleUrls: ['./all-task-list.component.css'],
})
export class AllTaskListComponent implements OnInit {
    @Input() public tasks: ITask[];
    @Output() public deleteTask: EventEmitter<number> = new EventEmitter<number>();

    constructor() {

    }

    public delete(taskId: number): void {
        this.deleteTask.emit(taskId);
    }

    ngOnInit(): void {

    }
}
