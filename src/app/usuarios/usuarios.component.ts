import { Component, OnInit } from '@angular/core';

import { WebserviceService } from '../servicios/webservice.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonRenderComponent } from '../button-render.component';
import { ImageRenderComponent } from '../image-render.component';
import { ModalModule } from "ng2-modal";

import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface login {
  nombre: string;
  apellido: string;
  email: string;
  dni: number;
  cuenta: string;
  rol: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {
  settings: {};
  data: any;
  formABMUsuarios: FormGroup;
  myOptions = [];
  nombre: string;
  apellido: string;
  email: string;
  dni: number;
  cuenta: string;
  rol: string;
  user: login;
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
  disa:number;
  constructor(private WebserviceService: WebserviceService, private ModalModule: ModalModule, private router: Router, public formBuilder: FormBuilder) {
    var tk = localStorage.getItem('Token')
    this.rolLogueado = localStorage.getItem('Rol')
    if (tk == null) {
      alert('Por favor, para continuar logueese');
      this.router.navigate(['Login']);
    } else {
      var array = [{ "token": tk }];
      this.WebserviceService.VerificarToken(array).then(data => {
        if (data) {
          console.info('TokenActivo')
        } else {
          alert('Por favor, para continuar logueese');
          this.router.navigate(['Login']);
          console.info('TokenVencido')
        }
      })
    }
    //this.rol = '4';
    this.formUser = formBuilder.group({
      //VALIDACIONES      
      nombre: [this.nombre, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')])],
      apellido: [this.apellido, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      email: [this.email, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      rol: [this.rol, Validators.compose([Validators.required])],
      dni: [this.dni, Validators.compose([Validators.required])/*, Validators.minLength(8),Validators.pattern('^(([1-9]*)|(([1-9]*)\.([0-9]*)))$')*/],
      cuenta: [this.cuenta, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(5), Validators.pattern('^[a-zA-Z]+$')])],
      ciudad: [this.ciudad, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      localidad: [this.localidad, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      calle: [this.calle, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      numero: [this.numero, Validators.compose([Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      piso: [this.piso, Validators.compose([Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      dpto: [this.dpto, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z]$')])],
      tel: [this.tel, Validators.compose([Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      entrecalles: [this.entrecalles, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
    });
  }

  ngOnInit() {

    switch (this.rolLogueado) {
      case "1":
        this.myOptions = [{ value: '1', label: 'Administrador' }, { value: '2', label: 'Encargado' }, { value: '3', label: 'Empleado' }, { value: '4', label: 'Cliente' },];
        break;
      case "2":
        this.myOptions = [{ value: '3', label: 'Empleado' }, { value: '4', label: 'Cliente' },];
        break;

    }
    this.formABMUsuarios = new FormGroup({});
    this.formABMUsuarios.addControl('mySelect', new FormControl(['b', 'c']));
    this.WebserviceService.TraerPersonas()
      .then(data => {
        console.info(data)
        this.data = data;

        this.settings = {
          delete: {
            confirmDelete: true,
          },
          add: {
            confirmCreate: true,
          },
          edit: {
            confirmSave: true,
          },
          actions: {
            add: false,
            edit: false,
            //custom: [{ name: 'routeToAPage', title: `<img src="/icon.png">` }],
            delete: false,
          },
          Acciones: //or something
          {
            title: 'Detail',
            type: 'html',
            valuePrepareFunction: (cell, row) => {
              return `<a title="See Detail Product "href="Your api key or something/${row.Id}"> <i class="ion-edit"></i></a>`
            },
            filter: false
          },
          columns: {
            idusuario: {
              title: 'ID',
              editable: false,
              class: 'none',
              sortDirection: 'asc',
              notShownField: false,
            },
            nombre: {
              title: 'Nombre'
            },
            apellido: {
              title: 'Apellido'
            },
            mail: {
              title: 'Email'
            },
            dni: {
              title: 'Dni'
            },
            cuenta: {
              title: 'Cuenta',
              editable: false,
              link: '<a href="http://www.google.com">Google</a>'
            },
            roles: {
              title: 'Rol',
              editor: {
                type: 'list',
                config: {
                  list: [{ value: '1', title: 'Administrador' }, { value: '2', title: 'Vendedor' }, {
                    value: '3',
                    title: 'Comprador',
                  }],
                },
              },
            },
            /* dp: {
               title: 'Display Picture',
               filter: false,
               type: 'custom',
               renderComponent: ImageRenderComponent
               //valuePrepareFunction: (dp) => { return `<img scr="dp" />`; }
             },*/
            button: {
              title: 'Button',
              filter: false,
              type: 'custom',
              renderComponent: ButtonRenderComponent,
              //valueprepareFunction: (button) => { return `<button (click)="alert(sa)">Click me</button>`; }
            }, /*
            colu:{
            title: 'Region', type: 'html', filter: false, valuePrepareFunction: (col,row) => { return '<a  (click)="editando()" class="btn btn-primary btn-xs">Editar</a>'; }
            }*/
          }
        };
      })
      .catch(error => {
        console.log(error);
      });
  }

  editar(e) {
    console.info(e)
  }
  delete(e) {

    if (window.confirm('¿Esta seguro que desea eliminar?')) {
      e.confirm.resolve();
      var array = { id: e.data.idusuario }
      this.WebserviceService.Eliminar(e.data.idusuario, '/persona/eliminar')
        .then(data => {
          if (data)
            console.info('borrado correctamente')
        })
        .catch(error => {
          console.log(error);
        });


    } else {
      e.confirm.reject();
    }
  }
  crear2(e) {
    var array = [{
      "nombre": e.data.nombre, "apellido": e.data.apellido, "email": e.data.email, "password": e.data.password,
      "rol": e.data.idrol, "dni": e.data.dni, "cuenta": e.data.cuenta
    }];
    console.warn(e)
  }
  modificar(x) {
    this.disa=0;
    this.nombre = x.nombre;
    this.apellido = x.apellido;
    this.email = x.mail;
    this.rol = ""+x.idrol+"";
    this.dni = x.dni;
    this.cuenta = x.cuenta;
    this.ciudad = x.ciudad;
    this.localidad = x.localidad;
    this.calle = x.calle;
    this.numero = x.numero;
    this.piso = x.piso;
    this.dpto = x.dpto;
    this.tel = x.tel;
    this.entrecalles = x.entrecalles;
  }
  alta(x) {
    this.disa=1;
    this.nombre ='';
    this.apellido ='';
    this.email ='';
    this.rol ='4';
    this.dni =null;
    this.cuenta ='';
    this.ciudad ='';
    this.localidad ='';
    this.calle ='';
    this.numero =null;
    this.piso ='';
    this.dpto ='';
    this.tel ='';
    this.entrecalles ='';
  }
  crear(x) {
    var array = [{
      "nombre": this.nombre, "apellido": this.apellido, "email": this.email, "rol": this.rol, "dni": this.dni, "cuenta": this.cuenta,
      "ciudad": this.ciudad, "localidad": this.localidad, "calle": this.calle, "numero": this.numero, "piso": this.piso, "dpto": this.dpto,
      "tel": this.tel, "entrecalles": this.entrecalles,
    }];
    console.info(x);
    this.WebserviceService.AgregarPersona(array).then(data => {
      if (data.ok) {

        window.location.reload();
      } else {
        alert('error')
      }
    }).catch(error => {
      console.warn(error)
    })
    console.info()
  }
  editando() {
    console.warn('entramo');
  }
  modificando() {
    console.warn('CLICK');
  }

}
