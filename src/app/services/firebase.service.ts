import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  isSignedIn: any;
  constructor(
    public router: Router,
    public firebaseAuth: AngularFireAuth
  ) { }

  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
      this.isLoggedIn =true;
      localStorage.setItem('user',JSON.stringify(res.user));
  })
 
}
 //methode d'inscription
 async signUp(email: string, password: string){
  await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res => {
    this.isLoggedIn =true;
    localStorage.setItem('user',JSON.stringify(res.user));
})
}

loggout(){
  this.firebaseAuth.signOut()
  localStorage.removeItem('user');
  this.router.navigate(['/connexion']);
}
}
