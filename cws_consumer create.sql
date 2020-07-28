CREATE DATABASE  IF NOT EXISTS `thesyste_cws_consumer` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `thesyste_cws_consumer`;
-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: cws_consumer
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `accountNumber` int(11) NOT NULL AUTO_INCREMENT,
  `debtorAge` int(11) NOT NULL DEFAULT '0',
  `caseDate` datetime DEFAULT NULL,
  `paymentTermDays` int(11) NOT NULL,
  `creditLimit` decimal(10,2) NOT NULL,
  `totalBalance` decimal(10,2) DEFAULT '0.00',
  `amountDue` decimal(10,2) DEFAULT '0.00',
  `currentBalance` decimal(10,2) DEFAULT '0.00',
  `days30` decimal(10,2) DEFAULT '0.00',
  `days60` decimal(10,2) DEFAULT '0.00',
  `days90` decimal(10,2) DEFAULT '0.00',
  `days120` decimal(10,2) DEFAULT '0.00',
  `days150` decimal(10,2) DEFAULT '0.00',
  `days180` decimal(10,2) DEFAULT '0.00',
  `paymentMethod` varchar(100) NOT NULL,
  `paymentDueDate` int(11) NOT NULL,
  `debitOrderDate` int(11) NOT NULL,
  `lastPaymentDate` datetime DEFAULT NULL,
  `lastPaymentAmount` decimal(10,2) DEFAULT '0.00',
  `lastPTPDate` datetime DEFAULT NULL,
  `lastPTPAmount` decimal(10,2) DEFAULT '0.00',
  `accountNotes` varchar(1000) DEFAULT NULL,
  `nextVisitDate` datetime DEFAULT NULL,
  `currentStatus` varchar(100) NOT NULL DEFAULT 'Current',
  `arg` varchar(45) DEFAULT NULL,
  `dateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(100) NOT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `updatedBy` varchar(100) DEFAULT NULL,
  `f_customerId` int(11) NOT NULL,
  PRIMARY KEY (`accountNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=1032 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `idNumber` varchar(15) DEFAULT NULL,
  `sex` varchar(1) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `numDependents` int(11) DEFAULT '0',
  `address1` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `address3` varchar(45) DEFAULT NULL,
  `address4` varchar(45) DEFAULT NULL,
  `address5` varchar(45) DEFAULT NULL,
  `residencyDuration` int(11) DEFAULT '0',
  `employer` varchar(100) DEFAULT NULL,
  `employmentDuration` int(11) DEFAULT '0',
  `bankCode` varchar(10) DEFAULT NULL,
  `bankAccount` varchar(45) DEFAULT NULL,
  `grossIncome` int(11) DEFAULT '0',
  `expenses` int(11) DEFAULT '0',
  `bureauScore` int(11) DEFAULT '0',
  `currentStatus` varchar(45) DEFAULT NULL,
  `limit` decimal(5,0) DEFAULT '0',
  `agentComments` varchar(2000) DEFAULT NULL,
  `storeComments` varchar(2000) DEFAULT NULL,
  `supervisorComments` varchar(2000) DEFAULT NULL,
  `createdBy` varchar(45) DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  `updatedBy` varchar(45) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `closedBy` varchar(45) DEFAULT NULL,
  `closedDate` datetime DEFAULT NULL,
  `bookedDate` datetime DEFAULT NULL,
  `f_clientId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Secondary` (`createdBy`,`createdDate`,`updatedBy`,`updatedDate`,`idNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=574 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `title` varchar(100) NOT NULL,
  `datePublished` datetime NOT NULL,
  `body` varchar(2500) NOT NULL,
  `tags` varchar(100) DEFAULT NULL,
  `likes` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cases`
--

DROP TABLE IF EXISTS `cases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(100) NOT NULL,
  `currentAssignment` varchar(100) NOT NULL DEFAULT 'Unassigned',
  `initialAssignment` varchar(100) NOT NULL DEFAULT 'Unassigned',
  `updatedDate` datetime DEFAULT NULL,
  `updatedBy` varchar(100) DEFAULT NULL,
  `reopenedDate` datetime DEFAULT NULL,
  `reopenedBy` varchar(100) DEFAULT NULL,
  `reassignedDate` datetime DEFAULT NULL,
  `reassignedBy` varchar(100) DEFAULT NULL,
  `caseReason` varchar(100) DEFAULT NULL,
  `caseNotes` varchar(1000) DEFAULT NULL,
  `currentStatus` varchar(45) NOT NULL DEFAULT 'Open',
  `f_accountNumber` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Secondary` (`currentAssignment`,`currentStatus`,`f_accountNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=457 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `regNum` varchar(45) DEFAULT NULL,
  `themes` varchar(45) DEFAULT NULL,
  `policies` varchar(45) DEFAULT NULL,
  `hasPaid` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clientservices`
--

DROP TABLE IF EXISTS `clientservices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientservices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `f_id` int(11) NOT NULL,
  `service` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `dateComment` datetime NOT NULL,
  `comment` varchar(250) NOT NULL,
  `likes` int(11) DEFAULT '0',
  `f_blogId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `idNumber` varchar(15) NOT NULL,
  `sex` varchar(1) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `dob` datetime NOT NULL,
  `address1` varchar(45) NOT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `address3` varchar(45) DEFAULT NULL,
  `address4` varchar(45) NOT NULL,
  `address5` varchar(45) NOT NULL,
  `employer` varchar(100) NOT NULL,
  `createdBy` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(45) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `closedBy` varchar(45) DEFAULT NULL,
  `closedDate` datetime DEFAULT NULL,
  `f_clientId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Secondary` (`createdBy`,`createdDate`,`updatedBy`,`updatedDate`,`idNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=959 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `declines`
--

DROP TABLE IF EXISTS `declines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `declines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(5) NOT NULL,
  `short` varchar(45) NOT NULL,
  `description` varchar(100) NOT NULL,
  `createdBy` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedBy` varchar(45) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `outcomes`
--

DROP TABLE IF EXISTS `outcomes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outcomes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(100) NOT NULL,
  `resolution` varchar(45) DEFAULT NULL,
  `nextVisitDate` datetime DEFAULT NULL,
  `ptpDate` datetime DEFAULT NULL,
  `ptpAmount` decimal(10,2) DEFAULT '0.00',
  `debitResubmissionDate` datetime DEFAULT NULL,
  `debitResubmissionAmount` decimal(10,2) DEFAULT '0.00',
  `furtherAction` varchar(45) DEFAULT NULL,
  `actionDate` datetime DEFAULT NULL,
  `actionNotes` varchar(1000) DEFAULT NULL,
  `comments` varchar(1000) DEFAULT NULL,
  `closedDate` datetime DEFAULT NULL,
  `closedBy` varchar(100) DEFAULT NULL,
  `f_caseNumber` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `scorecards`
--

DROP TABLE IF EXISTS `scorecards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scorecards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clientCode` int(11) NOT NULL,
  `code` varchar(5) NOT NULL,
  `short` varchar(45) NOT NULL,
  `description` varchar(100) NOT NULL,
  `points` int(11) NOT NULL,
  `answer` varchar(100) NOT NULL,
  `operational` int(11) NOT NULL,
  `createdBy` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedBy` varchar(45) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `loginDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-24 12:30:38
