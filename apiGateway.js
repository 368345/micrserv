const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const connectDB = require('./db');
const sendMessage = require('./kafkaProducer');

// Charger les fichiers proto pour les réservations
const reservationProtoPath = 'reservation.proto';
const reservationProtoDefinition = protoLoader.loadSync(reservationProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const reservationProto = grpc.loadPackageDefinition(reservationProtoDefinition).reservation;

// Connecter à MongoDB
connectDB();

// Créer une nouvelle application Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Créer une instance ApolloServer avec le schéma et les résolveurs importés
const server = new ApolloServer({ typeDefs, resolvers });

// Appliquer le middleware ApolloServer à l'application Express
server.start().then(() => {
  app.use(expressMiddleware(server));
});

// Créer un client gRPC pour le microservice de réservation
const reservationClient = new reservationProto.ReservationService('localhost:50053', grpc.credentials.createInsecure());

// Définir les endpoints RESTful pour la gestion des réservations
app.post('/reservations', async (req, res) => {
  const { userId, movieOrTvShowId, reservationDate, reservationTime, numberOfSeats } = req.body;
  reservationClient.createReservation({
    userId,
    movieOrTvShowId,
    reservationDate,
    reservationTime,
    numberOfSeats,
  }, async (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      await sendMessage('reservations_topic', response);
      res.json(response);
    }
  });
});

app.delete('/reservations/:id', (req, res) => {
  const reservationId = req.params.id;
  reservationClient.cancelReservation({ id: reservationId }, async (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      await sendMessage('reservations_topic', { id: reservationId, status: 'cancelled' });
      res.json({ message: response });
    }
  });
});

// Démarrer l'application Express
const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway en cours d'exécution sur le port ${port}`);
});
