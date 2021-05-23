import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //ajout d'un utilisateur dans la bd
  constructor(private firestore:AngularFirestore) { }
  
  ajouterUser(unUser:any):Promise<any> {
    return this.firestore.collection('users').add(unUser);
  }

  //recuperation d'un utilisateur dans la bd
  getUser():Observable<any> {
    return this.firestore.collection('users', ref=>ref.orderBy('nom', 'asc')).snapshotChanges();
  }

  //Suppression d'un utilisateur dans la bd  
deleteUser(id:string):Promise<any> {
return this.firestore.collection('users').doc(id).delete();
}
//Methode de recuperer d'un utilisateur sur firebase a partir de son id
getUserFirebase(id:string):Observable<any> {
  return this.firestore.collection('users').doc(id).snapshotChanges();
}
//Mise à jour de l'utilisateur      
updateUser(id:string,data:any):Promise<any> {
  return this.firestore.collection('users').doc(id).update(data);
}
//Recuperation des donnee a sauvegarder vers l'archive

}
