import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private loginAuth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    empid: new FormControl('', Validators.required),
    pwd: new FormControl('', Validators.required),
  });

  isUserValid: boolean = false;

  loginSubmitted() {
    this.loginAuth
      .loginUser([this.loginForm.value.empid, this.loginForm.value.pwd])
      .subscribe((res) => {
        console.log(res);
        if (res === 'success') {
          this.isUserValid === true;
          //alert('Login Successful');
          this.router.navigateByUrl('home');
        } else {
          this.isUserValid === false;
          alert('Login Unsuccessful');
        }
      });
    //console.log(this.loginForm);
  }

  get Empid(): FormControl {
    return this.loginForm.get('empid') as FormControl;
  }

  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }
}
