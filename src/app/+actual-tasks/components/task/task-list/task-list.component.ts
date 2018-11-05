import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ITask } from '../../../models/task';
import { ICategory } from '../../../models/Category';


@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})

export class TaskListComponent {
    @Input() public tasks: ITask[];
    @Input() public category: ICategory;
    @Output() public accept: EventEmitter<number> = new EventEmitter();


    public addDeal(taskId) {
        this.accept.emit(taskId);
    }
}
