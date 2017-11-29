<?php

require_once"AccesoDatos.php";

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
		$sql = "SELECT nombre,apellido,mail,cuenta,idusuario,idrol,estado,dni FROM `usuarios` WHERE cuenta=:cuenta and password=:password and estado=1";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);		
		$consulta->bindValue(':cuenta', $cuenta,PDO::PARAM_STR);		
		$consulta->bindValue(':password', $password,PDO::PARAM_STR);		
		$consulta->execute();
		return $consulta->fetchAll();	
	} 
	public static function datosclientes($idusuario){

        	$sql = " select * from  `cliente-detalle` where idusuario=:idusuario";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);			
			$consulta->bindValue(':idusuario', $idusuario, PDO::PARAM_STR);
			$consulta->execute();
			return $consulta->fetchAll();	
	}	
	public static function ListarClientes(){

        	$sql = " SELECT u.*,c.* FROM `usuarios` u left join `cliente-detalle` c on c.idusuario=u.idusuario WHERE u.idrol=4 and u.estado=1";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);						
			$consulta->execute();
			return $consulta->fetchAll();	
	}	
	public static function ListadoPedidos($idusuario,$idrol){	
		if($idrol<4){
		$sql = " SELECT p.idpedido,p.idusuarioc,uu.nombre nombrec,uu.apellido apellidoc,p.idusuario,u.nombre,u.apellido,p.idestado,e.descripcion descripcione
			,p.idlocal,l.descripcion descripcionl,date(p.fecha) fecha,p.localidad,p.calle,p.numero,p.piso,p.dpto,p.entrecalles,p.comentarios
			from pedidos p
			left join usuarios u on u.idusuario=p.idusuario
			left join usuarios uu on uu.idusuario=p.idusuarioc
			left join estados e on e.idestado=p.idestado
			left join locales l on l.idlocal=p.idlocal 
			order by p.idestado,p.idpedido desc";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);		
		}else{
			$sql = " SELECT p.idpedido,p.idusuarioc,uu.nombre nombrec,uu.apellido apellidoc,p.idusuario,u.nombre,u.apellido,p.idestado,e.descripcion descripcione
			,p.idlocal,l.descripcion descripcionl,p.fecha,p.localidad,p.calle,p.numero,p.piso,p.dpto,p.entrecalles,p.comentarios
			from pedidos p
			left join usuarios u on u.idusuario=p.idusuario
			left join usuarios uu on uu.idusuario=p.idusuarioc
			left join estados e on e.idestado=p.idestado
			left join locales l on l.idlocal=p.idlocal
			where p.idusuarioC=:idusuario 
			order by p.idestado,p.idpedido desc";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);		
			$consulta->bindValue(':idusuario', $idusuario,PDO::PARAM_STR);				
		}		
		$consulta->execute();
		return $consulta->fetchAll();	
	} 
	public static function ListadoSoloPedidos($idusuario,$idrol){	
		if($idrol<4){
		$sql = " SELECT p.idpedido,CONCAT(uu.nombre, ' ',uu.apellido) as nombrec ,CONCAT(u.nombre,' ', u.apellido) as nombrev,l.descripcion descripcionl,date(p.fecha) fecha,e.descripcion descripcione
			from pedidos p
			left join usuarios u on u.idusuario=p.idusuario
			left join usuarios uu on uu.idusuario=p.idusuarioc
			left join estados e on e.idestado=p.idestado
			left join locales l on l.idlocal=p.idlocal 
			order by p.idestado,p.idpedido desc";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);		
		}else{
			$sql = " SELECT p.idpedido,CONCAT(uu.nombre, ' ',uu.apellido) as nombrec ,CONCAT(u.nombre,' ', u.apellido) as nombrev,l.descripcion descripcionl,p.fecha,e.descripcion descripcione
			from pedidos p
			left join usuarios u on u.idusuario=p.idusuario
			left join usuarios uu on uu.idusuario=p.idusuarioc
			left join estados e on e.idestado=p.idestado
			left join locales l on l.idlocal=p.idlocal
			where p.idusuarioC=:idusuario 
			order by p.idestado,p.idpedido desc";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);		
			$consulta->bindValue(':idusuario', $idusuario,PDO::PARAM_STR);				
		}		
		$consulta->execute();
		return $consulta->fetchAll(); //PDO::FETCH_CLASS, "Persona"	
	}		
	public static function CambiarEstadoPedido($idpedido,$estado){	
		$sql = "UPDATE pedidos set idestado=:estado where idpedido=:idpedido";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);		
		$consulta->bindValue(':idpedido', $idpedido,PDO::PARAM_STR);		
		$consulta->bindValue(':estado', $estado,PDO::PARAM_STR);		
		$consulta->execute();
		return $consulta->fetchAll();	
	} 	
