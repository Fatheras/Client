import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ITask } from '../../models/Task';
import { switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
    selector: 'app-edit-task',
    templateUrl: './edit-task.component.html',
    styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
    public task: ITask;

    constructor(
        private taskService: TaskService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
    ) {

    }

    public cancel(): void {
        this.location.back();
    }

    public editTask(task: ITask): void {
        this.route.params.pipe(
            switchMap((params) => {
                return this.taskService.updateTask(params['id'], task);
            })
        ).subscribe((data) => {
            this.location.back();
        });
    }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap((params) => {
                return this.taskService.getTask(params.id);
            })
        ).subscribe((task: ITask) => {
            this.task = task;
        });
    }
}
