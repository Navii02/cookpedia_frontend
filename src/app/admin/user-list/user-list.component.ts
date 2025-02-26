import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
allusers:any=[]
constructor(private api:ApiService){

}
ngOnInit(){
  this.getallusers()
}
getallusers(){
  this.api.alluserApi().subscribe((res:any) =>{
    this.allusers=res
  })
}
}
