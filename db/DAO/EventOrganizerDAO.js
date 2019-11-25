'use strict';
var db = require('../query');
var Bin = require('../Entity/Bin');
var Coupon = require('../Entity/Drink');
var EventOrganizer = require('../Entity/EventOrganizer');

module.exports = class EventOrganizerDAO {

    /**
     *  return a profile given the profile id
     */
    static async getEventOrganizerById(event_id) {
        if (event_id == undefined) {
            return undefined;
        }

        let sql = `SELECT * FROM bar_owner WHERE id = $1`;
        const values = [event_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let tempEventOrg;
            if (result != undefined && result.length != 0) {
                tempEventOrg = new EventOrganizer(result[0].id, result[0].profile_name, result[0].mail, result[0].password, result[0].money_trash, result[0].money_bin);
            }
            return tempEventOrg;
        } catch (err) {
            throw err;
        }
    }

    /**
     *  return a profile given the profile password
     */
    static async getProfileByMail(mail) {
        if (mail == undefined) {
            return undefined;
        }
        let sql = `SELECT * FROM bar_owner WHERE mail = $1`;
        const values = [mail];
        try {
            const result = await db.query(sql, values);
            console.log(result);
            let tempEventOrg;
            if (result != undefined && result.length != 0) {
                tempEventOrg = new EventOrganizer(result[0].id, result[0].profile_name, result[0].mail, result[0].password, result[0].money_trash, result[0].money_bin);
            }
            return tempEventOrg;
        } catch (err) {
            throw err;
        }
    }


    /**
     *  return a profile given the profile password
     */
    static async getProfileByMailPassword(mail, password) {
        if (mail == undefined || password == undefined) {
            return undefined;
        }

        let sql = `SELECT * FROM bar_owner WHERE mail = $1 and password = $2 `;
        const values = [mail, password];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let tempEventOrg;
            if (result != undefined && result.length != 0) {
                tempEventOrg = new EventOrganizer(result[0].id, result[0].profile_name, result[0].mail, result[0].password, result[0].money_trash, result[0].money_bin);
            }
            return tempEventOrg;
        } catch (err) {
            throw err;
        }
    }



    /**
     *  return a list of coupon give the profile mail
     */
    static async getCouponByEventOrganizerId(event_id) {
        if (event_id == undefined) {
            return undefined;
        }

        let sql = `select coupon.id, coupon.cost, coupon.message, coupon.event_id
                     from coupon
                     where  event_id =$1`;
        const values = [event_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let coupons = [];
            if (result != undefined && result.length != 0) {
                for (let i = 0; i < result.length; i++) {
                    let tmp_coup = new Coupon(result[i].id, result[i].cost, result[i].message, result[i].event_id);
                    coupons.push(tmp_coup)
                }
            }
            return coupons;
        } catch (err) {
            throw err;
        }
    }

    /**
     *  return a list of coupon give the profile mail
     */
    static async getBinByEventOrganizerId(event_id) {
        if (event_id == undefined) {
            return undefined;
        }

        let sql = `select *
                     from bin
                     where  event_id =$1`;
        const values = [event_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let bins = [];
            if (result != undefined && result.length != 0) {
                for (let i = 0; i < result.length; i++) {
                    let tmp_bin = new Bin(result[i].id, result[i].level, result[i].event_id);
                    bins.push(tmp_bin)
                }
            }
            return bins;
        } catch (err) {
            throw err;
        }
    }


    /**
     *  return a list of coupon give the profile mail
     */
    static async getEventOrganizerByLoopStationId(station_id) {
        if (station_id == undefined) {
            return undefined;
        }

        let sql = `select bar_owner.id, bar_owner.profile_name,bar_owner.mail,bar_owner.password, bar_owner.loop_coins,  bar_owner.money_bin 
                   from station join bar_owner 
                   on station.bar_owner_id= bar_owner.id
                   where station.id =$1;`;
        const values = [station_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let event_org = undefined;
            if (result != undefined && result.length != 0) {
                event_org = new EventOrganizer(result[0].id, result[0].profile_name, result[0].mail, result[0].password, result[0].money_trash, result[0].money_bin);
            }
            return event_org;
        } catch (err) {
            throw err;
        }
    }

    /**
 *  return a list of coupon give the profile mail
 */
    static async getEventOrganizerByDrinkId(drink_id) {
        if (drink_id == undefined) {
            return undefined;
        }

        let sql = `select bar_owner.id, bar_owner.profile_name,bar_owner.mail,bar_owner.password, bar_owner.loop_coins,  bar_owner.money_bin 
                    from coupon join bar_owner 
                    on coupon.bar_owner_id= bar_owner.id
                    where coupon.id =$1;`;
        const values = [drink_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let event_org = undefined;
            if (result != undefined && result.length != 0) {
                event_org = new EventOrganizer(result[0].id, result[0].profile_name, result[0].mail, result[0].password, result[0].loop_coins, result[0].money_bin);
            }
            return event_org;
        } catch (err) {
            throw err;
        }
    }


    static async increaseLoopCoins(bar_owner_id, cost) {
        if (bar_owner_id == undefined || cost == undefined) {
            return undefined;
        }

        let sql = `UPDATE bar_owner set loop_coins = loop_coins+$1
                    where id= $2;`;
        const values = [cost, bar_owner_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            if (result != undefined) {
                console.log("loop_coins updated");
                return 1;
            } else {
                return 0;
            }
        } catch (err) {
            throw err;
        }
    }
    static async decreaseLoopCoins(bar_owner_id, cost) {
        if (bar_owner_id == undefined || cost == undefined) {
            return undefined;
        }

        let sql = `UPDATE bar_owner set loop_coins = loop_coins+$1
                    where id= $2;`;
        const values = [cost, bar_owner_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            if (result != undefined) {
                console.log("loop_coins updated");
                return 1;
            } else {
                return 0;
            }
        } catch (err) {
            throw err;
        }
    }

    static async retrieveMoney(event_id) {
        if (event_id == undefined) {
            return undefined;
        }

        let sql = `UPDATE bar_owner set money_bin = 0
                    where id= $1;`;
        const values = [event_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            if (result != undefined) {
                console.log("money_bin updated");
                return 1;
            } else {
                return 0;
            }
        } catch (err) {
            throw err;
        }
    }

    static async deleteDrink(id) {
        if (id== undefined) {
            return undefined;
        }

        let sql = `DELETE FROM coupon 
                   WHERE id=$1;`;
        const values = [id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            if (result != undefined) {
                console.log("drink deleted");
                return 1;
            } else {
                return 0;
            }
        } catch (err) {
            throw err;
        }
    }

    static async insertDrink(id, drink, cost) {
        if (id == undefined || drink == undefined || cost == undefined) {
            return undefined;
        }

        let sql = `INSERT INTO coupon (cost, message, event_id) VALUES
                    ($1, $2,$3);`;
        const values = [cost, drink, id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            if (result != undefined) {
                console.log("drink inserted");
                return 1;
            } else {
                return 0;
            }
        } catch (err) {
            throw err;
        }
    }



}