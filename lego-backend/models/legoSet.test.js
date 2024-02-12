"use strict";

const { NotFoundError} = require("../expressError.js");
const db = require("../db.js");
const LegoSet = require("./legoSet.js");
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testLegoSetIds } = require("./_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newLegoSet = {
    name: 'Central Perk',
    year: "2019",
    num_parts: 1070,
    set_img_url: 'https://cdn.rebrickable.com/media/sets/21319-1/22595.jpg',
    link_instruction: null
  };

  test("works", async function () {
    let legoSet = await LegoSet.create({...newLegoSet, set_num: '21319-1'});
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
      year: '2023',
      num_parts: 403,
      set_img_url: 'https://cdn.rebrickable.com/media/sets/76421-1/122506.jpg'
    });
  });

  test("not found if no such company", async function () {
    try {
      await LegoSet.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: all", async function () {
    let legoSet = await LegoSet.findAll();
    expect(legoSet).toEqual([
      {
        set_num:'40383-1', 
        name:'Bride', 
        year:'2020', 
        num_parts:306, 
        set_img_url:'https://cdn.rebrickable.com/media/sets/40383-1/18685.jpg'
      },
      {
        set_num:'76421-1', 
        name:'Dobby the House Elf', 
        year:'2023', 
        num_parts:403, 
        set_img_url:'https://cdn.rebrickable.com/media/sets/76421-1/122506.jpg'
      },
      {
        set_num:'40384-1', 
        name:'Groom', 
        year:'2020', 
        num_parts: 255, 
        set_img_url:'https://cdn.rebrickable.com/media/sets/40384-1/18689.jpg'
      }
    ]);
  });


  test("works: by name", async function () {
    let legoSet = await LegoSet.findAll({ nameLike: "bri" });
    expect(legoSet).toEqual([
      {
        set_num:'40383-1', 
        name: 'Bride', 
        year: '2020', 
        num_parts: 306, 
        set_img_url: 'https://cdn.rebrickable.com/media/sets/40383-1/18685.jpg'
      },
    ]);
  });

  test("works: empty list on nothing found", async function () {
    let legoSet = await LegoSet.findAll({ nameLike: "nope" });
    expect(legoSet).toEqual([]);
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
