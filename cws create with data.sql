CREATE DATABASE  IF NOT EXISTS `cws_business` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cws_business`;
-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: cws_business
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountNumber` varchar(25) NOT NULL,
  `accountName` varchar(100) NOT NULL,
  `openDate` datetime DEFAULT NULL,
  `debtorAge` int(11) DEFAULT '0',
  `paymentTermDays` int(11) DEFAULT '0',
  `creditLimit` decimal(10,2) DEFAULT '0.00',
  `totalBalance` decimal(10,2) DEFAULT '0.00',
  `amountDue` decimal(10,2) DEFAULT '0.00',
  `currentBalance` decimal(10,2) DEFAULT '0.00',
  `days30` decimal(10,2) DEFAULT '0.00',
  `days60` decimal(10,2) DEFAULT '0.00',
  `days90` decimal(10,2) DEFAULT '0.00',
  `days120` decimal(10,2) DEFAULT '0.00',
  `days150` decimal(10,2) DEFAULT '0.00',
  `days180` decimal(10,2) DEFAULT '0.00',
  `days180Over` decimal(10,2) DEFAULT '0.00',
  `paymentMethod` varchar(100) DEFAULT NULL,
  `paymentDueDate` int(11) DEFAULT NULL,
  `debitOrderDate` int(11) DEFAULT NULL,
  `lastPaymentDate` datetime DEFAULT NULL,
  `lastPaymentAmount` decimal(10,2) DEFAULT '0.00',
  `lastPTPDate` datetime DEFAULT NULL,
  `lastPTPAmount` decimal(10,2) DEFAULT '0.00',
  `accountNotes` varchar(1000) DEFAULT NULL,
  `currentStatus` varchar(100) NOT NULL DEFAULT 'Open',
  `arg` varchar(45) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(100) NOT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `updatedBy` varchar(100) DEFAULT NULL,
  `caseDate` datetime DEFAULT NULL,
  `f_customerId` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2006 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1956,'3RD101','BAKGATLA BA KGAFELA INVESTMENT HOLDINGS (BBKIH)',NULL,0,7,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:06','System',NULL,NULL,'2020-08-03 21:12:00','3RD101'),(1957,'AIM101','MATTER INVESTMENTS (PTY) LTD','2020-08-03 00:00:00',0,30,0.00,29934.84,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','AIM101'),(1958,'ALJ101','ALJ CONSULTING','2020-08-03 00:00:00',0,30,0.00,34658.08,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','ALJ101'),(1959,'ATT102','BRONWYN BOTHA',NULL,0,30,0.00,8889.50,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','ATT102'),(1960,'BAC101','LUKE JOHN BACKOS',NULL,0,0,0.00,5000.01,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','BAC101'),(1961,'BBQ101','BBQ WORKSHOP','2020-08-03 00:00:00',0,30,0.00,23913.85,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','BBQ101'),(1962,'5OH012','JUERGEN SCHREIBER',NULL,0,7,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','5OH012'),(1963,'BON102','BONTIWORX (PTY) LTD',NULL,0,30,0.00,14947.70,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','BON102'),(1964,'AEO101','AEONOVA 360',NULL,0,0,0.00,16915.78,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','AEO101'),(1965,'CAP104','CAPRICORN INVESTMENT GROUP (PTY) LTD','2020-08-03 00:00:00',0,30,0.00,8746.28,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','CAP104'),(1966,'CEN102','CENTRAL PARK',NULL,0,0,0.00,87175.63,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','CEN102'),(1967,'CH0243','CHERISE ANSARA',NULL,0,0,0.00,5694.43,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','CH0243'),(1968,'CJS101','CRAZY JELLY STORE (PTY) LTD',NULL,0,30,0.00,5100.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','CJS101'),(1969,'COA101','ROCKING CONNECT PTY LTD',NULL,0,30,0.00,7343.87,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','COA101'),(1970,'COO104','COOL IDEAS SERVICE PROVIDER',NULL,0,30,0.00,32478.88,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','COO104'),(1971,'DGH101','D & G HOLDINGS (PTY) LTD/ D AND G HOLDINGS',NULL,0,30,0.00,4325.84,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','DGH101'),(1972,'DOR101','DORON DIAMONDS',NULL,0,30,0.00,19108.42,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','DOR101'),(1973,'DV1144','CANDICE ZAAIMAN','2020-08-03 00:00:00',0,0,0.00,12075.93,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','DV1144'),(1974,'GAT101','N GATTOO INC T/A GATTOO ATTORNEYS','2020-08-03 00:00:00',0,30,0.00,29895.40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','GAT101'),(1975,'GRA078','ODIEGWU TIMOTHY EKENE',NULL,0,7,0.00,4810.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','GRA078'),(1976,'GRA297','KIMENGWA NGAMBI','2020-08-03 00:00:00',0,0,0.00,5495.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','GRA297'),(1977,'GRA586','KATE MODIMA BODIBA',NULL,0,0,0.00,5206.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','GRA586'),(1978,'GRO101','PROPERTY HELPLINE (PTY) LTD','2020-08-03 00:00:00',0,30,0.00,21699.96,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','GRO101'),(1979,'HUA101','HUAMIN TRADING','2020-08-03 00:00:00',0,30,0.00,7355.44,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','HUA101'),(1980,'HVB101','HVB SERVICES SOUTH AFRICA (PTY LTD',NULL,0,30,0.00,5030.64,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','HVB101'),(1981,'ILK101','ILKA FINANCE (PTY) LTD',NULL,0,30,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','ILK101'),(1982,'IMA102','IMAGINE IPS','2020-08-03 00:00:00',0,30,0.00,6325.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','IMA102'),(1983,'INT103','INTDEV Internet Technologies',NULL,0,30,0.00,24150.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','INT103'),(1984,'JAB101','JAB DRIED FRUIT PRODUCTS (PTY) LTD','2020-08-03 00:00:00',0,0,0.00,37986.80,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','JAB101'),(1985,'LBV001','TANIA DU PLESSIS',NULL,0,0,0.00,6963.41,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','LBV001'),(1986,'MCC104','JUSTIN MCCALLUM',NULL,0,0,0.00,6863.01,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','MCC104'),(1987,'MLS101','SIMPLYFAI',NULL,0,30,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','MLS101'),(1988,'MON101','MDF MANAGEMENT HOLDINGS (PTY) LTD','2020-08-03 00:00:00',0,30,0.00,6367.36,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','MON101'),(1989,'MOS103','MUTSI PHAKISO MOSOEU','2020-08-03 00:00:00',0,0,0.00,5116.70,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','MOS103'),(1990,'MYE046','NIKALYE OLDJOHN','2020-08-03 00:00:00',0,7,0.00,4743.31,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','MYE046'),(1991,'NEP101','NEPIC (PTY) LTD',NULL,0,0,0.00,193540.40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','NEP101'),(1992,'NKA101','NKANYISO ICT (See Bureau report for Bukosini)',NULL,0,30,0.00,6325.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','NKA101'),(1993,'ONE201','ONELOGIX VDS',NULL,0,0,0.00,30395.82,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','ONE201'),(1994,'PAM101','DR PUCKS/COMOLINA',NULL,0,7,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','PAM101'),(1995,'PAT101','PATACHOU PATISSERIE (PTY) LTD',NULL,0,30,0.00,8301.21,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','PAT101'),(1996,'REV101','REVIEWKING (PTY) LTD',NULL,0,30,0.00,40919.90,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','REV101'),(1997,'RNS101','RADIO NETWORK SOLUTIONS','2020-08-03 00:00:00',0,30,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','RNS101'),(1998,'SAI102','SAICOM VOICE SERVICES (PTY) LTD','2020-08-03 00:00:00',0,30,0.00,7116.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','SAI102'),(1999,'SIB210','PAUL USIRI',NULL,0,0,0.00,6469.35,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','SIB210'),(2000,'SLI035','LYNETTE WATSON',NULL,0,0,0.00,5227.20,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','SLI035'),(2001,'SUP104','SUPERSPORT INTERNATIONAL',NULL,0,0,0.00,9348.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','SUP104'),(2002,'TLA141','FARREN PRETORIUS',NULL,0,0,0.00,8202.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','TLA141'),(2003,'TW0113','OSENI SAMUEL','2020-08-03 00:00:00',0,0,0.00,8634.10,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','TW0113'),(2004,'TW0247','RAJI MOSHOOD KOLAWOLE',NULL,0,7,0.00,5131.25,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','TW0247'),(2005,'TWA292','MATTHEW PEARCE','2020-08-03 00:00:00',0,0,0.00,5495.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,NULL,NULL,NULL,NULL,0.00,NULL,0.00,NULL,'Open',NULL,'2020-08-03 21:11:07','System',NULL,NULL,'2020-08-03 21:12:00','TWA292');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `regNumber` varchar(15) DEFAULT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address1` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `address3` varchar(45) DEFAULT NULL,
  `address4` varchar(45) DEFAULT NULL,
  `address5` varchar(45) DEFAULT NULL,
  `bankCode` varchar(10) DEFAULT NULL,
  `bankAccount` varchar(45) DEFAULT NULL,
  `revenue` int(11) DEFAULT '0',
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
  KEY `Secondary` (`createdBy`,`createdDate`,`updatedBy`,`updatedDate`,`regNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=574 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cases`
--

DROP TABLE IF EXISTS `cases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caseNumber` int(11) DEFAULT '0',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(100) NOT NULL,
  `currentAssignment` varchar(100) NOT NULL DEFAULT 'Unassigned',
  `initialAssignment` varchar(100) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `updatedBy` varchar(100) DEFAULT NULL,
  `reopenedDate` datetime DEFAULT NULL,
  `reopenedBy` varchar(100) DEFAULT NULL,
  `reassignedDate` datetime DEFAULT NULL,
  `reassignedBy` varchar(100) DEFAULT NULL,
  `pendReason` varchar(100) DEFAULT NULL,
  `caseNotes` varchar(1000) DEFAULT NULL,
  `currentStatus` varchar(45) NOT NULL DEFAULT 'Open',
  `caseReason` varchar(100) DEFAULT NULL,
  `lockedDatetime` datetime DEFAULT NULL,
  `f_accountNumber` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Secondary` (`currentAssignment`,`currentStatus`,`f_accountNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=2351 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cases`
--

LOCK TABLES `cases` WRITE;
/*!40000 ALTER TABLE `cases` DISABLE KEYS */;
INSERT INTO `cases` VALUES (2301,1,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'3RD101'),(2302,3,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Try and Trace Archie Cassim. Possible Owner. Previous email was a360cloud.com','Pended','Account In Arrears',NULL,'AEO101'),(2303,2,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'5OH012'),(2304,4,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'ARNAV JHUNJHUNWALA - ID Z3664792','Pended','Account In Arrears',NULL,'AIM101'),(2305,5,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'ALJ101'),(2306,6,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'ATT102'),(2307,7,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'BAC101'),(2308,8,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'ZORAN PECELJ, 681023XXXX08X | DIMITRIOS ARVANITIS, 560820XXX08X','Pended','Account In Arrears',NULL,'BBQ101'),(2309,9,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'BON102'),(2310,10,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'https://www.capricorn.com.na/Lists/ContactUs/NewCustomFormModal.aspx?Source=/','Pended','Account In Arrears',NULL,'CAP104'),(2311,11,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Multiple companies with similar name. Central Park Homeowners Assoc.stopped being managed by Trafalgar in 2012. Now Im tracking Stonewood Property Management','Open','Account In Arrears',NULL,'CEN102'),(2312,12,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'CH0243'),(2313,13,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'GUO DONG RICHARD JIANG, 910120XXXX08X','Open','Account In Arrears',NULL,'CJS101'),(2314,14,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'COA101'),(2315,15,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'JOOSTE ANDRE JACOBUS Director | DIEDERICKS, ROELOF FREDERIK Director | BUTSCHI, PAUL Director | REES-GIBBS, SHANE VICTOR Director','Pended','Account In Arrears',NULL,'COO104'),(2316,16,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'LANCELOT DENHERE, 700414XXXX08X | CHEGETAI BRIAN GUMBEZE, FN172795','Open','Account In Arrears',NULL,'DGH101'),(2317,17,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'DOR101'),(2318,18,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'DV1144'),(2319,19,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'GAT101'),(2320,20,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'GRA078'),(2321,21,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'GRA297'),(2322,22,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'GRA586'),(2323,23,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'GRO101'),(2324,24,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Name not found on CIPC records. Website is https://menusonline.co.za/huamin-chinese-takeaway-and-sushi-bar-emmarentia/menu/  .service is active - suspend and force client to contract afresh','Pended','Account In Arrears',NULL,'HUA101'),(2325,25,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'HVB101'),(2326,26,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'ILK101'),(2327,27,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Account is either for Entimex Education (https://www.entimex.com/contact/) or Imagine IPS (https://www.imagine.co.za/)','Pended','Account In Arrears',NULL,'IMA102'),(2328,28,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'INT103'),(2329,29,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'JAB101'),(2330,30,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'No contract once off invoice','Pended','Account In Arrears',NULL,'LBV001'),(2331,31,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'MCC104'),(2332,32,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'SIMPLYFAI - reg name is IGROUP SOLUTIONS','Pended','Account In Arrears',NULL,'MLS101'),(2333,33,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'LOURENS VAN RENSBURG, 690318XXXX08X | VAN DER WESTHUIZEN JACQUES HENRY, 731214XXXX08X','Pended','Account In Arrears',NULL,'MON101'),(2334,34,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'MOS103'),(2335,35,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'MYE046'),(2336,36,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'To be handed back to SADV. Do not action','Closed','Account In Arrears',NULL,'NEP101'),(2337,37,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'NKANYISO ICT (See Bureau report for Bukosini)','Pended','Account In Arrears',NULL,'NKA101'),(2338,38,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'NOT ON CRM/NO INFO ON ANY SYSTEM.. https://www.vdsgroup.co.za/… one logix vds in kempton park, 46 tulbach road - does vehicle delivery services - 011 396 9040','Pended','Account In Arrears',NULL,'ONE201'),(2339,39,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'Contract signed by Pam Golding representative.\r\nThe unsigned/not accepted quote is made out to COMOLINA SA (Pty) ltd 2012/166767/07 for wifi access point at Unit 115 Forty on Oak, Melrose Arch. Dlamini Ndihuwo would have signed','Pended','Account In Arrears',NULL,'PAM101'),(2340,40,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'PAT101'),(2341,41,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'WENTZEL, LINCOLN PATRICK Director','Pended','Account In Arrears',NULL,'REV101'),(2342,42,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'RNS101'),(2343,43,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'SAI102'),(2344,44,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'2 Passports','Pended','Account In Arrears',NULL,'SIB210'),(2345,45,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'SLI035'),(2346,46,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,'2separate companies of same name with same directors & address','Pended','Account In Arrears',NULL,'SUP104'),(2347,47,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'TLA141'),(2348,48,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'TW0113'),(2349,49,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'TW0247'),(2350,50,'1970-01-01 00:00:00','robson@sabco.za.com','eugener@sabco.za.com',NULL,'1970-01-01 00:00:00','eugener@sabco.za.com',NULL,NULL,NULL,NULL,NULL,NULL,'Pended','Account In Arrears',NULL,'TWA292');
/*!40000 ALTER TABLE `cases` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `clientservices`
--

LOCK TABLES `clientservices` WRITE;
/*!40000 ALTER TABLE `clientservices` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientservices` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `primaryContactName` varchar(100) DEFAULT NULL,
  `primaryContactNumber` varchar(13) DEFAULT NULL,
  `primaryContactEmail` varchar(100) DEFAULT NULL,
  `representativeName` varchar(100) DEFAULT NULL,
  `representativeNumber` varchar(13) DEFAULT NULL,
  `representativeEmail` varchar(100) DEFAULT NULL,
  `alternativeRepName` varchar(100) DEFAULT NULL,
  `alternativeRepNumber` varchar(13) DEFAULT NULL,
  `alternativeRepEmail` varchar(100) DEFAULT NULL,
  `otherNumber1` varchar(13) DEFAULT NULL,
  `otherNumber2` varchar(13) DEFAULT NULL,
  `otherNumber3` varchar(13) DEFAULT NULL,
  `otherNumber4` varchar(13) DEFAULT NULL,
  `otherNumber5` varchar(13) DEFAULT NULL,
  `otherEmail1` varchar(100) DEFAULT NULL,
  `otherEmail2` varchar(100) DEFAULT NULL,
  `otherEmail3` varchar(100) DEFAULT NULL,
  `otherEmail4` varchar(100) DEFAULT NULL,
  `otherEmail5` varchar(100) DEFAULT NULL,
  `dnc1` varchar(100) DEFAULT NULL,
  `dnc2` varchar(100) DEFAULT NULL,
  `dnc3` varchar(100) DEFAULT NULL,
  `dnc4` varchar(100) DEFAULT NULL,
  `dnc5` varchar(100) DEFAULT NULL,
  `f_accountNumber` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (51,NULL,'0113808099',NULL,'RINA VAN DER WESTHUIZEN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'noah@bbkih.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'3RD101'),(52,NULL,NULL,NULL,'JUERGEN SCHREIBER',NULL,NULL,'Cindy de Beer',NULL,'cindy.debeer@pamgolding.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'5OH012'),(53,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AEO101'),(54,NULL,NULL,NULL,NULL,NULL,NULL,'Aman',NULL,'aman@matterinv.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'AIM101'),(55,NULL,NULL,NULL,'SCHEKTER',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0790600367',NULL,NULL,NULL,NULL,'ALJ101'),(56,NULL,NULL,NULL,'BRONWYN BOTHA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ATT102'),(57,NULL,NULL,NULL,'LUKE JOHN BACKOS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BAC101'),(58,NULL,'0119531305',NULL,'Melody',NULL,NULL,'ZORAN PECELJ',NULL,'stefanp@mweb.co.za',NULL,NULL,NULL,NULL,NULL,'ellis@arvanitis.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BBQ101'),(59,NULL,NULL,NULL,'ALROY',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'invoices@ccgosa.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BON102'),(60,NULL,NULL,NULL,'Josie Gubeon',NULL,NULL,'KOBUS HOUGH','0823302075',NULL,NULL,NULL,NULL,NULL,NULL,' Jeconia.Kapia@capricorn.com.na','Nikola.Fahrbach@capricorn.com.na',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CAP104'),(61,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CEN102'),(62,NULL,NULL,NULL,'CHERISE ANSARA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CH0243'),(63,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'CJS101'),(64,NULL,NULL,NULL,'SHAWN JOOSTE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'COA101'),(65,NULL,NULL,NULL,'Michael van Onselen',NULL,NULL,NULL,NULL,'michell@coolideas.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'COO104'),(66,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DGH101'),(67,NULL,NULL,NULL,'Ben',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'info@dorondiamonds.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DOR101'),(68,NULL,NULL,NULL,'CANDICE ZAAIMAN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DV1144'),(69,NULL,'0114826568',NULL,'RAHEEMA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'GAT101'),(70,NULL,NULL,NULL,'ODIEGWU TIMOTHY EKENE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ismaila0104@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'GRA078'),(71,NULL,NULL,NULL,'KIMENGWA NGAMBI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'tk@torque.co.zm',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'GRA297'),(72,NULL,NULL,NULL,'KATE MODIMA BODIBA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'GRA586'),(73,NULL,NULL,NULL,'ANGELIQUE STEENKAMP',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'info@group7properties.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'GRO101'),(74,NULL,NULL,NULL,'KELLY WU',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'kirsten.zellmer@unicreditgroup.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'HUA101'),(75,NULL,NULL,NULL,'Dr Christian Nagele',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'HVB101'),(76,NULL,'0765589154',NULL,'RONEL PRETORIUS',NULL,NULL,'Brandon/Raymond/Kenneth Scheepers','0820712165','brandon@ilkafinance.co.za',NULL,NULL,NULL,NULL,NULL,'kenneth@ilkafinance.co.za','raymond@ilkafinance.co.za','brandon@ilkafinance.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ILK101'),(77,NULL,'0112147600',NULL,'Sabina Ramushu',NULL,NULL,'JANET LOTRIET','0112147600','accounts@entimex.com',NULL,NULL,NULL,NULL,NULL,'sales@imagine.co.za','helpdesk@imagine.co.za','jitesh.r@entimex.com','info@entimex.com',NULL,NULL,NULL,NULL,NULL,NULL,'IMA102'),(78,NULL,NULL,NULL,'SUPPORT',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'INT103'),(79,NULL,NULL,NULL,'JACO ROUX',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'JAB101'),(80,NULL,'0827325125',NULL,'TANIA DU PLESSIS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'LBV001'),(81,NULL,NULL,NULL,'JUSTIN MCCALLUM',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MCC104'),(82,NULL,NULL,NULL,'CHANTELLE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'marc@aisimple.com','johanita@simplyfai.com',NULL,NULL,NULL,'0105906244',NULL,NULL,NULL,NULL,'MLS101'),(83,NULL,NULL,NULL,'TIAAN PEENS',NULL,NULL,'Endri','0236141360','endri@montagusnacks.co.za',NULL,NULL,NULL,NULL,NULL,'Endri@mdfn.co.za','tiaan@mdfn.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MON101'),(84,NULL,NULL,NULL,'MUTSI PHAKISO MOSOEU',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MOS103'),(85,NULL,NULL,NULL,'NIKALYE OLDJOHN',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MYE046'),(86,NULL,NULL,NULL,'JAN KEYSER',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'denise@nepic.co.za','tarryn@nepic.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'NEP101'),(87,NULL,NULL,NULL,'PHUMLANI BUKOSINI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'NKA101'),(88,NULL,'0113969040',NULL,'LINDA GOVENDER',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'ONE201'),(89,NULL,'0116842996',NULL,'Onako',NULL,NULL,'Ndivhuwo Nelwamondo','0116842996','ndi.nelwamondo@pamgolding.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'PAM101'),(90,NULL,NULL,NULL,'Lloyd Barker',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'PAT101'),(91,NULL,NULL,NULL,'Lincoln Wentzel',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'accounts@reviewking.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'REV101'),(92,NULL,'0824460199',NULL,'VANESSA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'RNS101'),(93,NULL,NULL,NULL,'ANNETTE SPRULES',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'mercy@saicomvoice.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'SAI102'),(94,NULL,NULL,NULL,'PAUL USIRI',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'SIB210'),(95,NULL,NULL,NULL,'Lynette Watson',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0829298240',NULL,NULL,NULL,NULL,'SLI035'),(96,NULL,'0718832465',NULL,'KOSIE KOTZE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'sean.everett@supersport.co.za',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'SUP104'),(97,NULL,NULL,NULL,'FARREN PRETORIUS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'TLA141'),(98,NULL,NULL,NULL,'OSENI SAMUEL',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'TW0113'),(99,NULL,NULL,NULL,'RAJI MOSHOOD KOLAWOLE',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'TW0247'),(100,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'TWA292');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operatorShortCode` varchar(45) DEFAULT NULL,
  `customerRefNo` varchar(25) NOT NULL,
  `companyName` varchar(100) NOT NULL,
  `regNumber` varchar(45) DEFAULT NULL,
  `customerType` varchar(100) DEFAULT NULL,
  `productType` varchar(100) DEFAULT NULL,
  `address1` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `address3` varchar(45) DEFAULT NULL,
  `address4` varchar(45) DEFAULT NULL,
  `address5` varchar(45) DEFAULT NULL,
  `createdBy` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` varchar(45) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `closedBy` varchar(45) DEFAULT NULL,
  `closedDate` datetime DEFAULT NULL,
  `cipcStatus` varchar(100) DEFAULT NULL,
  `f_clientId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Secondary` (`createdBy`,`createdDate`,`updatedBy`,`updatedDate`,`regNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=1943 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1912,NULL,'3RD101','BAKGATLA BA KGAFELA INVESTMENT HOLDINGS (BBKIH)','2013/103761/07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1913,NULL,'AEO101','AEONOVA 360',NULL,'Business client',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,NULL,1),(1914,NULL,'AIM101','MATTER INVESTMENTS (PTY) LTD','2015/347727/07',NULL,'Business Unshaped Platinum',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1915,NULL,'ALJ101','ALJ CONSULTING','2016/330994/07',NULL,'Fibre Basics Business Uncapped',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'AR Deregistration Process',1),(1916,NULL,'BBQ101','BBQ WORKSHOP','2016/402942/07',NULL,'Retail Silver Extreme Capped 10Mb 100Gb1,024.86',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1917,NULL,'BON102','BONTIWORX (PTY) LTD','2015/032922/07','P30',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1918,NULL,'CAP104','CAPRICORN INVESTMENT GROUP (PTY) LTD','2016/076408/07',NULL,'Business Services Online Signup',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1919,NULL,'CEN102','CENTRAL PARK',NULL,'Business client','Once Installation',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,NULL,1),(1920,NULL,'CJS101','CRAZY JELLY STORE (PTY) LTD','2013/182168/07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1921,NULL,'COA101','ROCKING CONNECT PTY LTD','2013/047237/07','P30',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1922,NULL,'COO104','COOL IDEAS SERVICE PROVIDER','2016/046103/07','ISP',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1923,NULL,'DGH101','D & G HOLDINGS (PTY) LTD/ D AND G HOLDINGS','2018/547039/07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1924,NULL,'DOR101','DORON DIAMONDS','2001/085397/23','FTTB',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1925,NULL,'GAT101','N GATTOO INC T/A GATTOO ATTORNEYS','2009/019143/21',NULL,'Business Shaped Uncapped 50MB',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,NULL,1),(1926,NULL,'GRO101','PROPERTY HELPLINE (PTY) LTD','2015/097337/07',NULL,'Business Shaped Uncapped 50MB',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1927,NULL,'HUA101','HUAMIN TRADING','2011/113336/07',NULL,'Retail Silver Extreme Capped 10Mb 100Gb',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,NULL,1),(1928,NULL,'HVB101','HVB SERVICES SOUTH AFRICA (PTY LTD','2000/020353/07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,NULL,1),(1929,NULL,'ILK101','ILKA FINANCE (PTY) LTD','2005/027222/07','Business client',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'AR Deregistration Process',1),(1930,NULL,'IMA102','IMAGINE IPS',NULL,NULL,'Package not available',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,NULL,1),(1931,NULL,'INT103','INTDEV Internet Technologies','2003/030511/07','P30',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1932,NULL,'JAB101','JAB DRIED FRUIT PRODUCTS (PTY) LTD','2006/006974/07',NULL,'Fibre Paced Business Uncapped 20Mb',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'Final Liquidation',1),(1933,NULL,'MLS101','SIMPLYFAI','2015/137696/07','Business client',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1934,NULL,'MON101','MDF MANAGEMENT HOLDINGS (PTY) LTD','2010/006836/07',NULL,'Business Services Online Signup',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1935,NULL,'NEP101','NEPIC (PTY) LTD','2014/024218/07','ISP',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,NULL,1),(1936,NULL,'NKA101','NKANYISO ICT (See Bureau report for Bukosini)','2015232312/07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,NULL,1),(1937,NULL,'ONE201','ONELOGIX VDS',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,NULL,1),(1938,NULL,'PAT101','PATACHOU PATISSERIE (PTY) LTD','2015/198200/07',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'Voluntary Liquidation',1),(1939,NULL,'REV101','REVIEWKING (PTY) LTD','2016/179836/07','P30',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1940,NULL,'RNS101','RADIO NETWORK SOLUTIONS','2002/002514/07',NULL,'Package not available',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1941,NULL,'SAI102','SAICOM VOICE SERVICES (PTY) LTD','2000/000684/07',NULL,'Managed access Local Contended',NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,'In Business',1),(1942,NULL,'SUP104','SUPERSPORT INTERNATIONAL',NULL,'Business client',NULL,NULL,NULL,NULL,NULL,NULL,'System','2020-08-04 10:11:56',NULL,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

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
  `outcomeStatus` varchar(45) DEFAULT 'Open',
  `transactionType` varchar(45) DEFAULT NULL,
  `numberCalled` varchar(11) DEFAULT NULL,
  `emailUsed` varchar(100) DEFAULT NULL,
  `contactPerson` varchar(100) DEFAULT NULL,
  `outcome` varchar(100) DEFAULT NULL,
  `nextVisitDateTime` datetime DEFAULT NULL,
  `ptpDate` datetime DEFAULT NULL,
  `ptpAmount` decimal(10,2) DEFAULT '0.00',
  `debitResubmissionDate` datetime DEFAULT NULL,
  `debitResubmissionAmount` decimal(10,2) DEFAULT '0.00',
  `furtherAction` varchar(45) DEFAULT NULL,
  `actionDate` datetime DEFAULT NULL,
  `outcomeNotes` varchar(1000) DEFAULT NULL,
  `nextSteps` varchar(1000) DEFAULT NULL,
  `closedDate` datetime DEFAULT NULL,
  `closedBy` varchar(100) DEFAULT NULL,
  `f_caseNumber` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2855 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outcomes`
--

LOCK TABLES `outcomes` WRITE;
/*!40000 ALTER TABLE `outcomes` DISABLE KEYS */;
INSERT INTO `outcomes` VALUES (2791,'2020-07-28 10:05:01','eugener@sabco.za.com','Closed','Call','0745337046',NULL,'Rina V D Westhuizen (074)','Customer will return call',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Rina claims to have been retrenched in Nov 2018. Promised to get Mark Makabalu (new responsible person) to call me.','Follow Up Call',NULL,NULL,1),(2792,'2020-07-27 09:06:01','eugener@sabco.za.com','Closed','Call','0116842995',NULL,'Onako (Receptionsist)','Wrong Party Contact',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Pam Golding Hyde Park','Validate Debtor Against Contract',NULL,NULL,2),(2793,'2020-07-31 10:43:01','eugener@sabco.za.com','Closed','Call','0871351166',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Retrace for contact info','Retrace for Additional Contact Info',NULL,NULL,3),(2794,'2020-07-27 13:05:01','eugener@sabco.za.com','Closed','Call','0764231609',NULL,NULL,'Dispute - Service Never Used',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'As per Aman (0760200558 only signed contract never used service. Wants blacklistiting lifted - aman@matterinv.com - contract on file','Send Information Requested',NULL,NULL,4),(2795,'2020-07-28 10:29:01','eugener@sabco.za.com','Closed','Call','0764231609',NULL,'Sajil','Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Sajil recommended that I speak to Aman 076 020 0558, who did not pick up call','Follow Up Call',NULL,NULL,4),(2796,'2020-07-28 10:46:01','eugener@sabco.za.com','Closed','Call','0790600367',NULL,'Lebo','WPC',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Retrace for contact info','Retrace for Additional Contact Info',NULL,NULL,5),(2797,'2020-07-27 11:04:01','eugener@sabco.za.com','Closed','Call','0828932387',NULL,'Bronwyn Botha','Dispute - Incorrect Debtor',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Disputes liability. Claims to have been a tenant at a property at Millweed Estates, for which property the landlord was liable for data services','Validate Debtor Against Contract',NULL,NULL,6),(2798,'2020-07-28 09:00:01','eugener@sabco.za.com','Closed','Admin',NULL,NULL,NULL,'Contract Not Found',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Contract Not Found','Escalate for Investigation',NULL,NULL,6),(2799,'2020-07-27 10:54:01','eugener@sabco.za.com','Closed','Call','0836087774',NULL,'Luke Backos','Dispute - Incorrect Debtor',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Claims that he has never had a serivice','Validate Debtor Against Contract',NULL,NULL,7),(2800,'2020-07-28 10:34:01','eugener@sabco.za.com','Closed','Call','0825557107',NULL,'Zoran Peceli','Request for Information',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Confirmed that this Kyalami Branch - referred to Melody as Accountant 011-953 1305 (melody@arvanitis.co.za) - Zoran to be copied on stefanp@mweb.co.za','Send Information Requested',NULL,NULL,8),(2801,'2020-07-29 10:34:01','eugener@sabco.za.com','Closed','Email',NULL,NULL,'Zoran Peceli','Email Sent',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Statement of account emailed to customer','Follow Up Call',NULL,NULL,8),(2802,'2020-07-29 09:27:01','eugener@sabco.za.com','Closed','Call','0214621844',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'No response - shows as number of Lezmin 2414 (Pty) Ltd','Retrace for Additional Contact Info',NULL,NULL,9),(2803,'2020-07-28 10:50:01','eugener@sabco.za.com','Closed','Call','0823302075',NULL,'Mike','Call Back',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Mike called me back and advised that Josie Gubeon 082 772 0084 was relevant contact - no response from that number @ 10:54. No response at 16:04 also from \"Josie\'s number\" - call rejected','Follow Up Call',NULL,NULL,10),(2804,'2020-07-27 10:45:01','eugener@sabco.za.com','Closed','Call','0711539876',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'No response on 28 July. Still no response on 29 July','Follow Up Call',NULL,NULL,12),(2805,'2020-07-29 10:20:01','eugener@sabco.za.com','Closed','Call','0791081920',NULL,'Shawn Jooste','Dispute - Previously Cancelled',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Insists that he will not pay the account because he cancelled, was required to pay balance due before cancellation, paid but still billed','Escalate for Investigation',NULL,NULL,14),(2806,'2020-07-31 14:44:01','eugener@sabco.za.com','Closed','Call','0105932665',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'the switchboard was unable to put me to Michael but supplied an additional email for the account responsible person(Michell)','Follow Up Call',NULL,NULL,15),(2807,'2020-07-31 15:00:01','eugener@sabco.za.com','Closed','Email','0105932665',NULL,NULL,'Email Sent',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'THIS 2nd email rejected','Follow Up Call',NULL,NULL,15),(2808,'2020-07-28 10:07:01','eugener@sabco.za.com','Closed','Call','0213003954',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Need additional contact info','Retrace for Additional Contact Info',NULL,NULL,17),(2809,'2020-07-27 09:23:01','eugener@sabco.za.com','Closed','Call','0796759340',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'No response first day. No response 29/072020','Follow Up Call',NULL,NULL,18),(2810,'2020-07-27 11:51:01','eugener@sabco.za.com','Closed','Call','0796759340',NULL,'Candice Zaaiman','Dispute - Incorrect Balance',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Claims that SADV accounts people had erroneous info on  the account which was resolved 2 to 3 years ago hen she was last contacted','Escalate for Investigation',NULL,NULL,18),(2811,'2020-07-27 12:00:01','eugener@sabco.za.com','Closed','Email',NULL,NULL,NULL,'Email Sent',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Statement of account emailed to customer','Escalate for Investigation',NULL,NULL,18),(2812,'2020-07-28 10:48:01','eugener@sabco.za.com','Closed','Call','0784239998',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'second call at 16:43 rejected','Retrace for Additional Contact Info',NULL,NULL,19),(2813,'2020-07-27 11:26:01','eugener@sabco.za.com','Closed','Call','0620414261',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'number not available at moment','Follow Up Call',NULL,NULL,20),(2814,'2020-07-27 10:15:01','eugener@sabco.za.com','Closed','Call','0731537419',NULL,'Kimengwa Ngambi','Dispute - Previously Cancelled',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Claims he cancelled the account (telephonically) and left RSA for a year. Refuses to pay ','Escalate for Investigation',NULL,NULL,21),(2815,'2020-07-27 09:49:01','eugener@sabco.za.com','Closed','Call','0781430609',NULL,'Kate Bodiba','Dispute - Previously Cancelled',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Claims to have paid her account in full up to the time her services were terminated -','Escalate for Investigation',NULL,NULL,22),(2816,'2020-07-29 18:00:01','eugener@sabco.za.com','Closed','Call','0832826606',NULL,'ANGELIQUE STEENKAMP','Request for Information',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Angelique acknowledged indebtedness - said she sent a mail to SADV promising to pay once the COVID crisis is over and their business recovers','Send Information Requested',NULL,NULL,23),(2817,'2020-07-29 18:05:01','eugener@sabco.za.com','Closed','Email',NULL,NULL,NULL,'Email Sent',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Email sent requesting copy email sent by her to SADV','Follow Up Call',NULL,NULL,23),(2818,'2020-07-28 10:44:01','eugener@sabco.za.com','Closed','Call','0725119556',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'No contact. Retry','Follow Up Call',NULL,NULL,24),(2819,'2020-07-28 10:18:01','eugener@sabco.za.com','Closed','Call','0829020114',NULL,'Dr Christian Nagele','Debtor no longer exists',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Claims company woundup by Brian Dowden of Harris, Dowden & Fontein - 011 8847373 - Auditors - no company reg info. May indeed be wound-up. tried the Auditors number every day since 20200728 - goes to voice mail','Trace Attorneys/Liquidators',NULL,NULL,25),(2820,'2020-07-29 18:00:01','eugener@sabco.za.com','Closed','Call','0765589154',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'number 0765589154 obtained off contract called 18:12 on 29 July- no response','Retrace for Additional Contact Info',NULL,NULL,26),(2821,'2020-07-28 11:02:01','eugener@sabco.za.com','Closed','Call','0112147600',NULL,'Sabina Ramushu','Dispute - Incorrect Balance',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'seems to require a statement recon - sabinam@imagine.co.za','Send Information Requested',NULL,NULL,27),(2822,'2020-07-28 11:05:01','eugener@sabco.za.com','Closed','Email',NULL,NULL,NULL,'Email Sent',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Statement of account sent','Follow Up Call',NULL,NULL,27),(2823,'2020-07-29 09:20:01','eugener@sabco.za.com','Closed','Call','0110822727',NULL,'Barry','Wrong Party Contact',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Promised to revert to me - claimed he was responsible for debtors not creditors - On 20200731 number was uncontactble/probably blocked by SADV number. Reached Thobile by cell phone.','Send Information Requested',NULL,NULL,28),(2824,'2020-07-29 10:00:01','eugener@sabco.za.com','Closed','Email',NULL,NULL,NULL,'Email Sent',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Statement of account sent. e-Mail rejected/bounced at mail address supplied telephonically','Follow Up Call',NULL,NULL,28),(2825,'2020-07-31 10:44:01','eugener@sabco.za.com','Closed','Call','0137472161',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Customer Uncontactable','Retrace for Additional Contact Info',NULL,NULL,29),(2826,'2020-07-27 10:30:01','eugener@sabco.za.com','Closed','Call','0218829633',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'No such number','Retrace for Additional Contact Info',NULL,NULL,30),(2827,'2020-07-27 09:13:01','eugener@sabco.za.com','Closed','Call','0845995032',NULL,'Justin MCCallum','Dispute - Incorrect Debtor',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Justin claims service was for his company \"Velocity Cable Company\" who are in liquidation - Liquidators are Honey Inc (Donovan Majiet( Bloemfontein','Validate Debtor Against Contract',NULL,NULL,31),(2828,'2020-07-31 09:00:01','eugener@sabco.za.com','Closed','Call','0105906244',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'the person responded claimed that this was a private residence number','Retrace for Additional Contact Info',NULL,NULL,32),(2829,'2020-07-28 16:27:01','eugener@sabco.za.com','Closed','Call','0636865022',NULL,'Tiaan Peens','Request for Information',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Statement requested','Send Information Requested',NULL,NULL,33),(2830,'2020-07-28 17:27:01','eugener@sabco.za.com','Closed','Email',NULL,NULL,NULL,'Email Sent',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'sent statement to Tiaan(tiaan@montagusnacks.co.za) and Endri (the accountant023 614 1360) at endri@ montagusnacks.co.za - ','Follow Up Call',NULL,NULL,33),(2831,'2020-07-27 11:13:01','eugener@sabco.za.com','Closed','Call','0828174329',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Number seems incorrect','Retrace for Additional Contact Info',NULL,NULL,34),(2832,'2020-07-27 11:47:01','eugener@sabco.za.com','Closed','Call','0828174329',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'number not available at moment','Follow Up Call',NULL,NULL,34),(2833,'2020-07-27 11:18:01','eugener@sabco.za.com','Closed','Call','0734405505',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'straight to voice mail - no response','Follow Up Call',NULL,NULL,35),(2834,'2020-07-28 10:16:01','eugener@sabco.za.com','Closed','Call','0718630543',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Retrace for contact info. (See Bureau report for Bukosini)','Follow Up Call',NULL,NULL,37),(2835,'2020-07-31 09:00:01','eugener@sabco.za.com','Closed','Admin',NULL,NULL,NULL,'Handed back to SADV',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Account handed back to SADV to collect','Hand back to SADV',NULL,NULL,36),(2836,'2020-07-31 10:49:01','eugener@sabco.za.com','Closed','Call','0113969040',NULL,'Linda Govender','Request for Information',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Linda is FM and unaware of debt','Send Information Requested',NULL,NULL,38),(2837,'2020-07-31 10:51:01','eugener@sabco.za.com','Closed','Email',NULL,NULL,'Linda Govender','Email Sent',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Statement of account sent','Follow Up Call',NULL,NULL,38),(2838,'2020-07-27 09:31:01','eugener@sabco.za.com','Closed','Call','0116842996',NULL,'Onako (Receptionsist)','Dispute - Incorrect Debtor',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Pam Golding Hyde Park - Do knot know debtor or the represenattive per records','Validate Debtor Against Contract',NULL,NULL,39),(2839,'2020-07-31 14:37:01','eugener@sabco.za.com','Closed','Call','0118802610',NULL,'Lloyd Barker','Dispute - Service Never Used',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Llyod Barker responded at this number and claims to have no association with the company. He says his company \"Barker Insurance\" does have an account with SADV','Validate Debtor Against Contract',NULL,NULL,40),(2840,'2020-07-29 09:38:01','eugener@sabco.za.com','Closed','Call','0786737791',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Number out of service/not available','Retrace for Additional Contact Info',NULL,NULL,41),(2841,'2020-07-27 13:14:01','eugener@sabco.za.com','Closed','Call','0117942227',NULL,NULL,'Request for Information',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'was supplied with Vanessa\'s direct number 082 446 0199 - successful call wants invoice and statement','Send Information Requested',NULL,NULL,42),(2842,'2020-07-27 14:00:01','eugener@sabco.za.com','Closed','Email',NULL,NULL,NULL,'Email Sent',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Statement of account sent. Client wants invoice with statement','Send Information Requested',NULL,NULL,42),(2843,'2020-07-30 15:46:01','eugener@sabco.za.com','Closed','Call','0112830552',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Retrace for contact info','Retrace for Additional Contact Info',NULL,NULL,43),(2844,'2020-07-27 11:41:01','eugener@sabco.za.com','Closed','Call','0719313156',NULL,'Paul Usiri','Request for Information',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'asked for latest statement of accountand bank details - promised to pay','Send Information Requested',NULL,NULL,44),(2845,'2020-07-27 12:00:01','eugener@sabco.za.com','Closed','Email',NULL,NULL,NULL,'Email Sent',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Statement of account sent','Follow Up Call',NULL,NULL,44),(2846,'2020-07-27 10:24:01','eugener@sabco.za.com','Closed','Call','0829298240',NULL,'Manual Mashingayi','Wrong Party Contact',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Claims that this is not Lynette\'s number','Retrace for Additional Contact Info',NULL,NULL,45),(2847,'2020-07-30 15:57:01','eugener@sabco.za.com','Closed','Call','0166866879',NULL,'Kosie Kotze','Dispute - Incorrect Balance',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'sent statement to Kosie Kotze at mail he supplied. He calims that the account was settled years ago by his employee who has since left his company. Statement of account sent','Escalate for Investigation',NULL,NULL,46),(2848,'2020-07-27 09:39:01','eugener@sabco.za.com','Closed','Call','0726234326',NULL,'Farren Pretorius','PTP',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'No means to pay - unemployed - retrenched without benefits - awaits UIF - expects to pay by end August','Follow Up Call',NULL,NULL,47),(2849,'2020-07-27 11:31:01','eugener@sabco.za.com','Closed','Call','0631219337',NULL,'Samuel Oseni','Dispute - Previously Cancelled',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'first cut the call as soon as he heard the name SADV - then disputes liability on basis that he stopped using service 4 yrears ago','Escalate for Investigation',NULL,NULL,48),(2850,'2020-07-27 11:22:01','eugener@sabco.za.com','Closed','Call','0813947660',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'Number seems incorrect','Retrace for Additional Contact Info',NULL,NULL,49),(2851,'2020-07-29 18:00:01','eugener@sabco.za.com','Closed','Call','0614766463',NULL,NULL,'Uncontactable',NULL,NULL,0.00,NULL,0.00,NULL,NULL,'number 0614766463 obtained off contract called 18:11 on 29 July- no response','Retrace for Additional Contact Info',NULL,NULL,50),(2852,'2020-08-04 16:37:11','email@email.com','Pended','call','0111111','grinch@email.com','The Grinch','Outcome for the outcome',NULL,NULL,0.00,'2020-08-04 00:00:00',0.00,NULL,NULL,'Rina claims to have been retrenched in Nov 2018. Promised to get Mark Makabalu (new responsible person) to call me.\n\r2020-08-04 16:37:11 - email@email.com\nPend reason: code3\nNotes: Outcome notes for the testing of the notes','Who cares?',NULL,NULL,1),(2853,'2020-08-06 14:22:57','email@email.com','Open',NULL,NULL,NULL,NULL,NULL,'2020-08-01 12:00:00',NULL,0.00,'2020-08-06 00:00:00',0.00,NULL,NULL,'Rina claims to have been retrenched in Nov 2018. Promised to get Mark Makabalu (new responsible person) to call me.\n\r2020-08-06 14:22:57 - email@email.com\nPend reason: code1\nNotes: fkfkfkkfkfkfkfkffkfk',NULL,NULL,NULL,1),(2854,'2020-08-06 16:32:51','email@email.com','Closed','email',NULL,'gggggg','Joe Soap','hthththt','2020-07-30 00:00:00',NULL,0.00,NULL,0.00,NULL,NULL,'Rina claims to have been retrenched in Nov 2018. Promised to get Mark Makabalu (new responsible person) to call me.\n\r2020-08-06 16:32:51 - email@email.com\nPend reason: code2\nNotes: ghghghhghh','sesesesses',NULL,NULL,1);
/*!40000 ALTER TABLE `outcomes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-06 17:05:28
CREATE DATABASE  IF NOT EXISTS `cws_admin` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cws_admin`;
-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: cws_admin
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
-- Table structure for table `accountstatuses`
--

DROP TABLE IF EXISTS `accountstatuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountstatuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accountStatus` varchar(65) NOT NULL,
  `shortCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountstatuses`
--

LOCK TABLES `accountstatuses` WRITE;
/*!40000 ALTER TABLE `accountstatuses` DISABLE KEYS */;
INSERT INTO `accountstatuses` VALUES (6,'Active','Active'),(7,'Cancelled','Cancelled'),(8,'Suspended','Suspended');
/*!40000 ALTER TABLE `accountstatuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cipcStatuses`
--

DROP TABLE IF EXISTS `cipcStatuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cipcStatuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cipcStatus` varchar(65) NOT NULL,
  `shortCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cipcStatuses`
--

LOCK TABLES `cipcStatuses` WRITE;
/*!40000 ALTER TABLE `cipcStatuses` DISABLE KEYS */;
INSERT INTO `cipcStatuses` VALUES (6,'In Business','In Business'),(7,'Final Deregistration','Final Deregistration');
/*!40000 ALTER TABLE `cipcStatuses` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (5,'Sabco','2017/315489/07',NULL,NULL,1);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientservices`
--

DROP TABLE IF EXISTS `clientservices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientservices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `f_clientId` int(11) NOT NULL,
  `service` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientservices`
--

LOCK TABLES `clientservices` WRITE;
/*!40000 ALTER TABLE `clientservices` DISABLE KEYS */;
INSERT INTO `clientservices` VALUES (9,1,'collections','business');
/*!40000 ALTER TABLE `clientservices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outcomestatuses`
--

DROP TABLE IF EXISTS `outcomestatuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outcomestatuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `outcomestatus` varchar(65) NOT NULL,
  `shortCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outcomestatuses`
--

LOCK TABLES `outcomestatuses` WRITE;
/*!40000 ALTER TABLE `outcomestatuses` DISABLE KEYS */;
INSERT INTO `outcomestatuses` VALUES (6,'Closed','Closed'),(7,'Open','Open'),(8,'Pended','Pended');
/*!40000 ALTER TABLE `outcomestatuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pendreasons`
--

DROP TABLE IF EXISTS `pendreasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pendreasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pendreason` varchar(65) NOT NULL,
  `shortCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pendreasons`
--

LOCK TABLES `pendreasons` WRITE;
/*!40000 ALTER TABLE `pendreasons` DISABLE KEYS */;
INSERT INTO `pendreasons` VALUES (1,'Reason 1','code1'),(2,'Reason 2','code2'),(3,'Reason 3','code3');
/*!40000 ALTER TABLE `pendreasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resolutions`
--

DROP TABLE IF EXISTS `resolutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resolutions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resolution` varchar(65) NOT NULL,
  `shortCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resolutions`
--

LOCK TABLES `resolutions` WRITE;
/*!40000 ALTER TABLE `resolutions` DISABLE KEYS */;
INSERT INTO `resolutions` VALUES (1,'Customer requested a callback','callback'),(2,'Customer requested additional information','info'),(3,'Payment already made','paid'),(4,'Customer made PTP','ptp'),(5,'Customer disputed account','dispute');
/*!40000 ALTER TABLE `resolutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactiontypes`
--

DROP TABLE IF EXISTS `transactiontypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactiontypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transactiontype` varchar(65) NOT NULL,
  `shortCode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactiontypes`
--

LOCK TABLES `transactiontypes` WRITE;
/*!40000 ALTER TABLE `transactiontypes` DISABLE KEYS */;
INSERT INTO `transactiontypes` VALUES (6,'Admin','admin'),(7,'Call','call'),(8,'Email','email');
/*!40000 ALTER TABLE `transactiontypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `storeId` int(11) NOT NULL,
  `createdDate` datetime NOT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `updatedBy` varchar(100) DEFAULT NULL,
  `f_clientId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (35,'Sabco','Testing','sabco@email.com','01111','$2a$10$o9R9BOl25O748ZrfDWOfU.PCjOZR.ReEs4z45k8yx23IfL8biNUSy','agent','business',1,'2020-07-21 11:55:00',NULL,NULL,1),(36,'Darryll','Robinson','email@email.com','0111','$2a$10$LjJ0P4.rifyXD8SFrAAKWOtxQA8arXK3LZCBTGddp9s3JXy8eo9ja','god','business',1,'2020-07-23 09:14:00',NULL,NULL,1),(43,'Darryll','Robinson','darryllrobinson@icloud.com','0421853016','$2a$10$aQJkc3C1W87l377VSnAM/.u38i5gxXszSVwZEL4YkDsjCJeMiE6h6','agent','business',1,'2020-07-28 18:14:40',NULL,NULL,5);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-06 17:05:28
CREATE DATABASE  IF NOT EXISTS `cws_consumer` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `cws_consumer`;
