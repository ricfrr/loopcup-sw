'use strict';
var db = require('../query');
var Profile = require('../Entity/Profile');
var Coupon = require('../Entity/Coupon');
var Trash = require('../Entity/Cup');

module.exports = class ProfileDAO {

    /**
     *  return a profile given the profile id  
     */
    static async getProfileById(profile_id) {
        if (profile_id == undefined) {
            return undefined;
        }

        let sql = `SELECT * FROM profile WHERE id = $1`;
        const values = [profile_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let tempProfile;
            if (result != undefined && result.length != 0) {
                tempProfile = new Profile(result[0].id, result[0].profile_name, result[0].mail, result[0].age, result[0].profile_pic, result[0].password, result[0].money_bin);
            }
            return tempProfile;
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

        let sql = `SELECT * FROM profile WHERE mail = $1 and password = $2 `;
        const values = [mail, password];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let tempProfile;
            if (result != undefined && result.length != 0) {
                tempProfile = new Profile(result[0].id, result[0].name, result[0].mail, result[0].age, result[0].profile_pic, result[0].password, result[0].money_bin);
            }
            return tempProfile;
        } catch (err) {
            throw err;
        }
    }


    /**
     *  return a profile given the profile mail  
     */
    static async getProfileByMail(mail) {
        if (mail == undefined) {
            return undefined;
        }

        let sql = `SELECT * FROM profile WHERE mail = $1`;
        const values = [mail];

        try {
            const result = await db.query(sql, values);
            let tempProfile;
            if (result.length > 0) {
                tempProfile = new Profile(result[0].id, result[0].name, result[0].mail, result[0].age, result[0].profile_pic, result[0].password, result[0].money_bin);
            }
            return tempProfile;
        } catch (err) {
            throw err;
        }
    }



    /**
     *  return a list of coupon give the profile id
     */
    static async getCouponByProfileId(profile_id) {
        if (profile_id == undefined) {
            return undefined;
        }

        let sql = `select coupon_profile.id , coupon.cost, coupon.message, coupon.event_id 
                    from coupon join coupon_profile 
                    on coupon.id= coupon_profile.coupon_id
                    where coupon_profile.profile_id =  $1 and used = false`;
        const values = [profile_id];

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
     *  return a list of cup give the profile id
     */
    static async getCupsByProfileId(profile_id) {
        if (profile_id == undefined) {
            return undefined;
        }

        let sql = `select trash.id, trash.description, trash_profile.pair_time, trash_profile.collected
                    from trash_profile inner join trash on trash.id = trash_profile.trash_id 
                    where trash_profile.profile_id = $1 and trash_profile.collected = false;`;
        const values = [profile_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let trashes = [];
            if (result != undefined) {
                for (let i = 0; i < result.length; i++) {
                    let tmp_trash = new Trash(result[i].id, result[i].description, result[i].pair_time, result[i].collected);
                    trashes.push(tmp_trash)
                }
            }
            return trashes;
        } catch (err) {
            throw err;
        }
    }

    /**
 *  return a list of cup give the profile id
 */
    static async getAllCupsByProfileId(profile_id) {
        if (profile_id == undefined) {
            return undefined;
        }

        let sql = `select trash.id, trash.description,  trash_profile.pair_time, trash_profile.collected
                    from trash_profile join trash on trash.id = trash_profile.trash_id
                    where trash_profile.profile_id =$1;`;
        const values = [profile_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let trashes = [];
            if (result != undefined) {
                for (let i = 0; i < result.length; i++) {
                    let tmp_trash = new Trash(result[i].id, result[i].description, result[i].pair_time, result[i].collected);
                    trashes.push(tmp_trash)
                }
            }
            return trashes;
        } catch (err) {
            throw err;
        }
    }



    /**
     *  return a list of coupon give the profile id
     */
    static async insertTrashProfile(profile_id, trash_id) {
        if (profile_id == undefined || trash_id == undefined) {
            return undefined;
        }

        let sql = `INSERT INTO trash_profile(profile_id,trash_id,pair_time,collected) VALUES
                    ($1,$2,now(),false)`;
        const values = [profile_id, trash_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let trashes = [];
            if (result != undefined) {
                console.log("inserted");
                return 1;
            } else {
                return 0;
            }
        } catch (err) {
            throw err;
        }
    }



    /**
     *  return a profile id given the profile id
     */
    static async getProfileIdByTrashId(trash_id) {
        if (trash_id == undefined) {
            return undefined;
        }

        let sql = `SELECT trash_profile.profile_id 
                    FROM trash_profile 
                    WHERE trash_id= $1 and collected = true;`;
        const values = [trash_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let profile_id = undefined;
            if (result != undefined) {
                profile_id = result[0].profile_id
            }
            return profile_id;
        } catch (err) {
            throw err;
        }
    }





    /**
     *  update the money of the user
     */
    static async updateMoney(money_trash, trash_id) {
        if (money_trash == undefined || trash_id == undefined) {
            return undefined;
        }

        let profile_id = await this.getProfileIdByTrashId(trash_id);
        if (profile_id == undefined) {
            return undefined;
        }

        let sql = `UPDATE profile set money_bin = money_bin+$1
                    where id= $2;`;
        const values = [money_trash, profile_id];

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


    static async decreaseMoneyBin(profile_id, cost) {
        if (profile_id == undefined || cost == undefined) {
            return undefined;
        }

        let sql = `UPDATE profile set money_bin = money_bin-$1
                    where id= $2;`;
        const values = [cost, profile_id];

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


    static async increaseMoneyBin(profile_id, cost) {
        if (profile_id == undefined || cost == undefined) {
            return undefined;
        }

        let sql = `UPDATE profile set money_bin = money_bin+$1
                    where id= $2;`;
        const values = [cost, profile_id];

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


}