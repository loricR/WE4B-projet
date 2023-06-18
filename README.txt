Projet WE4B - Site de recommandation de jeux vidéos
Alexandre BARTHELME, Thibault MAYER, Loric RAVASSARD, Louis ROLLAND

Avant de lancer le projet, vous devez avoir un serveur MySQL qui tourne (avec XAMPP ou UwAmp par exemple). 
Le back-end est un serveur node.js pour pouvoir utiliser une base de données MySQL qui est une base de données relationnelle que nous connaissons déjà grâce à WE4A.
Le projet angular est dans le dossier frontend.

Les paramètres de connexion à la base de données sont dans le fichier backend/index.js dans la fonction createConnection().
Les paramètres par défaut sont: 
  - host:"localhost",
  - user:"root",
  - password:"",    
  - database:"we4b",
  - port:3306

Pour lancer le back-end: "nodemon index.js" depuis le dossier backend.
Pour lancer le front-end: "ng serve" depuis le dossier frontend.

Le back-end et le front-end peuvent être lancés avec une seule commande en étant dans le dossier frontend: "npm start".
