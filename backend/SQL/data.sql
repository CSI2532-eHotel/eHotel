-- insertion: chaines
INSERT INTO chaineHotel (chaine_ID, nom_chaine, rue, ville, code_postal, nombre_hotel, courriel_chaine, numero_telephone_chaine) 
VALUES 
    (1, 'Marriott International', '10400 Fernwood Road', 'Bethesda', 'A1A1A0', 8, 'hq@marriott-hotels.com', '1111111110'),
    (2, 'Hyatt Hotels Corporation', '7930 Jones Branch Drive', 'McLean', 'B2B2B0', 8, 'hq@hyatt-hotels.com', '2222222220'),
    (3, 'Hilton Hotels & Resorts', '150 N Riverside Plaza', 'Chicago', 'C3C3C0', 8, 'hq@hilton-hotels.com', '3333333330'),
	(4, 'InterContinental Hotels Group (IHG)', '3 Ravinia Drive', 'Atlanta', 'D4D4D0', 8, 'hq@intercontinental-hotels.com', '4444444440'),
    (5, 'Wyndham Hotels & Resorts', '22 Sylvan Way', 'Parsippany', 'E5E5E0', 8, 'hq@wyndham-hotels.com', '5555555550');

---------------------------------------------------------------------------------------------------------------

-- insertion: hotel 1 - Marriott International
INSERT INTO hotel (hotel_ID, nom_hotel, rue, ville, code_postal, nombre_hotel, courriel_chaine, numero_telephone_hotel, etoile, chaine_ID) 
VALUES 
    (11, 'Marriott Downtown NYC', '85 West Street at Albany Street', 'New York', 'A1A1A1', 5, 'nyc@marriott-hotels.com', '1111111111', 5, 1),
    (12, 'Marriott Los Angeles', '333 South Figueroa Street', 'Los Angeles', 'A1A1A2', 5, 'la@marriott-hotels.com', '1111111112', 4, 1),
    (13, 'Marriott Miami', '4200 Collins Avenue', 'Miami', 'A1A1A3', 5, 'miami@marriott-hotels.com', '1111111113', 3, 1),
    (14, 'Marriott Chicago', '540 North Michigan Avenue', 'Chicago', 'A1A1A4', 5, 'chicago@marriott-hotels.com', '1111111114', 5, 1),
	(15, 'Marriott Toronto', '525 Bay Street', 'Toronto', 'A1A1A5', 5, 'toronto@marriott-hotels.com', '1111111115', 3, 1),
    (16, 'Marriott Vancouver', '1128 West Hastings Street', 'Vancouver', 'A1A1A6', 5, 'vancouver@marriott-hotels.com', '1111111116', 2, 1),
    (17, 'Marriott Montreal', '1050 de la Gauchetiere West', 'Montreal', 'A1A1A7', 5, 'montreal@marriott-hotels.com', '1111111117', 4, 1),
    (18, 'Marriott Quebec City', '850 Place d Youville', 'Quebec City', 'A1A1A8', 5, 'qc@marriott-hotels.com', '1111111118', 1, 1);

-- insertion: hotel 2 - Hyatt Hotels Corporation
INSERT INTO hotel (hotel_ID, nom_hotel, rue, ville, code_postal, nombre_hotel, courriel_chaine, numero_telephone_hotel, etoile, chaine_ID) 
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
INSERT INTO hotel (hotel_ID, nom_hotel, rue, ville, code_postal, nombre_hotel, courriel_chaine, numero_telephone_hotel, etoile, chaine_ID) 
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
INSERT INTO hotel (hotel_ID, nom_hotel, rue, ville, code_postal, nombre_hotel, courriel_chaine, numero_telephone_hotel, etoile, chaine_ID) 
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
INSERT INTO hotel (hotel_ID, nom_hotel, rue, ville, code_postal, nombre_hotel, courriel_chaine, numero_telephone_hotel, etoile, chaine_ID) 
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
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(111, 150, 'TV + fridge', 'simple', 'no', 'no', 'mer', 11),
(112, 200, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 11),
(113, 225, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 11),
(114, 300, 'TV + fridge', 'famille', 'no', 'yes', 'montagne', 11),
(115, 325, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 11);

