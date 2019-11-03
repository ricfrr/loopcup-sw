'use strict';
module.exports = class Coupon {

    /**
     * Creates a Coupon entity
     */
    constructor(coupon_id, cost,message,event_id) {
        this.setCouponId(coupon_id);
        this.setCost(cost);
        this.setMessage(message);
        this.setEventId(event_id);
    }

    /**
     * Returns the Coupon_id of a Coupon
     * @returns {number} Coupon_id of the Coupon
     */
    getCouponId() {
        return this.coupon_id;
    }

    /**
     * Sets a new given Coupon_id
     * @param {number} coupon_id - The new Coupon_id
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - Coupon_id is undefined
     */
    setCouponId(coupon_id) {
        if(coupon_id != undefined) {
            this.coupon_id = coupon_id + '';
            return 0;
        }
        return 1;
    }


            /**
     * Returns the cost of a Coupon
     * @returns {string} cost of the Coupon
     */
    getCost() {
        return this.cost;
    }

    /**
     * Sets a new given cost
     * @param {string} cost - The new cost
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - cost is undefined
     */
    setCost(cost) {
        if (cost !== undefined) {
            if (!isNaN(cost)) {
                this.cost = cost;
                return 0;
            }
        }
        return 1;
    }


        /**
     * Returns the message of a Coupon
     * @returns {string} message of the Coupon
     */
    getMessage() {
        return this.message;
    }

    /**
     * Sets a new given message
     * @param {string} message - The new message
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - message is undefined
     */
    setMessage(message) {
        if(message != undefined) {
            this.message = message + '';
            return 0;
        }
        return 1;
    }


    /**
     * Returns the event_id of a Coupon
     * @returns {string} event_id of the Coupon
     */
    getEventId() {
        return this.event_id;
    }

    /**
     * Sets a new given event_id
     * @param {string} event_id - The new event_id
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - event_id is undefined
     */
    setEventId(event_id) {
        if(event_id != undefined) {
            this.event_id = event_id + '';
            return 0;
        }
        return 1;
    }


}