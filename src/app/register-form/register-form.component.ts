import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { catchError, throwError } from 'rxjs';


@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  registrationForm: FormGroup;
  invalid: Boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const samePassword = this.registrationForm.value.password === this.registrationForm.value.confirmPassword;

    if (this.registrationForm.valid && samePassword) {
      const payload = {
        title: "Dr.",
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        email: this.registrationForm.value.email,
        userName: this.registrationForm.value.username,
        password: this.registrationForm.value.password,
        accountDueTS: new Date(),
        subscriptionType: "Free",
        roleName: "Admin",
        isActive: "true"
      };
      console.log(payload);
      this.invalid = false;
      this.http.post('http://localhost:5237/api/v1/auth/register', payload).pipe(
              catchError(err => {
                console.error(err);
                this.invalid = true;
                return throwError(() => new Error("Registration failed."));
              })
            ).subscribe(resp => {
        console.log(resp);
        // Turn off spinner
        this.router.navigate(['/studenthome']);
      });

    } else {
      console.log("Form is invalid");
      this.registrationForm.setErrors({ passwordMismatch: true });
      this.invalid = true;

      // Show error message
    }
  }
}
