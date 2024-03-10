"use strict";

const { NotFoundError, BadRequestError } = require("../expressError.js");
const db = require("../db.js");
const List = require("./list.js");

const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testListLegoSetIds } = require("./_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */


describe("create", function () {
  const newLegoListS = {
    name: 'Prova',
    user_id: 2
  };

  test("works", async function () {
    let legoSet = await List.create(newLegoListS);
    expect(legoSet).toEqual({
      id: expect.any(Number),
      name: 'Prova',
      user_id: 2
    });
  });
});

/************************************** addSetToList */

describe("addSetToList", function () {
  test("works", async function () {
    let legoSet = await List.addSetToList(2, '40383-1');
    expect(legoSet).toEqual({
      id: expect.any(Number),
      list_sets_id: 2,
      lego_sets_num: '40383-1'
    });
  });

  test("duplicate List Lego Sets", async function () {
    try {
      await List.addSetToList(2, '40383-1');
      await List.addSetToList(2, '40383-1');
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});


/************************************** get */

describe("getListSetsByUser", function () {
  test("works", async function () {
    let legoSet = await List.getListSetsByUser(1);
    expect(legoSet).toEqual(
      [
        {
          "id": 1,
          "name": "Altro",
          "num_sets": "2",
          "json_agg": [
            {
              "name": "Bride",
              "num_parts": 306,
              "set_img_url": "https://cdn.rebrickable.com/media/sets/40383-1/18685.jpg",
              "set_num": "40383-1",
              "year": 2020
            },
            {
              "name": "Groom",
              "num_parts": 255,
              "set_img_url": "https://cdn.rebrickable.com/media/sets/40384-1/18689.jpg",
              "set_num": "40384-1",
              "year": 2020
            }]
        }
      ]);
  });

  test("not found if no such user", async function () {
    try {
      await List.getListSetsByUser(40);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});


/************************************** remove */

describe("removeListSets", function () {
  test("works", async function () {
    await List.removeListSets(testListLegoSetIds[0]);
    const res = await db.query(`SELECT id FROM list_sets WHERE id=$1`, [testListLegoSetIds[0]]);
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


