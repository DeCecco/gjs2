import { Component, OnInit } from '@angular/core';
import { WebserviceService } from '../servicios/webservice.service';
//import * as jsPDF from 'jspdf'
import * as $ from 'jquery';
declare var jsPDF: any;
declare let alasql;


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  lista: any;
  listaPDF: any;
  rol: any;
  public loading = false;
  constructor(private WebserviceService: WebserviceService) {
    this.loading = true;
  }

  ngOnInit() {
    this.listado();
  }

  listado() {
    this.rol = localStorage.getItem('Rol');
    var array = [{
      "idusuario": localStorage.getItem('idusuario'), "idrol": localStorage.getItem('Rol')
    }];
    this.WebserviceService.ListadoPedidos(array).then(data => {
      this.lista = data;
      setTimeout(() => {
        this.loading = false;
      }, 1000);

    })
    this.WebserviceService.ListadoSoloPedidos(array).then(data => {
      this.listaPDF = data;
    })
  }

  cambiarestado(x, estado) {
    var array = [{
      "idpedido": x.idpedido, "estado": estado
    }];
    this.WebserviceService.CambiarEstadoPedido(array).then(data => {
      this.listado();

    })
  }
  download() {
    const columns = ["Nro Pedido", "Cliente", "Vendedor", "Local", "Fecha", "Estado"];
    const array = $.map(this.listaPDF, function (value, index) {
      return [value];
    });
    const doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, array);
    doc.save('Pedidos.pdf');
  }
  excel() {

    var mystyle = {
      sheetid: 'Pedidos',
      headers: true,
      caption: {
        title: 'Pedidos',
        style: 'font-size: 50px; color:blue;' // Sorry, styles do not works
      },
      style: 'background:#f1f7f1',
      column: {
        style: 'font-size:20px'
      },
      columns: [
        { columnid: 'idpedido', title: 'Nro Pedido' },
        { columnid: 'nombrec', title: 'Cliente', color: '#800000' },
        { columnid: 'apellidoc', title: 'Apellido' },
        { columnid: 'descripcionl', title: 'Local' },
        { columnid: 'fecha', title: 'Fecha' },
        { columnid: 'idestado', title: 'Estado' }
      ],
      row: {
        style: function (sheet, row, rowidx) {
          return 'background:' + (rowidx % 2 ? '#ffffff' : '#d5dad5');
        }
      },
      rows: {
        4: { cell: { style: 'background:#d5dad5' } }
      },
    };

    alasql('SELECT * INTO XLS("Pedidos.xls",?) FROM ?', [mystyle, this.lista]);

  }
}
