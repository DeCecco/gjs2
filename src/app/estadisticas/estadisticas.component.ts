import { Component, OnInit } from '@angular/core';

import { WebserviceService } from '../servicios/webservice.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  listado: any;
  informes = [];
  informe: any;
  tipos = [];
  tipo: any;
  constructor(private WebserviceService: WebserviceService) {
    this.informes = [
      { value: '1', label: 'Ventas Por Local' },
      { value: '2', label: 'Ventas Por Local y Empleado' },
      { value: '3', label: 'Clientes y Sus Compras' },
      { value: '4', label: 'Importes por dia de trabajo' },
      { value: '5', label: 'Producto mas Vendido' },
      { value: '6', label: 'Logueos' },
      { value: '7', label: 'Encuestas' }
    ];
    this.tipos = [
      { value: '1', label: 'Circulo' },
      { value: '2', label: 'Barras' },
      { value: '3', label: 'Lineas' },
      { value: '4', label: 'Radar' },
      { value: '5', label: 'PolarArea' }
    ];
    this.informe = "1";
    this.tipo = "1";
  }
  ngOnInit() {
    //this.VentasPorLocal();

  }
  VentasPorLocal() {
    this.WebserviceService.VentasPorLocal().then(data => {
      this.listado = data;
      var ultimo = this.listado.length
      var xr = [];
      var myObj = {
        data: [],
        label: 'Ventas Por Local'
      };
      this.listado.forEach(element => {

        myObj.data.push(element.total);
        if (element.idlocal == ultimo) {

          xr.push(myObj)
        }
      });
      this.barChartData = xr

    })
  }
  //public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartLabels: string[] = ['Local 1', 'Local 2', 'Local 3'];
  public barChartType: string = 'doughnut';
  public barChartLegend: boolean = true;
  /*public chartColors: any[] = [{
    backgroundColor:'rgba(255,10,24,0.2)'},
                    {'rgba(255,10,24,0.2)',
                    'rgba(255,10,24,0.2)',
                    'rgba(255,10,24,0.2)',
                    'rgba(255,10,24,0.2)',
  }];*/
  public barChartData: any[] = [
    { data: [65, 59, 80], label: 'Ventas por Local' },
    //{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  informechange() {
    switch (this.informe) {
      case "1":
        this.VentasPorLocal();
        break;
      case "2":

        break;
      case "3":
        this.ClientesYSusCompras();
        break;
      case "4":

        break;
      case "5":
      this.MayorProductoVendido();
        break;
      case "6":
        break;
      case "7":
        break;
    }
  }
  MayorProductoVendido() {
    this.barChartLabels=[];
    this.WebserviceService.MayorProductoVendido().then(data => {
      
      this.listado = data;
      var ultimo = this.listado.length
      var xr = [];
      var myObj = {
        data: [],
        datasets:[{
        backgroundColor:['rgba(255,99,132,0.2)',
                        'rgba(255,99,132,0.2)',
                        'rgba(255,99,132,0.2)',
                        'rgba(255,99,132,0.2)',
                        'rgba(255,99,132,0.2)',
        ],
        }],
        label: 'Mayor Producto Vendido'
      };
      this.listado.forEach(element => {
        
        myObj.data.push(element.cantidadvendidas);   
        this.barChartLabels.push(element.producto)     
        
      });
      xr.push(myObj)
      this.barChartData = xr

    })
  }  
  ClientesYSusCompras() {
    this.barChartLabels=[];
    this.WebserviceService.VentasPorCliente().then(data => {
      
      this.listado = data;
      var ultimo = this.listado.length
      var xr = [];
      var myObj = {
        data: [],        
        label: 'Ventas Por Cliente'
      };
      this.listado.forEach(element => {
        
        myObj.data.push(element.total);   
        this.barChartLabels.push(element.nombre)     
        
      });
      xr.push(myObj)
      this.barChartData = xr

    })
  }
  tipochange() {
    switch (this.tipo) {
      case "1":
        this.barChartType = 'doughnut';
        break;
      case "2":
        this.barChartType = 'bar';
        break;
      case "3":
        this.barChartType = 'line';
        break;
      case "4":
        this.barChartType = 'radar';
        break;
      case "5":
        this.barChartType = 'polarArea';
        break;
    }
  }

}
