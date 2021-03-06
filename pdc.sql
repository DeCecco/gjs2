-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-07-2017 a las 20:29:12
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
(11, 'Moreno', 'Villa More', 'arce', 5589, '', '', 0, '');

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
(3, 'Local 3', 'Recoleta', 'Av Libertadorr', 1100, 'assets\\img\\local3.jpg');

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
(11, 7, 1, '225');

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
  `fecha` datetime NOT NULL,
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
(11, 6, 5, 1, 1, '2017-07-27 14:44:54', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios`
--

CREATE TABLE `precios` (
  `idprod` int(11) NOT NULL,
  `precio_costo` decimal(10,0) NOT NULL,
  `precio_venta` decimal(10,0) NOT NULL,
  `fecha` datetime NOT NULL
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
(8, '99', '155', '2017-07-27 11:19:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idprod` int(11) NOT NULL,
  `descripcion_corta` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion_larga` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `esoferta` tinyint(1) NOT NULL DEFAULT '0',
  `estado` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idprod`, `descripcion_corta`, `descripcion_larga`, `esoferta`, `estado`) VALUES
(1, 'Pizza mozzarella', 'Salsa de tomates frescos, mozzarella, oregano y aceitunas verdes.', 1, 1),
(2, 'Pizza mozzarella con anchoas', 'Salsa de tomates frescos, anchoas en aceite, oregano y aceitunas verdes.', 0, 1),
(3, 'Pizza con anchoas', '', 0, 1),
(4, 'Pizza napolitana', 'Salsa de tomates frescos, mozzarella, orégano y aceitunas verdes.\r\n', 0, 1),
(5, 'Pizza de jamón de cerdo natural', 'Salsa de tomates frescos, mozzarella, jamón.', 0, 1),
(6, 'Pizza de jamón de cerdo natural y morrones\r\n', 'Salsa de tomates frescos, mozzarella, jamón y morrones asados.\r\n', 0, 1),
(7, 'Promo Manolo  Pizza grande a eleccion ', ' ', 1, 1),
(8, 'Promo Francesca - Pizza chica a elección y  2 empanadas a elección', ' ', 1, 1);

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
(8, 'nombre', 'apellido', 'email@asd.com', 123123, 'asdasas', '123456', 4, 0),
(9, 'prueba', 'prueba', 'asda@ds.com', 123123123, 'asddsaasd', '123456', 4, 0),
(10, 'aaaaaaaaaaaa', 'aaaaaaaaaaaaa', 'aaaaaaaaaa@asaaa.com', 0, 'aaaaaaaaaaaaaaaaa', '123456', 4, 0),
(11, 'Luciana', 'Gonzalez', 'lgonzales@mail.com', 378890055, 'lgonzalez', '123456', 4, 1),
(12, 'Martin', 'prof', 'perof@masdil.com', 2147483647, 'profesor', '123456', 1, 1);

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
  MODIFY `idlocal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idpedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idprod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
