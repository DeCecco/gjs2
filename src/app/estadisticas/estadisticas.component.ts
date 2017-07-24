import { Component, OnInit } from '@angular/core';

import { WebserviceService } from '../servicios/webservice.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  listado: any;
  constructor(private WebserviceService: WebserviceService) { }

  ngOnInit() {
    this.VentasPorLocal();

  }
  VentasPorLocal() {
    this.WebserviceService.VentasPorLocal().then(data => {
      this.listado = data;
      var ultimo=this.listado.length      
      var xr = [];
      var myObj = {
        data: [],
        label: 'Ventas Por Local'
      };
      this.listado.forEach(element => {

        myObj.data.push(element.total);
        if (element.idlocal ==ultimo) {

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
  circulo() {
    this.barChartType = 'doughnut';
  }
  barras() {
    this.barChartType = 'bar';
  }
  lineas() {
    this.barChartType = 'line';
  }
  radar() {
    this.barChartType = 'radar';
  }
  polarArea() {
    this.barChartType = 'polarArea';
  }
  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}