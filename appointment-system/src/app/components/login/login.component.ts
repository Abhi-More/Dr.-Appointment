import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private authService: AuthService,
    private toastr: ToastrService
  ) { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]]
    });
  }

  // ngOnInit Hook to set title
  ngOnInit(): void {
    this.titleService.setTitle('Dr. Appointments | Login');
  }

  // function for login
  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      
      if (this.authService.login(username, password)) {
        this.toastr.clear();
        this.toastr.success("Logged in successfully ✅");
      }
      else {
        this.toastr.error('Invalid Credentials');
      }
    }
    else {
      console.error("Form has error");
      alert("Please fill the details coreectly!");
    }
  }

  // to show password
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
