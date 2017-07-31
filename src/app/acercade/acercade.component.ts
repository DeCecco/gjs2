import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {  
  position:string;
  @Input() posicion:string;
  constructor() { 
    this.position='Av. del Libertador 1100 C1112 CABA';
    this.position='Av. Santa Fe 2580 C1425BGN CABA';
    this.position='Av. Cabildo 356 C1426AAQ CABA';
  }

  ngOnInit() {
  }

}
