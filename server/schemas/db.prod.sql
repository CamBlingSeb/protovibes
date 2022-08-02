-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema prod
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema prod
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `prod` DEFAULT CHARACTER SET utf8 ;
USE `prod` ;

-- -----------------------------------------------------
-- Table `prod`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prod`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `access_code` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP(2) NULL DEFAULT CURRENT_TIMESTAMP(2),
  PRIMARY KEY (`user_id`, `access_code`),
  UNIQUE INDEX `access_code_UNIQUE` (`access_code` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prod`.`artists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prod`.`artists` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `gender` VARCHAR(10) NULL,
  `born` DATE NULL,
  `country` VARCHAR(100) NULL,
  `bio` TEXT NULL,
  `mbid` VARCHAR(100) NULL,
  `photo_url` VARCHAR(200) NULL,
  `legal_name` VARCHAR(100) NULL,
  `thumb_url` VARCHAR(200) NULL,
  PRIMARY KEY (`id`, `name`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `prod`.`tracks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prod`.`tracks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NULL,
  `artist_id` INT NULL,
  `release_date` DATE NULL,
  `mbid` VARCHAR(100) NULL,
  `bpm` INT NULL,
  `deezer_id` INT NULL,
  `isrc` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `artist_id_idx` (`artist_id` ASC) VISIBLE,
  FOREIGN KEY (`artist_id`)
    REFERENCES `prod`.`artists` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `prod`.`sources`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prod`.`sources` (
  `id` VARCHAR(12) NOT NULL,
  `title` VARCHAR(200) NULL,
  `channel` VARCHAR(100) NULL,
  `url` VARCHAR(200) NULL,
  `thumb` VARCHAR(200) NULL,
  `description` TEXT(5500) NULL,
  `duration` INT NULL,
  `duration_string` VARCHAR(20) NULL,
  `sample_rate` INT NULL,
  `bit_rate` DECIMAL(6,3) NULL,
  `track_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `track_id_idx` (`track_id` ASC) VISIBLE,
  FOREIGN KEY (`track_id`)
    REFERENCES `prod`.`tracks` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prod`.`conversions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prod`.`conversions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `source_id` VARCHAR(12) NULL,
  `user_id` INT NULL,
  `format` VARCHAR(10) NULL,
  `created_at` TIMESTAMP(4) NULL DEFAULT CURRENT_TIMESTAMP(4),
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `source_id_idx` (`source_id` ASC) VISIBLE,
  FOREIGN KEY (`user_id`)
    REFERENCES `prod`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  FOREIGN KEY (`source_id`)
    REFERENCES `prod`.`sources` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `prod`.`track_links`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prod`.`track_links` (
  `track_id` INT NOT NULL,
  `bandcamp` VARCHAR(200) NULL DEFAULT NULL,
  `beatport` VARCHAR(200) NULL DEFAULT NULL,
  `discogs` VARCHAR(200) NULL DEFAULT NULL,
  `soundcloud` VARCHAR(200) NULL DEFAULT NULL,
  `apple_music` VARCHAR(200) NULL DEFAULT NULL,
  `amazon` VARCHAR(200) NULL DEFAULT NULL,
  `spotify` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`track_id`),
  FOREIGN KEY (`track_id`)
    REFERENCES `prod`.`tracks` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `prod`.`artist_links`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `prod`.`artist_links` (
  `artist_id` INT NOT NULL,
  `bandcamp` VARCHAR(200) NULL DEFAULT NULL,
  `beatport` VARCHAR(200) NULL DEFAULT NULL,
  `discogs` VARCHAR(200) NULL DEFAULT NULL,
  `soundcloud` VARCHAR(200) NULL DEFAULT NULL,
  `apple_music` VARCHAR(200) NULL DEFAULT NULL,
  `amazon` VARCHAR(200) NULL DEFAULT NULL,
  `spotify` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`artist_id`),
  CONSTRAINT `artist_id`
    FOREIGN KEY (`artist_id`)
    REFERENCES `prod`.`artists` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;