import { Component, OnInit } from '@angular/core';
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
  constructor(private WebserviceService: WebserviceService, public formBuilder: FormBuilder, private router: Router) {
    this.formLogin = formBuilder.group({
      //VALIDACIONES
      cuenta: [this.cuenta, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')])],
      password: [this.password, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(5)])]
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
          alert('Por favor, para continuar logueese');
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
          var array = [{
            "nombre": data[0].nombre, "apellido": data[0].apellido, "cuenta": data[0].cuenta, "mail": data[0].mail, "dni": data[0].dni,
            "idrol": data[0].idrol, "idusuario": data[0].idusuario
          }];
          this.WebserviceService.CrearToken(array).then(data => {

            localStorage.setItem('Token', data);
            window.location.reload();
            this.router.navigate(['Productos']);
            //this.router.navigate(['Productos']);
            //set localStorage.setItem('Token', data);      
            //get console.info(localStorage.getItem('Token'));
            //remove localStorage.removeItem('Token');
          })
        } else {
          console.info('datos invalidos')
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
}
