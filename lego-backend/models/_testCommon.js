const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

let testLegoSetIds = [];
let testLegoPartIds = [];
let testListLegoSetIds = [];
let testListLegoPartIds = [];

async function commonBeforeAll() {
    await db.query("DELETE FROM lego_parts");
    await db.query("DELETE FROM list_lego_parts");

    await db.query("DELETE FROM list_sets");
    await db.query("DELETE FROM users");
    await db.query("DELETE FROM lego_sets");
    await db.query("DELETE FROM list_lego_sets");


    await db.query(`
    INSERT INTO users (id, username, password, first_name, last_name, email)
    VALUES (1, 'u1', $1, 'U1F', 'U1L', 'u1@email.com'),
           (2, 'u2', $2, 'U2F', 'U2L', 'u2@email.com')
    RETURNING id`,
    [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]);


    //const res = await db.query(`SELECT id FROM users`);
    //testUsersIds.splice(0, 0, ...res.rows.map(r => r.id));


    const resultsLegoSetsIds = await db.query(`
    INSERT INTO lego_sets (set_num, name, year, num_parts, set_img_url)
    VALUES ('76421-1', 'Dobby the House Elf', '2023', 403, 'https://cdn.rebrickable.com/media/sets/76421-1/122506.jpg'),
           ('40383-1', 'Bride', '2020', 306, 'https://cdn.rebrickable.com/media/sets/40383-1/18685.jpg'),
           ('40384-1', 'Groom', '2020', 255, 'https://cdn.rebrickable.com/media/sets/40384-1/18689.jpg')
    RETURNING set_num`);
    testLegoSetIds.splice(0, 0, ...resultsLegoSetsIds.rows.map(r => r.set_num));



    const resultsListLegoSetsIds = await db.query(`
    INSERT INTO list_sets (id, name, user_id)
    VALUES (1, 'Altro', 1),
            (2, 'Girls', 2)
    RETURNING id`);
    testListLegoSetIds.splice(0, 0, ...resultsListLegoSetsIds.rows.map(r => r.id));


    await db.query(`
    INSERT INTO list_lego_sets (list_sets_id, lego_sets_num )
    VALUES (1, '40384-1'),
           (1, '40383-1')
    RETURNING id`);
    

    const resultsLegoPartsIds = await db.query(`
    INSERT INTO lego_parts (set_num, name, part_img_url, color)
    VALUES ('3001', 'Brick 2 x 4', 'https://cdn.rebrickable.com/media/parts/elements/300126.jpg', 'Black'),
           ('2577', 'Brick Round Corner 4 x 4 Full Brick', 'https://cdn.rebrickable.com/media/parts/elements/4142870.jpg', 'Black'),
           ('3003', 'Brick 2 x 2', 'https://cdn.rebrickable.com/media/parts/elements/4550359.jpg', 'Bright Pink'),
           ('3622', 'Brick 1 x 3', 'https://cdn.rebrickable.com/media/parts/elements/362221.jpg', 'Red')
    RETURNING set_num`);
    testLegoPartIds.splice(0, 0, ...resultsLegoPartsIds.rows.map(r => r.set_num));



    const resultsListLegoPartsIds = await db.query(`
    INSERT INTO list_lego_parts (list_name, users_id, lego_parts_num )
    VALUES ('Bricks', 1, '3003'),
           ('Bricks', 1, '3622')
    RETURNING id`);
    testListLegoPartIds.splice(0, 0, ...resultsListLegoPartsIds.rows.map(r => r.id));



}

async function commonBeforeEach() {
    await db.query("BEGIN");
}

async function commonAfterEach() {
    await db.query("ROLLBACK");
}

async function commonAfterAll() {
    await db.end();
}


module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testLegoSetIds,
    testLegoPartIds,
    testListLegoSetIds,
    testListLegoPartIds
};