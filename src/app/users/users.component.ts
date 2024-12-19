import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserComponent } from './user/user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserComponent],
  providers: [HttpClient],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(private http: HttpClient) { }
  users: any;
  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe(response => {
        console.log(response);
        this.users = response
        localStorage.setItem('users', JSON.stringify(this.users));
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          this.users = JSON.parse(storedUsers);
          console.log('Added users to local storage');
        }
      })

  }

}
