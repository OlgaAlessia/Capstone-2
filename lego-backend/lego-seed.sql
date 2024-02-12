-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('testUser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'olga@joelburton.com'),
       ('testUser2',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Collectior',
        'test@joelburton.com');

INSERT INTO lego_sets(set_num, name, year, num_parts, set_img_url)
VALUES ('76421-1', 'Dobby the House Elf', '2023', 403, 'https://cdn.rebrickable.com/media/sets/76421-1/122506.jpg'),
        ('40383-1', 'Bride', '2020', 306, 'https://cdn.rebrickable.com/media/sets/40383-1/18685.jpg'),
        ('40384-1', 'Groom', '2020', 255, 'https://cdn.rebrickable.com/media/sets/40384-1/18689.jpg');


INSERT INTO lego_parts(set_num, name, part_img_url, color)
VALUES ('3001', 'Brick 2 x 4', 'https://cdn.rebrickable.com/media/parts/elements/300126.jpg', 'Black'),
    ('2577', 'Brick Round Corner 4 x 4 Full Brick', 'https://cdn.rebrickable.com/media/parts/elements/4142870.jpg', 'Black'),
    ('3003', 'Brick 2 x 2', 'https://cdn.rebrickable.com/media/parts/elements/4550359.jpg', 'Bright Pink'),
    ('3622', 'Brick 1 x 3', 'https://cdn.rebrickable.com/media/parts/elements/362221.jpg', 'Red');


