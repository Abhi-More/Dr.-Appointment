import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  private users: User[] = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.getAllUsers();
  }

  // login function
  public login(username: string, password: string): boolean {
    for(let i = 0; i < this.users.length; i++) {
      if(this.users[i].username === username && this.users[i].password === password) {
        localStorage.setItem('user', JSON.stringify({ username }));
        this.loggedIn = true;
        this.router.navigate(['/appointments']);
        return true;
      }
    }
    return false;
  }

  // logout function
  public logout(): void {
    localStorage.removeItem('user');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  // check login status
  public isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  // Get all users
  public getAllUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
