import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
    constructor(private taskService: TaskService, private router: Router) {

    }

    public addTask(task) {
        this.taskService.addTask(task).subscribe(() => {
            this.router.navigate(['category', 'all', 'tasks']);
        });
    }


    ngOnInit(): void { }
}
