create database memefinder;

use memefinder;

CREATE TABLE Favorite (
    fav_id INT NOT NULL AUTO_INCREMENT,
    gif_id VARCHAR(50) NOT NULL,
    user_id INT NOT NULL REFERENCES User(user_id),
    PRIMARY KEY(fav_id)
);

CREATE TABLE User (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20),
    pwd VARCHAR(25),
    PRIMARY KEY(user_id)
);


INSERT INTO User (username, pwd) VALUES ('chends', '8888');
INSERT INTO Favorite (gif_id, user_id) VALUES ('feqkVgjJpYtjy', 1);

GRANT ALL ON *.* TO 'someuser'@'somehost';