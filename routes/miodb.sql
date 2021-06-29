-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 22, 2021 alle 09:44
-- Versione del server: 5.7.17
-- Versione PHP: 7.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `miodb`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `autista`
--

CREATE TABLE `autista` (
  `id_autista` int(11) NOT NULL,
  `nome` varchar(80) NOT NULL,
  `cognome` varchar(80) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `città`
--

CREATE TABLE `città` (
  `nome` varchar(80) NOT NULL,
  `id_citta` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `città`
--

INSERT INTO `città` (`nome`, `id_citta`) VALUES
('Palermo', 1),
('Milano', 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `prenota`
--

CREATE TABLE `prenota` (
  `id_prenotazione` int(11) NOT NULL,
  `id_utente` int(1) NOT NULL,
  `id_veicolo` varchar(80) NOT NULL,
  `id_autista` int(11) DEFAULT NULL,
  `patente_conducente` varchar(80) DEFAULT NULL,
  `prezzo` int(11) NOT NULL,
  `data_inizio` date NOT NULL,
  `data_fine` date NOT NULL,
  `ora_inizio` time NOT NULL,
  `ora_fine` time NOT NULL,
  `id_citta_ritiro` int(11) NOT NULL,
  `id_citta_riconsegna` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `prenota`
--

INSERT INTO `prenota` (`id_prenotazione`, `id_utente`, `id_veicolo`, `id_autista`, `patente_conducente`, `prezzo`, `data_inizio`, `data_fine`, `ora_inizio`, `ora_fine`, `id_citta_ritiro`, `id_citta_riconsegna`) VALUES
(85, 1, '2', NULL, '', 25, '2021-06-22', '2021-06-24', '05:00:00', '06:00:00', 1, 2),
(86, 2, '1', NULL, '', 20, '2021-06-15', '2021-06-17', '06:00:00', '00:22:00', 1, 1),
(87, 3, '3', NULL, '', 30, '2021-06-24', '2021-06-18', '11:00:00', '00:28:00', 1, 1),
(88, 4, '4', NULL, '', 40, '2021-06-09', '2021-06-11', '02:00:00', '08:00:00', 1, 1),
(89, 9, 'AB345CD', NULL, '', 40, '2021-06-23', '2021-06-27', '01:00:00', '22:03:00', 1, 1),
(90, 9, 'AA123AA', NULL, '', 30, '2021-06-23', '2021-06-23', '13:39:00', '12:41:00', 1, 1),
(91, 9, 'AA123AA', NULL, '', 30, '2021-06-26', '2021-07-01', '15:18:00', '16:18:00', 1, 1),
(92, 9, 'AA123AA', NULL, NULL, 60, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(93, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(94, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(95, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(96, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(97, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(98, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(99, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(100, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(101, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(102, 9, 'AB345CD', NULL, '', 145, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(103, 9, 'AB345CD', NULL, NULL, 40, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(104, 9, 'AB345CD', NULL, NULL, 40, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(105, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(106, 9, 'AB345CD', NULL, NULL, 40, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(107, 9, 'AB345CD', NULL, NULL, 40, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(108, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(109, 9, 'AB345CD', NULL, NULL, 40, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(110, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(111, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(112, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(113, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(114, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(115, 9, 'AB345CD', NULL, NULL, 40, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(116, 9, 'AA123AA', NULL, NULL, 30, '2021-06-16', '2021-06-22', '20:50:00', '21:50:00', 1, 1),
(117, 9, 'AB345CD', NULL, NULL, 56, '2021-06-24', '2021-06-25', '14:33:00', '14:34:00', 5, 2);

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `id_utente` int(1) NOT NULL,
  `nome` varchar(80) NOT NULL,
  `cognome` varchar(80) NOT NULL,
  `regione` varchar(80) NOT NULL,
  `provincia` varchar(80) NOT NULL,
  `comune` varchar(80) NOT NULL,
  `datanascita` date NOT NULL,
  `email` varchar(80) NOT NULL,
  `username` varchar(80) NOT NULL,
  `password` varchar(256) NOT NULL,
  `codicef` varchar(80) NOT NULL,
  `codicec` varchar(80) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`id_utente`, `nome`, `cognome`, `regione`, `provincia`, `comune`, `datanascita`, `email`, `username`, `password`, `codicef`, `codicec`) VALUES
(9, 'ggg', 'gggg', 'ggg', 'ggg', 'ggg', '2021-06-16', 'ggg', 'ggg', 'b133a0c0e9bee3be20163d2ad31d6248db292aa6dcb1ee087a2aa50e0fc75ae2', '123AB', '123AB'),
(8, 'Gabriele', 'Salemi', '13', 'VS', '09040', '2021-06-22', 'gabriele.salemi@hotmail.it', 'yelemetrico17', '76f13aef3c0bb1e5a6d8416aed640624c9530150c2d1833a8fc1adb78e16a5b6', '123AB', '123AB'),
(10, 'Gabriele', 'Salemi', '9', 'PU', '61040', '2021-06-23', 'gab@hot.it', 'uuu', 'fca81d0c1cfb8cf1aaa7fe04a0d11ff83488c611a8ec12bad6abd95772e02b09', '123AB', '123AB');

-- --------------------------------------------------------

--
-- Struttura della tabella `veicolo`
--

CREATE TABLE `veicolo` (
  `id` int(1) NOT NULL,
  `marca` varchar(80) NOT NULL,
  `nome` varchar(80) NOT NULL,
  `targa` varchar(80) NOT NULL,
  `prezzo` int(11) NOT NULL,
  `tipo_veicolo` varchar(80) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `veicolo`
--

INSERT INTO `veicolo` (`id`, `marca`, `nome`, `targa`, `prezzo`, `tipo_veicolo`) VALUES
(1, 'citroen', 'c4', 'AB123CD', 20, 'macchina'),
(2, 'citroen', 'c3', 'CD123RE', 20, 'macchina'),
(3, 'citroen', 'c2', 'AA123AA', 30, 'macchina'),
(4, 'Mazda', 'm4', 'AB345CD', 40, 'macchina');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `città`
--
ALTER TABLE `città`
  ADD PRIMARY KEY (`id_citta`);

--
-- Indici per le tabelle `prenota`
--
ALTER TABLE `prenota`
  ADD PRIMARY KEY (`id_prenotazione`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`id_utente`);

--
-- Indici per le tabelle `veicolo`
--
ALTER TABLE `veicolo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `prenota`
--
ALTER TABLE `prenota`
  MODIFY `id_prenotazione` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
--
-- AUTO_INCREMENT per la tabella `utente`
--
ALTER TABLE `utente`
  MODIFY `id_utente` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
