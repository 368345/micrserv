const { gql } = require('@apollo/server');

// Définir le schéma GraphQL
const typeDefs = `#graphql
  type Reservation {
    id: ID!
    userId: String!
    movieOrTvShowId: String!
    reservationDate: String!
    reservationTime: String!
    numberOfSeats: Int!
  }

  input CreateReservationInput {
    userId: String!
    movieOrTvShowId: String!
    reservationDate: String!
    reservationTime: String!
    numberOfSeats: Int!
  }

  type Query {
    reservation(id: ID!): Reservation
    reservations: [Reservation!]
  }

  type Mutation {
    createReservation(input: CreateReservationInput!): Reservation
    cancelReservation(id: ID!): MessageResponse
  }

  type MessageResponse {
    message: String!
  }
`;

module.exports = typeDefs;
