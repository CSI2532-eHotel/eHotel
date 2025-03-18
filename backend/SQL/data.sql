-- insertion: Chaines
INSERT INTO ChaineHotel (chaine_ID, nom_chaine, rue, ville, code_postal, nombre_hotel, courriel_chaine, numero_telephone_chaine) 
VALUES 
    (1, 'Marriott International', '10400 Fernwood Road', 'Bethesda', 'A1A1A0', 8, 'hq@marriott-hotels.com', '1111111110'),
    (2, 'Hyatt Hotels Corporation', '7930 Jones Branch Drive', 'McLean', 'B2B2B0', 8, 'hq@hyatt-hotels.com', '2222222220'),
    (3, 'Hilton Hotels & Resorts', '150 N Riverside Plaza', 'Chicago', 'C3C3C0', 8, 'hq@hilton-hotels.com', '3333333330'),
	(4, 'InterContinental Hotels Group (IHG)', '3 Ravinia Drive', 'Atlanta', 'D4D4D0', 8, 'hq@intercontinental-hotels.com', '4444444440'),
    (5, 'Wyndham Hotels & Resorts', '22 Sylvan Way', 'Parsippany', 'E5E5E0', 8, 'hq@wyndham-hotels.com', '5555555550');

---------------------------------------------------------------------------------------------------------------

-- insertion: hotel 1 - Marriott International
INSERT INTO Hotel (hotel_ID, nom_hotel, rue, ville, code_postal, nombre_chambre, courriel_hotel, numero_telephone_hotel, etoile, chaine_ID) 
VALUES 
    (11, 'Marriott Downtown NYC', '85 West Street at Albany Street', 'New York', 'A1A1A1', 5, 'nyc@marriott-hotels.com', '1111111111', 5, 1),
    (12, 'Marriott Los Angeles', '333 South Figueroa Street', 'Los Angeles', 'A1A1A2', 5, 'la@marriott-hotels.com', '1111111112', 4, 1),
    (13, 'Marriott Miami', '4200 Collins Avenue', 'Miami', 'A1A1A3', 5, 'miami@marriott-hotels.com', '1111111113', 3, 1),
    (14, 'Marriott Chicago', '540 North Michigan Avenue', 'Chicago', 'A1A1A4', 5, 'chicago@marriott-hotels.com', '1111111114', 5, 1),
	(15, 'Marriott Toronto', '525 Bay Street', 'Toronto', 'A1A1A5', 5, 'toronto@marriott-hotels.com', '1111111115', 3, 1),
    (16, 'Marriott Vancouver', '1128 West Hastings Street', 'Vancouver', 'A1A1A6', 5, 'vancouver@marriott-hotels.com', '1111111116', 2, 1),
    (17, 'Marriott Montreal', '1050 de la Gauchetiere West', 'Montreal', 'A1A1A7', 5, 'montreal@marriott-hotels.com', '1111111117', 4, 1),
    (18, 'Marriott Quebec City', '850 Place d Youville', 'Quebec City', 'A1A1A8', 5, 'qc@marriott-hotels.com', '1111111118', 1, 1);

-- insertion: Hotel 2 - Hyatt Hotels Corporation
INSERT INTO Hotel (hotel_ID, nom_hotel, rue, ville, code_postal, nombre_chambre, courriel_hotel, numero_telephone_hotel, etoile, chaine_ID) 
VALUES 
    (21, 'Hyatt Regency NYC', '109 East 42nd Street', 'New York', 'B2B2B1', 5, 'nyc@hyatt-hotels.com', '2222222221', 5, 2),
    (22, 'Hyatt Miami Beach', '1601 Collins Avenue', 'Miami', 'B2B2B2', 5, 'miami@hyatt-hotels.com', '2222222222', 4, 2),
    (23, 'Hyatt Place Chicago', '28 North Franklin Street', 'Chicago', 'B2B2B3', 5, 'chicago@hyatt-hotels.com', '2222222223', 2, 2),
    (24, 'Hyatt Dallas Downtown', '300 Reunion Boulevard', 'Dallas', 'B2B2B4', 5, 'dallas@hyatt-hotels.com', '2222222224', 1, 2),
    (25, 'Hyatt Los Angeles', '6225 West Century Boulevard', 'Los Angeles', 'B2B2B5', 5, 'la@hyatt-hotels.com', '2222222225', 5, 2),
    (26, 'Hyatt Houston', '1200 Louisiana Street', 'Houston', 'B2B2B6', 5, 'houston@hyatt-hotels.com', '2222222226', 3, 2),
    (27, 'Hyatt Toronto', '370 King Street West', 'Toronto', 'B2B2B7', 5, 'toronto@hyatt-hotels.com', '2222222227', 4, 2),
    (28, 'Hyatt Vancouver', '655 Burrard Street', 'Vancouver', 'B2B2B8', 5, 'vancouver@hyatt-hotels.com', '2222222228', 1, 2);

-- insertion: hotel 3 - Hilton Hotels & Resorts
INSERT INTO Hotel (hotel_ID, nom_hotel, rue, ville, code_postal, nombre_chambre, courriel_hotel, numero_telephone_hotel, etoile, chaine_ID) 
VALUES 
    (31, 'Hilton NYC Central', '1335 Avenue of the Americas', 'New York', 'C3C3C1', 5, 'nyc@hilton-hotels.com', '3333333331', 5, 3),
    (32, 'Hilton Miami South Beach', '1601 Collins Avenue', 'Miami', 'C3C3C2', 5, 'miami@hilton-hotels.com', '3333333332', 3, 3),
    (33, 'Hilton Chicago', '720 South Michigan', 'Chicago', 'C3C3C3', 5, 'chicago@hilton-hotels.com', '3333333333', 1, 3),
    (34, 'Hilton Dallas', '1507 North Watson Road', 'Dallas', 'C3C3C4', 5, 'dallas@hilton-hotels.com', '3333333334', 4, 3),
    (35, 'Hilton Los Angeles', '5711 West Century Boulevard', 'Los Angeles', 'C3C3C5', 5, 'la@hilton-hotels.com', '3333333335', 2, 3),
    (36, 'Hilton Houston', '6633 Travis Street', 'Houston', 'C3C3C6', 5, 'houston@hilton-hotels.com', '3333333336', 1, 3),
    (37, 'Hilton Toronto', '145 Richmond Street West', 'Toronto', 'C3C3C7', 5, 'toronto@hilton-hotels.com', '3333333337', 5, 3),
    (38, 'Hilton Vancouver', '433 Robson Street', 'Vancouver', 'C3C3C8', 5, 'vancouver@hilton-hotels.com', '3333333338', 3, 3);

