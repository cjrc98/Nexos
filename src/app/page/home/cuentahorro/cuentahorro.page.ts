import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cuentahorro',
  templateUrl: './cuentahorro.page.html',
  styleUrls: ['./cuentahorro.page.scss'],
})
export class CuentahorroPage implements OnInit {
  id: any;
  itemRef: any;
  cuentaCorriente = [];
  vdata: number;
  cuenta: any;
  saldo: any;
  constructor(
    private modalCtrl: ModalController,
    private authservice: AuthService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    console.log(this.id);
    this.ccorriente();
    this.info();
  }

  ccorriente() {
    this.itemRef = this.db.object(
      'datos/' +
        'user/' +
        this.authservice.getUID() +
        '/cuentaAhorro' +
        '/' +
        this.id
    );
    this.itemRef.snapshotChanges().subscribe((action) => {
      //this.notify()
      let data = action.payload.val();
      this.cuentaCorriente = [];
      console.log(data);
      for (let k in data) {
        let user = data[k];
        user.key = k;
        console.log(user);
        this.cuentaCorriente.push(user);
      }
    });
  }

  dismissModal() {
    this.vdata = 0;
    this.modalCtrl.dismiss({
      vdata: 0,
    });
  }

  info() {
    this.db.database
      .ref(
        'datos/' +
          'user/' +
          this.authservice.getUID() +
          '/cuentaAhorro' +
          '/' +
          this.id
      )
      .on('value', (snapshot) => {
        const data = snapshot.val();
        this.cuenta = snapshot.val().cuenta;
        this.saldo = snapshot.val().saldo;
      });
  }

}
