import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITask } from '../../../../../+tasks/models/Task';

@Component({
    selector: 'app-new-task-list',
    templateUrl: './new-task-list.component.html',
    styleUrls: ['./new-task-list.component.css'],
})
export class NewTaskListComponent implements OnInit {
    @Input() public tasks: ITask[];
    @Output() public changeStatus: EventEmitter<any> = new EventEmitter<any>();

    constructor() {

    }

    ngOnInit(): void {

    }

    public change($event) {
        this.changeStatus.emit($event);
    }
}