-- insertion: hotel 4 - InterContinental Hotels Group (IHG)
INSERT INTO Hotel (hotel_ID, nom_hotel, rue, ville, code_postal, nombre_chambre, courriel_hotel, numero_telephone_hotel, etoile, chaine_ID) 
VALUES 
    (41, 'InterContinental New York', '111 East 48th Street', 'New York', 'D4D4D1', 5, 'nyc@intercontinental-hotels.com', '4444444441', 5, 4),
    (42, 'InterContinental Miami', '100 Chopin Plaza', 'Miami', 'D4D4D2', 5, 'miami@intercontinental-hotels.com', '4444444442', 5, 4),
    (43, 'Holiday Inn Chicago', '506 West Harrison Street', 'Chicago', 'D4D4D3', 5, 'chicago@holidayin-hotels.com', '4444444443', 1, 4),
    (44, 'Crowne Plaza Dallas', '1015 Elm Street', 'Dallas', 'D4D4D4', 5, 'dallas@crowne-hotels.com', '4444444444', 2, 4),
    (45, 'Hotel Indigo Los Angeles', '899 Francisco Street', 'Los Angeles', 'D4D4D5', 5, 'la@indigo-hotels.com', '4444444445', 4, 4),
    (46, 'Holiday Inn Express Houston', '9300 South Main Street', 'Houston', 'D4D4D6', 5, 'houston@holidayin-hotels.com', '4444444446', 2, 4),
    (47, 'InterContinental Toronto', '225 Front Street West', 'Toronto', 'D4D4D7', 5, 'toronto@intercontinental-hotels.com', '4444444447', 3, 4),
    (48, 'InterContinental Vancouver', '1028 Canada Place', 'Vancouver', 'D4D4D8', 5, 'vancouver@intercontinental-hotels.com', '4444444448', 5, 4);

-- insertion: hotel 5 - Wyndham Hotels & Resorts
INSERT INTO Hotel (hotel_ID, nom_hotel, rue, ville, code_postal, nombre_chambre, courriel_hotel, numero_telephone_hotel, etoile, chaine_ID) 
VALUES 
    (51, 'Wyndham Grand New York', '109 East 42nd Street', 'New York', 'E5E5E1', 5, 'nyc@wyndham-hotels.com', '5555555551', 5, 5),
    (52, 'Wyndham Miami Beach', '4833 Collins Avenue', 'Miami', 'E5E5E2', 5, 'miami@wyndham-hotels.com', '5555555552', 1, 5),
    (53, 'Wyndham Chicago', '633 North Saint Clair Street', 'Chicago', 'E5E5E3', 5, 'chicago@wyndham-hotels.com', '5555555553', 4, 5),
    (54, 'Wyndham Dallas', '7800 Alpha Road', 'Dallas', 'E5E5E4', 5, 'dallas@wyndham-hotels.com', '5555555554', 2, 5),
    (55, 'Wyndham Los Angeles', '120 South Los Angeles Street', 'Los Angeles', 'E5E5E5', 5, 'la@wyndham-hotels.com', '5555555555', 3, 5),
    (56, 'Wyndham Houston', '12400 Greenspoint Drive', 'Houston', 'E5E5E6', 5, 'houston@wyndham-hotels.com', '5555555556', 1, 5),
    (57, 'Wyndham Toronto', '900 York Mills Road', 'Toronto', 'E5E5E7', 5, 'toronto@wyndham-hotels.com', '5555555557', 4, 5),
    (58, 'Wyndham Vancouver', '10720 Cambie Road', 'Vancouver', 'E5E5E8', 5, 'vancouver@wyndham-hotels.com', '5555555558', 5, 5);
	
---------------------------------------------------------------------------------------------------------------

-- insertion: chambres 11 - Marriott Downtown NYC
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(111, 150, 'TV + fridge', 'simple', 'non', 'non', 'mer', 11),
(112, 200, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 11),
(113, 225, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 11),
(114, 300, 'TV + fridge', 'famille', 'non', 'oui', 'montagne', 11),
(115, 325, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 11);

-- insertion: chambres 12 - Marriott Los Angeles
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(121, 125, 'TV + fridge', 'simple', 'non', 'oui', 'mer', 12),
(122, 175, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 12),
(123, 200, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 12),
(124, 275, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 12),
(125, 300, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 12);

-- insertion: chambres 13 - Marriott Miami
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(131, 100, 'TV + fridge', 'simple', 'non', 'non', 'montagne', 13),
(132, 150, 'TV + fridge', 'double', 'non', 'non', 'montagne', 13),
(133, 175, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 13),
(134, 250, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 13),
(135, 275, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'mer', 13);

-- insertion: chambres 14 - Marriott Chicago
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(141, 150, 'TV + fridge', 'simple', 'non', 'non', 'mer', 14),
(142, 200, 'TV + fridge', 'double', 'non', 'non', 'montagne', 14),
(143, 225, 'TV + fridge + sofa', 'double', 'oui', 'oui', 'montagne', 14),
(144, 300, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 14),
(145, 325, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 14);

-- insertion: chambres 15 - Marriott Toronto
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(151, 100, 'TV + fridge', 'simple', 'non', 'non', 'mer', 15),
(152, 150, 'TV + fridge', 'double', 'non', 'oui', 'mer', 15),
(153, 175, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 15),
(154, 250, 'TV + fridge', 'famille', 'non', 'non', 'montagne', 15),
(155, 275, 'TV + fridge + sofa', 'famille', 'oui', 'oui', 'montagne', 15);

-- insertion: chambres 16 - Marriott Vancouver
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(161, 75, 'TV + fridge', 'simple', 'non', 'oui', 'montagne', 16),
(162, 125, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 16),
(163, 150, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 16),
(164, 225, 'TV + fridge', 'famille', 'non', 'non', 'mer', 16),
(165, 250, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'mer', 16);

-- insertion: chambres 17 - Marriott Montreal
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(171, 125, 'TV + fridge', 'simple', 'non', 'non', 'mer', 17),
(172, 175, 'TV + fridge', 'double', 'non', 'oui', 'mer', 17),
(173, 200, 'TV + fridge + sofa', 'double', 'oui', 'non', 'montagne', 17),
(174, 275, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 17),
(175, 300, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 17);

-- insertion: chambres 18 - Marriott Quebec City
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(181, 50, 'TV + fridge', 'simple', 'non', 'non', 'mer', 18),
(182, 100, 'TV + fridge', 'double', 'non', 'non', 'montagne', 18),
(183, 125, 'TV + fridge + sofa', 'double', 'oui', 'non', 'montagne', 18),
(184, 200, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 18),
(185, 225, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'mer', 18);

---------------------------------------------------------------------------------------------------------------

-- insertion: chambres 21 - Hyatt Regency NYC
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(211, 150, 'TV + fridge', 'simple', 'non', 'oui', 'montagne', 21),
(212, 200, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 21),
(213, 225, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 21),
(214, 300, 'TV + fridge', 'famille', 'non', 'non', 'mer', 21),
(215, 325, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'mer', 21);