/*----------------------------------FIN COMUN A TODAS--------------------------------*/		

/*----------------------------------INICIO PERSONAS--------------------------------*/	
	//OBTENCION DE TODOS LAS PERSONAS DE LA BASE DE DATOS
	public static function TraerTodasLasPersonas($rol){
		/*if($rol==2){
			$filtro=" and u.idrol>2 ";
		}
		switch($rol){
			case 1:
			$filtro="";
			break;
			case 2:
			$filtro=" and u.idrol>1 ";
			break;
			case 3:
			$filtro=" and u.idrol>2 ";
			break;
			case 4:
			$filtro=" and u.idrol=99 ";
			break;
		}		*/
		$sql = "SELECT u.idusuario,u.nombre,u.apellido,u.mail,u.dni,u.cuenta,u.idrol,u.estado,r.descripcion roles,c.ciudad,
					c.localidad,c.calle,c.numero,c.piso,c.dpto,c.tel,c.entrecalles,CONCAT(c.localidad,' ',c.calle,' ',c.numero) as enmapa
 FROM usuarios u 
					left join roles r ON u.idrol=r.idrol 
					left join `cliente-detalle` c on c.idusuario=u.idusuario
					order by u.estado desc,u.nombre,u.apellido";//. $filtro ;	
					
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':rol', $rol, PDO::PARAM_STR);
	    $consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);	
		
	}
	public static function TraerPersonasSoloClientes(){
		$sql = "SELECT CONCAT(c.localidad,' ',c.calle,' ',c.numero) as enmapa,CONCAT(u.nombre, ' ',u.apellido) as nomap
 					FROM usuarios u 					
					left join `cliente-detalle` c on c.idusuario=u.idusuario
					where u.idrol=4 and u.estado=1
					order by u.estado desc,u.nombre,u.apellido";//. $filtro ;	
					
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);		
	    $consulta->execute();			
		return $consulta->fetchAll(PDO::FETCH_ASSOC);	
		
	}
	public static function logs($idusuario){	
		$sql = 'insert into logsingreso (idusuario) values (:idusuario)';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);		
		$consulta->bindValue(':idusuario', $idusuario,PDO::PARAM_STR);		
		$consulta->execute();
		return true;	
	} 
	//ELIMINACION DE UNA PERSONA DE LA BASE DE DATOS
	public static function BorrarPersona($id){	
		$sql = 'UPDATE usuarios set estado=0 WHERE idusuario = :id';
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);		
		$consulta->bindValue(':id', $id['id'],PDO::PARAM_STR);		
		$consulta->execute();
		return true;	
	} 
	public static function InsertarPersona($email,$rol,$nombre,$apellido,$dni,$cuenta,$ciudad,$localidad,$calle,$numero,$piso,$dpto,$tel,$entrecalles){

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
		if($rol==4){
			$id=persona::UltimoIdusuario();
			 $sql = "INSERT INTO `cliente-detalle` (idusuario,ciudad,localidad,calle,numero,piso,dpto,tel,entrecalles)
		VALUES (".$id.", :ciudad,:localidad,:calle,:numero,:piso,:dpto,:tel,:entrecalles)";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':ciudad', $ciudad, PDO::PARAM_INT);
			$consulta->bindValue(':localidad', $localidad, PDO::PARAM_STR);						
            $consulta->bindValue(':calle', $calle, PDO::PARAM_STR);
            $consulta->bindValue(':numero', $numero, PDO::PARAM_STR);
			$consulta->bindValue(':piso', $piso, PDO::PARAM_STR);
			$consulta->bindValue(':dpto', $dpto, PDO::PARAM_STR);
			$consulta->bindValue(':tel', $tel, PDO::PARAM_STR);
			$consulta->bindValue(':entrecalles', $entrecalles, PDO::PARAM_STR);
			$consulta->execute();
		}
	}
	public static function ModificarPersona($email,$rol,$nombre,$apellido,$dni,$cuenta,$ciudad,$localidad,$calle,$numero,$piso,$dpto,$tel,$entrecalles,$idusuario){

        $sql = "UPDATE usuarios set nombre=:nombre,apellido=:apellido,mail=:email,dni=:dni,cuenta=:cuenta,idrol=:rol
		where idusuario=:idusuario";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':rol', $rol, PDO::PARAM_INT);
			$consulta->bindValue(':email', $email, PDO::PARAM_STR);						
            $consulta->bindValue(':nombre', $nombre, PDO::PARAM_STR);
            $consulta->bindValue(':apellido', $apellido, PDO::PARAM_STR);
			$consulta->bindValue(':cuenta', $cuenta, PDO::PARAM_STR);
			$consulta->bindValue(':dni', $dni, PDO::PARAM_STR);
			$consulta->bindValue(':idusuario', $idusuario, PDO::PARAM_STR);
			$consulta->execute();
		if($rol==4){			
			 $sql = "UPDATE  `cliente-detalle` set ciudad=:ciudad,localidad=:localidad,calle=:calle,numero=:numero,
			 piso=:piso,dpto=:dpto,tel=:tel,entrecalles=:entrecalles
		 where idusuario=:idusuario";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':ciudad', $ciudad, PDO::PARAM_INT);
			$consulta->bindValue(':localidad', $localidad, PDO::PARAM_STR);						
            $consulta->bindValue(':calle', $calle, PDO::PARAM_STR);
            $consulta->bindValue(':numero', $numero, PDO::PARAM_STR);
			$consulta->bindValue(':piso', $piso, PDO::PARAM_STR);
			$consulta->bindValue(':dpto', $dpto, PDO::PARAM_STR);
			$consulta->bindValue(':tel', $tel, PDO::PARAM_STR);
			$consulta->bindValue(':entrecalles', $entrecalles, PDO::PARAM_STR);
			$consulta->bindValue(':idusuario', $idusuario, PDO::PARAM_STR);
			$consulta->execute();
		}
	}	
	public static function ModificarPersonaEstado($estado,$idusuario){
		$sql="update usuarios set estado=:estado
		where idusuario=:idusuario";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':estado', $estado, PDO::PARAM_STR);
		$consulta->bindValue(':idusuario', $idusuario, PDO::PARAM_STR);
		$consulta->execute();
		return $consulta->fetchColumn();	
	}	
	public static function UltimoIdusuario(){
		$sql="SELECT  idusuario FROM `usuarios` order by idusuario desc LIMIT 1";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->execute();
		return $consulta->fetchColumn();	
	}
