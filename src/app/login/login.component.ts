import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebserviceService } from '../servicios/webservice.service';
import { RouterModule, Routes, Router } from '@angular/router';

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
  @Input() vieneNombre: string;
  constructor(private WebserviceService: WebserviceService, public formBuilder: FormBuilder, private router: Router) {
    this.myOptions = [{ value: '4', label: 'Cliente' },];
    this.ciudad=' ';
    this.localidad=' ';
    this.calle=' ';
    this.numero=0;
    this.piso='0';
    this.dpto=' ';
    this.tel='0';
    this.entrecalles=' ';
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
      dni: [this.dni, Validators.compose([Validators.maxLength(10), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      cuenta: [this.cuenta, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(5), Validators.pattern('^[a-zA-Z]+$')])],
      ciudad: [this.ciudad, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      localidad: [this.localidad, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      calle: [this.calle, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      numero: [this.numero, Validators.compose([Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      piso: [this.piso, Validators.compose([Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      dpto: [this.dpto, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]$')])],
      tel: [this.tel, Validators.compose([Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      entrecalles: [this.entrecalles, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
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

            // location.reload();
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
  crear(x) {    
    var array = [{
      "nombre": this.nombre, "apellido": this.apellido, "email": this.email, "rol": this.rol, "dni": this.dni, "cuenta": this.cuenta,
      "ciudad": this.ciudad, "localidad": this.localidad, "calle": this.calle, 'numero': this.numero, 'piso': this.piso, 'dpto': this.dpto,
      'tel': this.tel, 'entrecalles': this.entrecalles
    }];

      this.WebserviceService.AgregarPersona(array).then(data => {
        
        if (data.ok) {
          this.cuenta;
          this.password='123456'
          this.Login();
          //window.location.reload();
        } else {
          alert('error')
        }
      }).catch(error => {
        console.warn(error)
      })

  }
}
