import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../../models/Task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() public task: ITask;
  public countOfUsers: number;

  constructor(private taskService: TaskService) {

  }

  public ngOnInit(): void {

  }
}