/*----------------------------------FIN PERSONAS--------------------------------*/		

/*----------------------------------INICIO PRODUCTOS--------------------------------*/	
	
	public static function NuevoPedido($localidad,$calle,$numero,$piso,$dpto,$entrecalles,$comentarios,$idusuarioC,
	$local,$idusuario,$pedidos){

		$sql = "INSERT INTO pedidos (idusuarioc,idusuario,idestado,idlocal,localidad,calle,numero,piso,dpto,entrecalles,comentarios)
		values (:idusuarioc,:idusuario,1,:local,:localidad,:calle,:numero,:piso,:dpto,:entrecalles,:comentarios)";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		$consulta->bindValue(':localidad', $localidad, PDO::PARAM_STR);
		$consulta->bindValue(':calle', $calle, PDO::PARAM_STR);
		$consulta->bindValue(':numero', $numero, PDO::PARAM_STR);
		$consulta->bindValue(':piso', $piso, PDO::PARAM_STR);
		$consulta->bindValue(':dpto', $dpto, PDO::PARAM_STR);
		$consulta->bindValue(':entrecalles', $entrecalles, PDO::PARAM_STR);
		$consulta->bindValue(':comentarios', $comentarios, PDO::PARAM_STR);
		$consulta->bindValue(':idusuarioc', $idusuarioC, PDO::PARAM_STR);
		$consulta->bindValue(':local', $local, PDO::PARAM_STR);
		$consulta->bindValue(':idusuario', $idusuario, PDO::PARAM_STR);
	    $consulta->execute();		

		$id=Persona::UltimoIdPedidoAdd();			
		foreach($pedidos as $key => $value){			
			$sql = "INSERT INTO `pedido-detalle` (idpedido,idproducto,cantidad,precio_venta)
			values (".$id.",:idproducto,1,:precio_venta)";
        	$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':idproducto', $value['idprod'], PDO::PARAM_STR);
			//$consulta->bindValue(':cantidad', $value['cantidad'], PDO::PARAM_STR);
			$consulta->bindValue(':precio_venta', $value['precio_venta'], PDO::PARAM_STR);
			 $consulta->execute();	
		}		
		return true;	
	}
	public static function ListarProductos(){
		$sql = "SELECT productos.*,precios.precio_venta,precios.precio_costo,0 cantidad,productos.idprod FROM `productos` 
				left JOIN `precios` on precios.idprod=productos.idprod
				where productos.estado=1
				order by esoferta desc";
        $consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
		
	    $consulta->execute();			
		return $consulta->fetchAll();	
	}
	public static function AgregarProducto($descripcion_larga,$descripcion_corta,$precio_costo,$precio_venta,$promocion,$imagen){

        $sql = " INSERT into productos (descripcion_corta,descripcion_larga,esoferta,imagen) values (:descripcion_corta,:descripcion_larga,:promocion,:imagen)";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':descripcion_larga', $descripcion_larga, PDO::PARAM_INT);
			$consulta->bindValue(':descripcion_corta', $descripcion_corta, PDO::PARAM_STR);						
			$consulta->bindValue(':promocion', $promocion, PDO::PARAM_STR);						
			$consulta->bindValue(':imagen', $imagen, PDO::PARAM_STR);	
		$consulta->execute();
		$id=persona::UltimoIdProductoAdd();

		$sql= "INSERT INTO precios (idprod,precio_costo,precio_venta) values (".$id.",:precio_costo,:precio_venta) ";			
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
            $consulta->bindValue(':precio_costo', $precio_costo, PDO::PARAM_STR);
            $consulta->bindValue(':precio_venta', $precio_venta, PDO::PARAM_STR);			
			$consulta->execute();
	}	
	public static function ModificarProducto($descripcion_larga,$descripcion_corta,$precio_costo,$precio_venta,$idprod,$promocion,$imagen){

        $sql = " UPDATE productos set descripcion_corta=:descripcion_corta,
			descripcion_larga=:descripcion_larga,
			esoferta=:promocion,
			imagen=:imagen
			where idprod=:idprod ";
			$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);
			$consulta->bindValue(':descripcion_larga', $descripcion_larga, PDO::PARAM_INT);
			$consulta->bindValue(':descripcion_corta', $descripcion_corta, PDO::PARAM_STR);						
			$consulta->bindValue(':idprod', $idprod, PDO::PARAM_STR);
			$consulta->bindValue(':promocion', $promocion, PDO::PARAM_STR);	
			$consulta->bindValue(':imagen', $imagen, PDO::PARAM_STR);	
		$consulta->execute();		

		$sql= "UPDATE precios set precio_costo=:precio_costo,
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
	public static function UltimoIdPedidoAdd(){
		$sql="SELECT  idpedido FROM `pedidos` order by idpedido desc LIMIT 1";
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
/*----------------------------------INICIO ESTADISTICAS --------------------------------*/
	public static function VentasPorLocal(){	
		$sql = "SELECT count(idpedido) total,idlocal FROM `pedidos` WHERE idestado=3 GROUP by idlocal";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);				
		$consulta->execute();
		return $consulta->fetchAll();	
	} 
	
	public static function VentasPorLocalyEmpleado(){	
		$sql = "SELECT count(p.idpedido) total,p.idlocal,p.idusuario,u.nombre
				FROM `pedidos`  p 
				left join `usuarios` u on (p.idusuario=u.idusuario)
				where p.idestado=3 and u.idrol=3
				GROUP by p.idlocal,p.idusuario";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);				
		$consulta->execute();
		return $consulta->fetchAll();	
	} 
	public static function VentasPorClientes(){	
		$sql = "SELECT count(p.idpedido) total,p.idusuarioc,u.nombre,u.apellido
				FROM `pedidos`  p 
				left join `usuarios` u on (p.idusuarioc=u.idusuario)
				where p.idestado=3 and u.idrol=4
				GROUP by p.idusuarioc";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);				
		$consulta->execute();
		return $consulta->fetchAll();	
	} 
	public static function MayorProductoVendido(){	
		$sql = "SELECT count(p.idproducto) cantidadvendidas,pr.descripcion_corta producto
			from `pedido-detalle` p
			left join productos pr on pr.idprod=p.idproducto
			group by p.idproducto
			order by cantidadvendidas desc
		";		
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);				
		$consulta->execute();
		return $consulta->fetchAll();	
	}	
	public static function ProductoMasVendidoEntreDosFechas(){	
		$sql = "SELECT count(pd.idproducto) max,pr.descripcion_corta producto
				from `pedido-detalle` pd
				left join pedidos p on (p.idpedido=pd.idpedido)
				left join productos pr on (pr.idprod=pd.idproducto)
				where fecha between (2017-07-22) and (2017-07-22)
				group by producto
				order by max desc 
		";		
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);				
		$consulta->execute();
		return $consulta->fetchAll();	
	}		
	public static function LogsUsuarios(){	
		$sql = "select count(l.idusuario) cant,CONCAT(u.nombre,', ',u.apellido ) AS nomap
				from logsingreso l 
				left join usuarios u on u.idusuario=l.idusuario 
				GROUP by nomap
		";		
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);				
		$consulta->execute();
		return $consulta->fetchAll();	
	}	
	public static function Encuestas(){	
		$sql = "SELECT CONCAT(u.nombre,', ',u.apellido ) AS nomap,pregunta1,pregunta2,pregunta3,pregunta4,pregunta5,pregunta6,pregunta7,pregunta8,
		pregunta9,pregunta10,pregunta11,pregunta12,pregunta13,pregunta14,pregunta15,pregunta16,pregunta17,pregunta18,pregunta19,pregunta20 
		from encuestas e 
		LEFT join usuarios u on u.idusuario=e.idusuario 
		GROUP by nomap
		";		
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);				
		$consulta->execute();
		return $consulta->fetchAll();	
	}		
/*----------------------------------FIN ESTADISTICAS--------------------------------*/
/*----------------------------------INICIO ENCUESTAS--------------------------------*/	
/*SELECT preg.idpreg,preg.idpreg idpreg2, preg.descripcion as pregunta,resp.idresp, resp.descripcion as respuesta
FROM `preg-resp` as p 
join `preguntas` as preg on preg.idpreg=p.idpreg 
join `respuestas` as resp on resp.idresp=p.idresp 
order by preg.orden*/
	public static function ListadoPreguntas(){	
		$sql = "SELECT * from preguntas";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);				
		$consulta->execute();
		return $consulta->fetchAll();	
	} 
	public static function ListadoRespuestas(){	
		$sql = "SELECT r.*,pr.idpreg
		from respuestas as r 
		join `preg-resp` pr on pr.idresp=r.idresp
		order by r.orden
		";
		$consulta = AccesoDatos::ObtenerObjetoAccesoDatos()->ObtenerConsulta($sql);				
		$consulta->execute();
		return $consulta->fetchAll();	
	} 
/*----------------------------------FIN ESTADISTICAS--------------------------------*/

}