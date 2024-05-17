Microservice de Réservation
Ce projet est un système de microservices pour gérer les réservations de films ou d'émissions de télévision. Il comprend une API Gateway, un microservice de réservation utilisant gRPC, une base de données MongoDB et l'intégration de Kafka pour la gestion des messages.

Prérequis
Node.js (version 14 ou supérieure)
MongoDB (exécuté localement ou via un service cloud)
Apache Kafka (exécuté localement ou via un service cloud)
npm (gestionnaire de paquets Node.js)
Installation
1. Cloner le dépôt
bash
Copier le code
git clone https://github.com/username/microservice-reservation.git
cd microservice-reservation
2. Installer les dépendances
bash
Copier le code
npm install
3. Configurer la base de données MongoDB
Assurez-vous que MongoDB est en cours d'exécution et que vous avez créé une base de données nommée micro. Modifiez le fichier db.js si nécessaire pour pointer vers votre instance MongoDB.

4. Configurer Kafka
Assurez-vous que Kafka est en cours d'exécution et configurez les producteurs et consommateurs nécessaires. Modifiez les fichiers de configuration Kafka si nécessaire pour pointer vers votre instance Kafka.

5. Démarrer les services
Démarrer le microservice de réservation :

bash
Copier le code
node reservationMicroservice.js
Démarrer l'API Gateway :

bash
Copier le code
node apiGateway.js
Utilisation
API REST
Testez les routes REST via Postman ou un outil similaire.

Créer une réservation
http
Copier le code
POST /reservations
Content-Type: application/json

{
    "userId": "12345",
    "movieOrTvShowId": "67890",
    "reservationDate": "2024-05-17",
    "reservationTime": "18:00",
    "numberOfSeats": 2
}
Lire une réservation par ID
http
Copier le code
GET /reservations/:id
Supprimer une réservation par ID
http
Copier le code
DELETE /reservations/:id
Mettre à jour une réservation par ID
(Non implémenté dans ce code)

http
Copier le code
PUT /reservations/:id
GraphQL
Accédez à l'interface GraphQL à l'adresse : http://localhost:3000/graphql

Kafka
Kafka est utilisé pour la gestion des messages entre microservices. Les producteurs envoient des messages à Kafka, et les consommateurs les traitent.

Configuration Kafka
Configurez les producteurs et consommateurs Kafka dans vos fichiers de configuration en fonction de vos besoins.

Technologies Utilisées
Node.js
Express.js
MongoDB
Apollo Server
gRPC
Kafka
Mongoose
Structure du Projet
/models : Contient les modèles Mongoose

Reservation.js : Définition du modèle de réservation
/resolvers : Contient les résolveurs GraphQL

index.js : Résolveurs GraphQL pour les opérations sur les réservations
/schema : Contient le schéma GraphQL

index.js : Définitions du schéma GraphQL
apiGateway.js : Serveur API Gateway avec Express et Apollo Server

reservationMicroservice.js : Microservice gRPC pour la gestion des réservations

db.js : Configuration de la connexion MongoDB

kafka.js : Configuration et gestion des producteurs et consommateurs Kafka

Contributions
Les contributions sont les bienvenues ! Pour contribuer, veuillez suivre les étapes suivantes :

Forkez ce dépôt.
Créez une branche de fonctionnalité (git checkout -b feature/your-feature).
Commitez vos modifications (git commit -m 'Add some feature').
Poussez votre branche (git push origin feature/your-feature).
Ouvrez une Pull Request.
Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

Auteur
Mohamed Saleck
