export class RecipeModel{
    name?:string
    ingredients?:Array<string>
    instructions?:Array<string>
    prepTimeMinutes ?: number
    cookTimeMinutes  ?: number
    servings ?: number
    difficulty?:string
    caloriesPerServing ?: number
    cuisine?:string
    image?:string
    mealType?:Array<string>


}
