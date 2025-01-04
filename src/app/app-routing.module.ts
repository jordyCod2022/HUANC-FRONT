import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/autenticacion/auth/auth.component';
import { DashboardComponent } from './pages/Principal/dashboard/dashboard.component';
import { ViewComponent } from './pages/Principal/view/view.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },

  { 
    path: 'login', 
    component:AuthComponent
  },

  {
    path:'home',
    component:DashboardComponent
  },{
    path:'viewData',
    component: ViewComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
