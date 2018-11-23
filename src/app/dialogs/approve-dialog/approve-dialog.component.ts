import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITask } from '../../+tasks/models/Task';

@Component({
    selector: 'app-approve-dialog',
    templateUrl: './approve-dialog.component.html',
    styleUrls: ['./approve-dialog.component.css']
})
export class ApproveDialogComponent {
    public task: ITask;

    constructor(
        public dialogRef: MatDialogRef<ApproveDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.task = data.task;
    }

    public onNoClick() {
        this.dialogRef.close(false);
    }

    public onOkClick() {
        this.dialogRef.close(true);
    }
}
