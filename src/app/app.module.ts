import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//Modules
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from "@angular/fire/auth";

//import { Ng2SearchPipeModule } from 'ng2-search-filter';


//components
import { AppComponent } from './app.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { CreateUsersComponent } from './components/create-users/create-users.component';
import { EtudiantComponent } from './components/etudiant/etudiant.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { FormateurComponent } from './components/formateur/formateur.component';
import { FinanceComponent } from './components/finance/finance.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { FilterPipe } from './filter.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { FirebaseService } from './services/firebase.service';


@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    CreateUsersComponent,
    EtudiantComponent,
    ConnexionComponent,
    FormateurComponent,
    FinanceComponent,
    NavbarComponent,
    FilterPipe,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  //  Ng2SearchPipeModule,
    FormsModule,
    AngularFireAuthModule,
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
