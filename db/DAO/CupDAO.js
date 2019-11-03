'use strict';
var db = require('../query');
var Cup = require('../Entity/Cup');

module.exports = class CupDAO {

    /**
     *  return a profile given the bin_id id
     */
    static async getCupById(cup_id) {
        if (cup_id == undefined) {
            return undefined;
        }

        let sql = `SELECT * FROM cup WHERE id = $1`;
        const values = [cup_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let tempCup;
            if (result != undefined && result.length !=0) {
                tempCup = new Cup(result[0].id,result[0].description);
            }
            return tempCup;
        } catch (err) {
            throw err;
        }
    }
        /**
     *  return a profile given the bin_id id
     */
    static async isAlreadyPaired(cup_id) {
        if (cup_id == undefined) {
            return undefined;
        }

        let sql = `SELECT * FROM cup_profile WHERE cup_id = $1 and collected=false`;
        const values = [cup_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            console.log(result);
            if (result.length !=0) {
                return true;
            }else{
                return false ;
            }
        } catch (err) {
            throw err;
        }
    }
}