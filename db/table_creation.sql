CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS
      profile(
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        profile_name VARCHAR(128),
        mail VARCHAR(256) UNIQUE,
        age INTEGER,
        profile_pic VARCHAR(256),
        password VARCHAR(256) NOT NULL,
        money_bin INTEGER NOT NULL
      );


CREATE TABLE IF NOT EXISTS
      bar_owner(
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        profile_name VARCHAR(128),
        mail VARCHAR(256) UNIQUE,
        password VARCHAR(256) NOT NULL,
        loopcoins INTEGER NOT NULL,
        money_bin INTEGER NOT NULL
      );

CREATE TABLE IF NOT EXISTS
      coupon(
            id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
            cost INTEGER NOT NULL,
            message VARCHAR(256) NOT NULL,
            bar_owner_id uuid,
            FOREIGN KEY (bar_owner_id) REFERENCES bar_owner(id)
      );

CREATE TABLE IF NOT EXISTS
      coupon_profile(
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,    
        profile_id uuid,
        buy_time TIMESTAMPTZ,
        coupon_id uuid, 
        used BOOLEAN,
        FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (coupon_id) REFERENCES coupon(id) ON DELETE CASCADE ON UPDATE CASCADE
      );

CREATE TABLE IF NOT EXISTS
      station(
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        level INTEGER NOT NULL,
        locked boolean,
        bar_owner_id uuid,
        FOREIGN KEY (bar_owner_id) REFERENCES bar_owner(id)
      );

CREATE TABLE IF NOT EXISTS
      cup(
        id VARCHAR(256) PRIMARY KEY,
        description VARCHAR(256) NOT NULL
      );

CREATE TABLE IF NOT EXISTS
      cup_profile(
        profile_id uuid,
        cup_id VARCHAR(256),
        pair_time TIMESTAMPTZ,
        collected BOOLEAN ,
        FOREIGN KEY (profile_id) REFERENCES profile(id),
        FOREIGN KEY (cup_id) REFERENCES cup(id)
      );

CREATE TABLE IF NOT EXISTS
      cup_station(
        station_id uuid,
        cup_id VARCHAR(256),
        FOREIGN KEY (station_id) REFERENCES station(id),
        FOREIGN KEY (cup_id) REFERENCES cup(id),
        PRIMARY KEY(cup_id, station_id)
      );

CREATE TABLE IF NOT EXISTS
      transaction(
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        profile_id uuid,
        bar_owner_id uuid,
        description VARCHAR(256) NOT NULL,
        money INTEGER NOT NULL,
        FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (bar_owner_id) REFERENCES bar_owner(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
