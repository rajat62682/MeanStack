import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GlobalReportsService } from '../services/global-reports.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') signUpForm: NgForm;
  username = '';
  password = '';
  loginClicked = false;
  error = false;
  constructor(private loginService: LoginService, private router: Router, private globalReportService: GlobalReportsService) { }

  ngOnInit() {
  }
  onSubmit() {
    this.loginClicked = true;
    console.log(this.signUpForm);
    this.loginService.checkLogin(this.signUpForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.globalReportService.collectGlobalData().subscribe((response) => {
          this.router.navigate(['/home']);
        })
        localStorage.setItem("user", this.signUpForm.value.username);
      }, (err) => {
        console.log(err);
        this.error = true;
        this.loginClicked = false;
      });
  }
}
