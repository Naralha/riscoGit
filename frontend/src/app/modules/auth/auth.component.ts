import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/model/User';
import { Router } from '@angular/router';
import { flyInOut } from '../../core/animations/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  animations: [
    flyInOut
  ],
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit({ value, valid }: { value: User; valid: boolean }) {
    this.authService.login(value).subscribe(
      (status: boolean) => {
        if (status) {
          if (this.authService.redirectUrl) {
            const redirectUrl = this.authService.redirectUrl;
            this.authService.redirectUrl = '';
            this.router.navigate([redirectUrl]);
          } else {
            this.router.navigate(['/dashboard']);
          }
        } else {
          const loginError = 'Unable to login';
          this.errorMessage = loginError;
        }
      },
      (err: any) => console.log(err)
    );
  }

  ngOnInit(): void {
    this.buildForm();
  }
}
