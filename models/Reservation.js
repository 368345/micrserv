const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  movieOrTvShowId: {
    type: String,
    required: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
  reservationTime: {
    type: String,
    required: true,
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Reservation', ReservationSchema);
