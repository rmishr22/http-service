import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private http: HttpClient) { }
  users:User[] = []
  
  getPosts(): Observable<{ message: string; users: User[] }> {
    return this.http.get<{ message: string; users: User[] }>(
      'http://localhost:3000/api/user'
    );
  }
}
