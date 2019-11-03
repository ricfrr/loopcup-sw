'use strict';
var db = require('../query');
var Bin = require('../Entity/Bin');
var Coupon = require('../Entity/Coupon');
var EventOrganizer = require('../Entity/EventOrganizer');

module.exports = class EventOrganizerDAO {

    /**
     *  return a profile given the profile id
     */
    static async getEventOrganizerById(event_id) {
        if (event_id == undefined) {
            return undefined;
        }

        let sql = `SELECT * FROM event_organizer WHERE id = $1`;
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
        let sql = `SELECT * FROM event_organizer WHERE mail = $1`;
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

        let sql = `SELECT * FROM event_organizer WHERE mail = $1 and password = $2 `;
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
    static async getEventOrganizerByBinId(bin_id) {
        if (bin_id == undefined) {
            return undefined;
        }

        let sql = `select event_organizer.id, event_organizer.profile_name,event_organizer.mail,event_organizer.password, event_organizer.money_trash,  event_organizer.money_bin 
                   from bin join event_organizer 
                   on bin.event_id= event_organizer.id
                   where bin.id =$1;`;
        const values = [bin_id];

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
    static async getEventOrganizerByCouponId(coupon_id) {
        if (coupon_id == undefined) {
            return undefined;
        }

        let sql = `select event_organizer.id, event_organizer.profile_name,event_organizer.mail,event_organizer.password, event_organizer.money_trash,  event_organizer.money_bin 
                    from coupon join event_organizer 
                    on coupon.event_id= event_organizer.id
                    where coupon.id =$1;`;
        const values = [coupon_id];

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


    static async increaseMoneyBin(event_id, cost) {
        if (event_id == undefined || cost == undefined) {
            return undefined;
        }

        let sql = `UPDATE event_organizer set money_bin = money_bin+$1
                    where id= $2;`;
        const values = [cost, event_id];

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

    static async retrieveMoney(event_id) {
        if (event_id == undefined) {
            return undefined;
        }

        let sql = `UPDATE event_organizer set money_bin = 0
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