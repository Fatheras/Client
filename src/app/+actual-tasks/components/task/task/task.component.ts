import { Component, OnInit, Input } from '@angular/core';
import { ITask } from '../../../models/Task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() tasks: ITask[];
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe((tasks: ITask[]) => { this.tasks = tasks; });
  }
}
