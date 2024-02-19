"use strict";

const { NotFoundError } = require("../expressError.js");
const db = require("../db.js");
const LegoSet = require("./legoset.js");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testLegoSetIds } = require("./_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newLegoSet = {
    name: 'Central Perk',
    year: 2019,
    num_parts: 1070,
    set_img_url: 'https://cdn.rebrickable.com/media/sets/21319-1/22595.jpg',
    link_instruction: null
  };

  test("works", async function () {
    let legoSet = await LegoSet.create({ ...newLegoSet, set_num: '21319-1' });
    expect(legoSet).toEqual(newLegoSet);
    const found = await db.query("SELECT * FROM lego_sets WHERE set_num='21319-1'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].name).toEqual('Central Perk');
    expect(found.rows[0].num_parts).toEqual(1070);

  });
});


/************************************** get */

describe("get", function () {
  test("works", async function () {
    let legoSet = await LegoSet.get('76421-1');
    expect(legoSet).toEqual({
      set_num: '76421-1',
      name: "Dobby the House Elf",
      year: 2023,
      num_parts: 403,
      set_img_url: 'https://cdn.rebrickable.com/media/sets/76421-1/122506.jpg'
    });
  });

  test("works if no such set_num", async function () {
    let legoSet = await LegoSet.get('nope');
    expect(legoSet).toEqual();
  });
});

/************************************** getSetsByUser */

describe("getSetsByUser", function () {
  test("works", async function () {

    const legoSetUser1 = [
      { lego_sets_num: "40384-1" },
      { lego_sets_num: "40383-1" }
    ]

    let legoSet = await LegoSet.getSetsByUser(1);
    expect(legoSet).toEqual(legoSetUser1);
  });

  test("works if no such getSetsByUser", async function () {
    try {
      await LegoSet.getSetsByUser(40);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});


/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await LegoSet.remove(testLegoSetIds[0]);
    const res = await db.query('SELECT set_num FROM lego_sets WHERE set_num=$1', [testLegoSetIds[0]]);
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such Lego Set", async function () {
    try {
      await LegoSet.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
