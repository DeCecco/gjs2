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
	/*--------------------------------------------------------------------------------------*/
	public static function ListarProductos(){
		$sql = "SELECT productos.*,precios.precio_venta FROM `productos` 
				left JOIN `precios` on precios.idprod=productos.idprod
				where productos.estado=1";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
	    $consulta->execute();			
		return $consulta->fetchAll();	
	}
}