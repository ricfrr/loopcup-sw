'use strict';
var db = require('../query');
var Bin = require('../Entity/Bin');
var Cup = require('../Entity/Cup');
var ProfileDAo = require('./ProfileDAO');

module.exports = class BinDAO {

    /**
     *  return a profile given the station_id id
     */
    static async getBinById(station_id) {
        if (station_id == undefined) {
            return undefined;
        }

        let sql = `SELECT * FROM station WHERE id = $1`;
        const values = [station_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let tempBin;
            if (result != undefined && result.length !=0) {
                tempBin = new Bin(result[0].id,result[0].level, result[0].locked, result[0].level);
            }
            return tempBin;
        } catch (err) {
            throw err;
        }
    }


    /**
     *  return the list of cup inside the station
     */
    static async isCupInsideTheBin(cup_id) {
        if (cup_id== undefined) {
            return undefined;
        }

        let sql = `select * 
                    from cup_station 
                    where cup_id =$1;`;
        const values = [cup_id];

        try {
            const result = await db.query(sql, values);
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


    /**
     *  return the list of cup inside the station
     */
    static async getCupInsideBin(station_id) {
        if (station_id== undefined) {
            return undefined;
        }

        let sql = `select cup.id, cup.description 
                    from cup inner join cup_station on cup.id = cup_station.cup_id 
                    where cup_station.station_id =$1;`;
        const values = [station_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let cup= [];
            if (result != undefined) {
                for (let i = 0; i < result.length; i++) {
                    let temp_cup = new Cup(result[i].id, result[i].description);
                    cup.push(temp_cup);
                }
            }
            return cup;
        } catch (err) {
            throw err;
        }
    }

    /**
     *  insert a new cup inside the station
     */
    static async insertCupBin(station_id,cup_id) {
        if (station_id == undefined || cup_id == undefined) {
            return undefined;
        }

        let sql1 = `INSERT INTO cup_station(station_id,cup_id) VALUES
                    ($1,$2);`;
        let sql2 = `UPDATE  cup_profile set collected = true
                    where cup_profile.cup_id = $1;`;
        const values1 = [station_id,cup_id];
        const values2 = [cup_id]

        try {
            const result1 = await db.query(sql1, values1);
            const result2 = await db.query(sql2, values2);
            console.log(result2);
            if (result2 != undefined) {
                console.log("inserted");
                return 1 ;
            }else{
                return 0 ;
            }
        } catch (err) {
            return 0 ;
            throw err;
        }
    }

    /**
     * delete cup into a station given the id
     * @param station_id
     * @returns 1 ok 0 nope
     */
    static async deleteCupBin(station_id) {
        if (station_id == undefined) {
            return undefined;
        }
        let sql = `delete 
                    from cup_station
                    where station_id = $1`;
        let sql2 = `UPDATE  station set level =0
                    where station.id = $1;`;
        const values = [station_id];

        try {
            const result1 = await db.query(sql, values);
            const result2 = await db.query(sql2, values);
            console.log(result1);
            if (result1 != undefined) {
                return 1 ;
            }else{
                return 0 ;
            }
        } catch (err) {
            throw err;
        }
    }

        /**
     * delete cup into a station given the id
     * @param station_id
     * @returns 1 ok 0 nope
     */
    static async updateBinLevel(station_id, level) {
        if (station_id == undefined || level == undefined) {
            return undefined;
        }
        let sql = `UPDATE  station set level = $2
                    where station.id = $1;`;
        const values = [station_id,level];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            if (result != undefined) {
                return 1 ;
            }else{
                return 0 ;
            }
        } catch (err) {
            throw err;
        }
    }
}