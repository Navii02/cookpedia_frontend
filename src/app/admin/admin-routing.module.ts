import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { ManageRecipeComponent } from './manage-recipe/manage-recipe.component';

const routes: Routes = [
  {
    path:"",component:DashboardComponent,title:"Admin Dashboard"
  },
  {
    path:"download-list",component:DownloadListComponent,title:"Recipe Download list"
  },  {
    path:"recipe-list",component:RecipeListComponent,title:"Recipe List"
  },
  {
    path:"user-list",component:UserListComponent,title:"user List"
  },
  {
    path:"request-list",component:RequestListComponent,title:"client Request"
  },
  {
    path:"recipe/add",component:ManageRecipeComponent,title:"Add Recipe Page"
  },
  {
    path:"recipe/:id/edit",component:ManageRecipeComponent,title:"Edit Recipe Page"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
