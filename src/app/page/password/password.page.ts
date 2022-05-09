import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup,FormBuilder,Validators,FormControl,} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {AlertController,NavController,LoadingController,} from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  validationMessages = {
    email: [
      { type: 'required', message: 'Por favor ingresa tu correo' },
      {
        type: 'pattern',
        meesage: 'El correo ingresado es incorrecto, intenta de nuevo',
      },
    ],
  };

  ValidationFormUSer: FormGroup;

  loading: any;
  public email: string;

  constructor(
    public formbuider: FormBuilder,
    public authservice: AuthService,
    private router: Router,
    private navCtr: NavController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formbuilder: FormBuilder,
    public alertController: AlertController
  ) {
    this.loading = this.loadingCtrl;
  }


  ngOnInit() {
    this.ValidationFormUSer = this.formbuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Restablecimiento de contraseña',
      message:
        'Se ha enviado un enlace a tu correo, recuerda revisar la bandeja de correos no deseado',
      buttons: ['Ok'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.router.navigate(['/login']);
    console.log('onDidDismiss resolved with role', role);
  }
  async presentAlert1() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Restablecimiento de contraseña',
      message: 'El correo ingresado es incorrecto, intenta de nuevo',
      buttons: ['Ok'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('Error', role);
  }

  registerUser(value) {
    this.authservice
      .ResetPassword(value)
      .then(() => {
        this.presentAlert();
      })
      .catch(() => {
        this.presentAlert1();
      });
  }

  async errorLoading(message: any) {
    const loading = await this.alertCtrl.create({
      header: 'Error registrando',
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtr.navigateBack(['signup']);
          },
        },
      ],
    });
    await loading.present();
  }

  async showalert() {
    var load = await this.loadingCtrl.create({
      message: 'Por favor espere',
    });
    load.present();
  }

  inicio() {
    this.router.navigate(['/login']);
  }

  Login(){
    this.router.navigate(['/login']);
  }

}
