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
		$sql = "SELECT productos.*,precios.precio_venta,precios.precio_costo,0 cantidad,productos.idprod FROM `productos` 
				left JOIN `precios` on precios.idprod=productos.idprod
				where productos.estado=1";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
	    $consulta->execute();			
		return $consulta->fetchAll();	
	}
	public static function AgregarProducto($descripcion_larga,$descripcion_corta,$precio_costo,$precio_venta){

        $sql = " INSERT into productos (descripcion_corta,descripcion_larga) values (:descripcion_corta,:descripcion_larga)";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':descripcion_larga', $descripcion_larga, PDO::PARAM_INT);
			$consulta->bindValue(':descripcion_corta', $descripcion_corta, PDO::PARAM_STR);						
		$consulta->execute();
		$id=persona::UltimoIdProductoAdd();

		$sql= "INSERT INTO PRECIOS (idprod,precio_costo,precio_venta) values (".$id.",:precio_costo,:precio_venta) ";			
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
            $consulta->bindValue(':precio_costo', $precio_costo, PDO::PARAM_STR);
            $consulta->bindValue(':precio_venta', $precio_venta, PDO::PARAM_STR);			
			$consulta->execute();
	}	
	public static function ModificarProducto($descripcion_larga,$descripcion_corta,$precio_costo,$precio_venta,$idprod){

        $sql = " UPDATE productos set descripcion_corta=:descripcion_corta,
			descripcion_larga=:descripcion_larga
			where idprod=:idprod ";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':descripcion_larga', $descripcion_larga, PDO::PARAM_INT);
			$consulta->bindValue(':descripcion_corta', $descripcion_corta, PDO::PARAM_STR);						
			$consulta->bindValue(':idprod', $idprod, PDO::PARAM_STR);
		$consulta->execute();		

		$sql= "UPDATE PRECIOS set precio_costo=:precio_costo,
								precio_venta=:precio_venta
								where idprod=:idprod";			
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
            $consulta->bindValue(':precio_costo', $precio_costo, PDO::PARAM_STR);
            $consulta->bindValue(':precio_venta', $precio_venta, PDO::PARAM_STR);			
			$consulta->bindValue(':idprod', $idprod, PDO::PARAM_STR);
			$consulta->execute();
	}		
	public static function EliminarProducto($id){
		$sql=" DELETE from productos where idprod=:id";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':id', $id, PDO::PARAM_STR);
		$consulta->execute();
		$sql=" DELETE from precios where idprod=:id";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':id', $id, PDO::PARAM_STR);
		$consulta->execute();
		return true;	
	}
	public static function UltimoIdProductoAdd(){
		$sql="SELECT  idprod FROM `productos` order by idprod desc LIMIT 1";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->execute();
		return $consulta->fetchColumn();	
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
	public static function AgregarLocalidad($descripcion,$localidad,$calle,$numero){

        $sql = " INSERT into locales (descripcion,localidad,calle,numero) values (:descripcion,:localidad,:calle,:numero)";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':descripcion', $descripcion, PDO::PARAM_INT);
			$consulta->bindValue(':localidad', $localidad, PDO::PARAM_STR);						
            $consulta->bindValue(':calle', $calle, PDO::PARAM_STR);
            $consulta->bindValue(':numero', $numero, PDO::PARAM_STR);			
			$consulta->execute();
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
	public static function EliminarLocal($idlocal){

        	$sql = " DELETE from locales where idlocal=:idlocal";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);			
			$consulta->bindValue(':idlocal', $idlocal, PDO::PARAM_STR);
			$consulta->execute();
	}	
/*----------------------------------FIN LOCALES--------------------------------*/	
}