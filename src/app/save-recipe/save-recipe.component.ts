import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-save-recipe',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './save-recipe.component.html',
  styleUrl: './save-recipe.component.css'
})
export class SaveRecipeComponent {
  allrecipes:any=[]
  constructor(private api:ApiService){}
  ngOnInit(){
    this.getAllSavedRecipe()
  }

  getAllSavedRecipe(){
    this.api.getsavedrecipes().subscribe((res:any)=>{
      this.allrecipes=res
      console.log(this.allrecipes);
      
    })

  }
deletesavedrecipe(id:any){
  this.api.deleteSavedRecipeApi(id).subscribe((res:any)=>{
    this.getAllSavedRecipe()
  })
}
 
}
