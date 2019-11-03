INSERT INTO profile (id,profile_name,mail,age,profile_pic,password,money_bin) VALUES
    ('13f3edc7-996d-4e68-8489-67c578af1138','riccardo','riccardo.franceschini@unitn.it', 23,'profile.jpg','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1',1500);

INSERT INTO bar_owner (id,profile_name,mail,password,loopcoins,money_bin) VALUES
    ('5165e699-852c-46cd-a44a-4c50c5262b96','LatexPlus', 'latex.plus@mail.it','d74ff0ee8da3b9806b18c877dbf29bbde50b5bd8e4dad7a3a725000feb82e8f1',20,10);

    
INSERT INTO coupon (id,cost, message, bar_owner_id) VALUES
    ('c1107fe2-96db-4bb5-905f-6132c7957b81',50, 'Medium Beer','5165e699-852c-46cd-a44a-4c50c5262b96');

INSERT INTO coupon (id,cost, message, bar_owner_id) VALUES
    ('5853d571-18d1-409e-a924-2678db2ec954',30, 'Small Beer','5165e699-852c-46cd-a44a-4c50c5262b96');

INSERT INTO coupon (id,cost, message, bar_owner_id) VALUES
    ('2917dbc4-62e1-4641-8f28-88d097d72789',60, 'Long Drink','5165e699-852c-46cd-a44a-4c50c5262b96');

INSERT INTO coupon_profile (profile_id,coupon_id,buy_time,used) VALUES
    ('13f3edc7-996d-4e68-8489-67c578af1138','c1107fe2-96db-4bb5-905f-6132c7957b81',now(),false); 

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

INSERT INTO cup_station(station_id,cup_id) VALUES
    ('b57bdd8e-2bae-4e40-bce6-c6c28f978a8c','d9cff5f3');

INSERT INTO cup_profile(profile_id,cup_id,pair_time,collected) VALUES
    ('13f3edc7-996d-4e68-8489-67c578af1138','d9cff5f3', now(), true);

INSERT INTO cup_profile(profile_id,cup_id,pair_time,collected) VALUES
    ('13f3edc7-996d-4e68-8489-67c578af1138','891df5f3', now(), false);


