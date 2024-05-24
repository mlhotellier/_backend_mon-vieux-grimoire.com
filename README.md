# Projet mon-vieux-grimoire.com - API Backend

Ce dossier contient le code et les ressources nécessaires du projet MonVieuxGrimoire. Projet 6  parcours Développeur Web d'@Openclassrooms.

## Table des matières

1. [Description](#description)
2. [Fonctionnalités](#fonctionnalités)
3. [Structure du projet](#structure-du-projet)
4. [Installation](#installation)
5. [Utilisation](#utilisation)
6. [Technologies utilisées](#technologies-utilisées)
7. [Contributions](#contributions)
8. [Licence](#licence)
9. [Contact](#contact)

## Description

Ce projet consiste à développer l'API backend pour le site web "Mon Vieux Grimoire", une plateforme de référencement et de notation de livres pour une chaîne de librairies nommée "Le Vieux Grimoire" à Lille. Le site permettra aux utilisateurs d'ajouter de nouveaux livres et de leur attribuer une note visible par le public.

L'objectif est de créer une API robuste et efficace qui permettra au front-end de se connecter et d'interagir avec la base de données MongoDB pour gérer les livres et les notations.

## Fonctionnalités
- Afficher la liste des livres disponibles
- Ajouter un nouveau livre à la collection
- Modifier les détails d'un livre existant
- Supprimer un livre de la collection
- Noter les livres avec une évaluation de 0 à 5 étoiles
- Authentification des utilisateurs avec inscription et connexion

## Structure du projet
├── controllers/ # Contrôleurs pour gérer la logique métier
├── functions/ # Fonctions utilitaires
├── images/ # Dossier public pour stocker les images des livres
├── middleware/ # Middleware pour la gestion des requêtes HTTP
├── models/ # Modèles de données MongoDB
├── routes/ # Définition des routes de l'API
├── .env.example # Exemple de configuration du fichier .env
├── app.js # Initialisation de l'application
├── config.js # Configuration de l'application
├── corsConfig.js # Configuration du CORS l'application
├── db.js # Configuration de la connection à MongoDB
├── package-lock.json 
├── package.json 
├── README.md 
└── server.js # Point d'entrée de l'application

## Installation

### Configuration du Front-End

Pour commencer, vous devrez récupérer les ressources pour le front-end

1. **Clonage du Code Frontend :** Le code pour l'application frontend est nécessaire pour faire fonctionner le backend. À partir de votre répertoire de travail, exécutez la commande suivante :

    ```bash
    git clone https://github.com/OpenClassrooms-Student-Center/P7-Dev-Web-livres
    ```

2. **Installation des Dépendances Frontend :** Accédez au répertoire `P7-Dev-Web-livres` et installez toutes les dépendances requises par l'application frontend en exécutant les commandes suivantes :

    ```bash
    cd P7-Dev-Web-livres
    npm install
    ```

3. **Démarrage du Serveur de Développement :** Après avoir installé les dépendances, lancez le serveur de développement en utilisant la commande :

    ```bash
    npm start
    ```

    Cela lancera le serveur de développement pour l'application frontend. Désormais, si vous accédez à http://localhost:3000, vous devriez voir l'interface utilisateur de l'application.

### Configuration du Back-End

Pour commencer, vous devrez récupérer les ressources pour le back-end

1. **Clonage du Code Backend :** À partir de votre répertoire de travail, exécutez la commande suivante :

    ```bash
    git clone https://github.com/mlhotellier/_backend_mon-vieux-grimoire.com.git
    ```

2. **Installation des Dépendances Backend :** Accédez au répertoire `_backend_mon-vieux-grimoire.com` et installez toutes les dépendances requises par l'application frontend en exécutant les commandes suivantes :

    ```bash
    cd _backend_mon-vieux-grimoire.com
    npm install
    ```

3. **Démarrage du Serveur de Développement :** Après avoir installé les dépendances, lancez le serveur de développement en utilisant l'une des commandes suivantes :

    ```bash
    npm start
    ```
    
    ```bash
    nodemon /*** Permet de relancer le serveur à après chaque modification ***/
    ```

Cela lancera le serveur de développement pour l'application backend.

4. **Remplacer les valeurs `process.env.VALUE` :** Créez un fichier `.env` à la racine de votre projet et ajouter les valeurs :
- PORT=PORT // Par défault configuré sur 4000
- DB_URL=URL // Sous la forme NAME.ID.mongodb.net/
- DB_ID=ID
- DB_PASSWORD=PASSWORD
- SECRET_KEY=KEY // Consultez config.js pour générer une clé

## Utilisation

Une fois que vous avez correctement installé, configuré et lancé le projet sur votre environnement local, vous pouvez tester les fonctionnalités suivantes :

- Inscription : Si vous n'avez pas encore de compte, vous devez vous inscrire en fournissant votre adresse e-mail et un mot de passe.

- Connexion : Si vous avez déjà un compte, connectez-vous en utilisant vos identifiants.

- Ajout d'un Livre : Une fois connecté, vous pouvez ajouter un nouveau livre à la collection en remplissant le formulaire prévu à cet effet. Assurez-vous de fournir toutes les informations nécessaires, y compris le titre, l'auteur, la description et une image du livre.

- Consultation de la Collection : Parcourez la collection de livres disponibles pour voir les détails des livres ajoutés par d'autres utilisateurs.

- Notation d'un Livre : Vous pouvez également attribuer une note à un livre en lui donnant une évaluation de 0 à 5 étoiles.

- Modification ou Suppression d'un Livre : Si vous avez ajouté un livre ou si vous êtes autorisé à le faire, vous pouvez modifier ses détails ou le supprimer de la collection.

- Déconnexion : Une fois que vous avez terminé, assurez-vous de vous déconnecter pour protéger la sécurité de votre compte.

Ces étapes simples vous permettront de tirer pleinement parti de l'application Mon Vieux Grimoire.

## Technologies utilisées
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT pour l'authentification
- bcrypt pour le hashage des mots de passe
- Postman pour les requêtes

## Contributions

Les contributions à ce projet sont les bienvenues. N'hésitez pas à créer une issue ou à soumettre une pull request si vous souhaitez contribuer.

## Licence

Ce projet est sous licence MIT.

## Contact

Pour toute question ou demande de renseignements, n'hésitez pas à me contacter par e-mail à l'adresse mathislhotellier@gmail.com.