import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TaskComponent } from '../task/task.component';

@Component({
    selector: 'app-warn-dialog',
    templateUrl: './warn-dialog.component.html',
    styleUrls: ['./warn-dialog.component.css']
})
export class WarnDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<WarnDialogComponent>,
    ) { }

    onNoClick() {
        this.dialogRef.close(false);
    }

    onOkClick() {
        this.dialogRef.close(true);
    }
}
