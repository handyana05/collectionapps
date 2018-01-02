import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  userLoggedIn: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userLoggedIn = this.userService.isAnUserLoggedIn();
  }

  logout(): void {
    this.userService.logout();
    this.userLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
