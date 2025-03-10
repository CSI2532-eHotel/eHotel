/*
* Une liste des DDL qui créent notre base de données et les contraintes
*/

-- Création de la table ChaineHotel
CREATE TABLE ChaineHotel (
    chaine_ID VARCHAR(5) NOT NULL UNIQUE CHECK (chaine_ID ~ '^[0-9]{5}$'), 
    nom_chaine VARCHAR(50),
    rue VARCHAR(100),
    ville VARCHAR(50),
    code_postal VARCHAR(7) CHECK (code_postal ~ '^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$'),
    nombre_hotel INTEGER CHECK (nombre_hotel > 0),
    courriel_chaine VARCHAR(25) CHECK (courriel_chaine ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    numero_telephone_chaine VARCHAR(12) CHECK (numero_telephone_chaine ~ '^[1-9][0-9]{2} [0-9]{3} [0-9]{4}$'),
    PRIMARY KEY (chaine_ID),
);

-- Création de la table Hotel
CREATE TABLE Hotel (
    hotel_ID VARCHAR(4) NOT NULL UNIQUE CHECK (hotel_ID ~ '^[0-9]{4}$'),
    nom_hotel VARCHAR(50),
    nombre_chambre INTEGER CHECK (nombre_chambre > 0),
    rue VARCHAR(100),
    ville VARCHAR(50),
    code_postal VARCHAR(7) CHECK (code_postal ~ '^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$'),
    numero_telephone_hotel VARCHAR(12) CHECK (numero_telephone_hotel ~ '^[1-9][0-9]{2} [0-9]{3} [0-9]{4}$'),
    courriel_hotel VARCHAR(25) CHECK (courriel_hotel ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    etoile INTEGER CHECK (etoile BETWEEN 1 AND 5),
    chaine_ID VARCHAR(5),
    PRIMARY KEY (hotel_ID),
    FOREIGN KEY (chaine_ID) REFERENCES ChaineHotel(chaine_ID) ON UPDATE CASCADE
);

-- Création de la table Chambre
CREATE TABLE Chambre (
    chambre_ID VARCHAR(3) NOT NULL UNIQUE CHECK (chambre_ID ~ '^[0-9]{3}$'),
    prix NUMERIC(10, 2) CHECK (prix > 0),
    commodite TEXT[],
    capacite VARCHAR(20),
    extensible BOOLEAN,
    dommage BOOLEAN,
    vue VARCHAR(10) CHECK (vue IN ('mer', 'montagne')),
    hotel_ID VARCHAR(4),
    PRIMARY KEY (chambre_ID),
    FOREIGN KEY (hotel_ID) REFERENCES Hotel(hotel_ID) ON UPDATE CASCADE
);

-- Création de la table Employe
CREATE TABLE Employe (
    NAS_employe VARCHAR(9) NOT NULL UNIQUE CHECK (NAS_employe ~ '^[0-9]{9}$'),
    nom_employe VARCHAR(50),
    prenom_employe VARCHAR(50),
    rue VARCHAR(100),
    ville VARCHAR(50),
    code_postal VARCHAR(7) CHECK (code_postal ~ '^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$'),
    role VARCHAR(50),
    hotel_ID VARCHAR(4),
    courriel_employee VARCHAR(25) CHECK (courriel_employee ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'), --ajouter pour l'authentication
    motpasse_employee VARCHAR(20),
    PRIMARY KEY (NAS_employe),
    FOREIGN KEY (hotel_ID) REFERENCES Hotel(hotel_ID) ON UPDATE CASCADE
);

-- Création de la table Gestionnaire
CREATE TABLE Gestionnaire (
    NAS_employe VARCHAR(9) NOT NULL UNIQUE,
    hotel_ID VARCHAR(4) NOT NULL UNIQUE,
    PRIMARY KEY (NAS_employe, hotel_ID),
    FOREIGN KEY (NAS_employe) REFERENCES Employe(NAS_employe) ON UPDATE CASCADE,
    FOREIGN KEY (hotel_ID) REFERENCES Hotel(hotel_ID) ON UPDATE CASCADE
);

-- Création de la table Client
CREATE TABLE Client (
    NAS_client VARCHAR(9) CHECK (NAS_client ~ '^[0-9]{9}$'),
    nom_client VARCHAR(50),
    prenom_client VARCHAR(50),
    rue VARCHAR(100),
    ville VARCHAR(50),
    code_postal VARCHAR(7) CHECK (code_postal ~ '^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$'),
    courriel_client VARCHAR(25) CHECK (courriel_employee ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'), --ajouter pour l'authentication
    motpasse_client VARCHAR(20),
    date_enregistrement DATE,
    PRIMARY KEY (NAS_client),
);

-- Création de la table Reservation
CREATE TABLE Reservation (
    reservation_ID VARCHAR(4) NOT NULL UNIQUE CHECK (reservation_ID ~ '^1[0-9]{3}$'),
    debut_date_reservation DATE,
    fin_date_reservation DATE,
    NAS_client VARCHAR(9),
    chambre_ID VARCHAR(3),
    PRIMARY KEY (reservation_ID),
    FOREIGN KEY (NAS_client) REFERENCES Client(NAS_client) ON UPDATE CASCADE,
    FOREIGN KEY (chambre_ID) REFERENCES Chambre(chambre_ID) ON UPDATE CASCADE,
);

-- Création de la table Location
CREATE TABLE Location (
    location_ID VARCHAR(4) NOT NULL UNIQUE CHECK (location_ID ~ '^2[0-9]{3}$'),
    debut_date_location DATE,
    fin_date_location DATE,
    montant NUMERIC(10, 2) CHECK (montant > 0),
    transaction_date DATE,
    NAS_employe VARCHAR(9),
    NAS_client VARCHAR(9),
    chambre_ID VARCHAR(3),
    reservation_ID VARCHAR(4),
    PRIMARY KEY (location_ID),
    FOREIGN KEY (NAS_employe) REFERENCES Employe(NAS_employe) ON UPDATE CASCADE,
    FOREIGN KEY (NAS_client) REFERENCES Client(NAS_client) ON UPDATE CASCADE,
    FOREIGN KEY (chambre_ID) REFERENCES Chambre(chambre_ID) ON UPDATE CASCADE,
    FOREIGN KEY (reservation_ID) REFERENCES Reservation(reservation_ID) ON UPDATE CASCADE,
);