import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WarnDialogComponent } from '../../../dialogs/warn-dialog/warn-dialog.component';
import { status } from '../../../models/status';
import { ITask } from '../../../+tasks/models/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() public task: ITask;
  @Output() public addDeal: EventEmitter<number> = new EventEmitter();
  public countOfUsers: number;


  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.task.status = status.find((el, index, arr) => {
      return el.value === +this.task.status;
    }).viewValue;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(WarnDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addDeal.emit(this.task.id);
      }
    });
  }

  public accept(): void {
    this.openDialog();
  }
}



