import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../models/User';
import { FormControl } from '@angular/forms';
import { roles } from '../../../models/roles';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @Input() public user: IUser;
    @Output() public changeRole = new EventEmitter<any>();

    public userRole = new FormControl('');
    public roles = roles;

    ngOnInit(): void {
        this.userRole.setValue(this.user.role);
    }

    public save() {
        this.changeRole.emit(
            {
                userId: this.user.id,
                newRole: this.userRole.value
            }
        );
    }

    public cancel() {
        this.userRole.setValue(this.user.role);
    }
}