-- insertion: chambres 12 - Marriott Los Angeles
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(121, 125, 'TV + fridge', 'simple', 'no', 'yes', 'mer', 12),
(122, 175, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 12),
(123, 200, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 12),
(124, 275, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 12),
(125, 300, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 12);

-- insertion: chambres 13 - Marriott Miami
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(131, 100, 'TV + fridge', 'simple', 'no', 'no', 'montagne', 13),
(132, 150, 'TV + fridge', 'double', 'no', 'no', 'montagne', 13),
(133, 175, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 13),
(134, 250, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 13),
(135, 275, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'mer', 13);

-- insertion: chambres 14 - Marriott Chicago
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(141, 150, 'TV + fridge', 'simple', 'no', 'no', 'mer', 14),
(142, 200, 'TV + fridge', 'double', 'no', 'no', 'montagne', 14),
(143, 225, 'TV + fridge + sofa', 'double', 'yes', 'yes', 'montagne', 14),
(144, 300, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 14),
(145, 325, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 14);

-- insertion: chambres 15 - Marriott Toronto
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(151, 100, 'TV + fridge', 'simple', 'no', 'no', 'mer', 15),
(152, 150, 'TV + fridge', 'double', 'no', 'yes', 'mer', 15),
(153, 175, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 15),
(154, 250, 'TV + fridge', 'famille', 'no', 'no', 'montagne', 15),
(155, 275, 'TV + fridge + sofa', 'famille', 'yes', 'yes', 'montagne', 15);

-- insertion: chambres 16 - Marriott Vancouver
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(161, 75, 'TV + fridge', 'simple', 'no', 'yes', 'montagne', 16),
(162, 125, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 16),
(163, 150, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 16),
(164, 225, 'TV + fridge', 'famille', 'no', 'no', 'mer', 16),
(165, 250, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'mer', 16);

-- insertion: chambres 17 - Marriott Montreal
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(171, 125, 'TV + fridge', 'simple', 'no', 'no', 'mer', 17),
(172, 175, 'TV + fridge', 'double', 'no', 'yes', 'mer', 17),
(173, 200, 'TV + fridge + sofa', 'double', 'yes', 'no', 'montagne', 17),
(174, 275, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 17),
(175, 300, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 17);

-- insertion: chambres 18 - Marriott Quebec City
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(181, 50, 'TV + fridge', 'simple', 'no', 'no', 'mer', 18),
(182, 100, 'TV + fridge', 'double', 'no', 'no', 'montagne', 18),
(183, 125, 'TV + fridge + sofa', 'double', 'yes', 'no', 'montagne', 18),
(184, 200, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 18),
(185, 225, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'mer', 18);

---------------------------------------------------------------------------------------------------------------

-- insertion: chambres 21 - Hyatt Regency NYC
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(211, 150, 'TV + fridge', 'simple', 'no', 'yes', 'montagne', 21),
(212, 200, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 21),
(213, 225, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 21),
(214, 300, 'TV + fridge', 'famille', 'no', 'no', 'mer', 21),
(215, 325, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'mer', 21);

-- insertion: chambres 22 - Hyatt Miami Beach
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(221, 125, 'TV + fridge', 'simple', 'no', 'no', 'mer', 22),
(222, 175, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 22),
(223, 200, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 22),
(224, 275, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 22),
(225, 300, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 22);

-- insertion: chambres 23 - Hyatt Place Chicago
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(231, 75, 'TV + fridge', 'simple', 'no', 'no', 'mer', 23),
(232, 125, 'TV + fridge', 'double', 'no', 'yes', 'mer', 23),
(233, 150, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 23),
(234, 225, 'TV + fridge', 'famille', 'no', 'no', 'montagne', 23),
(235, 250, 'TV + fridge + sofa', 'famille', 'yes', 'yes', 'montagne', 23);

