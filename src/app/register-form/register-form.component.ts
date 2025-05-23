import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
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
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const payload = {
        first_name: this.registrationForm.value.firstName,
        last_name: this.registrationForm.value.lastName,
        email: this.registrationForm.value.email,
        user_name: this.registrationForm.value.username,
        password: this.registrationForm.value.password,
        role_id: 3,
        is_active: "true"
      };
      console.log("Form Data: ", this.registrationForm.value);
      this.invalid = false;
      this.http.post('http://localhost:4001/api/v1/user/register', payload).subscribe(resp => {
        console.log(resp);
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
