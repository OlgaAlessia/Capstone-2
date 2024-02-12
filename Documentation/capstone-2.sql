-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-01-22 20:40:20.496

-- tables
-- Table: images
CREATE TABLE images (
    id int  NOT NULL AUTO_INCREMENT,
    url_image varchar(255)  NOT NULL,
    CONSTRAINT images_pk PRIMARY KEY (id)
);

-- Table: lego_parts
CREATE TABLE lego_parts (
    id int  NOT NULL AUTO_INCREMENT,
    part_name varchar(64)  NOT NULL,
    part_description varchar(255)  NOT NULL,
    unit varchar(16)  NOT NULL,
    price_per_unit decimal(8,2)  NOT NULL,
    CONSTRAINT lego_parts_pk PRIMARY KEY (id)
);

-- Table: lego_parts_images
CREATE TABLE lego_parts_images (
    images_id int  NOT NULL,
    lego_parts_id int  NOT NULL,
    CONSTRAINT lego_parts_images_pk PRIMARY KEY (images_id,lego_parts_id)
);

-- Table: lego_set_parts
CREATE TABLE lego_set_parts (
    lego_sets_id int  NOT NULL,
    lego_parts_id int  NOT NULL,
    CONSTRAINT lego_set_parts_pk PRIMARY KEY (lego_sets_id,lego_parts_id)
);

-- Table: lego_sets
CREATE TABLE lego_sets (
    id int  NOT NULL AUTO_INCREMENT,
    released varchar(50)  NOT NULL,
    theme varchar(50)  NULL,
    billing_address text  NOT NULL,
    images varchar(255)  NULL,
    num_parts int  NOT NULL,
    link_instruction varchar(255)  NULL,
    CONSTRAINT lego_sets_pk PRIMARY KEY (id)
);

-- Table: lego_sets_images
CREATE TABLE lego_sets_images (
    lego_sets_id int  NOT NULL,
    images_id int  NOT NULL,
    CONSTRAINT lego_sets_images_pk PRIMARY KEY (lego_sets_id,images_id)
);

-- Table: list_lego_parts
CREATE TABLE list_lego_parts (
    list_name varchar(55)  NOT NULL,
    user_id int  NOT NULL,
    lego_parts_id int  NOT NULL,
    CONSTRAINT list_lego_parts_pk PRIMARY KEY (list_name)
);

-- Table: list_lego_sets
CREATE TABLE list_lego_sets (
    list_name varchar(55)  NOT NULL,
    lego_sets_id int  NOT NULL,
    user_id int  NOT NULL,
    CONSTRAINT list_lego_sets_pk PRIMARY KEY (list_name)
);

-- Table: user
CREATE TABLE user (
    id int  NOT NULL AUTO_INCREMENT,
    firstName varchar(75)  NOT NULL,
    lastName varchar(75)  NOT NULL,
    username varchar(255)  NOT NULL,
    email varchar(255)  NOT NULL,
    password varchar(255)  NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: lego_parts_images_images (table: lego_parts_images)
ALTER TABLE lego_parts_images ADD CONSTRAINT lego_parts_images_images 
FOREIGN KEY lego_parts_images_images (images_id)
REFERENCES images (id);

-- Reference: lego_parts_images_lego_parts (table: lego_parts_images)
ALTER TABLE lego_parts_images ADD CONSTRAINT lego_parts_images_lego_parts 
FOREIGN KEY lego_parts_images_lego_parts (lego_parts_id)
REFERENCES lego_parts (id);

-- Reference: lego_set_parts_lego_parts (table: lego_set_parts)
ALTER TABLE lego_set_parts ADD CONSTRAINT lego_set_parts_lego_parts 
FOREIGN KEY lego_set_parts_lego_parts (lego_parts_id)
REFERENCES lego_parts (id);

-- Reference: lego_set_parts_lego_sets (table: lego_set_parts)
ALTER TABLE lego_set_parts ADD CONSTRAINT lego_set_parts_lego_sets 
FOREIGN KEY lego_set_parts_lego_sets (lego_sets_id)
REFERENCES lego_sets (id);

-- Reference: lego_sets_images_images (table: lego_sets_images)
ALTER TABLE lego_sets_images ADD CONSTRAINT lego_sets_images_images 
FOREIGN KEY lego_sets_images_images (images_id)
REFERENCES images (id);

-- Reference: lego_sets_images_lego_sets (table: lego_sets_images)
ALTER TABLE lego_sets_images ADD CONSTRAINT lego_sets_images_lego_sets 
FOREIGN KEY lego_sets_images_lego_sets (lego_sets_id)
    REFERENCES lego_sets (id);

-- Reference: list_lego_parts_lego_parts (table: list_lego_parts)
ALTER TABLE list_lego_parts ADD CONSTRAINT list_lego_parts_lego_parts 
FOREIGN KEY list_lego_parts_lego_parts (lego_parts_id)
REFERENCES lego_parts (id);

-- Reference: list_lego_parts_user (table: list_lego_parts)
ALTER TABLE list_lego_parts ADD CONSTRAINT list_lego_parts_user 
FOREIGN KEY list_lego_parts_user (user_id)
REFERENCES user (id);

-- Reference: list_lego_sets_lego_sets (table: list_lego_sets)
ALTER TABLE list_lego_sets ADD CONSTRAINT list_lego_sets_lego_sets 
FOREIGN KEY list_lego_sets_lego_sets (lego_sets_id)
REFERENCES lego_sets (id);

-- Reference: list_lego_sets_user (table: list_lego_sets)
ALTER TABLE list_lego_sets ADD CONSTRAINT list_lego_sets_user 
FOREIGN KEY list_lego_sets_user (user_id)
REFERENCES user (id);

-- End of file.

