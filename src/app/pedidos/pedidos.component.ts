import { Component, OnInit } from '@angular/core';
import { WebserviceService } from '../servicios/webservice.service';
import * as jsPDF from 'jspdf'
declare let alasql;
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  lista: any;
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
      console.info(data)
      this.lista = data;
      setTimeout(() => {
        this.loading = false;
      }, 1000);

    })
  }

  cambiarestado(x, estado) {
    console.info(x.idpedido)
    var array = [{
      "idpedido": x.idpedido, "estado": estado
    }];
    this.WebserviceService.CambiarEstadoPedido(array).then(data => {
      this.listado();

    })
  }
  download() {

    var doc = new jsPDF();
    var pdf = new jsPDF('p', 'pt', 'letter');
    /*doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');
    https://stackoverflow.com/questions/23035858/export-html-table-to-pdf-using-jspdf
    */
    /*  var source = $('#tablepdf')[0];
      document.getElementById("table")[0];
  */

    var source = window.document.getElementsByTagName("table")[0];
    var margins = {
      top: 80,
      bottom: 60,
      left: 40,
      width: 522
    };


    var elementHandler = {
      '#ignorePDF': function (element, renderer) {
        return true;
      }
    };
    pdf.fromHTML(
      source, // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top, {// y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': elementHandler
      },
      function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF 
        //          this allow the insertion of new lines after html
        pdf.save('Test.pdf');
      }
      , margins);
    /* var source = window.document.getElementsByTagName("table")[0];
  
    doc.fromHTML(
       source,
       10,
       10,
       {
         'width': 600, 'elementHandlers': elementHandler
       });
     //doc.autoPrint()
     // Save the PDF
     doc.save('Test.pdf');*/
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
