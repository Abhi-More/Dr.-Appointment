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
  
  isNavbarCollapsed: boolean = true;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
  logout(): void {
    if(confirm("Do you want to logout?")) {
      this.isLoggedIn = false;
      this.authService.logout();
      this.toastr.clear();
      this.toastr.success("Logged out");
    }
  }

  // to handle click on collapse button for mobile view
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
