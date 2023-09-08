import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"" , redirectTo:'home',pathMatch:'full'},
  {path:"home" , component:HomeComponent},
  {path:"add" , component:AddEmployeeComponent},
  {path:"update-employee/:id" , component:AddEmployeeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
