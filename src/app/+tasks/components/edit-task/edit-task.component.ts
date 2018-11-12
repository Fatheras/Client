import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ITask } from '../../models/Task';
import { switchMap } from 'rxjs/operators';

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
    ) {

    }

    public cancel() {
        this.router.navigate(['tasks']);
    }

    public editTask(task) {
        this.taskService.updateTask(task.id, task).subscribe(() => {
            this.router.navigate(['tasks']);
        });
    }

    ngOnInit(): void {
        this.route.params.pipe(
            switchMap((params) => {
                return this.taskService.getTask(params.id);
            })
        ).subscribe((task) => {
            this.task = task;
        });
    }
}
