"use strict";

const { NotFoundError } = require("../expressError.js");
const db = require("../db.js");
const List = require("./list.js");

const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testUsersIds, testListLegoSetIds, testListLegoPartIds } = require("./_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

console.log(testUsersIds);

describe("createListSets", function () {
    const newLegoListS = {
        list_name: 'Harry Potter',
        users_id: 2,
        lego_sets_num: '76421-1'
    };

    test("works", async function () {
        let legoSet = await List.createListSets(newLegoListS);
        expect(legoSet).toEqual({
            id: expect.any(Number),
            list_name: 'Harry Potter',
            users_id: 2,
            lego_sets_num: '76421-1',
            quantity: 1
        });
    });
});


describe("createListParts", function () {
    const newLegoListP = {
        list_name: 'Flowers',
        users_id: 3,
        lego_parts_num: '6209683',
        quantity: 6
    };

    test("works", async function () {
        let legoPart = await List.createListParts(newLegoListP);
        expect(legoPart).toEqual({
            id: expect.any(Number),
            list_name: 'Flowers',
            users_id: 3,
            lego_parts_num: '6209683',
            quantity: 6
        });
    });
});


/************************************** get */



/************************************** remove */

describe("removeListSets", function () {
    test("works", async function () {
        await List.removeListSets(testListLegoSetIds[0]);
        const res = await db.query(`SELECT id FROM list_lego_sets WHERE id=$1`, [testListLegoSetIds[0]]);
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such List for Lego Part", async function () {
        try {
            await List.removeListSets(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

describe("removeListParts", function () {
    test("works", async function () {
        await List.removeListParts(testListLegoPartIds[0]);
        const res = await db.query(`SELECT id FROM list_lego_parts WHERE id=$1`, [testListLegoPartIds[0]]);
        expect(res.rows.length).toEqual(0);
    });

    test("not found if no such List for Lego Part", async function () {
        try {
            await List.removeListParts(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});


