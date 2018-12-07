import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthGuardService } from '../auth-guard.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild("form") form: NgForm;

  constructor(private authGuard: AuthGuardService, private authService: AuthService) { }

  ngOnInit() {
    this.form.reset();
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signIn(email, password);
    console.log(form);
  }

}
