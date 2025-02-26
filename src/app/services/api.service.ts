import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  service_url = 'http://localhost:4000'
  constructor(private http:HttpClient) { }
  getAllRecipesApi(){
    return this.http.get(`${this.service_url}/all-recipes`)
  }

  addTestimonyApi(reqBody:any){
    return this.http.post(`${this.service_url}/add-testimony`,reqBody)
  }
  //Add user

registerApi(reqBody:any){
  return this.http.post(`${this.service_url}/register`,reqBody)
}

loginApi(reqBody:any){
  return this.http.post(`${this.service_url}/login`,reqBody)
}
appendToken(){
  let headers= new HttpHeaders()
  const token = sessionStorage.getItem('token')
  if(token){
    headers=headers.append('Authorization',`Bearer ${token}`)
  }
  return {headers}
}
//view recipe
viewRecipeApi(recipeid: string){
  return this.http.get(`${this.service_url}/recipe/${recipeid}/view`,this.appendToken())
}

relatedRecipesApi(cuisine: string){
  return this.http.get(`${this.service_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
}
downloadRecipeApi(recipeid:any,reqBody:any){
  return this.http.post(`${this.service_url}/recipe/${recipeid}/download`,reqBody,this.appendToken())
}
saverecipeApi(recipeid:any,reqBody:any){
  return this.http.post(`${this.service_url}/recipe/${recipeid}/save`,reqBody,this.appendToken())
}
getsavedrecipes(){
  return this.http.get(`${this.service_url}/saved-recipes`,this.appendToken())
}
deleteSavedRecipeApi(id:any){
  return this.http.delete(`${this.service_url}/deletesavedrecipe/${id}`,this.appendToken())
}
userdownloadlist(){
  return this.http.get(`${this.service_url}/userdownloadedrecipe`,this.appendToken())
}
updateuserApi(reqBody:any){
  return this.http.post(`${this.service_url}/user/edit`,reqBody,this.appendToken())
}

getAllApprovedFeedbacksApi(){
  return this.http.get(`${this.service_url}/all-approved-feedbacks`)
}

addRecipeApi(reqBody:any){
  this.http.post(`${this.service_url}/add-recipe`,reqBody,this.appendToken())
}

alluserApi(){
  return this.http.get(`${this.service_url}/all-users`,this.appendToken())
}

alldownloadlistapi(){
  return this.http.get(`${this.service_url}/download-list`,this.appendToken())
}
   //all-feedback
   getallFeedbackListAPI(){
    return this.http.get(`${this.service_url}/all-feedback`,this.appendToken())
  }

   //feedback/6750283f6e6c436259862c60/update?status=Approved
   updateFeedbackStatusAPI(feedBackId:string,status:string){
    return this.http.get(`${this.service_url}/feedback/${feedBackId}/update?status=${status}`,this.appendToken())
  }

  //all-approve-feedback
  getAllApprovedFeedbackAPI(){
    return this.http.get(`${this.service_url}/all-approve-feedback`)
  }


}

