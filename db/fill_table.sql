INSERT INTO profile (id,profile_name,mail,loop_coins) VALUES
    ('13f3edc7-996d-4e68-8489-67c578af1138','riccardo','riccioluto@hotmail.it',1500);

INSERT INTO bar_owner (id,profile_name,mail,password,loop_coins,money_bin) VALUES
    ('5165e699-852c-46cd-a44a-4c50c5262b96','LatexPlus', 'latex.plus@mail.it','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1',20,10);

    
INSERT INTO coupon (id,cost, message, bar_owner_id, description, img) VALUES
    ('c1107fe2-96db-4bb5-905f-6132c7957b81',50, 'Medium IPA','5165e699-852c-46cd-a44a-4c50c5262b96', 'The export style of pale ale, which had become known as India pale ale, developed in England around 1840, later became a popular product there. It became popular among East India Company traders in the late 18th century because of the brewery s location near the East India Docks in Blackwall, East London. ', 'images/beer.jpg');

INSERT INTO coupon (id,cost, message, bar_owner_id, description, img) VALUES
    ('5853d571-18d1-409e-a924-2678db2ec954',30, 'Small IPA','5165e699-852c-46cd-a44a-4c50c5262b96','The export style of pale ale, which had become known as India pale ale, developed in England around 1840, later became a popular product there. It became popular among East India Company traders in the late 18th century because of the brewery s location near the East India Docks in Blackwall, East London. ', 'images/beer.jpg');
INSERT INTO coupon (id,cost, message, bar_owner_id, description, img) VALUES
    ('364a8ecd-6d88-4405-be33-621b06a0e0fd',50, 'Mojito','5165e699-852c-46cd-a44a-4c50c5262b96','Traditionally, a mojito is a cocktail that consists of five ingredients: white rum, sugar (traditionally sugar cane juice), lime juice, soda water, and mint.[1][2] Its combination of sweetness, citrus, and herbaceous mint flavors is intended to complement the rum, and has made the mojito a popular summer drink.', 'images/mojito.jpg');


--INSERT INTO coupon_profile (profile_id,coupon_id,buy_time,used) VALUES
--    ('13f3edc7-996d-4e68-8489-67c578af1138','c1107fe2-96db-4bb5-905f-6132c7957b81',now(),false); 

INSERT INTO station(id,level,locked, bar_owner_id) VALUES
    ('b57bdd8e-2bae-4e40-bce6-c6c28f978a8c',10,false,'5165e699-852c-46cd-a44a-4c50c5262b96');

INSERT INTO cup(id,description) VALUES
    ('d9cff5f3','cup');
INSERT INTO cup(id,description) VALUES
    ('891df5f3','cup');
INSERT INTO cup(id,description) VALUES
    ('6916ecf3','cup');

INSERT INTO cup(id,description) VALUES
    ('f965ebf3','cup');
INSERT INTO cup(id,description) VALUES
    ('09eeeaf3','cup');
INSERT INTO cup(id,description) VALUES
    ('09f0eaf3','cup');
INSERT INTO cup(id,description) VALUES
    ('997dedf3','cup');
INSERT INTO cup(id,description) VALUES
    ('7968ecf3','cup');
INSERT INTO cup(id,description) VALUES
    ('09efecf3','cup');
INSERT INTO cup(id,description) VALUES
    ('99e5ebf3','cup');
INSERT INTO cup(id,description) VALUES
    ('8966ecf3','cup');

--INSERT INTO cup_station(station_id,cup_id) VALUES
--    ('b57bdd8e-2bae-4e40-bce6-c6c28f978a8c','d9cff5f3');

--INSERT INTO cup_profile(profile_id,cup_id,pair_time,collected) VALUES
--    ('13f3edc7-996d-4e68-8489-67c578af1138','d9cff5f3', now(), true);

--INSERT INTO cup_profile(profile_id,cup_id,pair_time,collected) VALUES
--    ('13f3edc7-996d-4e68-8489-67c578af1138','891df5f3', now(), false);


