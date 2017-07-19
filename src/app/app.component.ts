import { Component } from '@angular/core';
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
  constructor(private WebserviceService: WebserviceService, private router: Router, private ModalModule: ModalModule) {
    this.verificarToken();
    this.local = '1';
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
    
    var data = [{ "local": this.local }];
    this.WebserviceService.TraerLocal(data).then(data => {      
      this.datosLocal = data;
      this.img=data[0].img;
      console.info(data)
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
