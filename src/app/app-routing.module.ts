import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { CreateUsersComponent } from './components/create-users/create-users.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import {DashboardComponent } from './components/dashboard/dashboard.component'
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';

const routes: Routes = [
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  {path: 'admin', component: ListUsersComponent},
 // {path: 'delete/:id', component: ListUsersComponent},
  {path: 'create', component: CreateUsersComponent},
  {path: 'edith/:id', component: CreateUsersComponent},
  {path: '', component: CreateUsersComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'etudiant', component: EtudiantComponent},
  {path: 'emailVerif', component: VerifyEmailComponent},
  {path: 'passForgot', component: ForgotPasswordComponent},
  {path: 'dashbord', component: DashboardComponent},
  {path: '**', redirectTo: 'admin', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
