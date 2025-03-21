--Pour tester la page manageChambre
-- Insérer des clients
INSERT INTO Client (NAS_client, nom_client, prenom_client, rue, ville, code_postal, courriel_client, motpasse_client, date_enregistrement)
VALUES 
(100000004, 'Gill', 'blair', '321 Boulevard Sud', 'Montréal', 'H3Z2Y7', 'gill@email.com', '1234', '2025-03-12'),
(100000005, 'Jane', 'Smith', '321 Boulevard Sud', 'Montréal', 'H3Z2Y7', 'jane@email.com', '1234', '2025-03-12'),
(100000006, 'Moreau', 'Luc', '321 Boulevard Sud', 'Montréal', 'H3Z2Y7', 'luc.moreau@email.com', '1234', '2025-03-12'),
(100000007, 'Bertrand', 'Elise', '789 Rue Ouest', 'Québec', 'G1T4X6', 'elise.bertrand@email.com', '123456', '2025-03-13');
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(217, 300, 'TV + fridge', 'famille', 'non', 'non', 'mer', 21),
(218, 150, 'TV + fridge', 'simple', 'non', 'oui', 'montagne', 21),
(219, 200, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 21),
(220, 225, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 21);
-- Insérer les réservations
INSERT INTO Reservation (debut_date_reservation, fin_date_reservation, NAS_client, chambre_ID)
VALUES 
('2025-05-15', '2025-05-20', 100000006, 220),
('2025-04-05', '2025-05-15', 100000007, 217);
--Après qu'une reservation est transformée en une location, archiver la reservation (n'est plus dans la table reservation)
--un client peut avoir une reservation et une location en meme temps
--Inserer les locations
INSERT INTO Location (debut_date_location, fin_date_location, transaction_date,montant,  NAS_employe, NAS_client, chambre_ID, reservation_ID)
VALUES 
('2025-03-20', '2025-03-25','2025-03-20', 200, 210000001, 100000004, 218,10001),
('2025-04-18', '2025-04-08','2025-04-12', 200, 210000001, 100000004, 219,10002);


--Test data pour la liste de reservations de clients pour employeeHome page
-- Insertion de clients
INSERT INTO Client VALUES (220000001, 'Dupont', 'Jean', '789 Boulevard St-Laurent', 'Montréal', 'H2X1Y2', 'jean.dupont@email.com', 'mdp123', '2024-01-15');
INSERT INTO Client VALUES (220000002, 'Martin', 'Sophie', '567 Rue St-Denis', 'Montréal', 'H2X3H4', 'sophie.martin@email.com', 'mdp456', '2024-02-10');

-- Insertion de réservations
INSERT INTO Reservation (reservation_id, debut_date_reservation, fin_date_reservation, NAS_client, chambre_ID) 
VALUES 
('2025-04-01', '2025-04-05', 220000001, 111),
('2025-04-10', '2025-04-15', 220000002, 112);

