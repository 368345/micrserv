const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Charger le fichier proto pour la réservation
const reservationProtoPath = 'reservation.proto';
const reservationProtoDefinition = protoLoader.loadSync(reservationProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const reservationProto = grpc.loadPackageDefinition(reservationProtoDefinition).reservation;

// Créer un client gRPC pour le microservice de réservation
const reservationClient = new reservationProto.ReservationService('localhost:50053', grpc.credentials.createInsecure());

const resolvers = {
  Query: {
    reservation: (_, { id }) => {
      return new Promise((resolve, reject) => {
        reservationClient.getReservation({ id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.reservation);
          }
        });
      });
    },
    reservations: () => {
      return new Promise((resolve, reject) => {
        reservationClient.listReservations({}, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.reservations);
          }
        });
      });
    },
  },
  Mutation: {
    createReservation: (_, { input }) => {
      return new Promise((resolve, reject) => {
        reservationClient.createReservation(input, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response.reservation);
          }
        });
      });
    },
    cancelReservation: (_, { id }) => {
      return new Promise((resolve, reject) => {
        reservationClient.cancelReservation({ id }, (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve({ message: response.message });
          }
        });
      });
    },
  },
};

module.exports = resolvers;