-- insertion: chambres 22 - Hyatt Miami Beach
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(221, 125, 'TV + fridge', 'simple', 'non', 'non', 'mer', 22),
(222, 175, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 22),
(223, 200, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 22),
(224, 275, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 22),
(225, 300, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 22);

-- insertion: chambres 23 - Hyatt Place Chicago
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(231, 75, 'TV + fridge', 'simple', 'non', 'non', 'mer', 23),
(232, 125, 'TV + fridge', 'double', 'non', 'oui', 'mer', 23),
(233, 150, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 23),
(234, 225, 'TV + fridge', 'famille', 'non', 'non', 'montagne', 23),
(235, 250, 'TV + fridge + sofa', 'famille', 'oui', 'oui', 'montagne', 23);

-- insertion: chambres 24 - Hyatt Dallas Downtown
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(241, 50, 'TV + fridge', 'simple', 'non', 'non', 'mer', 24),
(242, 100, 'TV + fridge', 'double', 'non', 'non', 'montagne', 24),
(243, 125, 'TV + fridge + sofa', 'double', 'oui', 'non', 'montagne', 24),
(244, 200, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 24),
(245, 225, 'TV + fridge + sofa', 'famille', 'oui', 'oui', 'montagne', 24);

-- insertion: chambres 25 - Hyatt Los Angeles
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(251, 150, 'TV + fridge', 'simple', 'non', 'non', 'mer', 25),
(252, 200, 'TV + fridge', 'double', 'non', 'oui', 'mer', 25),
(253, 225, 'TV + fridge + sofa', 'double', 'oui', 'non', 'montagne', 25),
(254, 300, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 25),
(255, 325, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 25);

-- insertion: chambres 26 - Hyatt Houston
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(261, 100, 'TV + fridge', 'simple', 'non', 'non', 'mer', 26),
(262, 150, 'TV + fridge', 'double', 'non', 'non', 'montagne', 26),
(263, 175, 'TV + fridge + sofa', 'double', 'oui', 'oui', 'montagne', 26),
(264, 250, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 26),
(265, 275, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 26);

-- insertion: chambres 27 - Hyatt Toronto
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(271, 125, 'TV + fridge', 'simple', 'non', 'oui', 'mer', 27),
(272, 175, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 27),
(273, 200, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 27),
(274, 275, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 27),
(275, 300, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 27);

-- insertion: chambres 28 - Hyatt Vancouver
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(281, 50, 'TV + fridge', 'simple', 'non', 'non', 'montagne', 28),
(282, 100, 'TV + fridge', 'double', 'non', 'non', 'montagne', 28),
(283, 125, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 28),
(284, 200, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 28),
(285, 225, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'mer', 28);

---------------------------------------------------------------------------------------------------------------

-- insertion: chambres 31 - Hilton NYC Central
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(311, 150, 'TV + fridge', 'simple', 'non', 'non', 'mer', 31),
(312, 200, 'TV + fridge', 'double', 'non', 'oui', 'mer', 31),
(313, 225, 'TV + fridge + sofa', 'double', 'oui', 'non', 'montagne', 31),
(314, 300, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 31),
(315, 325, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 31);

-- insertion: chambres 32 - Hilton Miami South Beach
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(321, 100, 'TV + fridge', 'simple', 'non', 'oui', 'mer', 32),
(322, 150, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 32),
(323, 175, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 32),
(324, 250, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 32),
(325, 275, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 32);

-- insertion: chambres 33 - Hilton Chicago
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(331, 50, 'TV + fridge', 'simple', 'non', 'non', 'montagne', 33),
(332, 100, 'TV + fridge', 'double', 'non', 'non', 'montagne', 33),
(333, 125, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 33),
(334, 200, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 33),
(335, 225, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'mer', 33);

-- insertion: chambres 34 - Hilton Dallas
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(341, 125, 'TV + fridge', 'simple', 'non', 'oui', 'montagne', 34),
(342, 175, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 34),
(343, 200, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 34),
(344, 275, 'TV + fridge', 'famille', 'non', 'non', 'mer', 34),
(345, 300, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'mer', 34);

-- insertion: chambres 35 - Hilton Los Angeles
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(351, 75, 'TV + fridge', 'simple', 'non', 'non', 'mer', 35),
(352, 125, 'TV + fridge', 'double', 'non', 'non', 'montagne', 35),
(353, 150, 'TV + fridge + sofa', 'double', 'oui', 'oui', 'montagne', 35),
(354, 225, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 35),
(355, 250, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 35);

-- insertion: chambres 36 - Hilton Houston
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(361, 50, 'TV + fridge', 'simple', 'non', 'non', 'mer', 36),
(362, 100, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 36),
(363, 125, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 36),
(364, 200, 'TV + fridge', 'famille', 'non', 'oui', 'montagne', 36),
(365, 225, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 36);

-- insertion: chambres 37 - Hilton Toronto
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(371, 150, 'TV + fridge', 'simple', 'non', 'non', 'mer', 37),
(372, 200, 'TV + fridge', 'double', 'non', 'non', 'montagne', 37),
(373, 225, 'TV + fridge + sofa', 'double', 'oui', 'non', 'montagne', 37),
(374, 300, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 37),
(375, 325, 'TV + fridge + sofa', 'famille', 'oui', 'oui', 'montagne', 37);

-- insertion: chambres 38 - Hilton Vancouver
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(381, 100, 'TV + fridge', 'simple', 'non', 'non', 'mer', 38),
(382, 150, 'TV + fridge', 'double', 'non', 'non', 'montagne', 38),
(383, 175, 'TV + fridge + sofa', 'double', 'oui', 'non', 'montagne', 38),
(384, 250, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 38),
(385, 275, 'TV + fridge + sofa', 'famille', 'oui', 'oui', 'montagne', 38);

---------------------------------------------------------------------------------------------------------------

-- insertion: chambres 41 - InterContinental New York
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(411, 150, 'TV + fridge', 'simple', 'non', 'non', 'mer', 41),
(412, 200, 'TV + fridge', 'double', 'non', 'non', 'montagne', 41),
(413, 225, 'TV + fridge + sofa', 'double', 'oui', 'non', 'montagne', 41),
(414, 300, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 41),
(415, 325, 'TV + fridge + sofa', 'famille', 'oui', 'oui', 'montagne', 41);

-- insertion: chambres 42 - InterContinental Miami
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(421, 150, 'TV + fridge', 'simple', 'non', 'non', 'mer', 42),
(422, 200, 'TV + fridge', 'double', 'non', 'non', 'montagne', 42),
(423, 225, 'TV + fridge + sofa', 'double', 'oui', 'oui', 'montagne', 42),
(424, 300, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 42),
(425, 325, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 42);

