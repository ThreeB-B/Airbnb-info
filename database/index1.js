const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/airbnbInfo', { useNewUrlParser: true });

const dbSchema = mongoose.Schema({
  id: Number,
  city: String,
  title: String,
  hostImage: String,
  roomInfo: String,
  numberOfGuests: Number,
  numberOfBedrooms: Number,
  numberOfBeds: Number,
  numberOfBaths: Number,
  isSuperhost: Boolean,
  isGreatLocation: Boolean,
  isSparklingClean: Boolean,
  isGreatCheckIn: Boolean,
  isSelfCheckIn: Boolean,
  description: String,
  amenities: Object,
  sleepingArrangements: Object,
});

const db = mongoose.model('Listing', dbSchema);


module.exports = db;
