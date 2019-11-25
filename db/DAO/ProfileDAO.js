'use strict';
var db = require('../query');
var Profile = require('../Entity/Profile');
var Coupon = require('../Entity/Drink');
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
                tempProfile = new Profile(result[0].id, result[0].name, result[0].mail, result[0].loop_coins);
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
                tempProfile = new Profile(result[0].id, result[0].name, result[0].mail, result[0].loop_coins);
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
                tempProfile = new Profile(result[0].id, result[0].name, result[0].mail, result[0].loop_coins);
            }
            return tempProfile;
        } catch (err) {
            throw err;
        }
    }



    /**
     *  return a list of coupon given the profile id
     */
    static async getCouponByProfileId(id) {
        if (id == undefined) {
            return undefined;
        }

        let sql = `select coupon_profile.id , coupon.cost, coupon.message, coupon.bar_owner_id, coupon.description, coupon.img
        from coupon join coupon_profile 
        on coupon.id= coupon_profile.coupon_id
        where coupon_profile.profile_id =  $1 and used = false`;
        const values = [id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let coupons = [];
            if (result != undefined && result.length != 0) {
                for (let i = 0; i < result.length; i++) {
                    let tmp_coup = new Coupon(result[i].id, result[i].cost, result[i].message, result[i].bar_owner_id, result[i].description, result[i].img);
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

        let sql = `select cup.id, cup.description, cup_profile.pair_time, cup_profile.collected
        from cup_profile inner join cup on cup.id = cup_profile.cup_id 
        where cup_profile.profile_id = $1 and cup_profile.collected = false;`;
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
    static async insertProfile(mail,name, loop_coins) {
        if (mail == undefined || name == undefined || loop_coins == undefined) {
            return undefined;
        }

        let sql = `INSERT INTO profile(mail,profile_name,loop_coins) VALUES
                    ($1,$2,$3)`;
        const values = [mail, name, loop_coins];

        try {
            const result = await db.query(sql, values);
            console.log(result);
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
     *  return a list of coupon give the profile id
     */
    static async insertCupProfile(profile_id, cup_id) {
        if (profile_id == undefined || cup_id == undefined) {
            return undefined;
        }

        let sql = `INSERT INTO cup_profile(profile_id,cup_id,pair_time,collected) VALUES
                    ($1,$2,now(),false)`;
        const values = [profile_id, cup_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
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
    static async getProfileIdByCupId(cup_id) {
        if (cup_id == undefined) {
            return undefined;
        }

        let sql = `SELECT cup_profile.profile_id 
                    FROM cup_profile 
                    WHERE cup_id= $1 and collected = true;`;
        const values = [cup_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let profile_id = undefined;
            if (result.length != 0 ) {
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


    static async decreaseLoopCoins(profile_id, cost) {
        if (profile_id == undefined || cost == undefined) {
            return undefined;
        }

        let sql = `UPDATE profile set loop_coins = loop_coins-$1
                    where id= $2;`;
        const values = [cost, profile_id];

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


    static async increaseLoopCoins(profile_id, cost) {
        if (profile_id == undefined || cost == undefined) {
            return undefined;
        }

        let sql = `UPDATE profile set loop_coins = loop_coins+$1
                    where id= $2;`;
        const values = [cost, profile_id];

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


}