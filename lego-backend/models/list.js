"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for list. */

class List {

    /** create a list for lego sets (from data), update db, return the new legoSet data.
     * data should be { id, name, users_id }
     *
     * Returns { name }
     *
     * Throws BadRequestError if list already in database.
     * */
    static async create({name, user_id}) {

        const duplicateCheck = await db.query(
            `SELECT name FROM list_sets
            WHERE name=$1 AND user_id=$2`, [name, user_id]);

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate List ${name}`);

        const result = await db.query(
            `INSERT INTO list_sets
            (name, user_id)
            VALUES ($1, $2)
            RETURNING id, name, user_id`,
            [name, user_id]
        );
        const listLegoSet = result.rows[0];

        return listLegoSet;
    }

    static async addSetToList(list_sets_id, lego_sets_num) {

        const duplicateCheck = await db.query(
            `SELECT * FROM list_lego_sets
            WHERE list_sets_id=$1 AND lego_sets_num=$2`, [list_sets_id, lego_sets_num]);

        if (duplicateCheck.rows[0])
            throw new BadRequestError('Duplicate List Lego Sets');

        const result = await db.query(
            `INSERT INTO list_lego_sets
            (list_sets_id, lego_sets_num)
            VALUES ($1, $2)
            RETURNING id, list_sets_id, lego_sets_num`,
            [list_sets_id, lego_sets_num]
        );
        const listLegoSet = result.rows[0];

        return listLegoSet;
    }

    /**
     * Returns { list_sets }
     *
     * Throws NotFoundError if not found.
     **/
    static async getList() {
        const listRes = await db.query('SELECT * FROM list_sets');
        return listRes.rows;
    }

    /** Given a user id, return the list of lego set.
     *
     * Returns { id, name, json_agg[{ lego_sets information}, {...}] }
     *
     * Throws NotFoundError if not found.
     **/
    static async getListSetsByUser(user_id) {

        const listRes = await db.query(

            `SELECT id, name, (
                SELECT json_agg(
                    json_build_object(
                        'set_num', lego_sets.set_num,
                        'name', lego_sets.name,
                        'year', lego_sets.year,
                        'num_parts', lego_sets.num_parts,
                        'set_img_url', lego_sets.set_img_url
                    ))
                FROM list_lego_sets JOIN lego_sets ON lego_sets_num=lego_sets.set_num
                WHERE list_sets_id =  min(list_sets.id)
                ), (
                    SELECT COUNT (*) 
                    FROM list_lego_sets
                    WHERE list_sets_id = min(list_sets.id)
                ) AS num_sets
            FROM list_sets
            WHERE user_id = $1
            GROUP BY id, name`, [user_id]);

        const listLego = listRes.rows;

        if (listLego.length === 0) throw new NotFoundError(`No Lists Sets for User: ${user_id}`);

        return listLego;

    }


    /** Delete given list id from database; returns undefined.
    *
    * Throws NotFoundError if list is not found.
    **/

    static async removeList(id) {
        const result = await db.query(
            `DELETE FROM list_sets
            WHERE id = $1 
            RETURNING id`, [id]
        );
        const listLego = result.rows[0];

        if (!listLego) throw new NotFoundError(`No List Sets: ${id}`);
    }
}

module.exports = List;
