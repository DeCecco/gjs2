-- phpMyAdmin SQL Dump
-- version 4.0.10.14
-- http://www.phpmyadmin.net
--
-- Servidor: localhost:3306
-- Tiempo de generación: 07-12-2017 a las 16:43:39
-- Versión del servidor: 5.6.33
-- Versión de PHP: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `buenaacc_utn`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente-detalle`
--

CREATE TABLE IF NOT EXISTS `cliente-detalle` (
  `idusuario` int(11) NOT NULL,
  `ciudad` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `localidad` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `calle` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `numero` int(11) NOT NULL,
  `piso` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `dpto` varchar(5) COLLATE utf8_spanish_ci NOT NULL,
  `tel` int(20) NOT NULL,
  `entrecalles` varchar(120) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idusuario`)
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
(21, 'Buenos Aires', 'Monserrat', 'Lavalle', 315, '', '', 0, ''),
(24, 'caba', 'caba', 'Federico Lacroze', 3822, '1', 'E', 1140920705, 'Roseti y Fraga'),
(26, ' ', ' ', ' ', 0, '0', ' ', 0, ' '),
(27, 'CIUDAD AUTONOMA BUENOS AIRES', 'CIUDAD AUTONOMA BUENOS AIRES', ' Av Manuel Belgrano ', 600, '0', '', 0, ' '),
(28, 'caba', 'caba', 'Florida', 1369, '', '', 0, ''),
(31, 'caba', '', '', 0, '', '', 0, ''),
(39, '', '', '', 0, '', '', 0, ''),
(40, '', '', '', 0, '', '', 0, ''),
(41, 'caba', 'caba', 'Bartolome mitre ', 567, '', '', 0, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuestas`
--

CREATE TABLE IF NOT EXISTS `encuestas` (
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
-- Estructura de tabla para la tabla `encuestas2`
--

CREATE TABLE IF NOT EXISTS `encuestas2` (
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
-- Volcado de datos para la tabla `encuestas2`
--

INSERT INTO `encuestas2` (`pregunta1`, `pregunta2`, `pregunta3`, `pregunta4`, `pregunta5`, `pregunta6`, `pregunta7`, `pregunta8`, `pregunta9`, `pregunta10`, `pregunta11`, `pregunta12`, `pregunta13`, `pregunta14`, `pregunta15`, `pregunta16`, `pregunta17`, `pregunta18`, `pregunta19`, `pregunta20`) VALUES
(1, 5, 2, 2, 4, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 5, 1, 1, 3, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1, 4, 1, 1, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1, 6, 2, 3, 4, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE IF NOT EXISTS `estados` (
  `idestado` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idestado`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`idestado`, `descripcion`) VALUES
