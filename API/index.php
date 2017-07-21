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
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
/*----------------------------------INICIO COMUN A TODAS--------------------------------*/

$app->post('/persona/login', function (Request $request, Response $response){
	$cuenta = $request->getParam('cuenta');	
	$password = $request->getParam('password');			
    return $response->withJson(Persona::Login($cuenta,$password));
});

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

$app->post('/payLoad', function (Request $request, Response $response) {
	
	$token = $request->getParam('token');		          
	$payload=AutentificadorJWT::ObtenerPayload($token);
  $newResponse = $response->withJson($payload, 200); 
  return $newResponse;
});
/*----------------------------------FIN COMUN A TODAS--------------------------------*/

/*----------------------------------INICIO PERSONAS--------------------------------*/
$app->get('/persona/obtenerTodas', function (Request $request, Response $response){
    return $response->withJson(Persona::TraerTodasLasPersonas());
});

$app->post('/persona/agregar', function (Request $request, Response $response) {    
	$email = $request->getParam('email');	
	$rol = $request->getParam('rol');
	$nombre = $request->getParam('nombre');
	$apellido = $request->getParam('apellido');
	$dni = $request->getParam('dni');
	$cuenta = $request->getParam('cuenta');
	return $response->withJson(Persona::InsertarPersona($email,$rol,$nombre,$apellido,$dni,$cuenta));     
});	/*
$app->post('/persona/modificar', function (Request $request, Response $response) {    
	$email = $request->getParam('email');
	$password = $request->getParam('password');
	$rol = $request->getParam('rol');
	$nombre = $request->getParam('nombre');
	$apellido = $request->getParam('apellido');
	$dni = $request->getParam('dni');
	$legajo = $request->getParam('legajo');
	$id = $request->getParam('id');
	return $response->withJson(Persona::ModificarPersona($email,$password,$rol,$nombre,$apellido,$dni,$legajo,$id));     
});	*/
$app->post('/persona/eliminar', function (Request $request, Response $response) {		
	return $response->withJson(Persona::BorrarPersona($request->getParsedBody()));
});

/*----------------------------------FIN PERSONAS--------------------------------*/
/*----------------------------------INICIO PRODUCTOS--------------------------------*/
$app->get('/productos/listar', function (Request $request, Response $response){
    return $response->withJson(Persona::ListarProductos());
});
$app->post('/producto/agregar', function (Request $request, Response $response) {    
	$descripcion_larga = $request->getParam('descripcion_larga');
	$descripcion_corta = $request->getParam('descripcion_corta');
	$precio_costo = $request->getParam('precio_costo');
	$precio_venta = $request->getParam('precio_venta');	
	return $response->withJson(Persona::AgregarProducto($descripcion_larga,$descripcion_corta,$precio_costo,$precio_venta));     
});	
$app->post('/producto/modificar', function (Request $request, Response $response) {    
	$descripcion_larga = $request->getParam('descripcion_larga');
	$descripcion_corta = $request->getParam('descripcion_corta');
	$precio_costo = $request->getParam('precio_costo');
	$precio_venta = $request->getParam('precio_venta');	
	$idprod = $request->getParam('idprod');	
	return $response->withJson(Persona::ModificarProducto($descripcion_larga,$descripcion_corta,$precio_costo,$precio_venta,$idprod));     
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
$app->post('/local/agregar', function (Request $request, Response $response) {    
	$descripcion = $request->getParam('descripcion');
	$localidad = $request->getParam('localidad');
	$calle = $request->getParam('calle');
	$numero = $request->getParam('numero');	
	return $response->withJson(Persona::AgregarLocalidad($descripcion,$localidad,$calle,$numero));     
});	
$app->post('/local/modificar', function (Request $request, Response $response) {    
	$descripcion = $request->getParam('descripcion');
	$localidad = $request->getParam('localidad');
	$calle = $request->getParam('calle');
	$numero = $request->getParam('numero');
	$idlocal = $request->getParam('idlocal');
	return $response->withJson(Persona::ModificarLocalidad($descripcion,$localidad,$calle,$numero,$idlocal));     
});	
$app->post('/local/eliminar', function (Request $request, Response $response) {    	
	$idlocal = $request->getParam('idlocal');
	return $response->withJson(Persona::EliminarLocal($idlocal));     
});	
/*----------------------------------FIN LOCALES--------------------------------*/

$app->run();


//que cosa es el next de la funcion add????