import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SaveRecipeComponent } from './save-recipe/save-recipe.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { PnfComponent } from './pnf/pnf.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path:'admin',canActivate:[authGuard], loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
    },
    {
        path:'',component:HomeComponent,title:"Home page"
    },
    {
        path:'about',component:AboutComponent,title:"About Page"
    },
    {
        path:'contact',component:ContactComponent,title:"contact Page"
    },
    {
        path:'recipes',component:RecipesComponent,title:"recipes Page"
    },
    {
        path:'login',component:LoginComponent,title:"login Page"
    },
    {
        path:'register',component:RegisterComponent,title:"register Page"
    },
    {
        path:'profile',canActivate:[authGuard],component:ProfileComponent,title:"profile page"
    },
    {
        path:'save-recipe',canActivate:[authGuard],component:SaveRecipeComponent,title:"save recipe page"
    },
    {
        path:'recipe/:id/view',canActivate:[authGuard],component:ViewRecipeComponent,title:"view recipes page"
    },
    {
        path:'**',component:PnfComponent
    }

];
