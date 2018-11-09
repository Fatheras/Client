import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
    @Input() users;
    @Output() changeRole: EventEmitter<number> = new EventEmitter<number>();

    save($event) {
        this.changeRole.emit($event);
    }
}
