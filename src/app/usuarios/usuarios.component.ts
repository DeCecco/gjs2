import { Component, OnInit } from '@angular/core';

import { WebserviceService } from '../servicios/webservice.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonRenderComponent } from '../button-render.component';
import { ImageRenderComponent } from '../image-render.component';
import { ModalModule } from 'ng2-modal';

import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
declare let alasql;
// tslint:disable-next-line:class-name
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
  mensajeError: boolean;
  calle: string;
  numero: number;
  piso: string;
  dpto: string;
  tel: string;
  entrecalles: string;
  idusuario: string;
  disa: number;
  public loading = false;
  // tslint:disable-next-line:typedef-whitespace
  dato1 : string;
  dato2 : string;
  listadomapa:string;
  constructor(private WebserviceService: WebserviceService, private ModalModule: ModalModule, private router: Router, public formBuilder: FormBuilder) {
    var tk = localStorage.getItem('Token')
    this.mensajeError = false;
    this.loading = true;
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
      // VALIDACIONES
      nombre: [this.nombre, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')])],
      apellido: [this.apellido, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      email: [this.email, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
      rol: [this.rol],
      dni: [this.dni, Validators.compose([Validators.required,Validators.maxLength(10), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      cuenta: [this.cuenta, Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(5), Validators.pattern('^[a-zA-Z]+$')])],
      ciudad: [this.ciudad, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      localidad: [this.localidad, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      calle: [this.calle, Validators.compose([Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      numero: [this.numero, Validators.compose([Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      piso: [this.piso, Validators.compose([Validators.maxLength(3), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      dpto: [this.dpto, Validators.compose([Validators.maxLength(3), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
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
      case "3":
        this.myOptions = [{ value: '4', label: 'Cliente' },];
        break;        

    }
    this.cargarListado();
    this.formABMUsuarios = new FormGroup({});
    this.formABMUsuarios.addControl('mySelect', new FormControl(['b', 'c']));
   /* this.WebserviceService.TraerPersonas()
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
             },*
            button: {
              title: 'Button',
              filter: false,
              type: 'custom',
              renderComponent: ButtonRenderComponent,
              //valueprepareFunction: (button) => { return `<button (click)="alert(sa)">Click me</button>`; }
            }, /*
            colu:{
            title: 'Region', type: 'html', filter: false, valuePrepareFunction: (col,row) => { return '<a  (click)="editando()" class="btn btn-primary btn-xs">Editar</a>'; }
            }*
          }
        };
      })
      .catch(error => {
        console.log(error);
      });*/
  }

  cargarListado() {    
      var array = [{ idrol: localStorage.getItem('Rol')    }];
    this.cargarListadoSoloPersonas()
    this.WebserviceService.TraerPersonas(array)
      .then(data => {
      //  console.info(data)
      setTimeout(() => {
        this.loading = false;
      }, 1000);
        this.data=data;
      })
      .catch(error => {
          console.log(error);
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
  }
    cargarListadoSoloPersonas() {    
          
    this.WebserviceService.TraerPersonasSoloClientes()
      .then(data => {
        console.info(data)
        this.listadomapa=data;
      })
      .catch(error => {
          console.log(error);
        });
  }
  onMarkerInit(marker) {
    // console.log('marker', marker);
  }
  // tslint:disable-next-line:member-ordering
  marker = {
    display: true
  };
  hideMarkerInfo() {
    this.marker.display = !this.marker.display;
  }
  clicked({target: marker},datos) {
    this.dato1 = datos.nomap;
    this.dato2 = datos.enmapa;
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }
  /*
  verificacion(x){
    var rol = localStorage.getItem('Rol');
    if(rol=="1"){

    }else
    switch(rol){
      case "1":
        
      break;
      case "2":

      break;
      case "3":
      break;
      case "4":
      break;

    }
  }*/

  excel(){
    
        var mystyle = {
        sheetid: 'Usuarios',
        headers: true,
        caption: {
          title:'Usuarios',
          style:'font-size: 50px; color:blue;' // Sorry, styles do not works
        },
        style:'background:#f1f7f1',
        column: {
          style:'font-size:20px'
        },
        columns: [
            {columnid:'nombre',title:'Nombre'},
            {columnid:'apellido',title:'Apellido',color:'#800000'},          
            {columnid:'mail',title:'Mail'},
            {columnid:'roles',title:'Rol'},
            {columnid:'dni',title:'DNI'},
            {columnid:'tel',title:'Telefono'},
            {columnid:'estado',title:'Estado'} 
        ],
        row: {
          style: function(sheet,row,rowidx){
            return 'background:'+(rowidx%2?'#ffffff':'#d5dad5');            
          }
        },
        rows: {
          4:{cell:{style:'background:#d5dad5'}}
        },       
    };
 
        alasql('SELECT * INTO XLS("Usuarios.xls",?) FROM ?',[mystyle,this.data]);
   
}
  delete(e) {

    if (window.confirm('¿Esta seguro que desea eliminar?')) {
      //e.confirm.resolve();
      var array = { id: e.idusuario }
      this.WebserviceService.Eliminar(e.idusuario, '/persona/eliminar')
        .then(data => {
          if (data)
            this.cargarListado();
            console.info('borrado correctamente')
        })
        .catch(error => {
          console.log(error);
        });


    } else {
      e.confirm.reject();
    }
  }

  modificar(x) {
    this.disa = 0;
    this.nombre = x.nombre;
    this.apellido = x.apellido;
    this.email = x.mail;
    this.rol = "" + x.idrol + "";
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
    this.idusuario = x.idusuario;
  }
  alta(x) {
    this.disa = 1;
    this.nombre = '';
    this.apellido = '';
    this.email = '';
    this.rol = '4';
    this.dni = null;
    this.cuenta = '';
    this.ciudad = '';
    this.localidad = '';
    this.calle = '';
    this.numero = null;
    this.piso = '';
    this.dpto = '';
    this.tel = '';
    this.entrecalles = '';
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
      "ciudad": this.ciudad, "localidad": this.localidad, "calle": this.calle, "numero": this.numero, "piso": this.piso, "dpto": this.dpto,
      "tel": this.tel, "entrecalles": this.entrecalles, "idusuario": this.idusuario
    }];
    
    if (x == 1) {
      this.WebserviceService.AgregarPersona(array).then(data => {
        console.info(data)
        if (data.ok) {
          this.cargarListado();
        window.location.reload();
        } else {
          alert('error')
        }
      }).catch(error => {
        console.warn(error)
      })
      
    } else {
      
      this.WebserviceService.ModificarPersona(array).then(data => {
        if (data.ok) {
        this.cargarListado();
         window.location.reload();
        } else {
          alert('error')
        }
      }).catch(error => {
        console.warn(error)
      })
    }
  }
  editando() {
    console.warn('entramo');
  }
  modificando() {
    console.warn('CLICK');
  }
  changeEstado(x,id){
    console.info(id)
     var array = [{      "estado": x,"idusuario":id    }];
    
    
      this.WebserviceService.ModificarEstadoUsuario(array).then(data => {
        if (data.ok) {
          this.cargarListado();
        window.location.reload();
        } else {
          alert('error')
        }
      }).catch(error => {
        console.warn(error)
      })
  }

  validar(que){
    // tslint:disable-next-line:curly
    if (this.formUser.controls[que].valid === false) {
      this.mensajeError = true;
      document.getElementById('error' + que).style.display = 'block';
    }else {
      this.mensajeError = false;
      document.getElementById('error' + que).style.display = 'none';
    }
  }
}
