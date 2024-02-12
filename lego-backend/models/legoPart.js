"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for lego Parts. */

class LegoPart {

    /** Create a legoPart (from data), update db, return the new legoSet data.
     * data should be { set_num, name, part_img_url, color}
     *
     * Returns { name, part_img_url, color }
     *
     * Throws BadRequestError if legoPart already in database.
     * */

    static async create({ set_num, name, part_img_url, color }) {
        const duplicateCheck = await db.query(
            `SELECT set_num
            FROM lego_parts
            WHERE set_num = $1`, [set_num]);

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate Lego Part: ${set_num}`);

        const result = await db.query(
            `INSERT INTO lego_parts
            (set_num, name, part_img_url, color)
            VALUES ($1, $2, $3, $4)
            RETURNING name, part_img_url, color`,
            [set_num, name, part_img_url, color]
        );
        const legoPart = result.rows[0];

        return legoPart;
    }



    /** Given a legoPart set_num, return data about the part.
    *
    * Returns { set_num, name, part_img_url, color }
    *
    * Throws NotFoundError if not found.
    **/

    static async get(set_num) {
        const legoPartRes = await db.query(
            `SELECT *
            FROM lego_parts
            WHERE set_num = $1`, [set_num]);

        const legoPart = legoPartRes.rows[0];

        if (!legoPart) throw new NotFoundError(`No Lego Part: ${set_num}`);

        return legoPart;
    }


    /** Delete given legoPart from database; returns undefined.
       *
       * Throws NotFoundError if legoPart not found.
       **/

    static async remove(set_num) {
        const result = await db.query(
            `DELETE FROM lego_parts
            WHERE set_num = $1
            RETURNING set_num`, [set_num]);

        const legoPart = result.rows[0];

        if (!legoPart) throw new NotFoundError(`No Lego Part: ${set_num}`);
    }

}


module.exports = LegoPart;
