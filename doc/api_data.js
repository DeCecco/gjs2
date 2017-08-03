define({ "api": [
  {
    "type": "any",
    "url": "/Listados/",
    "title": "Listados",
    "version": "0.1.0",
    "name": "Listados",
    "group": "ESTADISTICAS",
    "description": "<p>Listado de las consultas de las estadisticas de BD</p>",
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.MayorProductoVendido().then(data => {\nPHP \t$response->withJson(Persona::MayorProductoVendido());",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "ESTADISTICAS"
  },
  {
    "type": "any",
    "url": "/Agregar/",
    "title": "Agregar",
    "version": "0.1.0",
    "name": "Agregar",
    "group": "LOCAL",
    "description": "<p>Agrega un local a la base de datos</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array_string",
            "optional": false,
            "field": "data",
            "description": "<p>Posee los datos a agregar, descripcion,localidad,calle y numero</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.AgregarLocal(array).then(data => {\nPHP \t$response->withJson(Persona::AgregarLocalidad($descripcion,$localidad,$calle,$numero));",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "LOCAL"
  },
  {
    "type": "any",
    "url": "/Eliminar/",
    "title": "Eliminar",
    "version": "0.1.0",
    "name": "Eliminar",
    "group": "LOCAL",
    "description": "<p>Elimina un local de la base de datos</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "data",
            "description": "<p>IdLocal</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.EliminarLocal(idlocal).then(data => {\nPHP \t$response->withJson(Persona::EliminarLocal($idlocal));",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "LOCAL"
  },
  {
    "type": "any",
    "url": "/Modificar/",
    "title": "Modificar",
    "version": "0.1.0",
    "name": "Modificar",
    "group": "LOCAL",
    "description": "<p>Modifica un local de la base de datos</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array_string",
            "optional": false,
            "field": "data",
            "description": "<p>Posee los datos a Modificar, descripcion,localidad,calle y numero</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.ModificarLocal(array).then(data => {\nPHP \t$response->withJson(Persona::ModificarLocalidad($descripcion,$localidad,$calle,$numero,$idlocal));",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "LOCAL"
  },
  {
    "type": "any",
    "url": "/Cambiar_Estado/",
    "title": "Cambiar Estado",
    "version": "0.1.0",
    "name": "Cambiar_Estado",
    "group": "PEDIDOS",
    "description": "<p>Cambia el estado del pedido siendo estos Finalizado Pendiente y Cancelado</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array_string",
            "optional": false,
            "field": "data",
            "description": "<p>Contiene el id del pedido y el id del estado</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.CambiarEstadoPedido(data).then(data => {\nPHP \t->withJson(Persona::CambiarEstadoPedido($idpedido,$estado));",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "PEDIDOS"
  },
  {
    "type": "any",
    "url": "/Listar/",
    "title": "Listar",
    "version": "0.1.0",
    "name": "ListarPedido",
    "group": "PEDIDOS",
    "description": "<p>Lista los pedidos dependiendo el usuario y el tipo de usuario</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array_string",
            "optional": false,
            "field": "data",
            "description": "<p>Contiene el id del rol y el id de usuario</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.ListadoPedidos(data).then(data => {\nPHP \t->withJson(Persona::ListadoPedidos($idusuario,$idrol));",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "PEDIDOS"
  },
  {
    "type": "any",
    "url": "/Alta/",
    "title": "Nuevo",
    "version": "0.1.0",
    "name": "NuevoPedido",
    "group": "PEDIDOS",
    "description": "<p>Da de alta nuevos pedidos</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array_string",
            "optional": false,
            "field": "data",
            "description": "<p>Contiene todos los datos del cliente.</p>"
          },
          {
            "group": "Parameter",
            "type": "array_string",
            "optional": false,
            "field": "pedidos",
            "description": "<p>Contiene el detalle del pedido.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.NuevoPedido(data, this.pedidos).then(data => {\nPHP \t->withJson(Persona::NuevoPedido($localidad,$calle,$numero,$piso,$dpto,$entrecalles,$comentarios,$idusuarioC,$local,$idusuario,$pedidos));",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "PEDIDOS"
  },
  {
    "type": "any",
    "url": "/Agregar/",
    "title": "Agregar",
    "version": "0.1.0",
    "name": "Agregar",
    "group": "PERSONAS",
    "description": "<p>Agrega un usuario a la base de datos</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array_string",
            "optional": false,
            "field": "data",
            "description": "<p>Posee los datos de la persona a agregar email nombre rol apellido dni cuenta ciudad etc</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.AgregarPersona(array).then(data => {\nPHP \t$response->withJson(Persona::InsertarPersona($email,$rol,$nombre,$apellido,$dni,$cuenta,$ciudad,$localidad,$calle,$numero,$piso,$dpto,$tel,$entrecalles));",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "PERSONAS"
  },
  {
    "type": "any",
    "url": "/Cambiar_Estado/",
    "title": "Cambiar_Estado",
    "version": "0.1.0",
    "name": "Cambiar_Estado",
    "group": "PERSONAS",
    "description": "<p>Modifica el estado de un usuario siendo estos activo o inactivo</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array_string",
            "optional": false,
            "field": "data",
            "description": "<p>Posee el id del usuario y el estado a modificar</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.ModificarEstadoUsuario(array).then(data => {\nPHP \t$response->withJson(Persona::ModificarPersonaEstado($estado,$idusuario));",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "PERSONAS"
  },
  {
    "type": "any",
    "url": "/Modificar/",
    "title": "Modificar",
    "version": "0.1.0",
    "name": "Modificar",
    "group": "PERSONAS",
    "description": "<p>Modifica un usuario de la base de datos</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array_string",
            "optional": false,
            "field": "data",
            "description": "<p>Posee los datos de la persona a Modificar email nombre rol apellido dni cuenta ciudad etc</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.ModificarPersona(array).then(data => {\nPHP \t$response->withJson(Persona::ModificarPersona($email,$rol,$nombre,$apellido,$dni,$cuenta,$ciudad,$localidad,$calle,$numero,$piso,$dpto,$tel,$entrecalles,$idusuario));",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "PERSONAS"
  },
  {
    "type": "any",
    "url": "/Agregar/",
    "title": "Agregar",
    "version": "0.1.0",
    "name": "Agregar",
    "group": "PRODUCTOS",
    "description": "<p>Agrega un producto a la base de datos</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array_string",
            "optional": false,
            "field": "data",
            "description": "<p>Posee los datos del producto a agregar descripcion corta y larga, precio costo y venta, si es una promocion y su imagen</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.AgregarProducto(array).then(data => {\nPHP \t$response->withJson(Persona::AgregarProducto($descripcion_larga,$descripcion_corta,$precio_costo,$precio_venta,$promocion,$imagen));",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "PRODUCTOS"
  },
  {
    "type": "any",
    "url": "/Listado/",
    "title": "Listado",
    "version": "0.1.0",
    "name": "Listado",
    "group": "PRODUCTOS",
    "description": "<p>Lista los productos en estado activos</p>",
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.ListarProductos().then(data => {\nPHP \t$response->withJson(Persona::ListarProductos());",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "PRODUCTOS"
  },
  {
    "type": "any",
    "url": "/Modificar/",
    "title": "Modificar",
    "version": "0.1.0",
    "name": "Modificar",
    "group": "PRODUCTOS",
    "description": "<p>Modificar un producto de la base de datos</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array_string",
            "optional": false,
            "field": "data",
            "description": "<p>Posee los datos del producto a Modificar id,descripcion corta y larga, precio costo y venta, si es una promocion y su imagen</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.ModificarProducto(array).then(data => {\nPHP \t$response->withJson(Persona::ModificarProducto($descripcion_larga,$descripcion_corta,$precio_costo,$precio_venta,$idprod,$promocion,$imagen));",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "PRODUCTOS"
  },
  {
    "type": "any",
    "url": "/Crear/",
    "title": "Crear",
    "version": "0.1.0",
    "name": "Crear",
    "group": "TOKEN",
    "description": "<p>Crea el token a partir de los datos del usuario y variables internas declaradas</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array_string",
            "optional": false,
            "field": "data",
            "description": "<p>Contiene el mail,rol,nombre,apellido,id,cuenta y dni del usuario logueado</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.CrearToken(array).then(data => {\nPHP \tAutentificadorJWT::CrearToken($datos);",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "TOKEN"
  },
  {
    "type": "any",
    "url": "/PayLoad/",
    "title": "PayLoad",
    "version": "0.1.0",
    "name": "PayLoad",
    "group": "TOKEN",
    "description": "<p>Decodifica el token y devuelve los datos del mismo</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Posee el token del usuario</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.PayLoad(token).then(data => {\nPHP \tAutentificadorJWT::ObtenerPayload($token);",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "TOKEN"
  },
  {
    "type": "any",
    "url": "/Verificar/",
    "title": "Verificar",
    "version": "0.1.0",
    "name": "Verificar",
    "group": "TOKEN",
    "description": "<p>Verifica que el token ingresado sea valido</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>Posee el token del usuario</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Como usarlo:",
        "content": "JS\tthis.WebserviceService.VerificarToken(token).then(data => {\nPHP \tAutentificadorJWT::verificarToken($token);",
        "type": "json"
      }
    ],
    "filename": "API/index.php",
    "groupTitle": "TOKEN"
  }
] });
