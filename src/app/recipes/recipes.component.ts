import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  allRecipes: any = [];
  cuisineArray: any = [];
  mealsArray: any = [];
  dummyallRecipes: any = [];
  searchKey: string =""
  p: number = 1;
  constructor(private api: ApiService,private router:Router) { }
  ngOnInit() {
    this.getAllRecipes()
  }

  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe((res: any) => {
      this.allRecipes = res
      // console.log(this.allRecipes);
      this.dummyallRecipes=this.allRecipes
      this.allRecipes.forEach((item: any) => {
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine);
      })
      // console.log(this.cuisineArray);

      const dummymeals = this.allRecipes.map((item: any) => item.mealType)
      // console.log(dummymeals);

      const meals = dummymeals.flat(Infinity)
      //console.log(meals);
      meals.forEach((item: any) => {
        !this.mealsArray.includes(item) && this.mealsArray.push(item);
        // console.log(this.mealsArray);

      })
     

    })
  }
  filterAllRecipes(key:string,value:string){
   this.allRecipes= this.dummyallRecipes.filter((item:any) => item[key].includes(value))
  }

  viewRecipes(recipeId:string){
    if(sessionStorage.getItem('token')){
     this.router.navigateByUrl(`/recipe/${recipeId}/view`)
    }

  }

}
