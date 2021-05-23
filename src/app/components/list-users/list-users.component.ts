import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable,Subject,combineLatest } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { CreateUsersComponent } from '../create-users/create-users.component'; 

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users:any[] = [];
 //users: Observable<any[]>;
  constructor(
 firestore: AngularFirestore,
    private _userService:UsersService,
    private toastr: ToastrService) {
 // this.users = firestore.collection('users').valueChanges();

   }

  ngOnInit(): void {
    this.getUserDoc()
 //   Observable.combineLatest(this.startObs, this.endObs).subscibe((value:any) => {//
 //     this.firequery(value[0], value[1]).subscribe((clubs:any) =>this.clubs=clubs);
  //  });
  }
//Cette fonction interagit avec le service pour la recuperation du user
  getUserDoc(){
    this._userService.getUser().subscribe(data => {
      this.users = [];
      data.forEach((el:any) => {
      //  console.log(el.payload.doc.id);
        //console.log(el.payload.doc.data());
        this.users.push({
          id:el.payload.doc.id,
          ...el.payload.doc.data()
        })
      }); console.log(this.users);
    })
  }
//Suppression cote front 
deleteUser(id:string){
  this._userService.deleteUser(id).then(() => {
 //   console.log('Utilisateur supprimer avec succes!');
  this.toastr.error('Utilisateur supprimer avec succès','Vérifiez l archive!',{
    positionClass:'toast-bottom-right',
  });
  }).catch(err => {
    console.log(err)
  })
}
//bar de recherche 
clubs: any;
  searchForm!: string;
startAt = new Subject();
endAt = new Subject();
startObs = this.startAt.asObservable();
endObs = this.endAt.asObservable();

search($event: { target: { value: any; }; }){
  let q = $event.target.value;
  this.startAt.next(q);
  this.endAt.next(q + '\uf8ff');
}
//qcces q lq base de donnees

//firequery(start: any, end: any){
 // return this.firestore.collection('users', (ref: { limit: (arg0: number) => { (): any; new(): any; orderBy: { (arg0: any): { (): any; new(): any; startAt: { (): any; new(): any; }; }; new(): any; }; }; }) => ref.limit(4).orderBy('nom').startAt(start).endAt(end))
//}

//recuperation de l'utilisateur supprimer
}
