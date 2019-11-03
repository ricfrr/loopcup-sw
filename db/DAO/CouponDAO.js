'use strict';
var db = require('../query');
var Coupon = require('../Entity/Coupon');
var ProfileDAO = require('../DAO/ProfileDAO');
var EventOrganizerDAO = require('../DAO/EventOrganizerDAO');

module.exports = class CouponDAO {

    /**
     *  return a coupon given the coupon id  
     */
    static async getCouponById(coupon_id) {
        if (coupon_id == undefined) {
            return undefined;
        }

        let sql = `SELECT * FROM coupon WHERE id = $1`;
        const values = [coupon_id];

        try {
            const result = await db.query(sql, values);
            let tempCoupon;
            console.log(result);
            if (result != undefined && result.length !=0) {
                tempCoupon = new Coupon(result[0].id, result[0].cost,  result[0].message, result[0].event_id);
            }
            return tempCoupon;
        } catch (err) {
            throw err;
        }
    }

    /**
     *  return a coupon given the transaction id  
     */
    static async getCouponByTransactionId(coupon_id) {
        if (coupon_id == undefined) {
            return undefined;
        }

        let sql = `SELECT coupon_profile.coupon_id FROM coupon_profile WHERE id = $1 and used = false`;
        const values = [coupon_id];

        try {
            const result = await db.query(sql, values);
            let tempCoupon;
            console.log(result);
            if (result != undefined && result.length !=0) {
                tempCoupon = await this.getCouponById(result[0].coupon_id)
            }
            return tempCoupon;
        } catch (err) {
            throw err;
        }
    }




    /**
     *  return the list of all coupon  
     */
    static async getAllCoupon() {
        let sql = `SELECT * FROM coupon`;
        const values = [];
        try {
            const result = await db.query(sql, values);
            console.log(result);
            let coupons=[];
            if (result != undefined && result.length !=0) {
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
     *  return a list of coupon give the coupon mail
     */
    static async getCouponsByEventId(event_id) {
        if (event_id == undefined) {
            return undefined;
        }

        let sql = `select *
                     from coupon
                     where  event_id =$1`;
        const values = [event_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            let coupons=[];
            if (result != undefined && result.length !=0) {
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
     *  return a list of coupon give the profile id
     */
    static async buyCoupon(profile_id,coupon_id) {
        if (profile_id == undefined || coupon_id == undefined) {
            return undefined;
        }

        let sql = `INSERT INTO coupon_profile(profile_id,coupon_id,buy_time,used) VALUES
                    ($1,$2,now(),false)`;
        const values = [profile_id,coupon_id];

        try {
            const result = await db.query(sql, values);
            console.log(result);
            if (result != undefined) {
                let coup = await this.getCouponById(coupon_id)
                await ProfileDAO.decreaseMoneyBin(profile_id,coup.getCost())
                let ev_org = await EventOrganizerDAO.getEventOrganizerByCouponId(coupon_id);
                EventOrganizerDAO.increaseMoneyBin(ev_org.getEventOrganizerId(),coup.getCost())
                console.log("drinks ok!");
                return 1 ;
            }else{
                return 0 ;
            }
        } catch (err) {
            throw err;
        }
    }

    /**
     *  validate a coupon
     */
    static async validateCoupon(coupon_id) {
        if (coupon_id == undefined) {
            return undefined;
        }

        let sql = `UPDATE  coupon_profile set used = true
                    where coupon_profile.id = $1;`;
        const values = [coupon_id];
        
        try {
            const result = await db.query(sql, values);
            console.log(result);
            if (result != undefined) {
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


}