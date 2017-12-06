<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "persona.php";
require 'vendor/autoload.php';
require 'AutentificadorJWT.php';

$app = new \Slim\App(['settings' => ['displayErrorDetails' => true]]);

$app->add(function (Request $request, Response $response, $next) {
    $response = $next($request, $response);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
/*----------------------------------INICIO COMUN A TODAS--------------------------------*/

$app->post('/persona/login', function (Request $request, Response $response){
	$cuenta = $request->getParam('cuenta');	
	$password = $request->getParam('password');			
    return $response->withJson(Persona::Login($cuenta,$password));
});
  
/**
   * @api {any} /Crear/  Crear
   * @apiVersion 0.1.0
   * @apiName Crear 
   * @apiGroup TOKEN
   * @apiDescription  Crea el token a partir de los datos del usuario y variables internas declaradas 
   *
   * @apiParam {array_string} data  Contiene el mail,rol,nombre,apellido,id,cuenta y dni del usuario logueado
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.CrearToken(array).then(data => {
   *PHP 	AutentificadorJWT::CrearToken($datos); 
*/
$app->post('/crearToken', function (Request $request, Response $response) {
	
	$mail = $request->getParam('mail');	
	$idrol = $request->getParam('idrol');
	$nombre = $request->getParam('nombre');
	$apellido = $request->getParam('apellido');	
	$idusuario = $request->getParam('idusuario');	
	$cuenta = $request->getParam('cuenta');	
	$dni = $request->getParam('dni');	
	
    $datos = array('mail' => $mail,'idrol' => $idrol, 'nombre' => $nombre,'apellido' => $apellido,'idusuario'=>$idusuario,'cuenta'=>$cuenta,'dni'=>$dni);    
    
    $token= AutentificadorJWT::CrearToken($datos); 
	//$payload=AutentificadorJWT::ObtenerPayload($token);
    $newResponse = $response->withJson($token, 200); 
    return $newResponse;
});
/**
   * @api {any} /Verificar/  Verificar
   * @apiVersion 0.1.0
   * @apiName Verificar 
   * @apiGroup TOKEN
   * @apiDescription  Verifica que el token ingresado sea valido
   *
   * @apiParam {string} token  Posee el token del usuario
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.VerificarToken(token).then(data => {
   *PHP 	AutentificadorJWT::verificarToken($token);
*/ 
$app->post('/verificarToken', function (Request $request, Response $response) {
		
	$token = $request->getParam('token');		            		
	 $esValido=false;
      try 
      {
        AutentificadorJWT::verificarToken($token);
        $esValido=true;      
      }
      catch (Exception $e) {      
        //guardar en un log
				$esValido=false;
        //echo $e;
      }  
	  $esValido =$response->withJson($esValido, 200); 
      return $esValido;
});  
/**
   * @api {any} /PayLoad/  PayLoad
   * @apiVersion 0.1.0
   * @apiName PayLoad 
   * @apiGroup TOKEN
   * @apiDescription  Decodifica el token y devuelve los datos del mismo
   *
   * @apiParam {string} token  Posee el token del usuario
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.PayLoad(token).then(data => {
   *PHP 	AutentificadorJWT::ObtenerPayload($token);
*/ 
$app->post('/payLoad', function (Request $request, Response $response) {
	
	$token = $request->getParam('token');		          
	$payload=AutentificadorJWT::ObtenerPayload($token);
  $newResponse = $response->withJson($payload, 200); 
  return $newResponse;
});
$app->post('/datosclientes', function (Request $request, Response $response) {
	
	$idusuario = $request->getParam('idusuario');		          
	return $response->withJson(Persona::datosclientes($idusuario));   
  return $newResponse;
});
$app->get('/clientes/listar', function (Request $request, Response $response){
    return $response->withJson(Persona::ListarClientes());
});
/**
   * @api {any} /Listar/  Listar
   * @apiVersion 0.1.0
   * @apiName ListarPedido
   * @apiGroup PEDIDOS
   * @apiDescription  Lista los pedidos dependiendo el usuario y el tipo de usuario
   *
   * @apiParam {array_string} data  Contiene el id del rol y el id de usuario   
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.ListadoPedidos(data).then(data => {
   *PHP 	->withJson(Persona::ListadoPedidos($idusuario,$idrol));
*/
$app->post('/pedidos', function (Request $request, Response $response){
	$idusuario = $request->getParam('idusuario');
	$idrol = $request->getParam('idrol');
    return $response->withJson(Persona::ListadoPedidos($idusuario,$idrol));
});
$app->post('/solopedidos', function (Request $request, Response $response){
	$idusuario = $request->getParam('idusuario');
	$idrol = $request->getParam('idrol');
    return $response->withJson(Persona::ListadoSoloPedidos($idusuario,$idrol));
});
/**
   * @api {any} /Cambiar_Estado/  Cambiar Estado
   * @apiVersion 0.1.0
   * @apiName Cambiar Estado
   * @apiGroup PEDIDOS
   * @apiDescription  Cambia el estado del pedido siendo estos Finalizado Pendiente y Cancelado
   *
   * @apiParam {array_string} data  Contiene el id del pedido y el id del estado
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.CambiarEstadoPedido(data).then(data => {
   *PHP 	->withJson(Persona::CambiarEstadoPedido($idpedido,$estado));
*/
$app->post('/pedidos/estado', function (Request $request, Response $response){
	$idpedido = $request->getParam('idpedido');
	$estado = $request->getParam('estado');
    return $response->withJson(Persona::CambiarEstadoPedido($idpedido,$estado));
});
/*----------------------------------FIN COMUN A TODAS--------------------------------*/

/*----------------------------------INICIO PERSONAS--------------------------------*/
$app->get('/persona/obtenerTodas', function (Request $request, Response $response){
	$idrol = $request->getParam('idrol');
    return $response->withJson(Persona::TraerTodasLasPersonas($idrol));
});
$app->get('/persona/TraerPersonasSoloClientes', function (Request $request, Response $response){	
    return $response->withJson(Persona::TraerPersonasSoloClientes());
});
/**
   * @api {any} /Agregar/  Agregar
   * @apiVersion 0.1.0
   * @apiName Agregar 
   * @apiGroup PERSONAS
   * @apiDescription  Agrega un usuario a la base de datos
   *
   * @apiParam {array_string} data  Posee los datos de la persona a agregar email nombre rol apellido dni cuenta ciudad etc
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.AgregarPersona(array).then(data => {
   *PHP 	$response->withJson(Persona::InsertarPersona($email,$rol,$nombre,$apellido,$dni,$cuenta,$ciudad,$localidad,$calle,$numero,$piso,$dpto,$tel,$entrecalles));     
*/ 
$app->post('/persona/agregar', function (Request $request, Response $response) {    
	$email = $request->getParam('email');	
	$rol = $request->getParam('rol');
	$nombre = $request->getParam('nombre');
	$apellido = $request->getParam('apellido');
	$dni = $request->getParam('dni');
	$cuenta = $request->getParam('cuenta');
	$ciudad = $request->getParam('ciudad');
    $localidad =$request->getParam('localidad');
    $calle=$request->getParam('calle');
    $numero=$request->getParam('numero');
    $piso=$request->getParam('piso');
    $dpto=$request->getParam('dpto');
    $tel=$request->getParam('tel');
    $entrecalles=$request->getParam('entrecalles');
	return $response->withJson(Persona::InsertarPersona($email,$rol,$nombre,$apellido,$dni,$cuenta,$ciudad,$localidad,$calle,$numero,$piso,$dpto,$tel,$entrecalles));     
});	
/**
   * @api {any} /Modificar/  Modificar
   * @apiVersion 0.1.0
   * @apiName Modificar 
   * @apiGroup PERSONAS
   * @apiDescription  Modifica un usuario de la base de datos
   *
   * @apiParam {array_string} data  Posee los datos de la persona a Modificar email nombre rol apellido dni cuenta ciudad etc
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.ModificarPersona(array).then(data => {
   *PHP 	$response->withJson(Persona::ModificarPersona($email,$rol,$nombre,$apellido,$dni,$cuenta,$ciudad,$localidad,$calle,$numero,$piso,$dpto,$tel,$entrecalles,$idusuario));     
*/ 
$app->post('/persona/modificar', function (Request $request, Response $response) {    
	$email = $request->getParam('email');	
	$rol = $request->getParam('rol');
	$nombre = $request->getParam('nombre');
	$apellido = $request->getParam('apellido');
	$dni = $request->getParam('dni');
	$cuenta = $request->getParam('cuenta');
	$ciudad = $request->getParam('ciudad');
    $localidad =$request->getParam('localidad');
    $calle=$request->getParam('calle');
    $numero=$request->getParam('numero');
    $piso=$request->getParam('piso');
    $dpto=$request->getParam('dpto');
    $tel=$request->getParam('tel');
    $entrecalles=$request->getParam('entrecalles');
	$idusuario=$request->getParam('idusuario');
	return $response->withJson(Persona::ModificarPersona($email,$rol,$nombre,$apellido,$dni,$cuenta,$ciudad,$localidad,$calle,$numero,$piso,$dpto,$tel,$entrecalles,$idusuario));     
});	

/**
   * @api {any} /Cambiar_Estado/  Cambiar_Estado
   * @apiVersion 0.1.0
   * @apiName Cambiar_Estado 
   * @apiGroup PERSONAS
   * @apiDescription  Modifica el estado de un usuario siendo estos activo o inactivo
   *
   * @apiParam {array_string} data  Posee el id del usuario y el estado a modificar
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.ModificarEstadoUsuario(array).then(data => {
   *PHP 	$response->withJson(Persona::ModificarPersonaEstado($estado,$idusuario));     
*/ 
$app->post('/persona/modificarEstado', function (Request $request, Response $response) {    
	$estado = $request->getParam('estado');	
	$idusuario = $request->getParam('idusuario');	
	return $response->withJson(Persona::ModificarPersonaEstado($estado,$idusuario));     
});	
$app->post('/persona/logs', function (Request $request, Response $response) {    	
	$idusuario = $request->getParam('idusuario');	
	return $response->withJson(Persona::logs($idusuario));     
});	

$app->post('/persona/eliminar', function (Request $request, Response $response) {		
	return $response->withJson(Persona::BorrarPersona($request->getParsedBody()));
});

/*----------------------------------FIN PERSONAS--------------------------------*/
/*----------------------------------INICIO PRODUCTOS--------------------------------*/
/**
   * @api {any} /Listado/  Listado
   * @apiVersion 0.1.0
   * @apiName Listado 
   * @apiGroup PRODUCTOS
   * @apiDescription  Lista los productos en estado activos
   *   
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.ListarProductos().then(data => {
   *PHP 	$response->withJson(Persona::ListarProductos());
*/ 
$app->get('/productos/listar', function (Request $request, Response $response){
    return $response->withJson(Persona::ListarProductos());
});
/**
   * @api {any} /Agregar/  Agregar
   * @apiVersion 0.1.0
   * @apiName Agregar 
   * @apiGroup PRODUCTOS
   * @apiDescription  Agrega un producto a la base de datos
   *
   * @apiParam {array_string} data  Posee los datos del producto a agregar descripcion corta y larga, precio costo y venta, si es una promocion y su imagen
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.AgregarProducto(array).then(data => {
   *PHP 	$response->withJson(Persona::AgregarProducto($descripcion_larga,$descripcion_corta,$precio_costo,$precio_venta,$promocion,$imagen));     
*/ 
$app->post('/producto/agregar', function (Request $request, Response $response) {    
	$descripcion_larga = $request->getParam('descripcion_larga');
	$descripcion_corta = $request->getParam('descripcion_corta');
	$precio_costo = $request->getParam('precio_costo');
	$precio_venta = $request->getParam('precio_venta');	
	$promocion = $request->getParam('promocion');	
    $imagen = $request->getParam('imagen');	
    $imagen2 = $request->getParam('imagen2');	
    $imagen3 = $request->getParam('imagen3');	
	return $response->withJson(Persona::AgregarProducto($descripcion_larga,$descripcion_corta,$precio_costo,$precio_venta,$promocion,$imagen,$imagen2,$imagen3));     
});	
/**
   * @api {any} /Modificar/  Modificar
   * @apiVersion 0.1.0
   * @apiName Modificar 
   * @apiGroup PRODUCTOS
   * @apiDescription  Modificar un producto de la base de datos
   *
   * @apiParam {array_string} data  Posee los datos del producto a Modificar id,descripcion corta y larga, precio costo y venta, si es una promocion y su imagen
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.ModificarProducto(array).then(data => {
   *PHP 	$response->withJson(Persona::ModificarProducto($descripcion_larga,$descripcion_corta,$precio_costo,$precio_venta,$idprod,$promocion,$imagen));     
*/ 
$app->post('/producto/modificar', function (Request $request, Response $response) {    
	$descripcion_larga = $request->getParam('descripcion_larga');
	$descripcion_corta = $request->getParam('descripcion_corta');
	$precio_costo = $request->getParam('precio_costo');
	$precio_venta = $request->getParam('precio_venta');	
	$promocion = $request->getParam('promocion');	
    $imagen = $request->getParam('imagen');	
    $imagen2 = $request->getParam('imagen2');	
    $imagen3 = $request->getParam('imagen3');	
	$idprod = $request->getParam('idprod');	
	return $response->withJson(Persona::ModificarProducto($descripcion_larga,$descripcion_corta,$precio_costo,$precio_venta,$idprod,$promocion,$imagen,$imagen2,$imagen3));     
});
/**
   * @api {any} /Alta/  Nuevo
   * @apiVersion 0.1.0
   * @apiName NuevoPedido
   * @apiGroup PEDIDOS
   * @apiDescription  Da de alta nuevos pedidos
   *
   * @apiParam {array_string} data  Contiene todos los datos del cliente.
   * @apiParam {array_string} pedidos Contiene el detalle del pedido.   
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.NuevoPedido(data, this.pedidos).then(data => {
   *PHP 	->withJson(Persona::NuevoPedido($localidad,$calle,$numero,$piso,$dpto,$entrecalles,$comentarios,$idusuarioC,$local,$idusuario,$pedidos));     	   
   */
$app->post('/pedido/nuevo', function (Request $request, Response $response) {   
	$localidad = $request->getParam('localidad');
	$calle = $request->getParam('calle');
	$numero = $request->getParam('numero');
	$piso = $request->getParam('piso');
	$dpto = $request->getParam('dpto');
	$entrecalles = $request->getParam('entrecalles');
	$comentarios = $request->getParam('comentarios');
	$idusuarioC = $request->getParam('idusuarioC');
	$local = $request->getParam('local');
	$idusuario = $request->getParam('idusuario');
	$pedidos  = $request->getParam('pedidos');	
	return $response->withJson(Persona::NuevoPedido($localidad,$calle,$numero,$piso,$dpto,$entrecalles,$comentarios,$idusuarioC,$local,$idusuario,$pedidos));     
});

$app->post('/producto/eliminar', function (Request $request, Response $response) {    
	$idprod = $request->getParam('idprod');	
	return $response->withJson(Persona::EliminarProducto($idprod));     
});
/*----------------------------------FIN PRODUCTOS--------------------------------*/

/*----------------------------------INICIO LOCALES--------------------------------*/
$app->get('/locales/listar', function (Request $request, Response $response){
    return $response->withJson(Persona::ListarLocales());
});
$app->post('/persona/traerlocal', function (Request $request, Response $response) {
		
	$local = $request->getParam('local');		            			 	
    return $response->withJson(Persona::TraerLocal($local));     
}); 
/**
   * @api {any} /Agregar/  Agregar
   * @apiVersion 0.1.0
   * @apiName Agregar 
   * @apiGroup LOCAL
   * @apiDescription  Agrega un local a la base de datos
   *
   * @apiParam {array_string} data  Posee los datos a agregar, descripcion,localidad,calle y numero
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.AgregarLocal(array).then(data => {
   *PHP 	$response->withJson(Persona::AgregarLocalidad($descripcion,$localidad,$calle,$numero));     
*/ 
$app->post('/local/agregar', function (Request $request, Response $response) {    
	$descripcion = $request->getParam('descripcion');
	$localidad = $request->getParam('localidad');
	$calle = $request->getParam('calle');
	$numero = $request->getParam('numero');	
	return $response->withJson(Persona::AgregarLocalidad($descripcion,$localidad,$calle,$numero));     
});	
/**
   * @api {any} /Modificar/  Modificar
   * @apiVersion 0.1.0
   * @apiName Modificar 
   * @apiGroup LOCAL
   * @apiDescription  Modifica un local de la base de datos
   *
   * @apiParam {array_string} data  Posee los datos a Modificar, descripcion,localidad,calle y numero
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.ModificarLocal(array).then(data => {
   *PHP 	$response->withJson(Persona::ModificarLocalidad($descripcion,$localidad,$calle,$numero,$idlocal));     
*/ 
$app->post('/local/modificar', function (Request $request, Response $response) {    
	$descripcion = $request->getParam('descripcion');
	$localidad = $request->getParam('localidad');
	$calle = $request->getParam('calle');
	$numero = $request->getParam('numero');
	$idlocal = $request->getParam('idlocal');
	return $response->withJson(Persona::ModificarLocalidad($descripcion,$localidad,$calle,$numero,$idlocal));     
});	
/**
   * @api {any} /Eliminar/  Eliminar
   * @apiVersion 0.1.0
   * @apiName Eliminar 
   * @apiGroup LOCAL
   * @apiDescription  Elimina un local de la base de datos
   *
   * @apiParam {number} data  IdLocal
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.EliminarLocal(idlocal).then(data => {
   *PHP 	$response->withJson(Persona::EliminarLocal($idlocal));     
*/ 
$app->post('/local/eliminar', function (Request $request, Response $response) {    	
	$idlocal = $request->getParam('idlocal');
	return $response->withJson(Persona::EliminarLocal($idlocal));     
});	
/*----------------------------------FIN LOCALES--------------------------------*/
/*----------------------------------INICIO ENCUESTAS--------------------------------*/
$app->get('/encuestas/preguntas', function (Request $request, Response $response){
    return $response->withJson(Persona::ListadoPreguntas());
});
$app->get('/encuestas/respuestas', function (Request $request, Response $response){
    return $response->withJson(Persona::ListadoRespuestas());
});
$app->post('/encuestas/agregar', function (Request $request, Response $response) {    
    $pregunta1 = $request->getParam('pregunta1');	
    $pregunta2 = $request->getParam('pregunta2');	
    $pregunta3 = $request->getParam('pregunta3');	
    $pregunta4 = $request->getParam('pregunta4');	
    $pregunta5 = $request->getParam('pregunta5');	
    $pregunta6 = $request->getParam('pregunta6');		
	return $response->withJson(Persona::InsertarEncuestas($pregunta1,$pregunta2,$pregunta3,$pregunta4,$pregunta5,$pregunta6));     
});	
/*----------------------------------FIN ENCUESTAS--------------------------------*/
/*----------------------------------INICIO ESTADISTICAS--------------------------------*/
/**
   * @api {any} /Listados/  Listados
   * @apiVersion 0.1.0
   * @apiName Listados 
   * @apiGroup ESTADISTICAS
   * @apiDescription  Listado de las consultas de las estadisticas de BD
   *   
   *
   * @apiExample Como usarlo:
   *JS	this.WebserviceService.MayorProductoVendido().then(data => {
   *PHP 	$response->withJson(Persona::MayorProductoVendido());
*/ 
$app->get('/estadisticas/ventasporlocal', function (Request $request, Response $response){
    return $response->withJson(Persona::VentasPorLocal());
});
$app->get('/estadisticas/ventasporcliente', function (Request $request, Response $response){
    return $response->withJson(Persona::VentasPorClientes());
});
$app->get('/estadisticas/mayorproductovendido', function (Request $request, Response $response){
    return $response->withJson(Persona::MayorProductoVendido());
});
$app->get('/estadisticas/ProductoMasVendidoEntreDosFechas', function (Request $request, Response $response){
    return $response->withJson(Persona::ProductoMasVendidoEntreDosFechas());
});
$app->get('/estadisticas/LogsUsuarios', function (Request $request, Response $response){
    return $response->withJson(Persona::LogsUsuarios());
});
$app->get('/estadisticas/Encuestas', function (Request $request, Response $response){
    return $response->withJson(Persona::Encuestas());
});
$app->get('/estadisticas/Encuestas2', function (Request $request, Response $response){
    return $response->withJson(Persona::Encuestas2());
});
/*----------------------------------FIN ESTADISTICAS--------------------------------*/
$app->run();


