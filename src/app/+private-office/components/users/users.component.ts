import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../user/models/User';
import { UserService } from '../../../../app/user/services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  public users: IUser[];

  constructor(private userService: UserService) { }

  public changeRole(user, role) {
    this.userService.updateUserRole(user, role).subscribe();
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
