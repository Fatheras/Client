import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-warn-dialog',
    templateUrl: './warn-dialog.component.html',
    styleUrls: ['./warn-dialog.component.css']
})
export class WarnDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<WarnDialogComponent>,
    ) { }

    public onNoClick() {
        this.dialogRef.close(false);
    }

    public onOkClick() {
        this.dialogRef.close(true);
    }
}
