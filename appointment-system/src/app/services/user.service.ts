import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient
  ) {}

  // get all users
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // get one user
  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }

  // create new user
  public createUser(user: User): Observable<User>{
    return this.http.post<User>(this.apiUrl, user);
  }  
}