-- insertion: chambres 24 - Hyatt Dallas Downtown
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(241, 50, 'TV + fridge', 'simple', 'no', 'no', 'mer', 24),
(242, 100, 'TV + fridge', 'double', 'no', 'no', 'montagne', 24),
(243, 125, 'TV + fridge + sofa', 'double', 'yes', 'no', 'montagne', 24),
(244, 200, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 24),
(245, 225, 'TV + fridge + sofa', 'famille', 'yes', 'yes', 'montagne', 24);

-- insertion: chambres 25 - Hyatt Los Angeles
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(251, 150, 'TV + fridge', 'simple', 'no', 'no', 'mer', 25),
(252, 200, 'TV + fridge', 'double', 'no', 'yes', 'mer', 25),
(253, 225, 'TV + fridge + sofa', 'double', 'yes', 'no', 'montagne', 25),
(254, 300, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 25),
(255, 325, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 25);

-- insertion: chambres 26 - Hyatt Houston
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(261, 100, 'TV + fridge', 'simple', 'no', 'no', 'mer', 26),
(262, 150, 'TV + fridge', 'double', 'no', 'no', 'montagne', 26),
(263, 175, 'TV + fridge + sofa', 'double', 'yes', 'yes', 'montagne', 26),
(264, 250, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 26),
(265, 275, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 26);

-- insertion: chambres 27 - Hyatt Toronto
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(271, 125, 'TV + fridge', 'simple', 'no', 'yes', 'mer', 27),
(272, 175, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 27),
(273, 200, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 27),
(274, 275, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 27),
(275, 300, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 27);

-- insertion: chambres 28 - Hyatt Vancouver
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(281, 50, 'TV + fridge', 'simple', 'no', 'no', 'montagne', 28),
(282, 100, 'TV + fridge', 'double', 'no', 'no', 'montagne', 28),
(283, 125, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 28),
(284, 200, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 28),
(285, 225, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'mer', 28);

---------------------------------------------------------------------------------------------------------------

-- insertion: chambres 31 - Hilton NYC Central
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(311, 150, 'TV + fridge', 'simple', 'no', 'no', 'mer', 31),
(312, 200, 'TV + fridge', 'double', 'no', 'yes', 'mer', 31),
(313, 225, 'TV + fridge + sofa', 'double', 'yes', 'no', 'montagne', 31),
(314, 300, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 31),
(315, 325, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 31);

-- insertion: chambres 32 - Hilton Miami South Beach
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(321, 100, 'TV + fridge', 'simple', 'no', 'yes', 'mer', 32),
(322, 150, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 32),
(323, 175, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 32),
(324, 250, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 32),
(325, 275, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 32);

-- insertion: chambres 33 - Hilton Chicago
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(331, 50, 'TV + fridge', 'simple', 'no', 'no', 'montagne', 33),
(332, 100, 'TV + fridge', 'double', 'no', 'no', 'montagne', 33),
(333, 125, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 33),
(334, 200, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 33),
(335, 225, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'mer', 33);

-- insertion: chambres 34 - Hilton Dallas
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(341, 125, 'TV + fridge', 'simple', 'no', 'yes', 'montagne', 34),
(342, 175, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 34),
(343, 200, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 34),
(344, 275, 'TV + fridge', 'famille', 'no', 'no', 'mer', 34),
(345, 300, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'mer', 34);

-- insertion: chambres 35 - Hilton Los Angeles
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(351, 75, 'TV + fridge', 'simple', 'no', 'no', 'mer', 35),
(352, 125, 'TV + fridge', 'double', 'no', 'no', 'montagne', 35),
(353, 150, 'TV + fridge + sofa', 'double', 'yes', 'yes', 'montagne', 35),
(354, 225, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 35),
(355, 250, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 35);

-- insertion: chambres 36 - Hilton Houston
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(361, 50, 'TV + fridge', 'simple', 'no', 'no', 'mer', 36),
(362, 100, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 36),
(363, 125, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 36),
(364, 200, 'TV + fridge', 'famille', 'no', 'yes', 'montagne', 36),
(365, 225, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 36);

