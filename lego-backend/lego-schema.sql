-- Table: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255)  NOT NULL,
    first_name VARCHAR(75)  NOT NULL,
    last_name VARCHAR(75)  NOT NULL,
    email VARCHAR(255) NOT NULL 
        CHECK (position('@' IN email) > 1),
    photo_url TEXT DEFAULT '../default-pic.png',
    bio VARCHAR(300) NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);



-- Table: lego_sets
CREATE TABLE lego_sets (
    set_num VARCHAR(55) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    theme_id INTEGER NULL,
    num_parts INTEGER NOT NULL,
    set_img_url VARCHAR(255) NULL,
    link_instruction VARCHAR(255)  NULL
);


-- Table: lists_sets
CREATE TABLE list_sets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id INTEGER NOT NULL 
        REFERENCES users (id) ON DELETE CASCADE
);


-- Table: list_lego_sets
CREATE TABLE list_lego_sets (
    id SERIAL PRIMARY KEY,
    list_sets_id INTEGER NOT NULL 
        REFERENCES list_sets (id) ON DELETE CASCADE,
    lego_sets_num VARCHAR(55) NOT NULL
        REFERENCES lego_sets (set_num) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1
);










-- Table: lego_parts
CREATE TABLE lego_parts (
    set_num VARCHAR(55) PRIMARY KEY,
    name VARCHAR(6255)  NOT NULL,
    part_img_url VARCHAR(255)  NOT NULL,
    color VARCHAR(20) NULL
);


-- Table: lego_set_parts
CREATE TABLE lego_set_parts (
    lego_sets_num VARCHAR(55) 
        REFERENCES lego_sets ON DELETE CASCADE,
    lego_parts_num VARCHAR(55) 
        REFERENCES lego_parts ON DELETE CASCADE,
    quantity INTEGER NULL,
    PRIMARY KEY (lego_sets_num, lego_parts_num)
);


-- Table: list_lego_parts
CREATE TABLE list_lego_parts (
    id SERIAL PRIMARY KEY,
    list_name VARCHAR(55) NOT NULL,
    users_id INTEGER NOT NULL 
        REFERENCES users (id) ON DELETE CASCADE,
    lego_parts_num VARCHAR(55) NOT NULL
        REFERENCES lego_parts (set_num) ON DELETE CASCADE,
    quantity INTEGER CHECK (quantity >= 0) DEFAULT 1
);




-- End of file.