-- insertion: chambres 43 - Holiday Inn Chicago
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(431, 50, 'TV + fridge', 'simple', 'non', 'non', 'mer', 43),
(432, 100, 'TV + fridge', 'double', 'non', 'oui', 'mer', 43),
(433, 125, 'TV + fridge + sofa', 'double', 'oui', 'non', 'montagne', 43),
(434, 200, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 43),
(435, 225, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 43);

-- insertion: chambres 44 - Crowne Plaza Dallas
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(441, 75, 'TV + fridge', 'simple', 'non', 'non', 'mer', 44),
(442, 125, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 44),
(443, 150, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 44),
(444, 225, 'TV + fridge', 'famille', 'non', 'oui', 'montagne', 44),
(445, 250, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 44);

-- insertion: chambres 45 - Hotel Indigo Los Angeles
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(451, 125, 'TV + fridge', 'simple', 'non', 'non', 'mer', 45),
(452, 175, 'TV + fridge', 'double', 'non', 'oui', 'mer', 45),
(453, 200, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 45),
(454, 275, 'TV + fridge', 'famille', 'non', 'non', 'montagne', 45),
(455, 300, 'TV + fridge + sofa', 'famille', 'oui', 'oui', 'montagne', 45);

-- insertion: chambres 46 - Holiday Inn Express Houston
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(461, 75, 'TV + fridge', 'simple', 'non', 'oui', 'montagne', 46),
(462, 125, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 46),
(463, 150, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 46),
(464, 225, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 46),
(465, 250, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'mer', 46);

-- insertion: chambres 47 - InterContinental Toronto
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(471, 100, 'TV + fridge', 'simple', 'non', 'non', 'mer', 47),
(472, 150, 'TV + fridge', 'double', 'non', 'oui', 'mer', 47),
(473, 175, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 47),
(474, 250, 'TV + fridge', 'famille', 'non', 'oui', 'montagne', 47),
(475, 275, 'TV + fridge + sofa', 'famille', 'oui', 'oui', 'montagne', 47);

-- insertion: chambres 48 - InterContinental Vancouver
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(481, 150, 'TV + fridge', 'simple', 'non', 'non', 'mer', 48),
(482, 200, 'TV + fridge', 'double', 'non', 'non', 'montagne', 48),
(483, 225, 'TV + fridge + sofa', 'double', 'oui', 'non', 'montagne', 48),
(484, 300, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 48),
(485, 325, 'TV + fridge + sofa', 'famille', 'oui', 'oui', 'montagne', 48);

---------------------------------------------------------------------------------------------------------------

-- insertion: chambres 51 - Wyndham Grand New York
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(511, 150, 'TV + fridge', 'simple', 'non', 'oui', 'mer', 51),
(512, 200, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 51),
(513, 225, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 51),
(514, 300, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 51),
(515, 325, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 51);

-- insertion: chambres 52 - Wyndham Miami Beach
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(521, 50, 'TV + fridge', 'simple', 'non', 'non', 'mer', 52),
(522, 100, 'TV + fridge', 'double', 'non', 'oui', 'mer', 52),
(523, 125, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 52),
(524, 200, 'TV + fridge', 'famille', 'non', 'non', 'montagne', 52),
(525, 225, 'TV + fridge + sofa', 'famille', 'oui', 'oui', 'montagne', 52);

-- insertion: chambres 53 - Wyndham Chicago
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(531, 125, 'TV + fridge', 'simple', 'non', 'non', 'mer', 53),
(532, 175, 'TV + fridge', 'double', 'non', 'non', 'montagne', 53),
(533, 200, 'TV + fridge + sofa', 'double', 'oui', 'oui', 'montagne', 53),
(534, 275, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 53),
(535, 300, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 53);

-- insertion: chambres 54 - Wyndham Dallas
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(541, 75, 'TV + fridge', 'simple', 'non', 'non', 'mer', 54),
(542, 125, 'TV + fridge', 'double', 'non', 'non', 'montagne', 54),
(543, 150, 'TV + fridge + sofa', 'double', 'oui', 'oui', 'montagne', 54),
(544, 225, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 54),
(545, 250, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 54);

-- insertion: chambres 55 - Wyndham Los Angeles
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(551, 100, 'TV + fridge', 'simple', 'non', 'non', 'mer', 55),
(552, 150, 'TV + fridge', 'double', 'non', 'non', 'montagne', 55),
(553, 175, 'TV + fridge + sofa', 'double', 'oui', 'non', 'montagne', 55),
(554, 250, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 55),
(555, 275, 'TV + fridge + sofa', 'famille', 'oui', 'oui', 'montagne', 55);

-- insertion: chambres 56 - Wyndham Houston
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(561, 50, 'TV + fridge', 'simple', 'non', 'oui', 'montagne', 56),
(562, 100, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 56),
(563, 125, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 56),
(564, 200, 'TV + fridge', 'famille', 'non' 'non', 'mer', 56),
(565, 225, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'mer', 56);

-- insertion: chambres 57 - Wyndham Toronto
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(571, 125, 'TV + fridge', 'simple', 'non', 'non', 'mer', 57),
(572, 175, 'TV + fridge', 'double', 'non', 'oui', 'montagne', 57),
(573, 200, 'TV + fridge + sofa', 'double', 'oui', 'non', 'mer', 57),
(574, 275, 'TV + fridge', 'famille', 'non', 'oui', 'montagne', 57),
(575, 300, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 57);

-- insertion: chambres 58 - Wyndham Vancouver
INSERT INTO Chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(581, 150, 'TV + fridge', 'simple', 'non', 'non', 'mer', 58),
(582, 200, 'TV + fridge', 'double', 'non', 'oui', 'mer', 58),
(583, 225, 'TV + fridge + sofa', 'double', 'oui', 'non', 'montagne', 58),
(584, 300, 'TV + fridge', 'famille', 'non', 'oui', 'mer', 58),
(585, 325, 'TV + fridge + sofa', 'famille', 'oui', 'non', 'montagne', 58);

---------------------------------------------------------------------------------------------------------------

-- insertion: employe

