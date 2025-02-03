import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  users: User[] = []

  getUsers(): Observable<{ message: string; users: User[] }> {
    return this.http.get<{ message: string; users: User[] }>(
      'http://localhost:3000/api/user'
    );
  }
  addUser(email: string, name: string, username: string, phone: string, website: string, suite: string, street:string, city:string, zipcode:string, lat:string, lng:string,  bs: string,catchPhrase: string, companyname: string)
    : Observable<{ message: string }> {
    const user: User = {
      id:Math.random(),
      email: email,  name: name,
      username: username,  phone: phone,
      website: website,
      address: {
        suite: suite, street:street, city:city, zipcode:zipcode, 
        geo:{
          lat:lat, 
          lng:lng
        }
      },
      company:{
        bs: bs,
        catchPhrase: catchPhrase,
        name: companyname
      }
    }
    console.log(user)
    return this.http.post<{ message: string }>('http://localhost:3000/api/add-employee', user)
  }
}
