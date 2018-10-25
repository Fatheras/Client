import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../../models/Task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: ITask;
  public countOfUsers: number;

  constructor(private taskService: TaskService) {

  }

  ngOnInit(): void {

  }
}
