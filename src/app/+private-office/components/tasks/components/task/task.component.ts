import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../../../../+tasks/services/task.service';
import { status } from '../../../../../models/status';
import { ITask } from '../../../../../+tasks/models/Task';
import { Router } from '@angular/router';


@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
    @Input() public task: ITask;
    @Output() public deleteTask: EventEmitter<number> = new EventEmitter<number>();

    constructor(private taskService: TaskService, private router: Router) {

    }

    delete() {
        this.deleteTask.emit(this.task.id);
    }

    update() {
        this.router.navigate(['tasks', 'edit', this.task.id]);
    }

    ngOnInit(): void {
        this.task.status = status.find((el, index, arr) => {
            return el.value === +this.task.status;
        }).viewValue;
    }
}
