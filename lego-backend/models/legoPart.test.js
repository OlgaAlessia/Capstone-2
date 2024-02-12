"use strict";

const { NotFoundError } = require("../expressError.js");
const db = require("../db.js");
const LegoPart = require("./legoPart.js");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testLegoPartIds } = require("./_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */


describe("create", function () {
    const newLegoPart = {
        name: 'Brick 1 x 2 with V Neck, Tie, White Shirt print',
        part_img_url: "https://cdn.rebrickable.com/media/parts/elements/6237032.jpg",
        color: 'Light Bluish Gray'
    };

    test("works", async function () {
        let legoPart = await LegoPart.create({...newLegoPart, set_num: '6237032'});
        expect(legoPart).toEqual(newLegoPart);
        const found = await db.query("SELECT * FROM lego_parts WHERE set_num='6237032'");
        expect(found.rows.length).toEqual(1);
        expect(found.rows[0].name).toEqual('Brick 1 x 2 with V Neck, Tie, White Shirt print');
        expect(found.rows[0].color).toEqual('Light Bluish Gray');

    });
});


/************************************** get */

describe("get", function () {
    test("works", async function () {
        let legoPart = await LegoPart.get(testLegoPartIds[0]);
        expect(legoPart).toEqual({
            set_num: '3001',
            name: 'Brick 2 x 4',
            part_img_url: "https://cdn.rebrickable.com/media/parts/elements/300126.jpg",
            color: 'Black'
        });
    });

    test("not found if no such Lego Part", async function () {
        try {
            await LegoPart.get("nope");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** remove */

describe("remove", function () {
    test("works", async function () {
        await LegoPart.remove(testLegoPartIds[0]);
        const res = await db.query('SELECT set_num FROM lego_parts WHERE set_num=$1', [testLegoPartIds[0]]);
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such Lego Part", async function () {
        try {
            await LegoPart.remove("nope");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});


