-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : dim. 08 mai 2022 à 13:44
-- Version du serveur : 10.3.34-MariaDB-0ubuntu0.20.04.1
-- Version de PHP : 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `snitcher`
--

-- --------------------------------------------------------

--
-- Structure de la table `automations`
--

CREATE TABLE `automations` (
                               `id` int(10) UNSIGNED NOT NULL,
                               `id_addr` int(10) UNSIGNED NOT NULL,
                               `id_watcher` text DEFAULT NULL,
                               `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `savelater`
--

CREATE TABLE `savelater` (
                             `id` int(10) UNSIGNED NOT NULL,
                             `id_addr` int(10) UNSIGNED NOT NULL,
                             `save_addr` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `wallets`
--

CREATE TABLE `wallets` (
                           `id` int(10) UNSIGNED NOT NULL,
                           `username` text DEFAULT NULL,
                           `wallet` text NOT NULL,
                           `nonce` text NOT NULL,
                           `pro` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `watchers`
--

CREATE TABLE `watchers` (
                            `id` int(11) NOT NULL,
                            `wallet` int(10) UNSIGNED NOT NULL,
                            `action` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`action`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `automations`
--
ALTER TABLE `automations`
    ADD PRIMARY KEY (`id`),
    ADD KEY `id_addr` (`id_addr`);

--
-- Index pour la table `savelater`
--
ALTER TABLE `savelater`
    ADD PRIMARY KEY (`id`),
    ADD KEY `id` (`id_addr`);

--
-- Index pour la table `wallets`
--
ALTER TABLE `wallets`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `automations`
--
ALTER TABLE `automations`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `savelater`
--
ALTER TABLE `savelater`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `wallets`
--
ALTER TABLE `wallets`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `automations`
--
ALTER TABLE `automations`
    ADD CONSTRAINT `id_addr` FOREIGN KEY (`id_addr`) REFERENCES `wallets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `savelater`
--
ALTER TABLE `savelater`
    ADD CONSTRAINT `id` FOREIGN KEY (`id_addr`) REFERENCES `wallets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
