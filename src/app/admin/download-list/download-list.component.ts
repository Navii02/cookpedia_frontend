import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent {
 alldownloadlist:any=[]
 constructor(private api:ApiService){}
ngOnInit(){
  this.getalldownloadlist()
}

 getalldownloadlist(){
  this.api.alldownloadlistapi().subscribe((res:any)=>{
    this.alldownloadlist=res
  })
 }
}
