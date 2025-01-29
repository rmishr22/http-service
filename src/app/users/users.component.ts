import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserComponent } from './user/user.component';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, themeAlpine, themeBalham } from 'ag-grid-community'; 
import { User } from './user/user.model';
import { UsersService } from './users.service';

ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserComponent, AgGridAngular],
  providers: [HttpClient],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(public userService : UsersService){}
  users: User[]=[];

  ngOnInit(): void {
    this.userService.getPosts().subscribe((data) => {
      this.users = data.users;  // Bind the fetched users to the component's users array
    });
  
  }

  colDefs : ColDef[] = [
    {field: "name" , checkboxSelection:true},
    {field: "username"},
    {field: "email"},
    {field: "address", headerName:"Address", editable:true , 
      valueFormatter:({
        data: {
          address: { suite, street, city, zipcode },
        },
      }) => `${suite}, ${street}, ${city}, ${zipcode}` 
    },
    {field: "phone"},
    {field: "website"}
  ]

  defaultColDef = {
    flex:1,
    minWidth:100,
    // minHeight : 100,
    sortable: true,
    filter  : true

  }
  
  public theme = themeAlpine;


}
