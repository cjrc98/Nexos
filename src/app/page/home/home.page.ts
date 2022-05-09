import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular'
import { QrscannerPage } from './qrscanner/qrscanner.page';
import { TransferenciaPage } from './transferencia/transferencia.page';
import { CuentacorrientePage } from './cuentacorriente/cuentacorriente.page';
import { CuentahorroPage } from './cuentahorro/cuentahorro.page';
import { CrearcuentaPage } from './crearcuenta/crearcuenta.page';
import { CrearcuentaahorroPage } from './crearcuentaahorro/crearcuentaahorro.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slidesOptions = {
    slidesPerView: 1.5
  }

  id: string;
  idu: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  removerdatolegal: AngularFireObject<any>;

  segment1: boolean = true;
  segment2: boolean = false;

  itemRef: any;
  cuentaCorriente = [];
  cuentaAhorro = [];
  document: number;
  phone: number;
  email: string;
  names: string;
  key: string;
  loading: any;

  constructor(
    private authservice: AuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private loadingCtrl: LoadingController,
    private modalCTR: ModalController,
    public alertController: AlertController
  ) {
    this.loading = this.loadingCtrl;
  }

  ngOnInit() {
    localStorage.removeItem('document');
    localStorage.removeItem('phone');
    this.idu = this.authservice.getUID();
    this.carguedetodo();
  }





  async carguedetodo() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere',
      backdropDismiss: true,
      translucent: true,
    });
    loading.present();
    this.info();
    this.cahorro();
    this.ccorriente();
    loading.dismiss();
  }



  info() {
    this.db.database
      .ref('datos/' + 'user/' + this.authservice.getUID())
      .on('value', (snapshot) => {
        const data = snapshot.val();
        this.document = snapshot.val().document;
        this.names = snapshot.val().name;
        this.key = this.authservice.getUID();
      });
  }

  ccorriente() {
    this.itemRef = this.db.object(
      'datos/' + 'user/' + this.authservice.getUID() + '/cuentaCorriente'
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

  cahorro() {
    this.itemRef = this.db.object(
      'datos/' + 'user/' + this.authservice.getUID() + '/cuentaAhorro'
    );
    this.itemRef.snapshotChanges().subscribe((action) => {
      //this.notify()
      let data = action.payload.val();
      this.cuentaAhorro = [];
      console.log(data);
      for (let k in data) {
        let user = data[k];
        user.key = k;
        console.log(user);
        this.cuentaAhorro.push(user);
      }
    });
  }

  uid() {
    this.authservice.uid = this.authservice.getUID();
  }

  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }

  //QR
  async modalcanqr() {
    const modal = await this.modalCTR.create({
      component: QrscannerPage,
      cssClass: 'transparent-modal',
      swipeToClose: true,
      mode:"ios",
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
  }

  async transferencia() {
    const modal = await this.modalCTR.create({
      component: TransferenciaPage,
      cssClass: 'transparent-modal',
      swipeToClose: true,
      mode:"ios",
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
  }
  //descripcion de la cuenta

  async modalcuentac(id) {
    const modal = await this.modalCTR.create({
      component: CuentacorrientePage,
      cssClass: 'transparent-modal',
      swipeToClose: true,
      //mode:"ios",
      componentProps: { id },
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
  }

  async modalcuentaa(id) {
    const modal = await this.modalCTR.create({
      component: CuentahorroPage,
      cssClass: 'transparent-modal',
      swipeToClose: true,
      //mode:"ios",
      componentProps: { id },
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
  }

  async crearcuenta() {
    const modal = await this.modalCTR.create({
      component: CrearcuentaPage,
      cssClass: 'transparent-modal',
      swipeToClose: true,
      //mode:"ios",
      componentProps: {
        id: this.idu,
      },
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
  }

  async crearcuentacorriente() {
    const modal = await this.modalCTR.create({
      component: CrearcuentaahorroPage,
      cssClass: 'transparent-modal',
      swipeToClose: true,
      //mode:"ios",
      componentProps: {
        id: this.idu,
      },
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
  }


  

  modalAhorro(id) {
    console.log(id);
  }

  modalCorriente(id) {
    console.log(id);
  }

}
