'use strict';
module.exports = class Cup {

    /**
     * Creates a cup entity
     */
    constructor(cup_id, description, pair_time, collected) {
        this.setCupId(cup_id);
        this.setDescription(description);
        this.setPairTime(pair_time);
        this.setCollected(collected)
    }

    /**
     * Returns the Cup_id of a Cup
     * @returns {number} Cup_id of the Cup
     */
    getCupId() {
        return this.cup_id;
    }

    /**
     * Sets a new given cup_id
     * @param {number} cup_id - The new cup_id
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - cup_id is undefined
     */
    setCupId(cup_id) {
        if (cup_id != undefined) {
            this.cup_id = cup_id + '';
            return 0;
        }
        return 1;
    }


    /**
     * Returns the description of a description
     * @returns {string} description of the Cup
     */
    getDescription() {
        return this.description;
    }

    /**
     * Sets a new given description
     * @param {string} description - The new description
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - description is undefined
     */
    setDescription(description) {
        if (description != undefined) {
            this.description = description + '';
            return 0;
        }
        return 1;
    }

    /**
 * Sets a new given pair time
 * @param {string} description - The new pair time
 * @returns {number} 0 - changes were applied successfully
 * @returns {number} 1 - pair time is undefined
 */
    setPairTime(pair_time) {

        if (pair_time !== undefined) { // check if date is undefined
            if (pair_time instanceof Date) { // check if date is a Date instance
                if (!isNaN(pair_time.valueOf())) { // check if date is a valid date
                    let t = new Date;
                    if (!(t.valueOf() < pair_time.valueOf())) { // check if data is set in the future
                        this.pair_time = pair_time;
                        return 0;
                    }
                    return 1;
                }
                return 1;
            } else if (pair_time === null) {
                this.pair_time = null;
                return 0;
            }
            return 1;
        }
        return 1;
    }

    /**
     * Returns the date  of the pairing
     * @returns {Date} date of pairing
     */
    getPairtime() {
        return this.pair_time
    }


        /**
     * return the locked status of the bin
     */
    getCollected(){
        return this.collected;
    }

    /**
     * set the collected status of the cup
     * @param collected boolean value of the collected status
     * @returns {number} 1 successuful 0 fail
     */
    setCollected(collected){
        if(collected != undefined) {
            this.collected = collected;
            return 0;
        }
        return 1;
    }


}