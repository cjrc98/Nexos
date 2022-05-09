import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QrscannerPage implements OnInit {

  barcodeData: any;
  vdata: number = 0;
  datoscaneado: {};
  val0: String;
  val1: string;
  val2: number;
  datocodificado: any;

  validationMessages = {
    profileNames1: [
      { type: 'required', message: 'Por favor ingrese el Alias' },
    ],
    profileDocument1: [
      { type: 'required', message: 'Por favor ingresa la entidad bancaria' },
    ],
    profileTown1: [
      { type: 'required', message: 'Por favor ingrese el monto a transferir' },
    ],
  };
  ValidationFormUSer: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner,
    public alertController: AlertController,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ValidationFormUSer = this.formbuilder.group({
      profileNames1: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      profileDocument1: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      profileTown1: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  CodificarTexto() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.val2)
      .then(
        (encodedData) => {
          this.datocodificado = encodedData;
        },
        (err) => {
          console.log('Un error ha ocurrido: ' + err);
          this.error();
        }
      );
  }

  dismissModal() {
    this.vdata = 0;
    this.modalCtrl.dismiss({
      vdata: 0,
    });
  }

  async error() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ERROR',
      message: 'Al crear el codigo QR',
      buttons: ['OK'],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
}