INSERT INTO Employe (NAS_employe, nom_employe, prenom_employe, rue, ville, code_postal, role, courriel_employee, motpasse_employee, hotel_ID) 
VALUES
-- 1 - Marriott International 00000
    -- 11 - Marriott Downtown NYC
    (110000001, 'Cherry', 'Keith', '111 West Street at Albany Street', 'New York', 'A1A0A1', 'gestionnaire', 'admin-nyc@marriott-hotels.com', 'Password@1101', 11),
    (110000002, 'Mayer', 'Aamir', '112 West Street at Albany Street', 'New York', 'A1A0A2', 'receptioniste', 'reception-nyc@marriott-hotels.com', 'Password@1102', 11),
    (110000003, 'Ball', 'Sasha', '113 West Street at Albany Street', 'New York', 'A1A0A3', 'nettoyeur', 'nettoyage-nyc@marriott-hotels.com', 'Password@1103', 11),
    -- 12 - Marriott Los Angeles
    (120000001, 'Moreno', 'Michael', '121 South Figueroa Street', 'Los Angeles', 'A2A0A1', 'gestionnaire', 'admin-la@marriott-hotels.com', 'Password@1201', 12),
    (120000002, 'Gillespie', 'Erica', '122 South Figueroa Street', 'Los Angeles', 'A2A0A2', 'receptioniste', 'reception-la@marriott-hotels.com', 'Password@1202', 12),
    (120000003, 'Franco', 'Franciszek', '123 South Figueroa Street', 'Los Angeles', 'A2A0A3', 'nettoyeur', 'nettoyage-la@marriott-hotels.com', 'Password@1203', 12),
    -- 13 - Marriott Miami
    (130000001, 'Hampton', 'Owen', '131 Collins Avenue', 'Miami', 'A3A0A1', 'gestionnaire', 'admin-miami@marriott-hotels.com', 'Password@1301', 13),
    (130000002, 'Conway', 'Isabelle', '132 Collins Avenue', 'Miami', 'A3A0A2', 'receptioniste', 'reception-miami@marriott-hotels.com', 'Password@1302', 13),
    (130000003, 'Tanner', 'Julian', '133 Collins Avenue', 'Miami', 'A3A0A3', 'nettoyeur', 'nettoyage-miami@marriott-hotels.com', 'Password@1303', 13),
    -- 14 - Marriott Chicago
    (140000001, 'Hendrix', 'Sophia', '141 North Michigan Avenue', 'Chicago', 'A4A0A1', 'gestionnaire', 'admin-chicago@marriott-hotels.com', 'Password@1401', 14),
    (140000002, 'Bridges', 'Liam', '142 North Michigan Avenue', 'Chicago', 'A4A0A2', 'receptioniste', 'reception-chicago@marriott-hotels.com', 'Password@1402', 14),
    (140000003, 'Jefferson', 'Ella', '143 North Michigan Avenue', 'Chicago', 'A4A0A3', 'nettoyeur', 'nettoyage-chicago@marriott-hotels.com', 'Password@1403', 14),
    -- 15 - Marriott Toronto
    (150000001, 'Rivers', 'Mason', '151 Bay Street', 'Toronto', 'A5A0A1', 'gestionnaire', 'admin-toronto@marriott-hotels.com', 'Password@1501', 15),
    (150000002, 'Barton', 'Charlotte', '152 Bay Street', 'Toronto', 'A5A0A2', 'receptioniste', 'reception-toronto@marriott-hotels.com', 'Password@1502', 15),
    (150000003, 'Maddox', 'Ethan', '153 Bay Street', 'Toronto', 'A5A0A3', 'nettoyeur', 'nettoyage-toronto@marriott-hotels.com', 'Password@1503', 15),
    -- 16 - Marriott Vancouver
    (160000001, 'Preston', 'Lucas', '161 West Hastings Street', 'Vancouver', 'A6A0A1', 'gestionnaire', 'admin-vancouver@marriott-hotels.com', 'Password@1601', 16),
    (160000002, 'Caldwell', 'Amelia', '162 West Hastings Street', 'Vancouver', 'A6A0A2', 'receptioniste', 'reception-vancouver@marriott-hotels.com', 'Password@1602', 16),
    (160000003, 'McKenzie', 'Daniel', '163 West Hastings Street', 'Vancouver', 'A6A0A3', 'nettoyeur', 'nettoyage-vancouver@marriott-hotels.com', 'Password@1603', 16),
    -- 17 - Marriott Montreal
    (170000001, 'Hayes', 'Benjamin', '171 de la Gauchetiere West', 'Montreal', 'A7A0A1', 'gestionnaire', 'admin-montreal@marriott-hotels.com', 'Password@1701', 17),
    (170000002, 'Whitaker', 'Olivia', '172 de la Gauchetiere West', 'Montreal', 'A7A0A2', 'receptioniste', 'reception-montreal@marriott-hotels.com', 'Password@1702', 17),
    (170000003, 'Carrington', 'James', '173 de la Gauchetiere West', 'Montreal', 'A7A0A3', 'nettoyeur', 'nettoyage-montreal@marriott-hotels.com', 'Password@1703', 17),
    -- 18 - Marriott Quebec City
    (180000001, 'Fischer', 'Henry', '181 Place d Youville', 'Quebec City', 'A8A0A1', 'gestionnaire', 'admin-qc@marriott-hotels.com', 'Password@1801', 18),
    (180000002, 'Reeves', 'Emily', '182 Place d Youville', 'Quebec City', 'A8A0A2', 'receptioniste', 'reception-qc@marriott-hotels.com', 'Password@1802', 18),
    (180000003, 'Pope', 'William', '183 Place d Youville', 'Quebec City', 'A8A0A3', 'nettoyeur', 'nettoyage-qc@marriott-hotels.com', 'Password@1803', 18),

