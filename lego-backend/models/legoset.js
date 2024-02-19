"use strict";
const axios = require('axios');
require("dotenv").config();

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for lego Sets. */

class Legoset {

    /** Create a legoSet (from data), update db, return the new legoSet data.
    *   data should be { set_num, name, year, theme_id, num_parts, set_img_url, link_instruction }
    *
    *   Returns { name, year, num_parts, set_img_url }
    *
    *   Throws BadRequestError if legoSet already in database.
    */

    static async create({ set_num, name, year, theme_id, num_parts, set_img_url, link_instruction }) {
        const duplicateCheck = await db.query(
            `SELECT *
            FROM lego_sets
            WHERE set_num = $1`, [set_num]);

        if (duplicateCheck.rows[0])
            return duplicateCheck.rows[0];

        const result = await db.query(
            `INSERT INTO lego_sets
            (set_num, name, year, theme_id, num_parts, set_img_url, link_instruction)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING name, year, num_parts, set_img_url, link_instruction`,
            [set_num, name, year, theme_id, num_parts, set_img_url, link_instruction],
        );
        const legoSet = result.rows[0];

        return legoSet;
    }


    /** Find all legoSets (optional filter on searchFilters).
    *
    *   searchFilters (all optional):
    *   - nameLike (will find case-insensitive, partial matches)
    *   - min year
    *   - max year
    *
    *   Returns [{ set_num, name, year, num_parts, set_img_url }, ...]
    */

    static async findAll(searchFilters = {}) {

        let baseQuery = `SELECT set_num, name, year, num_parts, set_img_url 
                        FROM lego_sets`;
        let whereExpressions = [];
        let queryValues = [];

        const { nameLike } = searchFilters;

        // For each possible search term, add to whereExpressions and queryValues so can generate the right SQL
        if (nameLike) {
            queryValues.push(`%${nameLike}%`);
            whereExpressions.push(`name ILIKE $${queryValues.length}`);
        }

        if (whereExpressions.length > 0) {
            baseQuery += " WHERE ";
        }

        // Finalize query and return results

        let finalQuery = baseQuery + whereExpressions.join(" AND ") + " ORDER BY name";
        const legoSetRes = await db.query(finalQuery, queryValues);
        return legoSetRes.rows;
    }


    /** Given a legoSet set_num, return data about the set.
    *
    * Returns { set_num, name, year, theme_id, num_parts, set_img_url}
    *
    */

    static async get(set_num) {
        const legoSetRes = await db.query(
            `SELECT set_num, name, year, num_parts, set_img_url
            FROM lego_sets
            WHERE set_num = $1`, [set_num]);

        const legoSet = legoSetRes.rows[0];

        return legoSet;
    }


    /** Given a user_id, return all the Sets in lego Lists.
    *
    * Returns { set_num, name, year, theme_id, num_parts, set_img_url}
    *
    */

    static async getSetsByUser(user_id) {

        const legoSetRes = await db.query(
            `SELECT lego_sets_num
            FROM list_sets AS ls 
            JOIN list_lego_sets AS lls ON ls.id=lls.list_sets_id
            WHERE ls.user_id = $1;`, [user_id]);

        const legoSet = legoSetRes.rows;

        if (legoSet.length === 0) throw new NotFoundError(`No Lists Sets for User: ${user_id}`);

        return legoSet;
    }



    /** Delete given legoSet from database; returns undefined.
    *
    *   Throws NotFoundError if legoSet not found.
    */

    static async remove(set_num) {
        const result = await db.query(
            `DELETE FROM lego_sets
            WHERE set_num = $1
            RETURNING set_num`, [set_num]);

        const legoSet = result.rows[0];

        if (!legoSet) throw new NotFoundError(`No Lego Set: ${set_num}`);
    }

}


module.exports = Legoset;
