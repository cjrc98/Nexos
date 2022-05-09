import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ModalController } from '@ionic/angular';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-crearcuenta',
  templateUrl: './crearcuenta.page.html',
  styleUrls: ['./crearcuenta.page.scss'],
})
export class CrearcuentaPage implements OnInit {

  id: string;
  idu: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  vdata: number = 0;

  validationMessages = {
    profileNames1: [
      { type: 'required', message: 'Por favor ingrese el Alias' },
    ],
    profileDocument1: [
      { type: 'required', message: 'Por favor ingresa la entidad bancaria' },
    ],
    profileTown1: [
      { type: 'required', message: 'Por favor ingrese la moneda' },
    ],
  };
  ValidationFormUSer: FormGroup;
  cuentaC: string;
  cuentaA: string;
  ncuenta: string;
  identificador: number;
  alias: any;
  entbank: any;
  moneda: any;

  constructor(
    private modalCtrl: ModalController,
    private authservice: AuthService,
    private db: AngularFireDatabase,
    private formbuilder: FormBuilder
  ) {
    this.cuentaAhorro();
    this.identificadordecuenta();
  }

  dismissModal() {
    this.vdata = 0;
    this.modalCtrl.dismiss({
      vdata: 0,
    });
  }

  ngOnInit() {
    this.idu = this.authservice.getUID();
    console.log(this.idu);

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

  cuentaAhorro() {
    this.cuentaA = 944 + '-' + Math.floor(Math.random() * 100000000 + 1);
    this.ncuenta = this.cuentaA;
  }

  identificadordecuenta() {
    this.identificador = Math.floor(Math.random() * 1000000000000 + 1);
    console.log(this.cuentaC);
  }

  


  uid() {
    this.authservice.uid = this.authservice.getUID();
  }

  save() {
    this.db.database
        .ref('datos/')
        .child('user')
        .child(this.idu)
        .child('cuentaAhorro')
        .child(this.ncuenta)
        .update({
          cuenta: this.ncuenta,
          saldo: 0,
          Alias: this.alias,
          entidadBancaria: this.entbank,
          moneda: this.moneda,
        });

    this.dismissModal();
  }
}
