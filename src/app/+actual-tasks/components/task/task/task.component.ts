import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { ITask } from '../../../models/Task';
import { TaskService } from '../../../services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { WarnDialogComponent } from '../warn-dialog/warn-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() public task: ITask;
  @Output() public addDeal: EventEmitter<number> = new EventEmitter();
  public countOfUsers: number;


  constructor(private taskService: TaskService, public dialog: MatDialog, private router: Router) {

  }

  public ngOnInit(): void {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WarnDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addDeal.emit(this.task.id);
      }
    });
  }

  public accept() {
    this.openDialog();
  }
}



