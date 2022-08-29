-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2022 at 11:26 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `agreement`
--

CREATE TABLE `agreement` (
  `id` int(11) NOT NULL,
  `printed_on` datetime NOT NULL DEFAULT current_timestamp(),
  `upload_on` datetime DEFAULT NULL,
  `file_url` varchar(100) NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `agreement`
--

INSERT INTO `agreement` (`id`, `printed_on`, `upload_on`, `file_url`, `status`) VALUES
(10, '2022-08-29 11:30:30', '2022-08-29 11:30:44', '1661752844631invesment2.pdf', 1),
(18, '2022-08-29 11:03:48', '2022-08-29 11:22:21', '1661752341567associate1.pdf', 1);

-- --------------------------------------------------------

--
-- Table structure for table `associate`
--

CREATE TABLE `associate` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `email` varchar(60) NOT NULL,
  `commission_rate` float NOT NULL,
  `agreement_id` int(11) DEFAULT NULL,
  `referred_by` int(11) DEFAULT NULL,
  `image` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `associate`
--

INSERT INTO `associate` (`id`, `full_name`, `phone_no`, `email`, `commission_rate`, `agreement_id`, `referred_by`, `image`, `pass`, `created_at`, `status`) VALUES
(1, 'Dummy user', '99999999', 'asssss@ass.in', 6, 18, NULL, '', '', '2022-08-28 21:06:35', 0);

-- --------------------------------------------------------

--
-- Table structure for table `bank_acccount`
--

CREATE TABLE `bank_acccount` (
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL,
  `account_no` varchar(60) NOT NULL,
  `ifsc_code` varchar(60) NOT NULL,
  `bank_name` varchar(60) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '1-verifyed 0-not verifed',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bank_acccount`
--

INSERT INTO `bank_acccount` (`user_id`, `user_type`, `account_no`, `ifsc_code`, `bank_name`, `status`, `created_at`) VALUES
(1, 1, '123458', 'IFSC0001', 'Test Bank', 1, '2022-08-28 17:01:25'),
(1, 1, '123489', 'IFSC0001', 'Test Bank', 1, '2022-08-28 17:01:32'),
(1, 1, '2227277272', 'IFSC0001', 'Test Bank', 1, '2022-08-28 17:01:43');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `full_name` varchar(60) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `email` varchar(60) NOT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1-active 0-block',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `full_name`, `phone_no`, `email`, `pass`, `image`, `status`, `created_at`) VALUES
(1, '', '', '', '$2b$10$d.p.MyLTrN23ISN87NHzm.J8F6Z12WPEEr3ZTqxr9FBfyw8AdKDfe', NULL, 0, '2022-08-29 08:01:32'),
(2, '', '', '', '$2b$10$.j4B2u.ct/nLqPIgY5BazObdvLKxZ7PwxLaNcswJrU6vNVgISl.Ri', NULL, 0, '2022-08-29 08:02:20'),
(3, '', '', 'xyz@gmail.com', '$2b$10$hYyxZYDf8K5SSyGuA76uSOHjkNbTDSroPkyKgnYxbIOWMC.01brQa', NULL, 0, '2022-08-29 08:02:41');

-- --------------------------------------------------------

--
-- Table structure for table `investment`
--

CREATE TABLE `investment` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `ammount` double NOT NULL,
  `commission_rate` float NOT NULL,
  `transaction_id` varchar(100) NOT NULL,
  `nominee_id` int(11) NOT NULL,
  `account_no` varchar(50) NOT NULL,
  `agreement_id` int(11) DEFAULT NULL,
  `referred_by` varchar(10) DEFAULT NULL COMMENT 'CRGPTYPE:00000',
  `customer_type` varchar(40) NOT NULL COMMENT 'Customer,Associate,Employee,Others'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `investment`
--

INSERT INTO `investment` (`id`, `customer_id`, `ammount`, `commission_rate`, `transaction_id`, `nominee_id`, `account_no`, `agreement_id`, `referred_by`, `customer_type`) VALUES
(2, 8, 8, 8, '174474747', 8, '8', 10, '8', '1'),
(3, 8, 8, 8, '174474747', 8, '8', NULL, '8', '1'),
(4, 1, 1222.999, 5, '1', 1, '7888677655', NULL, '1', '2');

-- --------------------------------------------------------

--
-- Table structure for table `nominee`
--

CREATE TABLE `nominee` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `dob` date NOT NULL,
  `customer_type` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nominee`
--

INSERT INTO `nominee` (`id`, `customer_id`, `name`, `dob`, `customer_type`) VALUES
(1, 1, 'Dummy Nominee', '0000-00-00', '1'),
(3, 1, 'Dummy Nominee Op', '2000-08-12', '3'),
(4, 1, 'Dummy iiiii', '2000-08-12', '3'),
(5, 1, 'Dummy Nominee 222', '2000-08-29', '1'),
(6, 1, 'Dummy Nominee 333', '2000-08-29', '1'),
(7, 1, 'Dummy Nominee 444', '2000-08-29', '1'),
(8, 1, 'Dummy Nominee 5555', '2000-08-29', '1'),
(9, 1, 'Dummy Nominee 6666', '2000-08-29', '1'),
(10, 1, 'Dummy Nominee 33333', '2000-08-29', '1'),
(11, 1, 'Test 1', '2000-08-29', '2'),
(12, 1, 'Test 2', '2000-08-29', '2'),
(13, 1, 'Test 3', '2000-08-29', '2'),
(14, 1, 'Test 4', '2000-08-29', '2'),
(15, 1, 'Test 5', '2000-08-29', '2');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `transaction_id` varchar(100) NOT NULL,
  `transaction_time` datetime NOT NULL DEFAULT current_timestamp(),
  `credit_to` varchar(60) NOT NULL,
  `debit_from` varchar(60) NOT NULL,
  `ammount` double NOT NULL,
  `payment_mode` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0-failed 1-success 2-invalid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`transaction_id`, `transaction_time`, `credit_to`, `debit_from`, `ammount`, `payment_mode`, `status`) VALUES
('1', '2022-08-28 15:01:51', '1', '1', 1222.999, 'Cash', 1),
('174474747', '2022-08-28 15:11:50', '2', '1', 1222.999, 'Online upi', 1),
('1744799999', '2022-08-28 15:12:05', '1', '2', 8999, 'Online upi', 1),
('1744799999', '2022-08-28 15:12:50', '5', '6', 8999, 'Bank', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_docs`
--

CREATE TABLE `user_docs` (
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL COMMENT '1-Customer 2-Associate 3-employee',
  `pan_no` varchar(20) NOT NULL,
  `adhar_no` varchar(20) NOT NULL,
  `adhar_status` varchar(50) NOT NULL,
  `address` varchar(500) DEFAULT NULL,
  `pan_status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_docs`
--

INSERT INTO `user_docs` (`user_id`, `user_type`, `pan_no`, `adhar_no`, `adhar_status`, `address`, `pan_status`) VALUES
(1, 2, 'MYPANNO122', '999 999 999 999', '1', 'Kolkata', '1'),
(1, 2, 'ANNNN', '999 999 999 999', '1', 'Kolkata', '1'),
(2, 2, 'NEWPANNO', '999 999 999 999', '1', 'Kolkata', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agreement`
--
ALTER TABLE `agreement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `associate`
--
ALTER TABLE `associate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `investment`
--
ALTER TABLE `investment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nominee`
--
ALTER TABLE `nominee`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agreement`
--
ALTER TABLE `agreement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `associate`
--
ALTER TABLE `associate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `investment`
--
ALTER TABLE `investment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `nominee`
--
ALTER TABLE `nominee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