-- 2 - Hyatt Hotels Corporation
	-- 21 - Hyatt Regency NYC
    (210000001, 'Smith', 'John', '211 East 42nd Street', 'New York', 'B1B0B1', 'gestionnaire', 'admin-nyc@hyatt-hotels.com', 'Password@2101', 21),
    (210000002, 'Johnson', 'Emma', '212 East 42nd Street', 'New York', 'B1B0B2', 'receptioniste', 'reception-nyc@hyatt-hotels.com', 'Password@2102', 21),
    (210000003, 'Williams', 'Noah', '213 East 42nd Street', 'New York', 'B1B0B3', 'nettoyeur', 'nettoyage-nyc@hyatt-hotels.com', 'Password@2103', 21),
    -- 22 - Hyatt Miami Beach
    (220000001, 'Brown', 'Sophia', '221 Collins Avenue', 'Miami', 'B2B0B1', 'gestionnaire', 'admin-miami@hyatt-hotels.com', 'Password@2201', 22),
    (220000002, 'Davis', 'James', '222 Collins Avenue', 'Miami', 'B2B0B2', 'receptioniste', 'reception-miami@hyatt-hotels.com', 'Password@2202', 22),
    (220000003, 'Miller', 'Olivia', '223 Collins Avenue', 'Miami', 'B2B0B3', 'nettoyeur', 'nettoyage-miami@hyatt-hotels.com', 'Password@2203', 22),
    -- 23 - Hyatt Place Chicago
    (230000001, 'Wilson', 'Lucas', '231 North Franklin Street', 'Chicago', 'B3B0B1', 'gestionnaire', 'admin-chicago@hyatt-hotels.com', 'Password@2301', 23),
    (230000002, 'Moore', 'Ava', '232 North Franklin Street', 'Chicago', 'B3B0B2', 'receptioniste', 'reception-chicago@hyatt-hotels.com', 'Password@2302', 23),
    (230000003, 'Taylor', 'Mason', '233 North Franklin Street', 'Chicago', 'B3B0B3', 'nettoyeur', 'nettoyage-chicago@hyatt-hotels.com', 'Password@2303', 23),
    -- 24 - Hyatt Dallas Downtown
    (240000001, 'Anderson', 'Ella', '241 Reunion Boulevard', 'Dallas', 'B4B0B1', 'gestionnaire', 'admin-dallas@hyatt-hotels.com', 'Password@2401', 24),
    (240000002, 'Thomas', 'Benjamin', '242 Reunion Boulevard', 'Dallas', 'B4B0B2', 'receptioniste', 'reception-dallas@hyatt-hotels.com', 'Password@2402', 24),
    (240000003, 'Jackson', 'Harper', '243 Reunion Boulevard', 'Dallas', 'B4B0B3', 'nettoyeur', 'nettoyage-dallas@hyatt-hotels.com', 'Password@2403', 24),
    -- 25 - Hyatt Los Angeles
    (250000001, 'White', 'Henry', '251 West Century Boulevard', 'Los Angeles', 'B5B0B1', 'gestionnaire', 'admin-la@hyatt-hotels.com', 'Password@2501', 25),
    (250000002, 'Harris', 'Scarlett', '252 West Century Boulevard', 'Los Angeles', 'B5B0B2', 'receptioniste', 'reception-la@hyatt-hotels.com', 'Password@2502', 25),
    (250000003, 'Martin', 'Ethan', '253 West Century Boulevard', 'Los Angeles', 'B5B0B3', 'nettoyeur', 'nettoyage-la@hyatt-hotels.com', 'Password@2503', 25),
    -- 26 - Hyatt Houston
    (260000001, 'Thompson', 'Liam', '261 Louisiana Street', 'Houston', 'B6B0B1', 'gestionnaire', 'admin-houston@hyatt-hotels.com', 'Password@2601', 26),
    (260000002, 'Garcia', 'Isabella', '262 Louisiana Street', 'Houston', 'B6B0B2', 'receptioniste', 'reception-houston@hyatt-hotels.com', 'Password@2602', 26),
    (260000003, 'Martinez', 'Sebastian', '263 Louisiana Street', 'Houston', 'B6B0B3', 'nettoyeur', 'nettoyage-houston@hyatt-hotels.com', 'Password@2603', 26),
    -- 27 - Hyatt Toronto
    (270000001, 'Robinson', 'Zoe', '271 King Street West', 'Toronto', 'B7B0B1', 'gestionnaire', 'admin-toronto@hyatt-hotels.com', 'Password@2701', 27),
    (270000002, 'Clark', 'Daniel', '272 King Street West', 'Toronto', 'B7B0B2', 'receptioniste', 'reception-toronto@hyatt-hotels.com', 'Password@2702', 27),
    (270000003, 'Rodriguez', 'Emily', '273 King Street West', 'Toronto', 'B7B0B3', 'nettoyeur', 'nettoyage-toronto@hyatt-hotels.com', 'Password@2703', 27),
    -- 28 - Hyatt Vancouver
    (280000001, 'Lewis', 'Alexander', '281 Burrard Street', 'Vancouver', 'B8B0B1', 'gestionnaire', 'admin-vancouver@hyatt-hotels.com', 'Password@2801', 28),
    (280000002, 'Walker', 'Sofia', '282 Burrard Street', 'Vancouver', 'B8B0B2', 'receptioniste', 'reception-vancouver@hyatt-hotels.com', 'Password@2802', 28),
    (280000003, 'Hall', 'Jack', '283 Burrard Street', 'Vancouver', 'B8B0B3', 'nettoyeur', 'nettoyage-vancouver@hyatt-hotels.com', 'Password@2803', 28),

-- 3 - Hilton Hotels & Resorts
	-- 31 - Hilton NYC Central
	(310000001, 'Stevens', 'Alex', '311 Fifth Avenue', 'New York', 'C1C0C1', 'gestionnaire', 'admin-nyc@hilton-hotels.com', 'Password@3101', 31),
	(310000002, 'Murphy', 'Jordan', '312 Fifth Avenue', 'New York', 'C1C0C2', 'receptioniste', 'reception-nyc@hilton-hotels.com', 'Password@3102', 31),
	(310000003, 'Foster', 'Taylor', '313 Fifth Avenue', 'New York', 'C1C0C3', 'nettoyeur', 'nettoyage-nyc@hilton-hotels.com', 'Password@3103', 31),
	-- 32 - Hilton Miami South Beach
	(320000001, 'Adams', 'Morgan', '321 Collins Avenue', 'Miami', 'C2C0C1', 'gestionnaire', 'admin-miami@hilton-hotels.com', 'Password@3201', 32),
	(320000002, 'Mason', 'Bailey', '322 Collins Avenue', 'Miami', 'C2C0C2', 'receptioniste', 'reception-miami@hilton-hotels.com', 'Password@3202', 32),
	(320000003, 'Bennett', 'Casey', '323 Collins Avenue', 'Miami', 'C2C0C3', 'nettoyeur', 'nettoyage-miami@hilton-hotels.com', 'Password@3203', 32),
	-- 33 - Hilton Chicago
	(330000001, 'Ward', 'Riley', '331 South Michigan', 'Chicago', 'C3C0C1', 'gestionnaire', 'admin-chicago@hilton-hotels.com', 'Password@3301', 33),
	(330000002, 'Gray', 'Jordan', '332 South Michigan', 'Chicago', 'C3C0C2', 'receptioniste', 'reception-chicago@hilton-hotels.com', 'Password@3302', 33),
	(330000003, 'Fleming', 'Skyler', '333 South Michigan', 'Chicago', 'C3C0C3', 'nettoyeur', 'nettoyage-chicago@hilton-hotels.com', 'Password@3303', 33),
	-- 34 - Hilton Dallas
	(340000001, 'Holt', 'River', '341 North Watson Road', 'Dallas', 'C4C0C1', 'gestionnaire', 'admin-dallas@hilton-hotels.com', 'Password@3401', 34),
	(340000002, 'Young', 'Jamie', '342 North Watson Road', 'Dallas', 'C4C0C2', 'receptioniste', 'reception-dallas@hilton-hotels.com', 'Password@3402', 34),
	(340000003, 'Ross', 'Peyton', '343 North Watson Road', 'Dallas', 'C4C0C3', 'nettoyeur', 'nettoyage-dallas@hilton-hotels.com', 'Password@3403', 34),
	-- 35 - Hilton Los Angeles
	(350000001, 'Lawson', 'Cameron', '351 West Century Boulevard', 'Los Angeles', 'C5C0C1', 'gestionnaire', 'admin-la@hilton-hotels.com', 'Password@3501', 35),
	(350000002, 'Davidson', 'Avery', '352 West Century Boulevard', 'Los Angeles', 'C5C0C2', 'receptioniste', 'reception-la@hilton-hotels.com', 'Password@3502', 35),
	(350000003, 'Barnes', 'Reese', '352 West Century Boulevard', 'Los Angeles', 'C5C0C3', 'nettoyeur', 'nettoyage-la@hilton-hotels.com', 'Password@3503', 35),
	-- 36 - Hilton Houston
	(360000001, 'Gibson', 'Charlie', '361 Travis Street', 'Houston', 'C6C0C1', 'gestionnaire', 'admin-houston@hilton-hotels.com', 'Password@3601', 36),
	(360000002, 'Willis', 'Drew', '362 Travis Street', 'Houston', 'C6C0C2', 'receptioniste', 'reception-houston@hilton-hotels.com', 'Password@3602', 36),
	(360000003, 'Harrison', 'Taylor', '363 Travis Street', 'Houston', 'C6C0C3', 'nettoyeur', 'nettoyage-houston@hilton-hotels.com', 'Password@3603', 36),
	-- 37 - Hilton Toronto
	(370000001, 'Hudson', 'Riley', '371 Richmond Street West', 'Toronto', 'C7C0C1', 'gestionnaire', 'admin-toronto@hilton-hotels.com', 'Password@3701', 37),
	(370000002, 'Hunter', 'Casey', '372 Richmond Street West', 'Toronto', 'C7C0C2', 'receptioniste', 'reception-toronto@hilton-hotels.com', 'Password@3702', 37),
	(370000003, 'Cruz', 'Jordan', '373 Richmond Street West', 'Toronto', 'C7C0C3', 'nettoyeur', 'nettoyage-toronto@hilton-hotels.com', 'Password@3703', 37),
	-- 38 - Hilton Vancouver
	(380000001, 'Franklin', 'Bailey', '381 Robson Street', 'Vancouver', 'C8C0C1', 'gestionnaire', 'admin-vancouver@hilton-hotels.com', 'Password@3801', 38),
	(380000002, 'Tate', 'Morgan', '382 Robson Street', 'Vancouver', 'C8C0C2', 'receptioniste', 'reception-vancouver@hilton-hotels.com', 'Password@3802', 38),
	(380000003, 'Love', 'Skyler', '383 Robson Street', 'Vancouver', 'C8C0C3', 'nettoyeur', 'nettoyage-vancouver@hilton-hotels.com', 'Password@3803', 38),

