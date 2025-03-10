-- table creation: chaineHotel
CREATE TABLE chaineHotel (
	chaine_ID INTEGER,  
    nom_chaine VARCHAR(255),
	rue VARCHAR(255),
	ville VARCHAR(255),
	code_postal VARCHAR(6),
	nombre_hotel INTEGER,
	courriel_chaine VARCHAR(255),
	numero_telephone_chaine VARCHAR(10),
	PRIMARY KEY (chaine_ID)
);
	
-- table creation: hotel
CREATE TABLE hotel (
	hotel_ID INTEGER,  
    nom_hotel VARCHAR(255),
	rue VARCHAR(255),
	ville VARCHAR(255),
	code_postal VARCHAR(6),
	nombre_hotel INTEGER,
	courriel_chaine VARCHAR(255),
	numero_telephone_hotel VARCHAR(10),
	etoile INTEGER,
	chaine_ID INTEGER,
	PRIMARY KEY (hotel_ID),
	FOREIGN KEY(chaine_ID) REFERENCES chaineHotel(chaine_ID)
);

-- table creation: chambre
CREATE TABLE chambre (
	chambre_ID INTEGER,
	prix INTEGER,
    commodite VARCHAR(255),
	capacite VARCHAR(255),
	extensible VARCHAR(255),
	dommage VARCHAR(255),
	vue VARCHAR(255),
	hotel_ID INTEGER,
	PRIMARY KEY (chambre_ID),
	FOREIGN KEY(hotel_ID) REFERENCES hotel(hotel_ID)
);
