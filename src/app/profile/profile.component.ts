import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileImage: string="https://th.bing.com/th/id/OIP.IQqAakFVSW2T6n9Kibpe2AAAAA?rs=1&pid=ImgDetMain"
  dowloadlist:any =[]
constructor(private api:ApiService){

}
ngOnInit() {
  this.getuserdownloadlist()
  const user =JSON.parse(sessionStorage.getItem('user')||"");
  if(user.profilePic){
    this.profileImage=user.profilePic

  }
}
getuserdownloadlist(){
  this.api.userdownloadlist().subscribe((res:any)=>{
    this.dowloadlist=res
    console.log(this.dowloadlist);
    
  })
}

getFile(event:any){
  let uploadFile=event.target.files[0]
  //convert file  into url
  let fr = new FileReader()
  fr.readAsDataURL(uploadFile)
  fr.onload =(event:any)=>{
    //console.log(event.target.result);
    
    this.profileImage=event.target.result
  }

}

updateprofile(){
  this.api.updateuserApi({profilePic:this.profileImage}).subscribe((res:any)=>{
    sessionStorage.setItem('user',JSON.stringify(res))
    this.profileImage=res.profilePic
    alert('profile updated successfully')

  })
}

}
