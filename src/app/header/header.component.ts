import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { resolve } from 'url';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() logoutClicked = new EventEmitter();
  loginStatus = false;
  constructor(private loginService: LoginService, private router: Router, private activeR: ActivatedRoute) { }

  ngOnInit() {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     if (event.url.indexOf('home') > -1) {
    //       this.loginStatus = true;
    //     }
    //     else {
    //       this.loginStatus = false;
    //     }
    //   }
    // })
  }
  logout() {
    this.loginService.logout();
    this.logoutClicked.emit(true);
    setTimeout(() => {
      this.router.navigate(['/']);
      localStorage.removeItem("user");
    }, 3500)

  }

}
