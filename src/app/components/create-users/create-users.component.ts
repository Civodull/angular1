import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsersService } from 'src/app/services/users.service';
import { UserInterface } from './create-users-interface';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {
creatUser:FormGroup;
submitted=false;
Loading=false;
id:string | null;
statut:boolean = false;//utilisateur n'est pas supprimer
isLoggedIn = false;
isSignedIn: any;

titre='Ajouter un utilisateur';
  //Definir un tableau pour le role
public roles:Array<UserInterface> = [{id:1, role:"Admin"},{id:2, role:"Etudiant"},{id:3, role:"Formateur"},{id:4, role:"Finance"}];
public idRole:number = 0;  
constructor(private fb:FormBuilder, 
    private _userService: UsersService,
    private router:Router,
    private toastr: ToastrService,
    private aRouter:ActivatedRoute,
    public firebaseService:FirebaseService, 
    public firebaseAuth: AngularFireAuth) {

    this.creatUser = this.fb.group({
      nom:['', [Validators.required,Validators.minLength(2)]],
      prenom:['', [Validators.required,Validators.minLength(2)]],
      pseudo:['', [Validators.required,Validators.minLength(2)]],
      adresse:['', [Validators.required,Validators.maxLength(40)]],
      email:['', [Validators.required, Validators.email]],
      telephone:['', [Validators.required,Validators.maxLength(15)]],
      role:['', Validators.required]
      
  //    role:['', Validators.required]
    });
//Recuperation de l'utilisateur à modifier
this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    //on initialise le composant pour la methode 
    this.editUser();
  }
  //Creation d'un utilisateur
  onCreateUser(){ 
    this.submitted = true;
    if(this.creatUser.invalid){
      return;
    }
      if(this.id === null){
        this.inserEdit();
      }else{
        this.estEditer(this.id);
      }

//insersion de l'utilisateur dans la base de donnee firebase

}
//Action pour enregistrer l'edition de l'utilisateur 
estEditer(id:string){
  
const unUser:any={
  nom:this.creatUser.value.nom,
  prenom:this.creatUser.value.prenom,
  pseudo:this.creatUser.value.pseudo,
  adresse:this.creatUser.value.adresse,
  email:this.creatUser.value.email,
  telephone:this.creatUser.value.telephone,
  role:this.creatUser.value.role,

  dateModification:new Date()
      }

      alert('Le role est'+this.creatUser.value.role);
  this.Loading = true;
  this._userService.updateUser(id, unUser).then(() => {
    this.Loading = false;
    this.toastr.info('Cet utilisateur a été modifier avec succès','Modification',{
      positionClass: 'toast-bottom-right'
    })
    this.router.navigate(['/admin'])
  })
}
  //Methode editer un utilisateur sur firebase a partir de son id
  editUser(){
    this.titre='Vous allez modifier cet utilisateur';
    if(this.id!==null){
      this.Loading = true;
      this._userService.getUserFirebase(this.id).subscribe(data =>{
        //console.log(data.payload.data()['nom']);
        this.Loading = false;
        this.creatUser.setValue({
          nom: data.payload.data()['nom'],
          prenom: data.payload.data()['prenom'],
          pseudo: data.payload.data()['pseudo'],
          adresse: data.payload.data()['adresse'],
          email: data.payload.data()['email'],
          telephone: data.payload.data()['telephone'],
          role: data.payload.data()['role']
        })

      })
    }
  }
// Methode d'insertion de l'utilisateur modifier
  inserEdit() {
    
const unUser:any={
  nom:this.creatUser.value.nom,
  prenom:this.creatUser.value.prenom,
  pseudo:this.creatUser.value.pseudo,
  adresse:this.creatUser.value.adresse,
  email:this.creatUser.value.email,
  telephone:this.creatUser.value.telephone,
  role:this.creatUser.value.role,
  datedeCreation:new Date(), 
  dateModification:new Date()
}
  
    this.Loading = true;
    this._userService.ajouterUser(unUser).then(()=>{
    this.toastr.success('Utilisateur modifier avec succès','Excellent!',{
      positionClass:'toast-top-right',
    });
    this.Loading = true;
    this.router.navigate(['/admin'])
  }).catch(err =>{
    console.log(err);
    this.Loading = false;
  })
  }
//methode sigup 
async onSignup(email:string,password:string){
  await this.firebaseService.signIn(email,password)
  if(this.firebaseService.isLoggedIn)
  this.isSignedIn = true;
}
//Debut de la base de


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
//Deconnexion eliminer la session de connexion 
loggout(){
this.firebaseAuth.signOut()
localStorage.removeItem('user');
this.router.navigate(['/connexion']);
}

//FIN
}

