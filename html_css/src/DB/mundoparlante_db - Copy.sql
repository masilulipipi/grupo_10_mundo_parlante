-- / Creación de la DB
CREATE DATABASE mundoparlante_db;
USE mundoparlante_db;

-- / Creación de las tablas que NO tienen FK
CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'no-image.png',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `brands` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- / Creación de las tablas que tienen FK
CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `image` varchar(255) NULL DEFAULT 'no-image.png',
  `brand_id` int(10) unsigned DEFAULT NULL,
  `model` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- / Populando las tablas
INSERT INTO `brands` VALUES 
	(DEFAULT, 'Genelec', NULL, NULL),
	(DEFAULT, 'Rock It', NULL, NULL),
	(DEFAULT, 'KRK Systems', NULL, NULL),
	(DEFAULT, 'ATC', NULL, NULL),
	(DEFAULT, 'JBL', NULL, NULL);

INSERT INTO `users` VALUES 
	(DEFAULT, 'Jon', 'Doe', 'jondoe@email.com', '123abc', NULL, NULL),
	(DEFAULT, 'Jane', 'Doe', 'janedoe@email.com', '123abc', NULL, NULL),
	(DEFAULT, 'Jon', 'Snow', 'jonsnow@email.com', '123abc', NULL, NULL);