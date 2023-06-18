-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Lun 12 Juin 2023 à 11:01
-- Version du serveur :  5.7.11
-- Version de PHP :  5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `we4b`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `ID` int(8) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `category`
--

INSERT INTO `category` (`ID`, `name`) VALUES
(1, ''),
(2, 'Solo'),
(3, 'Multiplayer'),
(4, 'Adventure'),
(5, 'FPS'),
(6, 'Puzzle'),
(7, 'Open World'),
(8, 'RPG'),
(9, 'Strategy'),
(10, 'Simulation'),
(11, 'MOBA'),
(12, 'Retro');

-- --------------------------------------------------------

--
-- Structure de la table `categorygame`
--

CREATE TABLE `categorygame` (
  `ID` int(8) NOT NULL,
  `ID_category` int(8) NOT NULL,
  `ID_game` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `categorygame`
--

INSERT INTO `categorygame` (`ID`, `ID_category`, `ID_game`) VALUES
(4, 6, 19),
(5, 10, 19),
(6, 12, 19),
(7, 3, 20),
(8, 8, 20),
(9, 12, 20),
(10, 7, 20),
(11, 4, 21),
(12, 9, 21),
(13, 2, 22),
(14, 8, 22),
(15, 12, 22),
(16, 4, 23),
(17, 7, 23),
(18, 10, 23);

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `ID` int(8) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `ID_game` int(8) NOT NULL,
  `ID_user` int(8) NOT NULL,
  `note` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `game`
--

CREATE TABLE `game` (
  `ID` int(8) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `dev` int(8) NOT NULL COMMENT 'ID dev',
  `longDescription` varchar(5000) NOT NULL,
  `price` int(5) NOT NULL DEFAULT '0',
  `videoCode` varchar(200) DEFAULT 'R2hkdKVJSJ0',
  `cpu` varchar(200) DEFAULT NULL,
  `gpu` varchar(200) DEFAULT NULL,
  `ram` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `game`
--

INSERT INTO `game` (`ID`, `name`, `description`, `dev`, `longDescription`, `price`, `videoCode`, `cpu`, `gpu`, `ram`) VALUES
(1, 'CS GO', 'Piou piou boum', 21, 'BOUM TARATATATATATATTATATA WIIIIIEEEEEEEE BRMMMMMMMMMMMMM ', 50, 'R2hkdKVJSJ0', NULL, NULL, NULL),
(2, 'THIS SHOULD WORK', 'HOPEFULLY', 21, ':pray:', 0, 'R2hkdKVJSJ0', NULL, NULL, NULL),
(3, 'Best game Ever', 'Not at all..', 21, 'Really not', 15, 'R2hkdKVJSJ0', NULL, NULL, NULL),
(4, 'RS40 Death Journey : Hell\'s insights', 'This is what real hell looks like : unawared players, be careful where you step !', 21, 'Prepare to embark on a thrilling and immersive gaming experience with RS40 Death Journey: Hell\'s Insights. Step into a dark and treacherous world filled with mystery, danger, and relentless challenges. As the protagonist of this gripping adventure, you will be thrust into a realm of darkness, where survival depends on your wit, agility, and strategic thinking.\n', 50, 'iOUJLPbW20A', NULL, NULL, NULL),
(5, 'WE4B : The Lost Code', 'I think it\'s not going to work', 21, 'Def not', 45, 'pPHbtzmYM6Y', NULL, NULL, NULL),
(6, 'IT41 : Story of a far long gone Logic', 'Nothing much to say', 21, 'Same here tbh', 40, 'aH6-bVcUXcg', NULL, NULL, NULL),
(7, 'IF3A - The Inuque Adventure', '...', 21, 'Same over here ....', 850, 'aH6-bVcUXcg', NULL, NULL, NULL),
(8, 'RS40 - The Last TD', 'Weird game tbh', 21, 'Really weird game...', 30, 'AnUHfuiehzuihihzei', NULL, NULL, NULL),
(9, 'Litzler : a Sakura story', 'Do not play this', 21, 'Please, really do not.', 20, 'cioejzuihf_uazoz', NULL, NULL, NULL),
(10, 'Pesto', 'Pesto le pôti chat qui court dans les prés', 21, 'trop bien', 20, 'efpfhodv', NULL, NULL, NULL),
(11, 'SY40 : Sémaphores en folie', '...', 21, '...', 21, 'oiqejvvizojoi', NULL, NULL, NULL),
(19, 'INFO - The No hair / Long hair Dilemna', 'Not a bad game', 21, 'Playable', 41, 'azertyh', 'AMD Ryzen 7 5800X', 'NVIDIA GeForce GTX 1660 Ti (6 GB VRAM)', '32 GB DDR4 RAM'),
(20, 'The Ultimate Test', 'This example is perfect.', 21, 'This example is perfect for one reason : IT\'S GOING TO WORK !', 42, 'jS3jOJCQImA', 'AMD Ryzen 9 5900X', 'NVIDIA GeForce GTX 1660 Ti', '32 GB DDR4 RAM'),
(21, 'The Ultimate Test 2 ', 'Really, I swear it\'s going to work', 21, 'For real, I\'m being dead serious; this is gonna work.', 41, 'trnx5XT0cZs', 'AMD Ryzen 7 5800X', 'NVIDIA GeForce RTX 3070', '48 GB DDR4 RAM'),
(22, 'The Ultimate Test 3', 'This time. It\'s going to be PERFECT', 21, 'I\'m telling you, this is great, going to be insane af.', 69, '4AeIz_n16Q8', 'AMD Ryzen 9 5900X', 'AMD Radeon RX 6800', '64 GB DDR4 RAM'),
(23, 'The Ultimate Test 4', 'You ain\'t ready', 21, 'This game is phenomenal', 20, 'KoDWXvHIXPo', 'Intel Core i3-10100', 'AMD Radeon RX 5500 XT', '48 GB DDR4 RAM');

-- --------------------------------------------------------

--
-- Structure de la table `hasbought`
--

CREATE TABLE `hasbought` (
  `ID` int(8) NOT NULL,
  `ID_user` int(8) NOT NULL,
  `ID_game` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `ID` int(8) NOT NULL,
  `link` varchar(500) NOT NULL,
  `ID_game` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `image`
--

INSERT INTO `image` (`ID`, `link`, `ID_game`) VALUES
(15, '../assets/images/1686388051954.jpg', 19),
(16, '../assets/images/1686510570456.jpg', 20),
(17, '../assets/images/1686510585089.png', 20),
(18, '../assets/images/1686512350538.jpg', 21),
(19, '../assets/images/1686513909987.png', 22),
(20, '../assets/images/1686513915741.png', 22),
(21, '../assets/images/1686553410286.png', 23),
(22, '../assets/images/1686553415427.jpg', 23),
(23, '../assets/images/1686553423585.png', 23),
(24, '../assets/images/1686553432101.png', 23),
(25, '../assets/images/1686553437339.png', 23);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `ID` int(8) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `dev` tinyint(1) NOT NULL DEFAULT '0',
  `profilePictureURL` varchar(500) NOT NULL DEFAULT './assets/images/Pesto_tete.png',
  `email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`ID`, `username`, `password`, `dev`, `profilePictureURL`, `email`) VALUES
(21, 'louis', 'louis', 1, './assets/images/Pesto_tete.png', 'louis.rolland@utbm.fr'),
(22, 'Loric', 'Loric', 1, './assets/images/Pesto_tete.png', 'loric.ravassard@utbm.fr'),
(23, 'Tibo', 'Tibo', 1, './assets/images/Pesto_tete.png', 'tibo@tibo.tibo'),
(24, 'Alexandre', 'Alexandre', 1, './assets/images/Pesto_tete.png', 'Alexandereeeeeeeee.aeze@dzak');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `categorygame`
--
ALTER TABLE `categorygame`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `categorygame_ibfk_1` (`ID_game`),
  ADD KEY `categorygame_ibfk_2` (`ID_category`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `comment_ibfk_1` (`ID_game`),
  ADD KEY `comment_ibfk_2` (`ID_user`);

--
-- Index pour la table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `game_ibfk_1` (`dev`);

--
-- Index pour la table `hasbought`
--
ALTER TABLE `hasbought`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_user` (`ID_user`),
  ADD KEY `ID_game` (`ID_game`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `image_ibfk_1` (`ID_game`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT pour la table `categorygame`
--
ALTER TABLE `categorygame`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `game`
--
ALTER TABLE `game`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT pour la table `hasbought`
--
ALTER TABLE `hasbought`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `categorygame`
--
ALTER TABLE `categorygame`
  ADD CONSTRAINT `categorygame_ibfk_1` FOREIGN KEY (`ID_game`) REFERENCES `game` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `categorygame_ibfk_2` FOREIGN KEY (`ID_category`) REFERENCES `category` (`ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`ID_game`) REFERENCES `game` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `game_ibfk_1` FOREIGN KEY (`dev`) REFERENCES `user` (`ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `hasbought`
--
ALTER TABLE `hasbought`
  ADD CONSTRAINT `hasbought_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `hasbought_ibfk_2` FOREIGN KEY (`ID_game`) REFERENCES `game` (`ID`);

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`ID_game`) REFERENCES `game` (`ID`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
