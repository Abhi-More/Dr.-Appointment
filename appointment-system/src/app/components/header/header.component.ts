import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  public isNavbarCollapsed: boolean = true;
  public isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // ngOnInit lifecycle hook
  public ngOnInit(): void {
    this.router.events.subscribe((e: any) => {
      const user = localStorage.getItem("user");
      if (user === null) {
        this.isLoggedIn = false;
      }
      else {
        this.isLoggedIn = true;
      }
    })
  }

  //logout
  public logout(): void {
    if(confirm("Do you want to logout?")) {
      this.isLoggedIn = false;
      this.authService.logout();
      this.toastr.success("Logged out");
    }
  }

  // to handle click on collapse button for mobile view
  public toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