-- insertion: chambres 37 - Hilton Toronto
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(371, 150, 'TV + fridge', 'simple', 'no', 'no', 'mer', 37),
(372, 200, 'TV + fridge', 'double', 'no', 'no', 'montagne', 37),
(373, 225, 'TV + fridge + sofa', 'double', 'yes', 'no', 'montagne', 37),
(374, 300, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 37),
(375, 325, 'TV + fridge + sofa', 'famille', 'yes', 'yes', 'montagne', 37);

-- insertion: chambres 38 - Hilton Vancouver
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(381, 100, 'TV + fridge', 'simple', 'no', 'no', 'mer', 38),
(382, 150, 'TV + fridge', 'double', 'no', 'no', 'montagne', 38),
(383, 175, 'TV + fridge + sofa', 'double', 'yes', 'no', 'montagne', 38),
(384, 250, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 38),
(385, 275, 'TV + fridge + sofa', 'famille', 'yes', 'yes', 'montagne', 38);

---------------------------------------------------------------------------------------------------------------

-- insertion: chambres 41 - InterContinental New York
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(411, 150, 'TV + fridge', 'simple', 'no', 'no', 'mer', 41),
(412, 200, 'TV + fridge', 'double', 'no', 'no', 'montagne', 41),
(413, 225, 'TV + fridge + sofa', 'double', 'yes', 'no', 'montagne', 41),
(414, 300, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 41),
(415, 325, 'TV + fridge + sofa', 'famille', 'yes', 'yes', 'montagne', 41);

-- insertion: chambres 42 - InterContinental Miami
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(421, 150, 'TV + fridge', 'simple', 'no', 'no', 'mer', 42),
(422, 200, 'TV + fridge', 'double', 'no', 'no', 'montagne', 42),
(423, 225, 'TV + fridge + sofa', 'double', 'yes', 'yes', 'montagne', 42),
(424, 300, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 42),
(425, 325, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 42);

-- insertion: chambres 43 - Holiday Inn Chicago
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(431, 50, 'TV + fridge', 'simple', 'no', 'no', 'mer', 43),
(432, 100, 'TV + fridge', 'double', 'no', 'yes', 'mer', 43),
(433, 125, 'TV + fridge + sofa', 'double', 'yes', 'no', 'montagne', 43),
(434, 200, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 43),
(435, 225, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 43);

-- insertion: chambres 44 - Crowne Plaza Dallas
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(441, 75, 'TV + fridge', 'simple', 'no', 'no', 'mer', 44),
(442, 125, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 44),
(443, 150, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 44),
(444, 225, 'TV + fridge', 'famille', 'no', 'yes', 'montagne', 44),
(445, 250, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 44);

-- insertion: chambres 45 - Hotel Indigo Los Angeles
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(451, 125, 'TV + fridge', 'simple', 'no', 'no', 'mer', 45),
(452, 175, 'TV + fridge', 'double', 'no', 'yes', 'mer', 45),
(453, 200, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 45),
(454, 275, 'TV + fridge', 'famille', 'no', 'no', 'montagne', 45),
(455, 300, 'TV + fridge + sofa', 'famille', 'yes', 'yes', 'montagne', 45);

-- insertion: chambres 46 - Holiday Inn Express Houston
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(461, 75, 'TV + fridge', 'simple', 'no', 'yes', 'montagne', 46),
(462, 125, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 46),
(463, 150, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 46),
(464, 225, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 46),
(465, 250, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'mer', 46);

-- insertion: chambres 47 - InterContinental Toronto
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(471, 100, 'TV + fridge', 'simple', 'no', 'no', 'mer', 47),
(472, 150, 'TV + fridge', 'double', 'no', 'yes', 'mer', 47),
(473, 175, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 47),
(474, 250, 'TV + fridge', 'famille', 'no', 'yes', 'montagne', 47),
(475, 275, 'TV + fridge + sofa', 'famille', 'yes', 'yes', 'montagne', 47);

