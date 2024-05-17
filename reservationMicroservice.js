const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Charger le fichier de protocole pour la réservation
const reservationProtoPath = 'reservation.proto';
const reservationProtoDefinition = protoLoader.loadSync(reservationProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const reservationProto = grpc.loadPackageDefinition(reservationProtoDefinition).reservation;

// Simuler un stockage en mémoire pour les réservations
let reservations = [];

// Implémentation des méthodes gRPC pour le service de réservation
const reservationService = {
  createReservation: (call, callback) => {
    const { userId, movieOrTvShowId, reservationDate, reservationTime, numberOfSeats } = call.request;
    const reservation = {
      id: Math.random().toString(36).substr(2, 9), // Générer un ID de réservation aléatoire (à remplacer par votre propre logique)
      userId,
      movieOrTvShowId,
      reservationDate,
      reservationTime,
      numberOfSeats,
    };
    reservations.push(reservation);
    callback(null, { id: reservation.id, message: 'Reservation created successfully' });
  },
  getReservation: (call, callback) => {
    const reservationId = call.request.id;
    const reservation = reservations.find(res => res.id === reservationId);
    if (reservation) {
      callback(null, { reservation });
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: 'Reservation not found' });
    }
  },
  cancelReservation: (call, callback) => {
    const reservationId = call.request.id;
    const index = reservations.findIndex(res => res.id === reservationId);
    if (index !== -1) {
      reservations.splice(index, 1);
      callback(null, { message: 'Reservation canceled successfully' });
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: 'Reservation not found' });
    }
  },
  // Ajouter d'autres méthodes au besoin
};

// Créer et démarrer le serveur gRPC
const server = new grpc.Server();
server.addService(reservationProto.ReservationService.service, reservationService);
const port = 50053; // Port pour le microservice de réservation
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }
  console.log(`Reservation microservice is running on port ${port}`);
  server.start();
});
