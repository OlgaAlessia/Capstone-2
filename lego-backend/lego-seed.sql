-- both test users have the password "password"

INSERT INTO users (id, username, password, first_name, last_name, email, is_admin)
VALUES (1,
        'testUser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'olga@joelburton.com',
         true),
       (2,
        'testUser2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Collectior',
        'test@joelburton.com',
        false);

INSERT INTO lego_sets(set_num, name, year, num_parts, set_img_url)
VALUES ('76421-1', 'Dobby the House Elf', 2023, 403, 'https://cdn.rebrickable.com/media/sets/76421-1/122506.jpg'),
        ('40383-1', 'Bride', 2020, 306, 'https://cdn.rebrickable.com/media/sets/40383-1/18685.jpg'),
        ('40384-1', 'Groom', 2020, 255, 'https://cdn.rebrickable.com/media/sets/40384-1/18689.jpg'),
        ('40513-1', 'Spooky VIP Add On Pack', 2021, 83, 'https://cdn.rebrickable.com/media/sets/40513-1/94900.jpg'),
        ('76906-1', '1970 Ferrari 512 M', 2022, 291, 'https://cdn.rebrickable.com/media/sets/76906-1/97884.jpg'),
        ('76914-1', 'Ferrari 812 Competizione', 2023, 268, 'https://cdn.rebrickable.com/media/sets/76914-1/129920.jpg'),
        ('76895-1', 'Ferrari F8 Tributo', 2020, 278, 'https://cdn.rebrickable.com/media/sets/76895-1/18079.jpg'),
        ('75895-1', '1974 Porsche 911 Turbo 3.0', 2019, 180, 'https://cdn.rebrickable.com/media/sets/75895-1/22632.jpg'),
        ('41615-1', 'Harry Potter & Hedwig', 2018, 108, 'https://cdn.rebrickable.com/media/sets/41615-1/9589.jpg'),
        ('41616-1', 'Hermione Granger', 2018, 127, 'https://cdn.rebrickable.com/media/sets/41616-1/13081.jpg'),
        ('40560-1', 'Professors of Hogwarts', 2022, 605, 'https://cdn.rebrickable.com/media/sets/40560-1/101327.jpg'),
        ('76386-1', 'Hogwarts: Polyjuice Potion Mistake', 2021, 215, 'https://cdn.rebrickable.com/media/sets/76386-1/86311.jpg'),
        ('76389-1', 'Hogwarts Chamber Of Secrets', 2021, 1172, 'https://cdn.rebrickable.com/media/sets/76389-1/86353.jpg'),
        ('76398-1', 'Hogwarts Hospital Wing', 2022, 509, 'https://cdn.rebrickable.com/media/sets/76398-1/97002.jpg'),
        ('76401-1', 'Hogwarts Courtyard: Sirius''s Rescue', 2022, 343, 'https://cdn.rebrickable.com/media/sets/76401-1/100606.jpg'),
        ('76413-1', 'Hogwarts: Room of Requirement', 2023, 587, 'https://rebrickable.com/media/sets/76413-1/129957.jpg');

INSERT INTO lego_parts(set_num, name, part_img_url, color)
VALUES ('3001', 'Brick 2 x 4', 'https://cdn.rebrickable.com/media/parts/elements/300126.jpg', 'Black'),
    ('2577', 'Brick Round Corner 4 x 4 Full Brick', 'https://cdn.rebrickable.com/media/parts/elements/4142870.jpg', 'Black'),
    ('3003', 'Brick 2 x 2', 'https://cdn.rebrickable.com/media/parts/elements/4550359.jpg', 'Bright Pink'),
    ('3622', 'Brick 1 x 3', 'https://cdn.rebrickable.com/media/parts/elements/362221.jpg', 'Red');


INSERT INTO list_sets(name, user_id)
VALUES ('Halloween', 1),
       ('Speed Champions', 1),
       ('Others', 1),
       ('Harry Potter', 1);


INSERT INTO list_lego_sets(list_sets_id, lego_sets_num)
VALUES (1, '40513-1'),
       (2, '76906-1'),
       (2, '76914-1'),
       (2, '76895-1'),
       (2, '75895-1'),
       (4, '40560-1'),
       (4, '41615-1'),
       (4, '41616-1'),
       (4, '76386-1'),
       (4, '76389-1'),
       (4, '76398-1'),
       (4, '76401-1'),
       (4, '76413-1'),
       (4, '76421-1');