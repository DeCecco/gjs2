import { Component, OnInit } from '@angular/core';
import { WebserviceService } from '../servicios/webservice.service';
import * as jsPDF from 'jspdf'
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  lista: any;
  rol:any;
  constructor(private WebserviceService: WebserviceService) { }

  ngOnInit() {
    this.listado();
  }

  listado() {
    this.rol=localStorage.getItem('Rol');
    var array = [{
      "idusuario": localStorage.getItem('idusuario'), "idrol":localStorage.getItem('Rol')
    }];
    this.WebserviceService.ListadoPedidos(array).then(data => {
      console.info(data)
      this.lista = data;

    })
  }

  cambiarestado(x,estado){
    console.info(x.idpedido)
    var array = [{
      "idpedido": x.idpedido, "estado":estado
    }];
    this.WebserviceService.CambiarEstadoPedido(array).then(data => {      
      this.listado();

    })
  }
  download() {
    
        var doc = new jsPDF();
        doc.text(20, 20, 'Hello world!');
        doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
        doc.addPage();
        doc.text(20, 20, 'Do you like that?');

        // Save the PDF
        doc.save('Test.pdf');
    }  

}
