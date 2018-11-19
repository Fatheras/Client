import { Component, OnInit } from '@angular/core';
import { RoleService } from '../+authentication/services/role.service';
import { Role } from '../models/Role';

@Component({
  selector: 'app-private-office',
  templateUrl: './private-office.component.html',
  styleUrls: ['./private-office.component.css']
})
export class PrivateOfficeComponent implements OnInit {
  public isMenuOpen = false;
  public role;
  public Role = Role;

  constructor(private roleService: RoleService) { }

  public change(): void {

  }

  public toggle(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.role = this.roleService.Role;
  }
}
