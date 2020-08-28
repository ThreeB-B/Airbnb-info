DROP DATABASE IF EXISTS SDC;

CREATE DATABASE SDC;

USE SDC;

CREATE TABLE rooms (
  id INTEGER NOT NULL PRIMARY KEY,
  city VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  hostImage VARCHAR(255) NOT NULL,
  numberOfGuests DECIMAL(3,2) NOT NULL,
  numberOfBedrooms DECIMAL(3,2) NOT NULL,
  numberOfBeds DECIMAL(3,2) NOT NULL,
  numberOfBaths DECIMAL(3,2) NOT NULL,
  isSuperhost BOOLEAN NOT NULL,
  isGreatLocation BOOLEAN NOT NULL,
  isSparklingClean BOOLEAN NOT NULL,
  isGreatCheckIn BOOLEAN NOT NULL,
  isSelfCheckIn BOOLEAN NOT NULL
  roomDescription VARCHAR(400) NOT NULL
  amenities VARCHAR(400) NOT NULL,
  sleepingArrangements VARCHAR(255) NOT NULL,
);

/* mysql -u root < schema.sql */
/*"id","city","title","hostImage","roomInfo","numberOfGuests","numberOfBedrooms","numberOfBeds","numberOfBaths","isSuperhost","isGreatLocation","isSparklingClean","isGreatCheckIn","isSelfCheckIn","roomDescription","amenities","sleepingArrangements"*/