-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-08-2017 a las 15:15:30
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ags2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente-detalle`
--

CREATE TABLE `cliente-detalle` (
  `idusuario` int(11) NOT NULL,
  `ciudad` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `localidad` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `calle` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `numero` int(11) NOT NULL,
  `piso` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `dpto` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `tel` int(20) NOT NULL,
  `entrecalles` varchar(120) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cliente-detalle`
--

INSERT INTO `cliente-detalle` (`idusuario`, `ciudad`, `localidad`, `calle`, `numero`, `piso`, `dpto`, `tel`, `entrecalles`) VALUES
(6, 'Capital Federal', 'Palermo', 'Ancon', 5390, '4', 'D', 1140920705, 'Av Dorrego y Vias tren mitre'),
(11, 'CABA', 'Buenos Aires', 'Salta ', 500, '', '', 0, ''),
(13, 'pilar', 'del viso', 'penna', 1234, '', '', 0, ''),
(14, 'CABA', 'Belgrano', 'Federico Lacrozze', 550, '4', 'E', 1145788852, ''),
(20, 'Buenos Aires', 'Tortuguitas', 'Los Olivos', 1356, '0', ' ', 0, ' '),
(21, 'Buenos Aires', 'Monserrat', 'Lavalle', 315, '', '', 0, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE `encuestas` (
  `idusuario` int(11) NOT NULL,
  `pregunta1` int(11) NOT NULL,
  `pregunta2` int(11) NOT NULL,
  `pregunta3` int(11) NOT NULL,
  `pregunta4` int(11) NOT NULL,
  `pregunta5` int(11) NOT NULL,
  `pregunta6` int(11) NOT NULL,
  `pregunta7` int(11) NOT NULL,
  `pregunta8` int(11) NOT NULL,
  `pregunta9` int(11) NOT NULL,
  `pregunta10` int(11) NOT NULL,
  `pregunta11` int(11) NOT NULL,
  `pregunta12` int(11) NOT NULL,
  `pregunta13` int(11) NOT NULL,
  `pregunta14` int(11) NOT NULL,
  `pregunta15` int(11) NOT NULL,
  `pregunta16` int(11) NOT NULL,
  `pregunta17` int(11) NOT NULL,
  `pregunta18` int(11) NOT NULL,
  `pregunta19` int(11) NOT NULL,
  `pregunta20` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `encuestas`
--

INSERT INTO `encuestas` (`idusuario`, `pregunta1`, `pregunta2`, `pregunta3`, `pregunta4`, `pregunta5`, `pregunta6`, `pregunta7`, `pregunta8`, `pregunta9`, `pregunta10`, `pregunta11`, `pregunta12`, `pregunta13`, `pregunta14`, `pregunta15`, `pregunta16`, `pregunta17`, `pregunta18`, `pregunta19`, `pregunta20`) VALUES
(6, 27, 7, 40, 16, 16, 26, 15, 26, 11, 30, 21, 26, 13, 16, 7, 32, 6, 17, 10, 20),
(13, 17, 23, 17, 1, 10, 32, 9, 14, 26, 16, 19, 2, 9, 1, 4, 31, 18, 16, 6, 13),
(14, 21, 13, 9, 33, 6, 5, 4, 14, 22, 12, 6, 18, 7, 19, 7, 3, 39, 12, 27, 17),
(20, 27, 16, 5, 32, 10, 9, 8, 9, 3, 9, 18, 7, 5, 2, 1, 33, 25, 20, 3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `idestado` int(11) NOT NULL,
  `descripcion` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`idestado`, `descripcion`) VALUES
(1, 'Pendiente'),
(2, 'Cancelado'),
(3, 'Finalizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `local-usuario`
--

CREATE TABLE `local-usuario` (
  `idlocal` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locales`
--

CREATE TABLE `locales` (
  `idlocal` int(11) NOT NULL,
  `descripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `localidad` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `calle` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `numero` int(20) NOT NULL,
  `img` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `locales`
--

INSERT INTO `locales` (`idlocal`, `descripcion`, `localidad`, `calle`, `numero`, `img`) VALUES
(1, 'Local 1', 'Palermo', 'Av sta Fe', 2580, 'assets\\img\\local1.jpg'),
(2, 'Local 2', 'Belgrano', 'Av Cabildo', 356, 'assets\\img\\local2.jpg'),
(3, 'Local 3', 'Recoleta', 'Av Libertador', 1100, 'assets\\img\\local3.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logsingreso`
--

CREATE TABLE `logsingreso` (
  `idusuario` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `logsingreso`
--

INSERT INTO `logsingreso` (`idusuario`, `fecha`) VALUES
(5, '2017-08-03 01:50:59'),
(6, '2017-08-03 01:52:53'),
(1, '2017-08-03 01:53:00'),
(1, '2017-08-03 09:20:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido-detalle`
--

CREATE TABLE `pedido-detalle` (
  `idpedido` int(11) NOT NULL,
  `idproducto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_venta` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pedido-detalle`
--

INSERT INTO `pedido-detalle` (`idpedido`, `idproducto`, `cantidad`, `precio_venta`) VALUES
(4, 1, 1, '164'),
(4, 2, 1, '172'),
(4, 3, 1, '146'),
(5, 1, 1, '164'),
(5, 2, 1, '172'),
(5, 3, 1, '146'),
(6, 1, 1, '164'),
(6, 2, 1, '172'),
(6, 4, 1, '181'),
(7, 2, 1, '172'),
(7, 3, 1, '146'),
(7, 4, 1, '181'),
(8, 4, 1, '181'),
(8, 4, 1, '181'),
(9, 1, 1, '164'),
(9, 3, 1, '146'),
(10, 1, 1, '164'),
(10, 1, 1, '164'),
(11, 8, 1, '155'),
(11, 1, 1, '164'),
(11, 7, 1, '225'),
(12, 7, 1, '225'),
(13, 14, 1, '167'),
(13, 6, 1, '198'),
(14, 1, 1, '164'),
(15, 1, 1, '164'),
(15, 7, 1, '225'),
(16, 3, 1, '146'),
(16, 5, 1, '189'),
(16, 2, 1, '172'),
(17, 1, 1, '164'),
(18, 5, 1, '189'),
(18, 3, 1, '146'),
(18, 2, 1, '172'),
(19, 1, 1, '164'),
(20, 4, 1, '181'),
(21, 3, 1, '146'),
(22, 1, 1, '164'),
(23, 5, 1, '189'),
(24, 14, 1, '167');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idpedido` int(11) NOT NULL,
  `idusuarioC` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  `idestado` int(11) NOT NULL,
  `idlocal` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `localidad` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `calle` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `numero` int(11) NOT NULL,
  `piso` int(11) NOT NULL,
  `dpto` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `entrecalles` varchar(120) COLLATE utf8_spanish_ci NOT NULL,
  `comentarios` varchar(500) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`idpedido`, `idusuarioC`, `idusuario`, `idestado`, `idlocal`, `fecha`, `localidad`, `calle`, `numero`, `piso`, `dpto`, `entrecalles`, `comentarios`) VALUES
(4, 6, 5, 3, 1, '2017-07-22 16:51:57', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', ''),
(5, 6, 5, 3, 1, '2017-07-22 16:52:29', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', ''),
(6, 6, 6, 3, 1, '2017-07-22 16:56:18', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', 'la quiero ya negro!'),
(7, 6, 5, 3, 2, '2017-07-23 21:57:39', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', ''),
(8, 6, 5, 3, 1, '2017-07-23 21:57:50', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', ''),
(9, 6, 5, 3, 3, '2017-07-23 21:58:12', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', ''),
(10, 6, 5, 3, 3, '2017-07-27 11:14:27', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', 'Rapido Por favor'),
(11, 6, 5, 3, 1, '2017-07-27 14:44:54', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', ''),
(12, 6, 1, 3, 1, '2017-07-27 15:15:43', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', ''),
(13, 6, 1, 3, 1, '2017-07-27 16:00:41', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', ''),
(14, 13, 13, 3, 1, '2017-07-27 16:03:11', 'del viso', 'penna', 1234, 0, '', '', ''),
(15, 13, 3, 3, 3, '2017-07-27 16:10:50', 'del viso', 'penna', 1234, 0, '', '', ''),
(16, 0, 1, 3, 3, '2017-07-27 17:27:01', 'pilar', 'penna', 3434, 1, '4', 'No se', 'Muchos'),
(17, 11, 3, 3, 1, '2017-08-02 22:04:32', 'Villa More', 'arce', 5589, 0, '', '', ''),
(18, 20, 20, 3, 1, '2017-08-02 22:09:21', 'Tortuguitas', 'Los Olivos', 1356, 0, ' ', ' ', ''),
(19, 20, 20, 3, 1, '2017-08-02 22:09:28', 'Tortuguitas', 'Los Olivos', 1356, 0, ' ', ' ', ''),
(20, 20, 20, 3, 1, '2017-08-02 22:09:38', 'Tortuguitas', 'Los Olivos', 1356, 0, ' ', ' ', ''),
(21, 20, 20, 3, 1, '2017-08-02 22:09:45', 'Tortuguitas', 'Los Olivos', 1356, 0, ' ', ' ', ''),
(22, 14, 14, 3, 1, '2017-08-02 22:10:23', 'Belgrano', 'Federico Lacrozze', 550, 4, 'E', '', ''),
(23, 14, 14, 3, 1, '2017-08-02 22:10:33', 'Belgrano', 'Federico Lacrozze', 550, 4, 'E', '', ''),
(24, 14, 14, 3, 1, '2017-08-02 22:10:40', 'Belgrano', 'Federico Lacrozze', 550, 4, 'E', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios`
--

CREATE TABLE `precios` (
  `idprod` int(11) NOT NULL,
  `precio_costo` decimal(10,0) NOT NULL,
  `precio_venta` decimal(10,0) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `precios`
--

INSERT INTO `precios` (`idprod`, `precio_costo`, `precio_venta`, `fecha`) VALUES
(1, '60', '164', '2017-07-12 00:22:32'),
(2, '70', '172', '2017-07-12 00:23:27'),
(3, '46', '146', '2017-07-12 00:25:16'),
(4, '66', '181', '2017-07-12 00:25:53'),
(5, '80', '189', '2017-07-12 00:26:31'),
(6, '100', '198', '2017-07-12 00:26:44'),
(7, '100', '225', '2017-07-27 11:17:00'),
(8, '99', '155', '2017-07-27 11:19:45'),
(14, '99', '167', '2017-07-27 15:59:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idprod` int(11) NOT NULL,
  `descripcion_corta` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion_larga` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `imagen` varchar(200) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'http://pablodececco.com.ar/assets/img/peppy.jpg',
  `esoferta` tinyint(1) NOT NULL DEFAULT '0',
  `estado` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idprod`, `descripcion_corta`, `descripcion_larga`, `imagen`, `esoferta`, `estado`) VALUES
(1, 'Pizza mozzarella', 'Salsa de tomates frescos, mozzarella, oregano y aceitunas verdes.', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/mozza.jpg', 1, 1),
(2, 'Pizza mozzarella con anchoas', 'Salsa de tomates frescos, anchoas en aceite, oregano y aceitunas verdes.', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/anchoa.jpg', 0, 1),
(3, 'Pizza con anchoas', ' ', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/anchoa.jpg', 0, 1),
(4, 'Pizza napolitana', 'Salsa de tomates frescos, mozzarella, oregano y aceitunas verdes.', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/napo.png', 0, 1),
(5, 'Pizza de jamón de cerdo natural', 'Salsa de tomates frescos, mozzarella, jamón.', 'http://pablodececco.com.ar/assets/img/peppy.jpg', 0, 1),
(6, 'Pizza de jamon de cerdo natural y morrones', 'Salsa de tomates frescos, mozzarella, jamon y morrones asados.', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/morron.jpg', 0, 1),
(7, 'Promo Manolo  Pizza grande a eleccion ', ' ', 'http://pablodececco.com.ar/assets/img/peppy.jpg', 1, 1),
(8, 'Promo Francesca - Pizza chica a elección y  2 empanadas a elección', ' ', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/pizzaempa.jpg', 1, 1),
(14, 'Pizza napolitana con tomates cherrys', 'Salsa de tomates frescos, mozzarella, tomates cherry, queso parmesano estacionado, ajo y hojas frescas de albahaca.', 'http://pablodececco.com.ar/assets/img/peppy.jpg', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idrol` int(11) NOT NULL,
  `descripcion` varchar(60) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idrol`, `descripcion`) VALUES
(1, 'Administrador'),
(2, 'Encargado'),
(3, 'Empleado'),
(4, 'Cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL,
  `nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `mail` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `dni` int(11) NOT NULL,
  `cuenta` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `idrol` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `nombre`, `apellido`, `mail`, `dni`, `cuenta`, `password`, `idrol`, `estado`) VALUES
(1, 'Pablo', 'De Cecco', 'pablo.dececco@hotmail.com', 36073086, 'pdececco', '72256', 1, 1),
(3, 'Empleado', 'Empleado', 'empleado@empleado.com', 30302032, 'empleado', '123456', 3, 1),
(5, 'Encargado', 'Encargado', 'Encargado@Encargado.com', 202056, 'Encargado', '123456', 2, 1),
(6, 'Cliente', 'Clientes', 'Cliente@Cliente.com', 897845, 'Cliente', '123456', 4, 1),
(7, 'Luciana', 'Arrua', 'luarr@gfsa.com', 12451245, 'Luciana', '123456', 2, 1),
(11, 'Luciana', 'Gonzalez', 'lgonzales@mail.com', 378890055, 'lgonzalez', '123456', 4, 1),
(12, 'Martin', 'prof', 'perof@masdil.com', 2147483647, 'profesor', '123456', 1, 1),
(13, 'Jorge', 'de cecco', 'jdececco@mail.com', 321123213, 'jdececco', '123456', 4, 1),
(14, 'Nicolas', 'Avellaneda', 'navella@mail.com', 454578, 'nicoave', '123456', 4, 1),
(20, 'Juana', 'De Arco', 'juana@mail.com', 69850, 'Juana', '123456', 4, 1),
(21, 'Richard', 'Zambrano', 'rza@maki.com', 66998790, 'richard', '123456', 4, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`idestado`);

--
-- Indices de la tabla `locales`
--
ALTER TABLE `locales`
  ADD PRIMARY KEY (`idlocal`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idpedido`,`idusuarioC`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idprod`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`),
  ADD UNIQUE KEY `mailunico` (`mail`),
  ADD UNIQUE KEY `dniunico` (`dni`),
  ADD UNIQUE KEY `cuentunica` (`cuenta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `idestado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `locales`
--
ALTER TABLE `locales`
  MODIFY `idlocal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idpedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idprod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