-- insertion: chambres 48 - InterContinental Vancouver
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(481, 150, 'TV + fridge', 'simple', 'no', 'no', 'mer', 48),
(482, 200, 'TV + fridge', 'double', 'no', 'no', 'montagne', 48),
(483, 225, 'TV + fridge + sofa', 'double', 'yes', 'no', 'montagne', 48),
(484, 300, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 48),
(485, 325, 'TV + fridge + sofa', 'famille', 'yes', 'yes', 'montagne', 48);

---------------------------------------------------------------------------------------------------------------

-- insertion: chambres 51 - Wyndham Grand New York
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(511, 150, 'TV + fridge', 'simple', 'no', 'yes', 'mer', 51),
(512, 200, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 51),
(513, 225, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 51),
(514, 300, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 51),
(515, 325, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 51);

-- insertion: chambres 52 - Wyndham Miami Beach
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(521, 50, 'TV + fridge', 'simple', 'no', 'no', 'mer', 52),
(522, 100, 'TV + fridge', 'double', 'no', 'yes', 'mer', 52),
(523, 125, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 52),
(524, 200, 'TV + fridge', 'famille', 'no', 'no', 'montagne', 52),
(525, 225, 'TV + fridge + sofa', 'famille', 'yes', 'yes', 'montagne', 52);

-- insertion: chambres 53 - Wyndham Chicago
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(531, 125, 'TV + fridge', 'simple', 'no', 'no', 'mer', 53),
(532, 175, 'TV + fridge', 'double', 'no', 'no', 'montagne', 53),
(533, 200, 'TV + fridge + sofa', 'double', 'yes', 'yes', 'montagne', 53),
(534, 275, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 53),
(535, 300, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 53);

-- insertion: chambres 54 - Wyndham Dallas
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(541, 75, 'TV + fridge', 'simple', 'no', 'no', 'mer', 54),
(542, 125, 'TV + fridge', 'double', 'no', 'no', 'montagne', 54),
(543, 150, 'TV + fridge + sofa', 'double', 'yes', 'yes', 'montagne', 54),
(544, 225, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 54),
(545, 250, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 54);

-- insertion: chambres 55 - Wyndham Los Angeles
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(551, 100, 'TV + fridge', 'simple', 'no', 'no', 'mer', 55),
(552, 150, 'TV + fridge', 'double', 'no', 'no', 'montagne', 55),
(553, 175, 'TV + fridge + sofa', 'double', 'yes', 'no', 'montagne', 55),
(554, 250, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 55),
(555, 275, 'TV + fridge + sofa', 'famille', 'yes', 'yes', 'montagne', 55);

-- insertion: chambres 56 - Wyndham Houston
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(561, 50, 'TV + fridge', 'simple', 'no', 'yes', 'montagne', 56),
(562, 100, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 56),
(563, 125, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 56),
(564, 200, 'TV + fridge', 'famille', 'no', 'no', 'mer', 56),
(565, 225, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'mer', 56);

-- insertion: chambres 57 - Wyndham Toronto
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(571, 125, 'TV + fridge', 'simple', 'no', 'no', 'mer', 57),
(572, 175, 'TV + fridge', 'double', 'no', 'yes', 'montagne', 57),
(573, 200, 'TV + fridge + sofa', 'double', 'yes', 'no', 'mer', 57),
(574, 275, 'TV + fridge', 'famille', 'no', 'yes', 'montagne', 57),
(575, 300, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 57);

-- insertion: chambres 58 - Wyndham Vancouver
INSERT INTO chambre (chambre_ID, prix, commodite, capacite, extensible, dommage, vue, hotel_ID)
VALUES
(581, 150, 'TV + fridge', 'simple', 'no', 'no', 'mer', 58),
(582, 200, 'TV + fridge', 'double', 'no', 'yes', 'mer', 58),
(583, 225, 'TV + fridge + sofa', 'double', 'yes', 'no', 'montagne', 58),
(584, 300, 'TV + fridge', 'famille', 'no', 'yes', 'mer', 58),
(585, 325, 'TV + fridge + sofa', 'famille', 'yes', 'no', 'montagne', 58);