(1, 'Pendiente'),
(2, 'Cancelado'),
(3, 'Finalizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `local-producto`
--

CREATE TABLE IF NOT EXISTS `local-producto` (
  `idlocal` int(11) NOT NULL,
  `idprod` int(11) NOT NULL,
  PRIMARY KEY (`idlocal`,`idprod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `local-usuario`
--

CREATE TABLE IF NOT EXISTS `local-usuario` (
  `idlocal` int(11) NOT NULL,
  `idusuario` int(11) NOT NULL,
  PRIMARY KEY (`idlocal`,`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locales`
--

CREATE TABLE IF NOT EXISTS `locales` (
  `idlocal` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `localidad` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `calle` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `numero` int(20) NOT NULL,
  `img` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `img2` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `img3` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idlocal`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `locales`
--

INSERT INTO `locales` (`idlocal`, `descripcion`, `localidad`, `calle`, `numero`, `img`, `img2`, `img3`) VALUES
(1, 'Local 1', 'Palermo', 'Av sta Fe', 2580, 'assets\\img\\lc1.png', 'assets\\img\\lc2.png', 'assets\\img\\lc3.png'),
(2, 'Local 2', 'Belgrano', 'Av Cabildo', 356, 'assets\\img\\lc2.png', '', ''),
(3, 'Local 3', 'Recoleta', 'Av Libertador', 1100, 'assets\\img\\lc3.png', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logsingreso`
--

CREATE TABLE IF NOT EXISTS `logsingreso` (
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
(1, '2017-08-03 09:20:08'),
(1, '2017-08-03 10:28:52'),
(1, '2017-08-03 10:29:03'),
(3, '2017-08-03 10:29:28'),
(1, '2017-08-03 11:57:17'),
(5, '2017-08-03 13:05:27'),
(1, '2017-08-03 13:06:29'),
(5, '2017-08-03 13:42:34'),
(1, '2017-11-01 11:40:03'),
(1, '2017-11-01 11:40:51'),
(6, '2017-11-01 11:41:04'),
(6, '2017-11-01 12:19:23'),
(1, '2017-11-01 12:19:29'),
(1, '2017-11-01 12:19:47'),
(5, '2017-11-01 12:20:17'),
(3, '2017-11-01 12:20:21'),
(1, '2017-11-01 12:20:31'),
(1, '2017-11-09 14:15:14'),
(1, '2017-11-09 14:21:15'),
(5, '2017-11-09 14:21:24'),
(5, '2017-11-09 15:46:10'),
(5, '2017-11-09 15:49:00'),
(3, '2017-11-09 16:30:23'),
(6, '2017-11-09 16:30:28'),
(5, '2017-11-10 10:29:36'),
(5, '2017-11-10 10:34:20'),
(6, '2017-11-10 10:34:31'),
(1, '2017-11-22 15:57:07'),
(6, '2017-11-22 15:57:27'),
(1, '2017-11-23 10:15:56'),
(1, '2017-11-23 10:36:02'),
(1, '2017-11-23 10:37:14'),
(1, '2017-11-23 11:19:44'),
(3, '2017-11-23 12:55:08'),
(5, '2017-11-23 12:55:16'),
(5, '2017-11-23 13:08:57'),
(5, '2017-11-23 14:17:56'),
(3, '2017-11-23 14:18:26'),
(6, '2017-11-23 16:12:30'),
(6, '2017-11-23 16:12:44'),
(1, '2017-11-23 16:13:54'),
(6, '2017-11-23 16:17:46'),
(6, '2017-11-23 16:22:59'),
(1, '2017-11-23 17:14:54'),
(11, '2017-11-23 17:23:28'),
(5, '2017-11-24 09:54:10'),
(1, '2017-11-24 12:11:45'),
(5, '2017-11-24 12:11:48'),
(3, '2017-11-24 13:26:33'),
(1, '2017-11-24 14:49:24'),
(1, '2017-11-24 15:06:31'),
(5, '2017-11-24 15:06:50'),
(26, '2017-11-24 15:22:11'),
(27, '2017-11-24 15:35:25'),
(27, '2017-11-24 15:35:36'),
(27, '2017-11-24 15:36:06'),
(1, '2017-11-24 15:37:14'),
(39, '2017-11-24 16:35:45'),
(1, '2017-11-24 16:36:19'),
(39, '2017-11-24 16:36:39'),
(1, '2017-11-24 16:39:22'),
(5, '2017-11-24 16:59:14'),
(6, '2017-11-24 17:23:33'),
(1, '2017-11-27 09:42:25'),
(1, '2017-11-27 09:42:46'),
(1, '2017-11-27 09:43:43'),
(1, '2017-11-27 10:03:56'),
(1, '2017-11-27 10:32:39'),
(27, '2017-11-27 10:37:16'),
(1, '2017-11-27 11:06:06'),
(1, '2017-11-27 13:34:49'),
(1, '2017-11-27 13:58:00'),
(1, '2017-11-27 14:34:53'),
(1, '2017-11-27 14:39:23'),
(28, '2017-11-27 14:39:30'),
(1, '2017-11-27 15:42:40'),
(1, '2017-11-27 17:13:44'),
(40, '2017-11-27 17:32:47'),
(1, '2017-11-28 09:30:55'),
(26, '2017-11-28 10:08:46'),
(1, '2017-11-28 16:19:42'),
(6, '2017-11-28 16:30:21'),
(1, '2017-11-28 16:35:27'),
(6, '2017-11-28 17:16:43'),
(1, '2017-11-29 11:43:07'),
(1, '2017-11-29 14:15:46'),
(1, '2017-11-29 15:53:29'),
(1, '2017-11-29 16:54:59'),
(1, '2017-11-30 16:11:26'),
(3, '2017-11-30 16:11:33'),
(1, '2017-11-30 17:17:14'),
(3, '2017-11-30 17:27:38'),
(1, '2017-12-01 10:16:14'),
(14, '2017-12-01 10:16:42'),
(5, '2017-12-01 10:16:55'),
(1, '2017-12-01 15:08:31'),
(5, '2017-12-01 15:08:38'),
(1, '2017-12-01 15:38:34'),
(5, '2017-12-01 15:38:38'),
(1, '2017-12-06 10:22:44'),
(5, '2017-12-06 10:24:09'),
(1, '2017-12-06 11:47:26'),
(5, '2017-12-06 13:46:26'),
(1, '2017-12-06 16:08:08'),
(5, '2017-12-06 17:14:24'),
(1, '2017-12-06 17:15:16'),
(1, '2017-12-07 08:28:23'),
(5, '2017-12-07 08:28:39'),
(5, '2017-12-07 09:33:21'),
(5, '2017-12-07 09:42:14'),
(5, '2017-12-07 10:03:54'),
(5, '2017-12-07 10:15:15'),
(5, '2017-12-07 10:15:20'),
(5, '2017-12-07 10:15:27'),
(5, '2017-12-07 10:36:59'),
(1, '2017-12-07 11:07:28'),
(41, '2017-12-07 11:24:53'),
(3, '2017-12-07 11:43:19'),
(3, '2017-12-07 11:47:44'),
(1, '2017-12-07 11:50:47'),
(5, '2017-12-07 11:54:25'),
(5, '2017-12-07 13:04:22'),
(1, '2017-12-07 13:04:28'),
(3, '2017-12-07 13:04:32'),
(6, '2017-12-07 13:04:37'),
(6, '2017-12-07 15:04:25'),
(6, '2017-12-07 15:08:00'),
(1, '2017-12-07 15:21:55'),
(1, '2017-12-07 15:29:39'),
(41, '2017-12-07 15:29:56'),
(41, '2017-12-07 15:39:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido-detalle`
--

CREATE TABLE IF NOT EXISTS `pedido-detalle` (
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
(24, 14, 1, '167'),
(25, 1, 1, '164'),
(26, 8, 1, '155'),
(26, 7, 1, '225'),
(27, 8, 1, '155'),
(28, 5, 1, '189'),
(29, 14, 1, '167'),
(29, 4, 1, '181'),
(30, 2, 1, '172'),
(31, 2, 1, '172'),
(32, 8, 1, '155'),
(33, 5, 1, '189'),
(34, 5, 1, '189'),
(35, 5, 1, '189'),
(36, 6, 1, '198'),
(37, 8, 1, '125'),
(37, 7, 1, '150'),
(38, 5, 1, '300'),
(38, 4, 1, '181'),
(38, 16, 1, '250');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE IF NOT EXISTS `pedidos` (
  `idpedido` int(11) NOT NULL AUTO_INCREMENT,
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
  `comentarios` varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idpedido`,`idusuarioC`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=39 ;

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
(24, 14, 14, 3, 1, '2017-08-02 22:10:40', 'Belgrano', 'Federico Lacrozze', 550, 4, 'E', '', ''),
(25, 6, 6, 1, 1, '2017-11-01 11:46:19', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', ''),
(26, 6, 6, 1, 1, '2017-11-22 15:57:49', 'Palermo', 'Ancon', 5390, 4, 'D', 'Av Dorrego y Vias tren mitre', ''),
(27, 6, 3, 1, 2, '2017-11-24 14:08:50', 'Palermo', 'Ancon', 5390, 0, '', '', ''),
(28, 39, 39, 1, 2, '2017-11-24 16:38:19', 'caba', 'montes de oca', 300, 0, '', '', ''),
(29, 27, 27, 1, 3, '2017-11-27 10:37:34', 'CIUDAD AUTONOMA BUENOS AIRES', ' Av Manuel Belgrano ', 600, 0, '', ' ', ''),
(30, 27, 27, 1, 3, '2017-11-27 10:42:11', 'CIUDAD AUTONOMA BUENOS AIRES', ' Av Manuel Belgrano ', 600, 0, '', ' ', ''),
(31, 27, 27, 1, 3, '2017-11-27 10:43:07', 'CIUDAD AUTONOMA BUENOS AIRES', ' Av Manuel Belgrano ', 600, 0, '', ' ', ''),
(32, 27, 27, 1, 3, '2017-11-27 10:49:43', 'CIUDAD AUTONOMA BUENOS AIRES', ' Av Manuel Belgrano ', 600, 0, '', ' ', ''),
(33, 28, 28, 1, 3, '2017-11-27 14:39:41', 'caba', 'Florida', 1369, 0, '', '', ''),
(34, 28, 28, 1, 3, '2017-11-27 14:39:45', 'caba', 'Florida', 1369, 0, '', '', ''),
(35, 26, 26, 1, 3, '2017-11-28 10:09:37', 'CABA', 'luis maria campos ', 1300, 1, '500', 'zaraza', 'rapido'),
(36, 39, 3, 1, 2, '2017-11-30 17:43:02', 'CIUDAD AUTONOMA BUENOS AIRES', 'Federico Lacroze', 1369, 1, '5', '', ''),
(37, 41, 41, 1, 1, '2017-12-07 11:26:56', 'caba', 'Bartolome mitre ', 567, 0, '', '', ''),
(38, 41, 41, 1, 1, '2017-12-07 15:30:40', 'caba', 'Bartolome mitre ', 567, 0, '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precios`
--

CREATE TABLE IF NOT EXISTS `precios` (
  `idprod` int(11) NOT NULL,
  `precio_costo` decimal(10,0) NOT NULL,
  `precio_venta` decimal(10,0) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `precios`
--

INSERT INTO `precios` (`idprod`, `precio_costo`, `precio_venta`, `fecha`) VALUES
(2, '70', '172', '2017-07-12 00:23:27'),
(3, '46', '146', '2017-07-12 00:25:16'),
(4, '66', '181', '2017-07-12 00:25:53'),
(5, '80', '300', '2017-07-12 00:26:31'),
(6, '100', '198', '2017-07-12 00:26:44'),
(7, '100', '150', '2017-07-27 11:17:00'),
(14, '99', '167', '2017-07-27 15:59:30'),
(15, '50', '126', '2017-11-23 13:13:18'),
(16, '90', '250', '2017-11-24 17:02:58'),
(17, '10', '20', '2017-12-07 11:54:43'),
(18, '70', '160', '2017-12-07 11:56:33'),
(19, '70', '135', '2017-12-07 11:57:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preg-resp`
--

CREATE TABLE IF NOT EXISTS `preg-resp` (
  `idpreg` int(11) NOT NULL,
  `idresp` int(11) NOT NULL,
  PRIMARY KEY (`idpreg`,`idresp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `preg-resp`
--

INSERT INTO `preg-resp` (`idpreg`, `idresp`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 8),
(3, 1),
(3, 2),
(3, 3),
(4, 1),
(4, 2),
(4, 3),
(5, 3),
(5, 4),
(5, 5),
(5, 6),
(5, 8),
(6, 9),
(6, 10),
(6, 11),
(6, 12),
(6, 13),
(7, 14),
(7, 15),
(7, 16),
(8, 1),
(8, 2),
(9, 1),
(9, 2),
(9, 3),
(10, 4),
(10, 5),
(10, 6),
(10, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE IF NOT EXISTS `preguntas` (
  `idpreg` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `orden` int(11) NOT NULL,
  PRIMARY KEY (`idpreg`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`idpreg`, `descripcion`, `orden`) VALUES
(1, '¿Le gusta el sabor de nuestra pizza?', 1),
(2, '¿Cual es su grado de satisfacción con nuestra pizza?', 2),
(3, '¿La comida es de Buena calidad y abundante?', 3),
(4, 'Ofrece las mejores promociones', 4),
(5, '¿Qué le parece la variedad del producto?', 5),
(6, '¿Cómo se enteró de nosotros?', 6),
(7, '¿Cómo considera el tiempo de espera?', 7),
(8, '¿Nos recomendarias?', 8),
(9, '¿Pudo armar rapidamente su pedido?', 9),
(10, '¿Cual es su grado de satisfacción con respecto a nuestra atencion?\n', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE IF NOT EXISTS `productos` (
  `idprod` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion_corta` varchar(80) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion_larga` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `imagen` varchar(200) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'http://pablodececco.com.ar/assets/img/peppy.jpg',
  `imagen2` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `imagen3` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `esoferta` tinyint(1) NOT NULL DEFAULT '0',
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idprod`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=20 ;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idprod`, `descripcion_corta`, `descripcion_larga`, `imagen`, `imagen2`, `imagen3`, `esoferta`, `estado`) VALUES
(2, 'Pizza mozzarella con palmitos', 'Salsa de tomates frescos, queso mozzarella y palmitos', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/palmitos.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/palmitos.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/palmitos.jpg', 0, 1),
(3, 'Pizza blanca con queso Brie', 'Pizza sin salsa, queso brie y albahaca ', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/blancaalquesobrie.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/blancaalquesobrie2.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/blancaalquesobrie.jpg', 0, 1),
(4, 'Pizza napolitana', 'Salsa de tomates frescos, mozzarella, oregano y aceitunas verdes.', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/muzza.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/muzza.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/muzza.jpg', 1, 1),
(5, 'PROMO ESPECIAL', 'Pizza de palmitos, 6 empanadas de carne y pizza de jamon y morron', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/pizzamanolo.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/palmitos.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/emp-carne.jpg', 1, 1),
(6, 'Pizza de jamon de cerdo natural y morrones', 'Salsa de tomates frescos, mozzarella, jamon y morrones asados.', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/jamonycerdo.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/jamonycerdo.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/jamonycerdo.jpg', 0, 1),
(7, 'Promo Manolo  ', '12 empanadas de carne', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/emp-carne.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/napolitana.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/napolitana.jpg', 1, 1),
(14, 'Pizza 4 quesos', 'Salsa de tomates frescos, mozzarella, queso azul, parmesano y rulo de cabra', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/4quesos.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/4quesos.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/4quesos.jpg', 0, 1),
(15, 'Pizza Vegana', 'ESPECIAL SIN GLUTEN! - ', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/pizzavegan.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/pizzavegan.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/pizzavegan.jpg', 0, 1),
(16, 'Pizza con Champignones', 'Tomate, muzzarella y champignones.', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/pizzaconchampypan.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/pizzaconchampypan.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/pizzaconchampypan.jpg', 0, 1),
(18, 'PROMO 2', 'Pizza de muzzarella con dos empanadas de Carne', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/muzza.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/emp-carne.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/muzza.jpg', 1, 1),
(19, 'Calzone Especial', 'Calzone de jamon y queso', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/calzonenapo.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/calzonenapo.jpg', 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/calzonenapo.jpg', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE IF NOT EXISTS `respuestas` (
  `idresp` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `orden` int(11) NOT NULL,
  `tipo` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`idresp`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=17 ;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`idresp`, `descripcion`, `orden`, `tipo`) VALUES
(1, 'Si', 1, 'radio'),
(2, 'No', 2, 'radio'),
(3, 'Se podria mejorar', 3, 'radio'),
(4, 'Satisfecho', 1, 'radio'),
(5, 'Poco Satisfecho', 3, 'radio'),
(6, 'Muy Satisfecho', 2, 'radio'),
(8, 'Insatisfecho', 4, 'radio'),
(9, 'Redes Sociales', 1, 'checkbox'),
(10, 'Sitio Web', 2, 'checkbox'),
(11, 'Amigos', 3, 'checkbox'),
(12, 'Folletos', 4, 'checkbox'),
(13, 'Otra', 5, 'checkbox'),
(14, 'Rapido', 1, 'radio'),
(15, 'Considerable', 2, 'radio'),
(16, 'Mucho', 3, 'radio');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
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

CREATE TABLE IF NOT EXISTS `usuarios` (
  `idusuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `mail` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `dni` int(11) NOT NULL,
  `cuenta` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `idrol` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `mailunico` (`mail`),
  UNIQUE KEY `dniunico` (`dni`),
  UNIQUE KEY `cuentunica` (`cuenta`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci AUTO_INCREMENT=42 ;

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
(21, 'Richard', 'Zambrano', 'rza@maki.com', 66998790, 'richard', '123456', 4, 1),
(22, 'Richard', 'Zambrano', 'richard.zambrano@gmail.com', 12124545, 'rzambrano', '123456', 4, 0),
(23, 'RIIII', 'CHARD', 'richard@mail.com', 123123, 'richhh', '123456', 4, 0),
(24, 'Martin', 'Rios', 'mrios@gmail.com', 36235986, 'mrios', '123456', 4, 1),
(26, 'name', 'surname', 'name@surname.com', 121221, 'names', '123456', 4, 1),
(27, 'Oscar', 'Altamirano', 'oaltamirano@mail.com', 235989, 'oaltamirano', '123456', 4, 1),
(28, 'Sebastian', 'Salgueiro', 'ssalgueiro@mail.com', 1245, 'ssalgueiro', '123456', 4, 1),
(29, 'sarafino', 'asdasd', 'sarafino@mail.co', 1212, 'sarafino', '123456', 4, 0),
(31, 'Elizabeth', 'run', 'Elizabeth@gmail.com', 2323, 'Elizabeth', '123456', 4, 1),
(39, 'Eliza', 'the', 'Eliza@asdsda.com', 889, 'Eliza', '123456', 4, 1),
(40, 'Juan', 'Roman', 'jroman@mail.com', 232356, 'jroman', '123456', 4, 1),
(41, 'Pedro', 'Lopez', 'plopez@mail.com', 36528923, 'plopez', '123456', 4, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
