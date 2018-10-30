import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ITask } from '../../../models/task';
import { ICategory } from '../../../models/Category';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';


@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css']
})

export class TaskListComponent {
    @Input() public tasks: ITask[];
    @Input() public category: ICategory;

    @Output() public scrollChanged: EventEmitter<void> = new EventEmitter();

    onScroll() {
        this.scrollChanged.emit();
    }
}
