import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../user/models/User';
import { UserService } from '../../../user/services/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public users: IUser[];

  constructor(private userService: UserService, private _flashMessagesService: FlashMessagesService) { }

  public changeRole(event): void {
    this.userService.updateUserRole(event.userId, event.newRole).subscribe(() => {
      this._flashMessagesService.show('Role successfuly changed!', { timeout: 1000 });
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsersWithStatistic().subscribe((users) => {
      this.users = users;
      this.users.forEach((user, i, arr) => {
        user.createdAt = new Date(user.createdAt).toLocaleString();
      });
    });
  }
}
