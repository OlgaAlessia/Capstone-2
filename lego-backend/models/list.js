"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for list. */

class List {

    /** create a list for lego sets (from data), update db, return the new legoSet data.
     * data should be { list_name, users_id, lego_sets_num }
     *
     * Returns { list_name }
     *
     * Throws BadRequestError if list already in database.
     * */
    static async createListSets({ list_name, users_id, lego_sets_num, quantity = 1 }) {

        const duplicateCheck = await db.query(
            `SELECT * FROM list_lego_sets
            WHERE list_name = $1 AND lego_sets_num =$2`, [list_name, lego_sets_num]);

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate List ${list_name} Lego Set ${lego_sets_num}`);

        const result = await db.query(
            `INSERT INTO list_lego_sets
            (list_name, users_id, lego_sets_num, quantity)
            VALUES ($1, $2, $3, $4)
            RETURNING id, list_name, users_id, lego_sets_num, quantity`,
            [list_name, users_id, lego_sets_num, quantity]
        );
        const listLegoSet = result.rows[0];

        return listLegoSet;
    }

    /** Given a list name and user id, return the list of lego set.
     *
     * Returns { lego_sets_num }
     *
     * Throws NotFoundError if not found.
     **/
    static async getListSets(id) {

        const listRes = await db.query(
            `SELECT lego_sets_num FROM list_lego_sets
            WHERE id = $1`, [id]);

        const listLego = listRes.rows[0];

        if (!listLego) throw new NotFoundError(`No List Sets: ${id}`);

        return listLego;
    }

    /** Update user data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain
     * all the fields; this only changes provided ones.
     *
     * Data can include: { list_name, users_id, lego_sets_num }
     *
     * Returns { id, list_name, users_id, lego_sets_num }
     *
     * Throws NotFoundError if not found.
     *
     */
    static async updateListSets(id, data) {

        const { setCols, values } = sqlForPartialUpdate(data);
        const idVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE list_lego_sets 
                          SET ${setCols} 
                          WHERE id = ${idVarIdx} 
                          RETURNING id, list_name, users_id, lego_sets_num`;

        const result = await db.query(querySql, [...values, id]);
        const listLego = result.rows[0];

        if (!listLego) throw new NotFoundError(`No List Sets: ${id}`);

        return listLego;
    }

    /** Delete given job from database; returns undefined.
    *
    * Throws NotFoundError if company not found.
    **/

    static async removeListSets(id) {
        const result = await db.query(
            `DELETE FROM list_lego_sets
            WHERE id = $1 
            RETURNING id`, [id]
        );
        const listLego = result.rows[0];

        if (!listLego) throw new NotFoundError(`No List Sets: ${id}`);
    }


    //--------------- LIST LEGO PARTS ---------------


    /** create a list for lego parts (from data), update db, return the new legoSet data.
     * data should be { list_name, users_id, lego_parts_num }
     *
     * Returns { list_name }
     *
     * Throws BadRequestError if list already in database.
     * */
    static async createListParts({ list_name, users_id, lego_parts_num, quantity = 1 }) {
        const duplicateCheck = await db.query(
            `SELECT * FROM list_lego_parts
            WHERE list_name = $1 AND lego_parts_num =$2`, [list_name, lego_parts_num]);

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate List ${list_name} with Lego Part ${lego_parts_num}`);

        const result = await db.query(
            `INSERT INTO list_lego_parts
            (list_name, users_id, lego_parts_num, quantity )
            VALUES ($1, $2, $3, $4)
            RETURNING id, list_name, users_id, lego_parts_num, quantity`,
            [list_name, users_id, lego_parts_num, quantity]
        );
        const listLegoPart = result.rows[0];

        return listLegoPart;
    }



    /** Given a list name and user id, return the list of lego set.
    *
    * Returns { lego_sets_num }
    *
    * Throws NotFoundError if not found.
    **/
    static async getListParts(id) {

        const listRes = await db.query(
            `SELECT lego_parts_num FROM list_lego_parts
            WHERE id = $1`, [id]);

        const listLegoPart = listRes.rows[0];

        if (!listLegoPart) throw new NotFoundError(`No List Parts: ${id}`);

        return listLegoPart;
    }

    /** Update user data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain
     * all the fields; this only changes provided ones.
     *
     * Data can include: { list_name, users_id, lego_sets_num }
     *
     * Returns { id, list_name, users_id, lego_sets_num }
     *
     * Throws NotFoundError if not found.
     *
     */
    static async updateListParts(id, data) {

        const { setCols, values } = sqlForPartialUpdate(data);
        const idVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE list_lego_parts 
                          SET ${setCols} 
                          WHERE id = ${idVarIdx} 
                          RETURNING id, list_name, users_id, lego_sets_num`;

        const result = await db.query(querySql, [...values, id]);
        const listLegoPart = result.rows[0];

        if (!listLegoPart) throw new NotFoundError(`No List Sets: ${id}`);

        return listLegoPart;
    }


    /** Delete given job from database; returns undefined.
    *
    * Throws NotFoundError if company not found.
    **/

    static async removeListParts(id) {

        const result = await db.query(
            `DELETE FROM list_lego_parts
            WHERE id = $1 
            RETURNING id`, [id]
        );
        const listLegoPart = result.rows[0];
    
        if (!listLegoPart) throw new NotFoundError(`No List Parts: ${id}`);
    }

}

module.exports = List;
