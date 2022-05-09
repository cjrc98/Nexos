import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  saludo=""
  tiempo: number;

  constructor(
    private router:Router
  ) {

    
    this.tiempo = new Date().getHours();
    this.time();
   }

  ngOnInit() {
  }

  async time(){
    if (this.tiempo >= 1 && this.tiempo < 12){
      this.saludo = 'Buenos dias';
    }
    if (this.tiempo >= 12 && this.tiempo <= 18){
      this.saludo = 'Buenas tardes';
    }
    if (this.tiempo > 18 && this.tiempo <= 24){
      this.saludo = 'Buenas noches';
    }
  }

  login(){
    this.router.navigate(['/login'])
  }

  register(){
    this.router.navigate(['/register'])
  }

}
