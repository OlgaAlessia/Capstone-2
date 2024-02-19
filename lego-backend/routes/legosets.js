
/** Routes for legoSets. */

const jsonschema = require("jsonschema");

const LegoSet = require("../models/legoset");
const express = require("express");
const router = new express.Router();


const { ensureLoggedIn, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const legoSetNewSchema = require("../schemas/legoSetNew.json");
const legoSetSearchSchema = require("../schemas/legoSetFilter.json");
const { BadRequestError } = require("../expressError");

/** POST / { lego_sets } =>  { lego_sets }
 *
 * legoSet should be { set_num, name, year, theme_id, num_parts, set_img_url, link_instruction }
 *
 * Returns { name, year, num_parts, set_img_url, link_instruction }
 *
 * Authorization required: login
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, legoSetNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const set = await LegoSet.create(req.body);
        return res.status(201).json({ set });
    } catch (err) {
        return next(err);
    }
});


/** GET /  =>
 *   { set: [ { num, name, released, theme_id, num_parts, set_img_url }, ...] }
 *
 * Provided search filters:
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
    try {
        const schemaValidator = jsonschema.validate(req.query, legoSetSearchSchema);
        if (!schemaValidator.valid) {
            const errs = schemaValidator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        const set = await LegoSet.findAll(req.query);

        return res.json({ set });
    } catch (err) {
        return next(err);
    }
});

/** GET /[num]  =>  { legoSet }
 *
 *  LegoSet is { num, name, released, theme_id, num_parts, set_img_url }
 *
 *  Authorization required: none
 */

router.get("/:num", async function (req, res, next) {
    try {
        const set = await LegoSet.get(req.params.num);
        return res.json({ set });
    } catch (err) {
        return next(err);
    }
});


/** DELETE /[num]  =>  { deleted: num }
 *
 * Authorization: login
 */

router.delete("/:num", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
        await LegoSet.remove(req.params.num);
        return res.json({ deleted: req.params.num });
    } catch (err) {
        return next(err);
    }
});



/** GET /[num]  =>  { legoSet }
 *
 *  LegoSet is { num, name, released, theme_id, num_parts, set_img_url }
 *
 *  Authorization required: none
 */

router.get("/byuser/:user_id", async function (req, res, next) {
    try {
        const set = await LegoSet.getSetsByUser(req.params.user_id);
        return res.json({ set });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
