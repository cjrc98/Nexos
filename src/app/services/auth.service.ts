import { Injectable } from '@angular/core';
import {AngularFireAuth}from "@angular/fire/compat/auth";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';


export  interface UserPro{
  username: string;
  uid: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user : UserPro;
  public uid: any;
  constructor(
    public auth: AngularFireAuth, 
    private db: AngularFireDatabase,
  ) { }


  userRegistration(value){
    return new Promise<any> ( (resolve, reject)=>{
      this.auth.createUserWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        error => reject(error)
      )
    })
  }

  loginFireauth(value){
    
    return new Promise<any> ( (resolve, reject)=>{
      this.auth.signInWithEmailAndPassword(value.email, value.password).then(
        
        res => resolve(res),
        error => reject(error)
        
      )
     
    })
   }

   setUser(user: UserPro){
    return this.user = user;
  }

  getUID(): string{
    return this.user.uid;
  }

 

  ResetPassword(value){
    return new Promise<any> ( (resolve, reject)=>{
      this.auth.sendPasswordResetEmail(value.email).then(
        res => resolve(res),
        error => reject(error)
      )
    })
   }

   validationEmail(value){
    return new Promise<any> ( (resolve, reject)=>{
     this.auth.sendSignInLinkToEmail(value.email, value.password).then(
       
       res => resolve(res),
       error => reject(error)
       
     )
    
   })
  }

  async logout(): Promise<any> {
    return this.auth.signOut();
    
  }
}
