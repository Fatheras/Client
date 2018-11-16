import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { status } from '../../../../../models/status';
import { ITask } from '../../../../../+tasks/models/Task';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ApproveDialogComponent } from '../../../../../dialogs/approve-dialog/approve-dialog.component';


@Component({
    selector: 'app-new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements OnInit {
    @Input() public task: ITask;
    @Output() public changeStatus: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router, public dialog: MatDialog) {

    }

    public info(): void {
        this.openDialog();
    }

    ngOnInit(): void {
        this.task.status = status.find((el, index, arr) => {
            return el.value === +this.task.status;
        }).viewValue;
    }

    public openDialog(): void {
        const dialogRef = this.dialog.open(ApproveDialogComponent, {
            data: {
                task: this.task,
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.changeStatus.emit({ taskId: this.task.id, status: status.find((el) => el.viewValue === 'Open').value });
            } else if (result !== undefined) {
                this.changeStatus.emit({ taskId: this.task.id, status: status.find((el) => el.viewValue === 'Declined').value });
            }
        });
    }
}
