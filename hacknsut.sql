-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 31, 2019 at 06:01 AM
-- Server version: 10.1.38-MariaDB-0ubuntu0.18.04.1
-- PHP Version: 7.2.15-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hacknsut`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `docid` varchar(20) NOT NULL,
  `email` varchar(150) NOT NULL,
  `name` varchar(50) NOT NULL,
  `field` varchar(50) NOT NULL DEFAULT 'general',
  `hash` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`docid`, `email`, `name`, `field`, `hash`) VALUES
('1', 'sharma@ojaswa.me', 'sharma', 'general', '$2a$10$ZlrRNfxoA0awNvG0nz/iv.kuwIBwyakf/BjmLBy0HdiSLNV6nSesO');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `pid` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `number` varchar(13) NOT NULL,
  `name` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `dob` date NOT NULL,
  `address` varchar(100) NOT NULL,
  `verify` int(1) NOT NULL DEFAULT '0',
  `hash` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`pid`, `email`, `number`, `name`, `gender`, `dob`, `address`, `verify`, `hash`) VALUES
('PID-OJ291', 'manishmavi823@gmail.com', '9424542227', 'Ojaswa Sharma', 'male', '9999-02-03', '34\nChattri Chowk', 0, '$2a$10$NsN8QhGjTWA7YvqnvLbJveU8uF5XndFZ8n7S05ArOGIMntto9o96q'),
('PID-OJ612', 'premsarswat16@gmail.com', '9424542227', 'Ojaswa', 'male', '1998-06-23', 'address', 0, '$2a$10$8oy3/XO3AkaSnXwautHG2.uEd30kCCJg8nrdXETY3hus46MI3Mlaa'),
('PID-OJ886', 'ojaswa1942@gmail.com', '9424542227', 'Ojaswa', 'male', '1998-06-23', 'address', 0, '$2a$10$ZlrRNfxoA0awNvG0nz/iv.kuwIBwyakf/BjmLBy0HdiSLNV6nSesO'),
('PID-PR008', 'prmsrswt@gmail.com', '9950591608', 'Prem', 'male', '1999-06-22', 'Gwalior, MP', 0, '$2a$10$uCz025WjuSA8Qb65Rniw2OtF3m1HRHJku.rwMMX6O4D3Qilf7sQVm');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(40) NOT NULL,
  `pid` varchar(20) NOT NULL,
  `docid` varchar(20) NOT NULL,
  `hash` varchar(150) NOT NULL,
  `severity` varchar(40) NOT NULL DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`date`, `title`, `pid`, `docid`, `hash`, `severity`) VALUES
('2019-03-30 18:25:02', 'report', 'PID-OJ886', '1', '123', 'normal'),
('2019-03-31 03:58:52', 'Blood report', '', '1', 'QmXSFbUx8G1G3eyEHaVBzbcHuaCY2rsRC7r1Ct7nmroDjU', 'normal'),
('2019-03-31 04:01:22', 'blood report', '', '1', 'QmXSFbUx8G1G3eyEHaVBzbcHuaCY2rsRC7r1Ct7nmroDjU', 'normal'),
('2019-03-31 04:19:31', 'blood', '', '1', 'QmTLuoRyFqFmW91p8m4BRizF7Ke6rDzoUdZzmnD2Wd2sXf', 'normal'),
('2019-03-31 04:22:47', 'def', '', '1', 'QmXSFbUx8G1G3eyEHaVBzbcHuaCY2rsRC7r1Ct7nmroDjU', 'normal'),
('2019-03-31 04:26:58', 'asdfgh', '', '1', 'QmXSFbUx8G1G3eyEHaVBzbcHuaCY2rsRC7r1Ct7nmroDjU', 'normal'),
('2019-03-31 04:28:35', 'asdfgh', 'PID-PR008', '1', 'QmXSFbUx8G1G3eyEHaVBzbcHuaCY2rsRC7r1Ct7nmroDjU', 'normal'),
('2019-03-31 05:45:14', 'blood report', 'PID-PR008', '1', 'QmYeWxKEJSN8SMqae6qr2Bxb4btYXPvdnPjtxD6HVw6Hgr', 'normal');

-- --------------------------------------------------------

--
-- Table structure for table `verify`
--

CREATE TABLE `verify` (
  `email` varchar(50) NOT NULL,
  `hash` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `verify`
--

INSERT INTO `verify` (`email`, `hash`) VALUES
('ojaswa1942@gmail.com', '0MvAqfh6Dh8j5N6'),
('prmsrswt@gmail.com', '1FzzVfZgUpXsXeF'),
('premsarswat16@gmail.com', 'Bmp145JK26uhXte'),
('manishmavi823@gmail.com', 'hbOULtHAY4FRL6J');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `hash` (`hash`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`pid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `hash` (`hash`);

--
-- Indexes for table `verify`
--
ALTER TABLE `verify`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `hash` (`hash`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
