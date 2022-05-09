import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import {
  AlertController,
  NavController,
  LoadingController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  validationMessages = {
    names: [{ type: 'required', message: 'Escribe tu nombre completo' }],
    document: [{ type: 'required', message: 'el numero de documento es requerido' }],
    phone: [{ type: 'required', message: 'Escribe tu numero de celular.' }],
    email: [
      { type: 'required', message: 'Escribe tu correo electronico' },
      {
        type: 'pattern',
        meesage: 'El correo es incorrecto, intenta de nuevo',
      },
    ],
    password: [
      { type: 'required', message: 'Escribe la contraña' },
      { type: 'minlength', message: 'contraña debe tener mas de 6 caracteres' },
    ],
  };

  ValidationFormUSer: FormGroup;

  loading: any;
  email: string;
  phone: string;
  names: string;
  emaile: string;
  document: string;
  cuentaA: any;
  cuentaC: any;

  constructor(
    public formbuider: FormBuilder,
    public authservice: AuthService,
    private router: Router,
    private navCtr: NavController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formbuilder: FormBuilder,
    private db1: AngularFireDatabase
  ) {
    localStorage.clear();
    this.loading = this.loadingCtrl;
  }

  ngOnInit() {
    this.ValidationFormUSer = this.formbuilder.group({
      names: new FormControl('', Validators.compose([Validators.required])),

      document: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),

      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),

      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }

  registerUser(value) {
    this.showalert();
    this.cuentaAhorro();
    this.cuentaCorriente();
    console.log(localStorage);
    try {
      this.authservice.userRegistration(value).then(
        (response) => {
          console.log(response);
          if (response.user) {
            localStorage.setItem('document', this.document);
            localStorage.setItem('phone', this.phone);
            localStorage.setItem('cuentaa', this.cuentaA);
            localStorage.setItem('cuentac', this.cuentaC);
            response.user.updateProfile({
              displayName: value.names,
              email: value.email,
              phone: value.phone,
              document: value.document,
            });
            this.loading.dismiss();
            this.router.navigate(['login']);
          }
        },
        (error) => {
          this.loading.dismiss();
          this.errorLoading(error.message);
        }
      );
    } catch (erro) {
      console.log(erro);
    }
  }

  async errorLoading(message: any) {
    const loading = await this.alertCtrl.create({
      header: 'Error Registering',
      message: message,
      buttons: [
        {
          text: 'ok',
          handler: () => {
            this.navCtr.navigateBack(['signup']);
          },
        },
      ],
    });
    await loading.present();
  }

  cuentaAhorro() {
    this.cuentaA = 944 + '-' + Math.floor(Math.random() * 100000000 + 1);
    console.log(this.cuentaA);
  }

  cuentaCorriente() {
    this.cuentaC = 544 + '-' + Math.floor(Math.random() * 100000000 + 1);
    console.log(this.cuentaC);
  }

  async showalert() {
    var load = await this.loadingCtrl.create({
      message: 'Por favor espere...',
    });
    load.present();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  registro() {
    this.router.navigate(['/register']);
  }

  inicio() {
    this.router.navigate(['/login']);
  }

  save() {
 
    this.db1.database
      .ref('datos/' + this.emaile)
      .set({
        email: this.email,
        phone: this.phone,
        names: this.names,
        document: this.document,
      })
      .then(() => {
        this.email = '';
      })

      .catch((e) => {
        console.log(e);
      });
  }



  Login(){
    this.router.navigate(['/home']);
  }

}
