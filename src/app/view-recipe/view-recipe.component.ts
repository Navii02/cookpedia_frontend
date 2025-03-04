import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {
  recipeId:string=""
  recipe:any =""
  allRelatedRecipes:any=[]
constructor(private route:ActivatedRoute,private api:ApiService){}
ngOnInit() {
  this.route.params.subscribe((res:any) => {
    this.recipeId=res.id
    //console.log(this.recipeId);
    this.getrecipeDetails(this.recipeId)
    
  })

}

 getrecipeDetails(recipeId:any){
this.api.viewRecipeApi(recipeId).subscribe((res:any) =>{
this.recipe=res
console.log(this.recipe);
this.getrelatedRecipe(res.cuisine)

})
 }
getrelatedRecipe(cuisine:string){
  this.api.relatedRecipesApi(cuisine).subscribe((res:any)=>{
    if(res.length>1){
      this.allRelatedRecipes=res.filter((item:any)=>item.name!=this.recipe.name)
      console.log(this.allRelatedRecipes);
      
    }else{
      this.allRelatedRecipes=[]
    }

  })
}
downloadRecipe(){
  this.api.downloadRecipeApi(this.recipeId,this.recipe).subscribe((res:any)=>{
    this.api.getchartData()
    this.generatePDF()
   
  })
}
saveRecipe(){
  this.api.saverecipeApi(this.recipeId,this.recipe).subscribe({
    next:(res:any)=>{
      alert('Recipe Added Successfully to your collection')
    },error:(reason:any)=>{
      alert(reason.error)
    }
  });
}
generatePDF(){
  const pdf= new jsPDF()
  pdf.setFontSize(16)
  pdf.setTextColor("red")
  pdf.text(this.recipe.name,10,10)

  pdf.setFontSize(12)
  pdf.setTextColor("black")
  pdf.text(`Cuisine:${this.recipe.cuisine}`,10,20)
  pdf.text(`Servings:${this.recipe.servings}`,10,25)
  pdf.text(`Mode of cooking:${this.recipe.difficulty}`,10,30)
  pdf.text(`Toal preperation time:${this.recipe.prepTimeMinutes} Minutes`,10,35)
  pdf.text(`Total cooking time:${this.recipe.cookTimeMinutes}`,10,40)
  pdf.text(`Total Calories per servings:${this.recipe.caloriesPerServing}`,10,45)

  let head=[['Ingredients Needed','Cooking Intrutcions']]
  let body=[]
  body.push([this.recipe.ingredients,this.recipe.instructions])

  autoTable(pdf,{head,body,startY:50})
  pdf.output('dataurlnewwindow')
  pdf.save('downloaded recipe.pdf')
}

}
