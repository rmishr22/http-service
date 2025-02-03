import { Routes } from '@angular/router';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';

export const routes: Routes = [
    { path: '', component: UserComponent },
    { path: 'add-employee', component: UserFormComponent },
    { path: 'employee-list', component: UsersComponent }
];
