import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  service_url = 'https://cookpedia-backend-9ehq.onrender.com'
  constructor(private http: HttpClient) { }
  getAllRecipesApi() {
    return this.http.get(`${this.service_url}/all-recipes`)
  }

  addTestimonyApi(reqBody: any) {
    return this.http.post(`${this.service_url}/add-testimony`, reqBody)
  }
  //Add user

  registerApi(reqBody: any) {
    return this.http.post(`${this.service_url}/register`, reqBody)
  }

  loginApi(reqBody: any) {
    return this.http.post(`${this.service_url}/login`, reqBody)
  }
  appendToken() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('token')
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`)
    }
    return { headers }
  }
  //view recipe
  viewRecipeApi(recipeid: string) {
    return this.http.get(`${this.service_url}/recipe/${recipeid}/view`, this.appendToken())
  }

  relatedRecipesApi(cuisine: string) {
    return this.http.get(`${this.service_url}/related-recipes?cuisine=${cuisine}`, this.appendToken())
  }
  downloadRecipeApi(recipeid: any, reqBody: any) {
    return this.http.post(`${this.service_url}/recipe/${recipeid}/download`, reqBody, this.appendToken())
  }
  saverecipeApi(recipeid: any, reqBody: any) {
    return this.http.post(`${this.service_url}/recipe/${recipeid}/save`, reqBody, this.appendToken())
  }
  getsavedrecipes() {
    return this.http.get(`${this.service_url}/saved-recipes`, this.appendToken())
  }
  deleteSavedRecipeApi(id: any) {
    return this.http.delete(`${this.service_url}/deletesavedrecipe/${id}`, this.appendToken())
  }
  userdownloadlist() {
    return this.http.get(`${this.service_url}/userdownloadedrecipe`, this.appendToken())
  }
  updateuserApi(reqBody: any) {
    return this.http.post(`${this.service_url}/user/edit`, reqBody, this.appendToken())
  }

  getAllApprovedFeedbacksApi() {
    return this.http.get(`${this.service_url}/all-approved-feedbacks`)
  }

  addRecipeApi(reqBody: any) {
    return this.http.post(`${this.service_url}/add-recipe`, reqBody, this.appendToken())
  }

  alluserApi() {
    return this.http.get(`${this.service_url}/all-users`, this.appendToken())
  }

  alldownloadlistapi() {
    return this.http.get(`${this.service_url}/download-list`, this.appendToken())
  }

  getallFeedbackListAPI() {
    return this.http.get(`${this.service_url}/all-feedback`, this.appendToken())
  }

  updateFeedbackStatusAPI(feedBackId: string, status: string) {
    return this.http.get(`${this.service_url}/feedback/${feedBackId}/update?status=${status}`, this.appendToken())
  }


  getAllApprovedFeedbackAPI() {
    return this.http.get(`${this.service_url}/all-approve-feedback`)
  }

  //recipe/675bf1f1707fc502be2aa71b/edit
  updateRecipeAPI(id: string, reqBody: RecipeModel) {
    return this.http.put(`${this.service_url}/recipe/${id}/edit`, reqBody, this.appendToken())
  }

  //recipes/:id/remove
  deleteRecipeAPI(id: string) {
    return this.http.delete(`${this.service_url}/recipes/${id}/remove`, this.appendToken())
  }

  getchartData(){
    this.alldownloadlistapi().subscribe((res:any) => {
      let DownloadArrayList:any=[]
      let output:any={}
      res.forEach((item:any)=>{
        let cuisine=item.recipeCuisine
        let currentCount=item.count
        if(output.hasOwnProperty(cuisine)){
          output[cuisine]+=currentCount
        }else{
          output[cuisine]=currentCount
        }

      })
      for(let cuisine in output){
        DownloadArrayList.push({name:cuisine,y:output[cuisine]})
      }
      console.log(DownloadArrayList);
      localStorage.setItem('chart',JSON.stringify(DownloadArrayList))
      
    })
  }
}

