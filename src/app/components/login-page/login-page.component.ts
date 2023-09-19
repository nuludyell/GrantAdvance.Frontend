import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/api/models/users/login.model';
import { AuthService } from 'src/app/api/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  form: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar)
  {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.required
      ])
    });
  }

  public login() : void
  {
    if (!this.form.valid) {
      return;
    }

    const loginModel: LoginModel = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService
      .login(loginModel)
      .subscribe(res => {
        this.snackBar.open('Login successful', 'close', {
          duration: 2000
        });
        this.router.navigate(['home']);
      },
      err => {
        this.snackBar.open(err.error.detail, 'close', {
          duration: 2000
        });
      });
  }
}
