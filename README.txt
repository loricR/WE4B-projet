Projet WE4B - Site de recommandation de jeux vidéos
Alexandre BARTHELME, Thibault MAYER, Loric RAVASSARD, Louis ROLLAND

Avant de lancer le projet, vous devez avoir un serveur MySQL qui tourne avec la base de données backend/we4b.sql (serveur avec XAMPP ou UwAmp par exemple). 
Pour le back-end, nous avons opté pour un mélange entre les notions vues en cours de WE4B et les compétences déjà acquises en WE4A. 
En effet, le back-end est organisé de la manière suivante :
   • un serveur node.js pour pouvoir accéder à une base de données MySQL
   • une base de données relationnelle que nous connaissons déjà grâce à l'UV WE4A
   • un système de service liant le back-end et le front-end à l'aide de requêtes http diverses (put, post et get).
Les sources du projet angular sont dans le dossier frontend.

Les paramètres de connexion à la base de données sont dans le fichier backend/index.js dans la fonction createConnection().
Les paramètres par défaut sont: 
  - host:"localhost",
  - user:"root",
  - password:"",    
  - database:"we4b",
  - port:3306

Vous devrez créer un projet angular (avec "ng new") puis remplacer les fichiers et le dossier src par ce qu'il a dans le dossier frontend.
Une fois le projet angular créé, utiliser la commande "npm install" depuis le dossier backend ET le dossier frontend pour installer toutes les dépendances du back-end et celles du front-end.

Pour lancer le back-end: "nodemon index.js" depuis le dossier backend.
Pour lancer le front-end: "ng serve" depuis le dossier frontend.

Le back-end et le front-end peuvent être lancés avec une seule commande en étant dans le dossier frontend: "npm start".


Pour tester les fonctionnalités du site, des utilisateurs sont déjà enregistrés dans la base de données:
    Nom d'utilisateur / mot de passe / développeur?
  - Alex / iron68 / oui
  - Luc / iron68 / oui
  - Iron / iron68 / non
  - LeBelfortdu90 / iron68 / oui
