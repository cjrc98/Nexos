import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {
  ModalController,
  LoadingController,
  AlertController,
} from '@ionic/angular';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.page.html',
  styleUrls: ['./transferencia.page.scss'],
})
export class TransferenciaPage implements OnInit {
  monto: any;
  id: any;
  datoscaneado: {};
  vdata: number = 0;
  segment1: boolean = true;
  segment2: boolean = false;
  loading: any;
  itemRef: any;
  cuentaCorriente = [];
  cuentaAhorro = [];
  idu: any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    public alertController: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private db: AngularFireDatabase,
    private authservice: AuthService
  ) {
    this.loading = this.loadingCtrl;
  }

  ngOnInit() {
    this.idu = this.authservice.getUID();
    this.carguedetodo();
  }

  ReadCode() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.datoscaneado = barcodeData;
        console.log(this.datoscaneado);
      })
      .catch((err) => {
        console.log('Error', err);
        this.errorqr();
      });
  }

  async errorqr() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ERROR',
      message: 'Al leer el codigo QR',
      buttons: ['OK'],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  dismissModal() {
    this.vdata = 0;
    this.modalCtrl.dismiss({
      vdata: 0,
    });
  }

  segmentChanged(event) {
    var segment = event.detail.value;
    if (segment == 'segment1') {
      this.segment1 = true;
      this.segment2 = false;
    } else if ((segment = 'segment2')) {
      this.segment1 = false;
      this.segment2 = true;
    }
  }

  async carguedetodo() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere',
      backdropDismiss: true,
      translucent: true,
    });
    loading.present();
    this.cahorro();
    this.ccorriente();
    loading.dismiss();
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

}