-- 4 - InterContinental Hotels Group (IHG)
	-- 41 - InterContinental New York
	(410000001, 'Foster', 'Alex', '411 East 48th Street', 'New York', 'D1D0D1', 'gestionnaire', 'admin-nyc@intercontinental-hotels.com', 'Password@4101', 41),
	(410000002, 'Stewart', 'Taylor', '412 East 48th Street', 'New York', 'D1D0D2', 'receptioniste', 'reception-nyc@intercontinental-hotels.com', 'Password@4102', 41),
	(410000003, 'Bennett', 'Jordan', '413 East 48th Street', 'New York', 'D1D0D3', 'nettoyeur', 'nettoyage-nyc@intercontinental-hotels.com', 'Password@4103', 41),
	-- 42 - InterContinental Miami
	(420000001, 'Hudson', 'Morgan', '421 Chopin Plaza', 'Miami', 'D2D0D1', 'gestionnaire', 'admin-miami@intercontinental-hotels.com', 'Password@4201', 42),
	(420000002, 'Ward', 'Bailey', '422 Chopin Plaza', 'Miami', 'D2D0D2', 'receptioniste', 'reception-miami@intercontinental-hotels.com', 'Password@4202', 42),
	(420000003, 'Gibson', 'Casey', '423 Chopin Plaza', 'Miami', 'D2D0D3', 'nettoyeur', 'nettoyage-miami@intercontinental-hotels.com', 'Password@4203', 42),
	-- 43 - Holiday Inn Chicago
	(430000001, 'Holt', 'Skyler', '431 West Harrison Street', 'Chicago', 'D3D0D1', 'gestionnaire', 'admin-chicago@holidayin-hotels.com', 'Password@4301', 43),
	(430000002, 'Mason', 'Peyton', '432 West Harrison Street', 'Chicago', 'D3D0D2', 'receptioniste', 'reception-chicago@holidayin-hotels.com', 'Password@4302', 43),
	(430000003, 'Young', 'Drew', '433 West Harrison Street', 'Chicago', 'D3D0D3', 'nettoyeur', 'nettoyage-chicago@holidayin-hotels.com', 'Password@4303', 43),
	-- 44 - Crowne Plaza Dallas
	(440000001, 'Franklin', 'Avery', '441 Elm Street', 'Dallas', 'D4D0D1', 'gestionnaire', 'admin-dallas@crowne-hotels.com', 'Password@4401', 44),
	(440000002, 'Ross', 'Riley', '442 Elm Street', 'Dallas', 'D4D0D2', 'receptioniste', 'reception-dallas@crowne-hotels.com', 'Password@4402', 44),
	(440000003, 'Fleming', 'Jamie', '443 Elm Street', 'Dallas', 'D4D0D3', 'nettoyeur', 'nettoyage-dallas@crowne-hotels.com', 'Password@4403', 44),
	-- 45 - Hotel Indigo Los Angeles
	(450000001, 'Hunter', 'Cameron', '451 Francisco Street', 'Los Angeles', 'D5D0D1', 'gestionnaire', 'admin-la@indigo-hotels.com', 'Password@4501', 45),
	(450000002, 'Love', 'Bailey', '452 Francisco Street', 'Los Angeles', 'D5D0D2', 'receptioniste', 'reception-la@indigo-hotels.com', 'Password@4502', 45),
	(450000003, 'Barnes', 'Charlie', '453 Francisco Street', 'Los Angeles', 'D5D0D3', 'nettoyeur', 'nettoyage-la@indigo-hotels.com', 'Password@4503', 45),
	-- 46 - Holiday Inn Express Houston
	(460000001, 'Tate', 'Skyler', '461 South Main Street', 'Houston', 'D6D0D1', 'gestionnaire', 'admin-houston@holidayin-hotels.com', 'Password@4601', 46),
	(460000002, 'Cruz', 'Morgan', '462 South Main Street', 'Houston', 'D6D0D2', 'receptioniste', 'reception-houston@holidayin-hotels.com', 'Password@4602', 46),
	(460000003, 'Willis', 'Drew', '463 South Main Street', 'Houston', 'D6D0D3', 'nettoyeur', 'nettoyage-houston@holidayin-hotels.com', 'Password@4603', 46),
	-- 47 - InterContinental Toronto
	(470000001, 'Davidson', 'Jordan', '471 Front Street West', 'Toronto', 'D7D0D1', 'gestionnaire', 'admin-toronto@intercontinental-hotels.com', 'Password@4701', 47),
	(470000002, 'Harrison', 'Taylor', '472 Front Street West', 'Toronto', 'D7D0D2', 'receptioniste', 'reception-toronto@intercontinental-hotels.com', 'Password@4702', 47),
	(470000003, 'Stevens', 'Casey', '473 Front Street West', 'Toronto', 'D7D0D2', 'nettoyeur', 'nettoyage-toronto@intercontinental-hotels.com', 'Password@4703', 47),
	-- 48 - InterContinental Vancouver
	(480000001, 'Adams', 'Bailey', '481 Canada Place', 'Vancouver', 'D8D0D1', 'gestionnaire', 'admin-vancouver@intercontinental-hotels.com', 'Password@4801', 48),
	(480000002, 'Gray', 'Riley', '482 Canada Place', 'Vancouver', 'D8D0D2', 'receptioniste', 'reception-vancouver@intercontinental-hotels.com', 'Password@4802', 48),
	(480000003, 'Murphy', 'Peyton', '483 Canada Place', 'Vancouver', 'D8D0D3', 'nettoyeur', 'nettoyage-vancouver@intercontinental-hotels.com', 'Password@4803', 48),
	
