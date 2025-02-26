import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { RecipeModel } from '../model/recipeModel';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {
  cuisineArray: any = [];
  mealsArray: any = [];
  recipeDetails: RecipeModel = {}

  constructor(private api: ApiService, private router: Router) { }
  ngOnInit() {
    this.getAllRecipes()
  }

  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe((res: any) => {

      // console.log(this.allRecipes);

      res.forEach((item: any) => {
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine);
      })
      console.log(this.cuisineArray);

      const dummymeals = res.map((item: any) => item.mealType)
      // console.log(dummymeals);

      const meals = dummymeals.flat(Infinity)
      //console.log(meals);
      meals.forEach((item: any) => {
        !this.mealsArray.includes(item) && this.mealsArray.push(item);


      })

      console.log(this.mealsArray);
    })
  }

  addRecipe(){
    console.log(this.recipeDetails);
    

  }
}
