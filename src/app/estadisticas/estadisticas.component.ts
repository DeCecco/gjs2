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
  preguntas = [];
  pregunta: any;
  constructor(private WebserviceService: WebserviceService) {
    this.informes = [
      { value: '1', label: 'Ventas Por Local' },
      // { value: '2', label: 'Ventas Por Local y Empleado' },
      { value: '3', label: 'Clientes y Sus Compras' },
      { value: '4', label: 'Importes por dia de trabajo' },
      { value: '5', label: 'Producto mas Vendido' },
      { value: '6', label: 'Logueos' },
      { value: '7', label: 'Encuestas' }
    ];
    this.preguntas = [
      { value: '1', label: '¿Le gusta el sabor de nuestra pizza?' },
      { value: '2', label: '¿Cual es su grado de satisfacción con nuestra pizza?' },
      { value: '3', label: '¿La comida es de Buena calidad y abundante?' },
      { value: '4', label: 'Ofrece las mejores promociones' },
      { value: '5', label: '¿Qué le parece la variedad del producto?' },
      { value: '6', label: '¿Cómo se enteró de nosotros?' }
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
    this.VentasPorLocal();
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
        this.ImportesPorDia();
        break;
      case "5":
        //this.ProductoMasVendidoEntreDosFechas()
        this.MayorProductoVendido();
        break;
      case "6":
        this.LogsUsuarios()
        break;
      case "7":
        this.pregunta="1"
        this.pregchange()        
        break;
    }
  }
  ImportesPorDia(){
    this.barChartLabels = [];
    this.WebserviceService.ImportesPorDia().then(data => {

      this.listado = data;
      var ultimo = this.listado.length
      var xr = [];
      var myObj = {
        data: [],
        label: 'Importes por Dia'
      };
      this.listado.forEach(element => {

        myObj.data.push(element.total);
        this.barChartLabels.push(element.fecha)

      });
      xr.push(myObj)
      this.barChartData = xr

    })
  }
 /* Encuestas() {
    this.barChartLabels = [];
    this.WebserviceService.Encuestas().then(data => {

      this.listado = data;
      var ultimo = this.listado.length
      var xr = [];
      var myObj = {
        data: [],
        label: 'Encuestas'
      };
      this.listado.forEach(element => {

        this.barChartLabels.push('¿Le gusta el Sabor de nuestra pizza? -> MUCHO'); myObj.data.push(element.pregunta1);
        this.barChartLabels.push('¿Qué le parece la variedad del producto? -> INTERMEDIO'); myObj.data.push(element.pregunta2);
        this.barChartLabels.push('¿Está conforme con los establecimientos donde se venden? -> SI'); myObj.data.push(element.pregunta3);
        this.barChartLabels.push('¿Cómo se enteró de la existencia del producto? ->  Anuncios en medios de comunicación'); myObj.data.push(element.pregunta4);
        this.barChartLabels.push('¿Cómo se enteró de la existencia del producto? ->  Conocidos o Familiares'); myObj.data.push(element.pregunta5);
        this.barChartLabels.push('¿Que es lo que mejoraria? ->  El sitio Web'); myObj.data.push(element.pregunta6);
        this.barChartLabels.push('¿Que es lo que mejoraria? ->  Menores precios'); myObj.data.push(element.pregunta7);
        this.barChartLabels.push('¿Que es lo que mejoraria? ->  Mas Locales'); myObj.data.push(element.pregunta8);
        this.barChartLabels.push('De manera general, ¿Cuál es su grado de satisfacción de nuestra Pizza ? -> MUY SATISFECHO'); myObj.data.push(element.pregunta9);
        this.barChartLabels.push('De manera general, ¿Cuál es su grado de satisfacción de nuestra Pizza ? -> SATISFECHO'); myObj.data.push(element.pregunta10);
        this.barChartLabels.push('¿Recomendaria nuestras pizzas ? -> SI'); myObj.data.push(element.pregunta11);
        this.barChartLabels.push('¿Recomendaria nuestras pizzas ? -> Lo haria a cambio de una promo'); myObj.data.push(element.pregunta12);
        /*this.barChartLabels.push(element.pregunta13);    myObj.data.push(element.pregunta13);   
        this.barChartLabels.push(element.pregunta14);    myObj.data.push(element.pregunta14);   
        this.barChartLabels.push(element.pregunta15);    myObj.data.push(element.pregunta15);   
        this.barChartLabels.push(element.pregunta16);    myObj.data.push(element.pregunta16);   
        this.barChartLabels.push(element.pregunta17);    myObj.data.push(element.pregunta17);   
        this.barChartLabels.push(element.pregunta18);    myObj.data.push(element.pregunta18);   
        this.barChartLabels.push(element.pregunta19);    myObj.data.push(element.pregunta19);   
        this.barChartLabels.push(element.pregunta20);    myObj.data.push(element.pregunta20);  
        //this.barChartLabels.push(element.nomap)     
        // myObj.data.push(element.nomap);

      });
      xr.push(myObj)
      this.barChartData = xr

    })
    this.WebserviceService.Encuestas2().then(data => {
      console.info(data)
    });
  }*/
  LogsUsuarios() {
    this.barChartLabels = [];
    this.WebserviceService.LogsUsuarios().then(data => {

      this.listado = data;
      var ultimo = this.listado.length
      var xr = [];
      var myObj = {
        data: [],
        label: 'Logueos de Usuarios'
      };
      this.listado.forEach(element => {

        myObj.data.push(element.cant);
        this.barChartLabels.push(element.nomap)

      });
      xr.push(myObj)
      this.barChartData = xr

    })
  }
  ProductoMasVendidoEntreDosFechas() {
    this.barChartLabels = [];
    this.WebserviceService.ProductoMasVendidoEntreDosFechas().then(data => {

      this.listado = data;
      var ultimo = this.listado.length
      var xr = [];
      var myObj = {
        data: [],
        label: 'Producto mas Vendido entre dos Fechas'
      };
      this.listado.forEach(element => {

        myObj.data.push(element.max);
        this.barChartLabels.push(element.producto)

      });
      xr.push(myObj)
      this.barChartData = xr

    })
  }
  MayorProductoVendido() {
    this.barChartLabels = [];
    this.WebserviceService.MayorProductoVendido().then(data => {

      this.listado = data;
      var ultimo = this.listado.length
      var xr = [];
      var myObj = {
        data: [],
        datasets: [{
          backgroundColor: ['rgba(255,99,132,0.2)',
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
    this.barChartLabels = [];
    this.WebserviceService.VentasPorCliente().then(data => {
      console.info(data)
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
  pregchange() {
    this.barChartLabels = [];
    const array = [{ "pregunta": this.pregunta }];
    this.WebserviceService.Preguntas(array).then(data => {
      console.info(data)
      this.listado = data;
      var ultimo = this.listado.length
      var xr = [];
      var myObj = {
        data: [],
        label: 'Ventas Por Cliente'
      };
      this.listado.forEach(element => {

        myObj.data.push(element.total);
        this.barChartLabels.push(element.descripcion)

      });
      xr.push(myObj)
      this.barChartData = xr

    });
  }
}
