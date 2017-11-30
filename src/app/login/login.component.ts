import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebserviceService } from '../servicios/webservice.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cuenta = 'pdececco';
  password = '72256';
  datosTraidos;
  formLogin: FormGroup;
  nombre: string;
  apellido: string;
  email: string;
  dni: number;
  rol: string;
  rolLogueado: any;
  formUser: FormGroup;
  ciudad: string;
  localidad: string;
  calle: string;
  numero: number;
  piso: string;
  dpto: string;
  tel: string;
  entrecalles: string;
  myOptions = [];
  mensajeError: boolean;
  rand: string;
  rand2: number;
  rand3: number;
  captchaN :number;

  @Input() vieneNombre: string;
  constructor(private WebserviceService: WebserviceService, public formBuilder: FormBuilder, private router: Router) {
    this.myOptions = [{ value: '4', label: 'Cliente' },];
    /*this.ciudad=' ';
    this.localidad=' ';
    this.calle=' ';
    this.numero;
    this.piso='0';
    this.dpto=' ';
    this.tel='0';*/
    this.rol = '4';
    // this.entrecalles=' ';
    this.mensajeError = false;
    this.formLogin = formBuilder.group({
      //VALIDACIONES
      cuenta: [this.cuenta, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')])],
      password: [this.password, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(5)])]
    });
    this.formUser = formBuilder.group({
      //VALIDACIONES      
      nombre: [this.nombre, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')])],
      apellido: [this.apellido, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      email: [this.email, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      rol: [this.rol],
      dni: [this.dni, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      cuenta: [this.cuenta, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(5), Validators.pattern('^[a-zA-Z]+$')])],
      ciudad: [this.ciudad, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      localidad: [this.localidad, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      calle: [this.calle, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      numero: [this.numero, Validators.compose([Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      piso: [this.piso, Validators.compose([Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      dpto: [this.dpto, Validators.compose([Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      tel: [this.tel, Validators.compose([Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      entrecalles: [this.entrecalles, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      captchaN: [this.captchaN, Validators.compose([Validators.required])],
    });
    var tk = localStorage.getItem('Token')
    if (tk == null) {
      alert('Por favor, para continuar logueese');
      this.router.navigate(['Login']);
    } else {
      var array = [{ "token": tk }];
      this.WebserviceService.VerificarToken(array).then(data => {
        if (data) {
          // this.router.navigate(['Productos']);
        } else {
          // alert('Por favor, para continuar logueese');
          this.router.navigate(['Login']);
          console.info('TokenVencido')
        }
      })
    }
  }

  ngOnInit() {
  }
  ingreso(x) {
    switch (x) {
      case 1:
        this.cuenta = 'pdececco';
        this.password = '72256';
        break;
      case 2:
        this.cuenta = 'Encargado';
        this.password = '123456';
        break;
      case 3:
        this.cuenta = 'empleado';
        this.password = '123456';
        break;
      case 4:
        this.cuenta = 'Cliente';
        this.password = '123456';
        break;
    }

    this.Login();
  }
  Login() {
    var array = [{ "cuenta": this.cuenta, "password": this.password }];
    if (this.formLogin.valid) {

      this.WebserviceService.Login(array).then(data => {
        if (data.length > 0) {
          var rol = data[0].idrol;
          localStorage.setItem('idusuario', data[0].idusuario);
          var array = [{
            'nombre': data[0].nombre, 'apellido': data[0].apellido, 'cuenta': data[0].cuenta, 'mail': data[0].mail, 'dni': data[0].dni,
            'idrol': data[0].idrol, 'idusuario': data[0].idusuario
          }];
          var array2 = [{
            'idusuario': data[0].idusuario
          }];
          this.WebserviceService.Logs(array2).then(data => {
          })
          this.WebserviceService.CrearToken(array).then(data => {

            localStorage.setItem('Token', data);
            localStorage.setItem('Rol', rol);

            location.reload();
            this.router.navigate(['Productos']);
            // this.router.navigate(['Productos']);
            // set localStorage.setItem('Token', data);
            // get console.info(localStorage.getItem('Token'));
            // remove localStorage.removeItem('Token');
          })
        } else {
          alert('Usuario inexistente')
        }

      })
    } else {
      console.warn('invalido')
    }
  }
  VerificarToken() {

    var tk = localStorage.getItem('Token')
    var array = [{ "token": tk }];
    this.WebserviceService.VerificarToken(array).then(data => {
      if (data) {
        console.info('TokenActivo')
      } else {
        console.info('TokenVencido')
      }
    })
  }
  PayLoad() {

    var tk = localStorage.getItem('Token')
    var array = [{ "token": tk }];
    this.WebserviceService.PayLoad(array).then(data => {
      console.info(data)
    })
  }
  registroN() {
    this.ciudad = '';
    this.localidad = '';
    this.calle = '';
    this.numero = null;
    this.piso = '';
    this.dpto = '';
    this.tel = '';
    this.cuenta = '';
    this.entrecalles = '';
    this.captcha();
  }
  crear(x) {
    // tslint:disable-next-line:curly
    if (this.numero === null)
      this.numero = 0;
    // tslint:disable-next-line:curly
    if (this.ciudad === null)
      this.ciudad = ' ';
    if (this.localidad === null)
      this.localidad = ' ';
    if (this.calle === null)
      this.calle = ' ';
    if (this.piso === null)
      this.piso = ' ';
    if (this.dpto === null)
      this.dpto = ' ';
    if (this.tel === null)
      this.tel = ' ';
    if (this.entrecalles === null)
      this.entrecalles = ' ';
    var array = [{
      "nombre": this.nombre, "apellido": this.apellido, "email": this.email, "rol": this.rol, "dni": this.dni, "cuenta": this.cuenta,
      "ciudad": this.ciudad, "localidad": this.localidad, "calle": this.calle, 'numero': this.numero, 'piso': this.piso, 'dpto': this.dpto,
      'tel': this.tel, 'entrecalles': this.entrecalles
    }];
    
    if(this.rand2+this.rand3==this.captchaN){

      this.WebserviceService.AgregarPersona(array).then(data => {
    
        if (data.ok) {
          this.cuenta;
          this.password = '123456'
          this.Login();
          //window.location.reload();
        } else {
          alert('error')
        }
      }).catch(error => {
        alert('Error al grabar datos. Comuniquese con Soporte')
        console.warn(error)
      })
    }else{
      alert('El captcha ingresado es invalido');
    }
  }
  validar(que) {
    // tslint:disable-next-line:curly
    if (this.formUser.controls[que].valid === false) {
      this.mensajeError = true;
      document.getElementById('error' + que).style.display = 'block';
    } else {
      this.mensajeError = false;
      document.getElementById('error' + que).style.display = 'none';
    }
  }
  captcha() {
    this.rand2 = Math.floor((Math.random() * 100) + 1);
    let rand = { 1: 'UNO', 2: 'DOS', 3: 'TRES', 4: 'CUATRO', 5: 'CINCO', 6: 'SEIS', 7: 'SIETE', 8: 'OCHO', 9: 'NUEVE', 10: 'DIEZ' };
    this.rand = rand[Math.floor(Math.random() * 10)];
    switch (this.rand) {
      case 'UNO':
        this.rand3 = 1;
        break;
      case 'DOS':
        this.rand3 = 2;
      break;
      case 'TRES':
        this.rand3 = 3;
      break;
      case 'CUATRO':
        this.rand3 = 4;
      break;
      case 'CINCO':
        this.rand3 = 5;
      break;
      case 'SEIS':
        this.rand3 = 6;
      break;
      case 'SIETE':
        this.rand3 = 7;
      break;
      case 'OCHO':
        this.rand3 = 8;
      break;
      case 'NUEVE':
        this.rand3 = 9;
      break;
      case 'DIEZ':
        this.rand3 = 10;
      break;
    }
  }

}
