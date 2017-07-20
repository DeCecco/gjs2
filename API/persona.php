<?php

require_once"accesoDatos.php";

class Persona
{
	public $id;
	public $nombre;
 	public $apellido;
  	public $dni;
	public $sexo;
	public $password;

	//CONSTRUCTOR
	public function __construct($nombre, $apellido, $dni, $sexo, $password){
		$this->nombre = $nombre;
		$this->apellido = $apellido;
		$this->dni = $dni;
		$this->sexo = $sexo;
		$this->password = $password;
	}
/*----------------------------------INICIO COMUN A TODAS--------------------------------*/	
	public static function Login($cuenta,$password){	
		$sql = "SELECT nombre,apellido,mail,cuenta,idusuario,idrol,estado,dni FROM `usuarios` WHERE cuenta=:cuenta and password=:password";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);		
		$consulta->bindValue(':cuenta', $cuenta,PDO::PARAM_STR);		
		$consulta->bindValue(':password', $password,PDO::PARAM_STR);		
		$consulta->execute();
		return $consulta->fetchAll();	
	} 
/*----------------------------------FIN COMUN A TODAS--------------------------------*/		

/*----------------------------------INICIO PERSONAS--------------------------------*/	
	//OBTENCION DE TODOS LAS PERSONAS DE LA BASE DE DATOS
	public static function TraerTodasLasPersonas(){
		$sql = "SELECT u.*,r.descripcion roles FROM usuarios u
				left join roles r ON  u.idrol=r.idrol
				WHERE u.estado=1";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
	    $consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);	
	}
	//ELIMINACION DE UNA PERSONA DE LA BASE DE DATOS
	public static function BorrarPersona($id){	
		$sql = 'UPDATE usuarios set estado=0 WHERE idusuario = :id';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);		
		$consulta->bindValue(':id', $id['id'],PDO::PARAM_STR);		
		$consulta->execute();
		return true;	
	} 
	public static function InsertarPersona($email,$rol,$nombre,$apellido,$dni,$cuenta){

        $sql = 'INSERT INTO usuarios (nombre,apellido,mail,dni,cuenta,password,idrol,estado)
		VALUES (:nombre, :apellido,:email,:dni,:cuenta,"123456",:rol,"1")';
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':rol', $rol, PDO::PARAM_INT);
			$consulta->bindValue(':email', $email, PDO::PARAM_STR);						
            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $apellido, PDO::PARAM_STR);
			$consulta->bindValue(':cuenta', $cuenta, PDO::PARAM_STR);
			$consulta->bindValue(':dni', $dni, PDO::PARAM_STR);
			$consulta->execute();
	}
/*----------------------------------FIN PERSONAS--------------------------------*/		

/*----------------------------------INICIO PRODUCTOS--------------------------------*/	
	public static function ListarProductos(){
		$sql = "SELECT productos.*,precios.precio_venta,0 cantidad FROM `productos` 
				left JOIN `precios` on precios.idprod=productos.idprod
				where productos.estado=1";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
	    $consulta->execute();			
		return $consulta->fetchAll();	
	}
/*----------------------------------FIN PRODUCTOS--------------------------------*/	
/*----------------------------------INICIO LOCALES--------------------------------*/	
	public static function TraerLocal($id){	
		$sql = "SELECT * from locales where idlocal=:id";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);		
		$consulta->bindValue(':id', $id,PDO::PARAM_STR);		
		$consulta->execute();
		return $consulta->fetchAll();	
	} 
	public static function ListarLocales(){	
		$sql = "SELECT * from locales";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);				
		$consulta->execute();
		return $consulta->fetchAll();	
	} 
	public static function ModificarLocalidad($descripcion,$localidad,$calle,$numero,$idlocal){

        $sql = " UPDATE locales 
		set descripcion=:descripcion, localidad=:localidad,calle=:calle,numero=:numero 
		where idlocal=:idlocal ";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':descripcion', $descripcion, PDO::PARAM_INT);
			$consulta->bindValue(':localidad', $localidad, PDO::PARAM_STR);						
            $consulta->bindValue(':calle', $calle, PDO::PARAM_STR);
            $consulta->bindValue(':numero', $numero, PDO::PARAM_STR);
			$consulta->bindValue(':idlocal', $idlocal, PDO::PARAM_STR);
			$consulta->execute();
	}	
/*----------------------------------FIN LOCALES--------------------------------*/	
}