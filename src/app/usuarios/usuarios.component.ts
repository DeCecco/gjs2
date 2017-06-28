import { Component, OnInit } from '@angular/core';

import { WebserviceService } from '../servicios/webservice.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  settings: {};
  data: any;
  constructor(private WebserviceService: WebserviceService) {

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
          actions: {/*
            add: false,
            edit: false,
            delete:false*/
          },
          columns: {
            idusuario: {
              title: 'ID',
              editable: false,
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
              editable: false
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
      var array={id:e.data.idusuario}
      this.WebserviceService.Eliminar(e.data.idusuario,'/persona/eliminar')
      .then(data => {
        if(data)
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
}
