## Laboratorio 4 - Proyecto final pizzeria - GJS2
 
## Requisitos

Este proyecto utiliza Angular CLI para ello es requerido Node 6.9.0 o una version superior y también NPM 3 o una version superior.

## Tabla de Contenidos

* [Instalacion](#instalacion)
* [Uso](#uso)
* [Documentation](#documentacion)
* [Licencia](#licencia)

## Instalacion

**Antes de Instalar:** Por favor, lea los  [Requisitos](#Requisitos)
```bash
npm install 

incluye:

npm i ng-recaptcha --save                  		---> https://github.com/DethAriel/ng-recaptcha
npm install ng2-charts --save              		---> https://github.com/valor-software/ng2-charts
npm install ng2-modal --save               		---> https://github.com/pleerock/ngx-modal
npm install ngx-uploader --save            		---> https://github.com/bleenco/ngx-uploader
npm install ngx-bootstrap --save           		---> https://github.com/valor-software/ngx-bootstrap
npm install --save ngx-loading             		---> https://github.com/Zak-C/ngx-loading
npm install --save alasql 		           		---> https://github.com/agershun/alasql
npm install @ngui/map @types/googlemaps --save 	---> https://github.com/ng2-ui/map

entre otros
```

## Uso

```bash
ng serve 
```

## Documentacion

La Documentacion para Angular CLI se encuentra en este repositorio [wiki](https://github.com/angular/angular-cli/wiki).

<h1>Screen del Sistema</h1><br>
<img src='https://pablodececco.com.ar/assets/img/screen.jpg'/><br>
La Documentacion para GJS2 se encuentra en este link [GJS2](http://pablodececco.com.ar/doc).


<h2>Operatoria Usuario</h2>

<div>
	Al ingresar por primera vez el usuario debera registrarse como se ve en pantalla; Completando los datos obligatorios que estan en rojo y completar el captcha para finalizar el registro.
</div>
<br><br>
<img src="https://pablodececco.com.ar/assets/img/registro.jpg" alt="registro">
<br><br><br><br>
<div>
	Una vez registrado se redirigira a la pantalla de productos, donde podemos visualizar todos los productos disponibles para realizar un pedido.
</div>
<br><br>
<img src="https://pablodececco.com.ar/assets/img/pedidos.jpg" alt="pedidos">
<br><br><br><br>
<div>
	Cuando el usuario finalice de seleccionar las pizzas elegidas debera completar un pequeño captcha.
</div>
<img src="https://pablodececco.com.ar/assets/img/pedidos2.jpg" alt="pedidos2">
<br><br><br><br>
<div>
	Luego de completar el captcha confirmará lo elegido junto con su direccion y el sistema informará el tiempo de demora que toma llevar el pedido a su casa. El usuario en esta pantalla podra cambiar la direccion alternando el tiempo de entrega de su pedido.
</div>
<br><br>
<img src="https://pablodececco.com.ar/assets/img/confirmacionpedido.jpg" alt="confirmacionpedido">
<br><br><br><br>
<div>
	Finalizada la confirmacion el usuario tendra la opcion de completar una pequeña encuesta.<br>
	En el menú se encuentra la opcion de pedidos donde podra visualizar todos los pedidos realizados junto con su estado.<br>
	El usuario tmb tendra la opcion de bajar  un listado de los mismos en pdf o xls.
</div>

<br><br>
<img src="https://pablodececco.com.ar/assets/img/pedidos3.jpg" alt="pedidos3">
<br><br><br><br>
<div>
	
</div>
## Licencia

MIT 