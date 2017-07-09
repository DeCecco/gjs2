import { Component, OnInit} from '@angular/core';

import { WebserviceService } from '../servicios/webservice.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonRenderComponent } from '../button-render.component';
import { ImageRenderComponent } from '../image-render.component';
import {ModalModule} from "ng2-modal";



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  settings: {};
  data: any;
  constructor(private WebserviceService: WebserviceService,private ModalModule:ModalModule) {
    
  }

  ngOnInit() {
    this.WebserviceService.TraerPersonas()
      .then(data => {

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
  crear(e) {
    var array = [{
      "nombre": e.data.nombre, "apellido": e.data.apellido, "email": e.data.email, "password": e.data.password,
      "rol": e.data.idrol, "dni": e.data.dni, "cuenta": e.data.cuenta
    }];
    console.warn(e)
  }
  editando() {
    console.warn('entramo');
  }
  modificando() {
    console.warn('CLICK');
  }

}
