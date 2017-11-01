import { Component , Output, EventEmitter} from '@angular/core';
import { WebserviceService } from './servicios/webservice.service';
import { Router } from '@angular/router';
import { ModalModule } from "ng2-modal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  usuario: any;
  myOptions = [];
  local: any;
  datosLocal: any;
  img:string;
  rol:any;
  position:string;
  @Output() public eventoLocal=new EventEmitter<any>();
  constructor(private WebserviceService: WebserviceService, private router: Router, private ModalModule: ModalModule) {
    this.verificarToken();
    var x=localStorage.getItem('Local');
    if(x==null){
    this.local = '1';
    }else{
      this.local=x;
    }
    this.rol=0;
    this.myOptions = [
      { value: '1', label: 'LOCAL 1' },
      { value: '2', label: 'LOCAL 2' },
      { value: '3', label: 'LOCAL 3' }
    ];
    this.cambio();
  }

  cambio() {
    localStorage.removeItem('Local');
    localStorage.setItem('Local', this.local);
    switch(this.local){
      case "1":      
        this.position='Av. Santa Fe 2580 C1425BGN CABA';    
        
      break;
      case "2":
        this.position='Av. Cabildo 356 C1426AAQ CABA';
       // localStorage.setItem('Posicion', this.position);
      break;
      case "3":
        this.position='Av. del Libertador 1100 C1112 CABA';
       // localStorage.setItem('Posicion', this.position);
      break;
    }
        localStorage.setItem('Posicion', this.position);
    this.eventoLocal.emit(this.local);

    var data = [{ "local": this.local }];
    this.WebserviceService.TraerLocal(data).then(data => {      
      this.datosLocal = data;
      this.img=data[0].img;
      //console.info(data)
    })
  }
  verificarToken() {
    var tk = localStorage.getItem('Token')
    this.usuario = 'Perfil';
    if (tk != null) {
      var array = [{ "token": tk }];
      this.WebserviceService.VerificarToken(array).then(data => {
        if (data) {
          this.WebserviceService.PayLoad(array).then(data => {
            this.usuario = data.data.nombre;            
            this.rol=data.data.idrol;
            
            //this.router.navigate(['Productos']);
          })
        } else {
          alert('Por favor, para continuar logueese');
          this.router.navigate(['Login']);
          console.info('TokenVencido')
        }
      })
    } else {
      alert('Por favor, para continuar logueese');
      this.router.navigate(['Login']);
    }
  }
}