-- 5 - Wyndham Hotels & Resorts
	-- 51 - Wyndham Grand New York
	(510000001, 'Foster', 'Alex', '511 East 42nd Street', 'New York', 'E1E0E1', 'gestionnaire', 'admin-nyc@wyndham-hotels.com', 'Password@5101', 51),
	(510000002, 'Stewart', 'Taylor', '512 East 42nd Street', 'New York', 'E1E0E2', 'receptioniste', 'reception-nyc@wyndham-hotels.com', 'Password@5102', 51),
	(510000003, 'Bennett', 'Jordan', '513 East 42nd Street', 'New York', 'E1E0E3', 'nettoyeur', 'nettoyage-nyc@wyndham-hotels.com', 'Password@5103', 51),
	-- 52 - Wyndham Miami Beach
	(520000001, 'Hudson', 'Morgan', '521 Collins Avenue', 'Miami', 'E2E0E1', 'gestionnaire', 'admin-miami@wyndham-hotels.com', 'Password@5201', 52),
	(520000002, 'Ward', 'Bailey', '522 Collins Avenue', 'Miami', 'E2E0E2', 'receptioniste', 'reception-miami@wyndham-hotels.com', 'Password@5202', 52),
	(520000003, 'Gibson', 'Casey', '523 Collins Avenue', 'Miami', 'E2E0E3', 'nettoyeur', 'nettoyage-miami@wyndham-hotels.com', 'Password@5203', 52),
	-- 53 - Wyndham Chicago
	(530000001, 'Holt', 'Skyler', '531 North Saint Clair Street', 'Chicago', 'E3E0E1', 'gestionnaire', 'admin-chicago@wyndham-hotels.com', 'Password@5301', 53),
	(530000002, 'Mason', 'Peyton', '532 North Saint Clair Street', 'Chicago', 'E3E0E2', 'receptioniste', 'reception-chicago@wyndham-hotels.com', 'Password@5302', 53),
	(530000003, 'Young', 'Drew', '533 North Saint Clair Street', 'Chicago', 'E3E0E3', 'nettoyeur', 'nettoyage-chicago@wyndham-hotels.com', 'Password@5303', 53),
	-- 54 - Wyndham Dallas
	(540000001, 'Franklin', 'Avery', '541 Alpha Road', 'Dallas', 'E4E0E1', 'gestionnaire', 'admin-dallas@wyndham-hotels.com', 'Password@5401', 54),
	(540000002, 'Ross', 'Riley', '542 Alpha Road', 'Dallas', 'E4E0E2', 'receptioniste', 'reception-dallas@wyndham-hotels.com', 'Password@5402', 54),
	(540000003, 'Fleming', 'Jamie', '543 Alpha Road', 'Dallas', 'E4E0E3', 'nettoyeur', 'nettoyage-dallas@wyndham-hotels.com', 'Password@5403', 54),
	-- 55 - Wyndham Los Angeles
	(550000001, 'Hunter', 'Cameron', '551 South Los Angeles Street', 'Los Angeles', 'E5E0E1', 'gestionnaire', 'admin-la@wyndham-hotels.com', 'Password@5501', 55),
	(550000002, 'Love', 'Bailey', '552 South Los Angeles Street', 'Los Angeles', 'E5E0E2', 'receptioniste', 'reception-la@wyndham-hotels.com', 'Password@5502', 55),
	(550000003, 'Barnes', 'Charlie', '553 South Los Angeles Street', 'Los Angeles', 'E5E0E3', 'nettoyeur', 'nettoyage-la@wyndham-hotels.com', 'Password@5503', 55),
	-- 56 - Wyndham Houston
	(560000001, 'Tate', 'Skyler', '561 Greenspoint Drive', 'Houston', 'E6E0E1', 'gestionnaire', 'admin-houston@wyndham-hotels.com', 'Password@5601', 56),
	(560000002, 'Cruz', 'Morgan', '562 Greenspoint Drive', 'Houston', 'E6E0E2', 'receptioniste', 'reception-houston@wyndham-hotels.com', 'Password@5602', 56),
	(560000003, 'Willis', 'Drew', '563 Greenspoint Drive', 'Houston', 'E6E0E3', 'nettoyeur', 'nettoyage-houston@wyndham-hotels.com', 'Password@5603', 56),
	-- 57 - Wyndham Toronto
	(570000001, 'Davidson', 'Jordan', '571 York Mills Road', 'Toronto', 'E7E0E1', 'gestionnaire', 'admin-toronto@wyndham-hotels.com', 'Password@5701', 57),
	(570000002, 'Harrison', 'Taylor', '572 York Mills Road', 'Toronto', 'E7E0E2', 'receptioniste', 'reception-toronto@wyndham-hotels.com', 'Password@5702', 57),
	(570000003, 'Stevens', 'Casey', '573 York Mills Road', 'Toronto', 'E7E0E3', 'nettoyeur', 'nettoyage-toronto@wyndham-hotels.com', 'Password@5703', 57),
	-- 58 - Wyndham Vancouver
	(580000001, 'Adams', 'Bailey', '581 Cambie Road', 'Vancouver', 'E8E0E1', 'gestionnaire', 'admin-vancouver@wyndham-hotels.com', 'Password@5801', 58),
	(580000002, 'Gray', 'Riley', '582 Cambie Road', 'Vancouver', 'E8E0E2', 'receptioniste', 'reception-vancouver@wyndham-hotels.com', 'Password@5802', 58),
	(580000003, 'Murphy', 'Peyton', '583 Cambie Road', 'Vancouver', 'E8E0E3', 'nettoyeur', 'nettoyage-vancouver@wyndham-hotels.com', 'Password@5803', 58);
