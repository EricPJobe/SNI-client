import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ContextService } from '../Services/context.service';
import { DataService } from '../Services/data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';

import { faRightToBracket, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FontAwesomeModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  context = inject(ContextService)
  baseApiUrl = this.context.baseApiUrl();
  loginForm: FormGroup;
  invalid: Boolean = false;
  dataService = inject(DataService);
  faRightToBracket = faRightToBracket;
  faXmark = faXmark;


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

    this.context.logout();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const payload = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      console.log("Form Data: ", this.loginForm.value);
      this.invalid = false;
      this.http.post(`${this.baseApiUrl}/api/v1/auth/login`, payload).pipe(
        catchError(err => {
          console.error(err);
          this.invalid = true;
          this.context.logout();
          return throwError(() => new Error("Authentication failed."));
        })
      ).subscribe((resp: any) => {
        console.log(resp);
        this.context.login(resp.token, resp);
        this.invalid = false;
        // Turn off spinner
        this.router.navigate(['/studenthome']);
      });
    } else {
      console.log("Form is invalid");
      this.invalid = true;

      // Show error message
    }
  }
}

