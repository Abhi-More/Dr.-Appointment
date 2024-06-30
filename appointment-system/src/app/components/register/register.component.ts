import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public signupForm!: FormGroup;
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public users!: User[];

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
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'), Validators.maxLength(15)]],
      confirm_pass: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'), Validators.maxLength(15)]]
    })
  }

  // ngOnInit lifecycle hook
  public ngOnIniti(): void {
    this.titleService.setTitle("Dr. Appointment | Signup");
  }

  // matches password and confirm password fields
  public matchPassword(): boolean {
    if (this.signupForm.value.password != this.signupForm.value.confirm_pass) {
      alert("Password do not matched!")
      document.getElementById('confirm_pass')?.focus();
      return false;
    }
    return true;
  }

  public checkDuplicateEmail(callback: (isDuplicate: boolean) => void): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        for (let index = 0; index < this.users.length; index++) {
          if (this.signupForm.value.email === this.users[index].email) {
            callback(false);
            return;
          }
        }
        callback(true);
      },
      (err) => {
        this.toastr.error("Something went wrong. Please try again.");
        callback(false);
      }
    );
  }

  // check if user with email already exist
  // public checkDuplicateEmail(): Promise<boolean> {
    // this.userService.getUsers().subscribe((data) => {
    //   this.users = data;

    //   for (let index = 0; index < this.users.length; index++) {
    //     if (this.signupForm.value.email === this.users[index].email) {
    //       // duplicateUser = true;
    //       // break;
    //       return false;
    //     }
    //   }
    //   return true;
    // },
    // (err) => {
    //   this.toastr.error("Something went wrong. Please try again.");
    //   return false;
    // })

  //   return new Promise((resolve, reject) => {
  //     this.userService.getUsers().subscribe(
  //       (data) => {
  //         this.users = data;
  //         for (let index = 0; index < this.users.length; index++) {
  //           if (this.signupForm.value.email === this.users[index].email) {
  //             resolve(false);
  //             return true;
  //           }
  //         }
  //         resolve(true);
  //         return false;
  //       },
  //       (err) => {
  //         this.toastr.error("Something went wrong. Please try again.");
  //         resolve(false);
  //         return false;
  //       }
  //     );
  //   })
  // }

  // handles click event on sign up button
  public onSubmit(): void {
    if (this.signupForm.valid && this.matchPassword()) {

      //Usage
      // this.checkDuplicateEmail((isUnique) => {
      //   if (isUnique) {
      //     // Proceed with form submission
      //   } else {
      //     // Handle duplicate email case
      //   }
      // });
      
      this.checkDuplicateEmail((isUnique) => {
      // this.checkDuplicateEmail().then((isUnique) => {
        if (isUnique) {
          // Proceed with form submission
          this.userService.createUser(this.signupForm.value).subscribe(() => {
            this.toastr.success("Registeration successful. ✅");
            this.signupForm.reset();
            this.router.navigate(['/login']);
          },
          (err) => {
            this.toastr.error("Something went wrong!");
          });
        } else {
          // Handle duplicate email case
          this.toastr.error("User with same email already exist. Please login or use another email.");
        }
      });


    //   if (!this.checkDuplicateEmail()) {
    //     this.userService.createUser(this.signupForm.value).subscribe(() => {
    //       this.toastr.success("Registeration successful. ✅");
    //       this.signupForm.reset();
    //       this.router.navigate(['/login']);
    //     },
    //     (err) => {
    //       this.toastr.error("Something went wrong!");
    //     });
    //   }
    //   else {
    //     this.toastr.error("User with same email already exist. Please login or use another email.");
    //   }
    }
  }

  // to show password
  public togglePassword(flag: number): void {
    if (flag === 1) {
      this.showPassword = !this.showPassword;
    }
    else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // fetch all users
  public getAllUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    },
      (err) => {
        this.toastr.error("Something went wrong!");
      })
  }
}
