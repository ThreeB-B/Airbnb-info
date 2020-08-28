/* eslint-disable no-plusplus */
const faker = require('faker');
// const db = require('./index.js');
// const { Readable } = require('stream');
const fs = require('fs');

const titleRandom = ['Perfectly located', 'Light & spacious garden flat', 'Private Modern Guesthouse', 'Ocean View Hideaway', 'Perfect Haven by Golden Gate', 'Private Backyard Cottage', 'Sunny Room Heart of', 'Luxury Gold Coast', 'Central Surfers Studio OceanView', 'Broken Head Bodhi Treehouse', 'Mountain tiny house', 'Blue Mountains Cottage', 'The Copa Cabana', 'The Tree House', 'Stroll Around Victoria Park', 'Entire Home with Opera House views', 'Luxury Apartment in the heart of', 'Stylish inner-city home', 'Little Paradise', 'Stunning River View'];

const roomInfoRandom = ['Private room', 'Entire guesthouse', 'Entire guestsuite', 'Entire House'];

function booleanGenerator() {
  return Math.random() > 0.5;
}

function generateListing() {
  const titleRandomArray = titleRandom[Math.floor(Math.random() * titleRandom.length)];
  const roomInfoRandomArray = roomInfoRandom[Math.floor(Math.random() * roomInfoRandom.length)];
  const hostImage = Math.floor(Math.random() * 100) + 1;
  function numberOfGuests() {
    if (roomInfoRandomArray === 'Private room') {
      return 2;
    }
    return 6;
  }

  function numberOfBedrooms() {
    if (roomInfoRandomArray === 'Private room') {
      return 1;
    }
    return Math.floor(Math.random() * (5 - 2)) + 2;
  }

  function numberOfBeds() {
    if (roomInfoRandomArray === 'private room') {
      return 1;
    }
    return Math.floor(Math.random() * (5 - 2)) + 2;
  }

  function numberOfBaths() {
    if (roomInfoRandomArray === 'private room') {
      return 1;
    }
    return Math.floor(Math.random() * (4 - 2)) + 2;
  }
  const bedrooms = numberOfBedrooms();
  const city = faker.address.city();
  const listing = {
    city,
    title: `${titleRandomArray} ${city}`,
    hostImage: `https://sdcairbnbhostphotos231.s3-us-west-1.amazonaws.com/photos/host${hostImage}.jpg`,
    roomInfo: roomInfoRandomArray,
    numberOfGuests: numberOfGuests(),
    numberOfBedrooms: bedrooms,
    numberOfBeds: numberOfBeds(),
    numberOfBaths: numberOfBaths(),
    isSuperhost: booleanGenerator(),
    isGreatLocation: booleanGenerator(),
    isSparklingClean: booleanGenerator(),
    isGreatCheckIn: booleanGenerator(),
    isSelfCheckIn: booleanGenerator(),
    roomDescription: faker.lorem.paragraph() + faker.lorem.paragraph(),
    amenities: {
      basic: {
        hasWiFi: true,
        hasEssentials: true,
        hasCable: true,
        hasLaptopSpace: true,
        hasHeating: true,
      },
      dining: {
        hasKitchen: true,
      },
      bedAndBath: {
        hasPillowsBlankets: true,
      },
    },
    sleepingArrangements: {
      bedroom: bedrooms,
    },
  };
  return listing;
}
// refactor this function to write to data file in a stream
const createData = () => {
  const streamWriter = fs.createWriteStream(`${__dirname}/roomData.csv`);
  streamWriter.write('"id","city","title","hostImage","roomInfo","numberOfGuests","numberOfBedrooms","numberOfBeds","numberOfBaths","isSuperhost","isGreatLocation","isSparklingClean","isGreatCheckIn","isSelfCheckIn","roomDescription","amenities","sleepingArrangements"\n', 'utf8');
  function writeOneMillionTimes(writer, encoding, callback) {
    let i = 10;
    let id = 0;
    function write() {
      let ok = true;
      do {
        i -= 1;
        id += 1;
        const listing = generateListing();
        const listingData = `${id},"${listing.city}","${listing.title}","${listing.hostImage}","${listing.roomInfo}",${listing.numberOfGuests},${listing.numberOfBedrooms},${listing.numberOfBeds},${listing.numberOfBaths},${listing.isSuperhost},${listing.isGreatLocation},${listing.isSparklingClean},${listing.isGreatCheckIn},${listing.isSelfCheckIn},"${listing.roomDescription}",${JSON.stringify(listing.amenities)},${JSON.stringify(listing.sleepingArrangements)}\n`;
        if (i === 0) {
          // Last time!
          writer.write(listingData, encoding, callback);
        } else {
          // See if we should continue, or wait.Don't pass the callback, because we're not done yet.
          ok = writer.write(listingData, encoding);
        }
      } while (i > 0 && ok);
      if (i > 0) {
        // Had to stop early! Write some more once it drains.
        writer.once('drain', write);
      }
    }
    write();
  }
  writeOneMillionTimes(streamWriter, 'utf-8', () => {
    streamWriter.end();
  });
};

createData();
