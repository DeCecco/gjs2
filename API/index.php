<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "persona.php";
require 'vendor/autoload.php';

$app = new \Slim\App(['settings' => ['displayErrorDetails' => true]]);

$app->add(function (Request $request, Response $response, $next) {
    $response = $next($request, $response);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

$app->get('/persona/obtenerTodas', function (Request $request, Response $response){
    return $response->withJson(Persona::TraerTodasLasPersonas());
});
/* $app->post('/persona/agregar', function (Request $request, Response $response) {    
	$email = $request->getParam('email');
	$password = $request->getParam('password');
	$rol = $request->getParam('rol');
	$nombre = $request->getParam('nombre');
	$apellido = $request->getParam('apellido');
	$dni = $request->getParam('dni');
	$legajo = $request->getParam('legajo');
	return $response->withJson(Persona::InsertarPersona($email,$password,$rol,$nombre,$apellido,$dni,$legajo));     
});	
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
	Persona::BorrarPersona($request->getParam('id'));
    return $response;
});
 

$app->run();


//que cosa es el next de la funcion add????