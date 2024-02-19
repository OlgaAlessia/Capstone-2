
/** Routes for legoSets. */

const jsonschema = require("jsonschema");

const List = require("../models/list");
const express = require("express");
const router = new express.Router();

const { ensureLoggedIn, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const listLegoSetSchema = require("../schemas/listLegoSet.json");
const { BadRequestError } = require("../expressError");

/** POST / { list_sets } =>  { list_sets }
 *
 * list_sets should be { id, name, user_id }
 *
 * Returns { id, name, user_id }
 *
 * Authorization required: login
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, listLegoSetSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const set = await List.create(req.body);
        return res.status(201).json({ set });
    } catch (err) {
        return next(err);
    }
});


/** GET /  =>
 *   { set: [ {  }, ...] }
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
    try {
        const list = await List.getList();

        return res.json({ list });
    } catch (err) {
        return next(err);
    }
});

/** GET /byuser/[user_id]  =>  { legoList }
 *
 *  legoList is { num, name, released, theme_id, num_parts, set_img_url }
 *
 *  Authorization required: none
 */

router.get("/:user_id", async function (req, res, next) {
    try {
        const lists = await List.getListSetsByUser(req.params.user_id);
        return res.json({ lists });
    } catch (err) {
        return next(err);
    }
});


/** DELETE /[num]  =>  { deleted: num }
 *
 * Authorization: login
 */

router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        await List.remove(req.params.id);
        return res.json({ deleted: req.params.id });
    } catch (err) {
        return next(err);
    }
});


/** POST / { list_lego_sets } =>  { list_lego_sets }
 
 * legoSet should be { id, list_sets_id, lego_sets_num }
 *
 * Returns { id, list_sets_id, lego_sets_num  }
 *
 * Authorization required: login
 */

router.post("/:list_sets/set/:set_num", ensureLoggedIn, async function (req, res, next) {
    try {
        const setNum = req.params.set_num;
        await List.addSetToList(req.params.list_sets, setNum);
        return res.json({ applied: setNum });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
