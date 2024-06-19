import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  signupForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private titleService: Title
  ) {
    this.signupForm = this.fb.group({
      fname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern("^[a-zA-Z]+$")]],
      lname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirm_pass: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    })
  }

  ngOnIniti(): void{
    this.titleService.setTitle("Dr. Appointment | Signup");
  }
  
  // matches password and confirm password fields
  matchPassword() : boolean {    
    if (this.signupForm.value.password != this.signupForm.value.confirm_pass) {
      alert("Password do not matched!")
      document.getElementById('confirm_pass')?.focus();
      return false;
    }
    return true;
  }

  // handles click event on sign up button
  onSubmit() {
    if(this.signupForm.valid && this.matchPassword()){
      this.userService.createUser(this.signupForm.value).subscribe(()=>{
        this.toastr.clear();
        this.signupForm.reset();
        this.toastr.success("Registeration successful. ✅");
        this.router.navigate(['/login']);
      }, 
      (err)=>{
        this.toastr.success("Something went wrong. Please try again.")
      })
    }
  }

  // to show password
  togglePassword(flag: number) {
    if(flag === 1) {
      this.showPassword = !this.showPassword;
    }
    else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
