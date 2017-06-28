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
  data: {};
  constructor(private WebserviceService: WebserviceService) {

  }

  ngOnInit() {
    this.WebserviceService.TraerPersonas()
      .then(data => {
        this.data = data;
        this.settings = {
          columns: {
            idusuario: {
              title: 'ID',
              hideSubHeader:true
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

}
