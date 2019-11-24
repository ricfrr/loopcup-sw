'use strict';
module.exports = class Profile {

    /**
     * Creates a profile entity
     */
    constructor(profile_id , profile_name,mail,loop_coins) {
        this.setProfileId(profile_id);
        this.setName(profile_name);
        this.setMail(mail);
        this.setLoopCoins(loop_coins);
    }


    /**
     * Returns the Profile_id of a Profile
     * @returns {number} Profile_id of the Profile
     */
    getProfileId() {
        return this.profile_id;
    }

    /**
     * Sets a new given profile_id
     * @param {number} profile_id - The new profile_id
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - profile_id is undefined
     */
    setProfileId(profile_id) {
        if(profile_id != undefined) {
            this.profile_id = profile_id + '';
            return 0;
        }
        return 1;       
    }

    /**
     * Returns the name of a Profile
     * @returns {string} name of the Profile
     */
    getName() {
        return this.profile_name;
    }

    /**
     * Sets a new given name
     * @param {string} name - The new name
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - name is undefined
     */
    setName(profile_name) {
        if(profile_name != undefined) {
            this.profile_name = profile_name + '';
            return 0;
        }
        return 1;
    }


    /**
     * Returns the mail of a Profile
     * @returns {string} mail of the Profile
     */
    getMail() {
        return this.mail;
    }

    /**
     * Sets a new given mail
     * @param {string} mail - The new mail
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - mail is undefined
     */
    setMail(mail) {
        if(mail !== undefined) {
            if(mail === null) {
                this.mail = mail;
            } else {
                this.mail = mail + '';    
            }
            return 0;
        }
        return 1;
    }

        /**
     * Returns the loop_coins of a Coupon
     * @returns {string} loop_coins of the Coupon
     */
    getLoopCoins() {
        return this.loop_coins;
    }

    /**
     * Sets a new given loop_coins
     * @param {string} loop_coins - The new loop_coins
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - loop_coins is undefined
     */
    setLoopCoins(loop_coins) {
        if (loop_coins !== undefined) {
            if (!isNaN(loop_coins)) {
                this.loop_coins = loop_coins;
                return 0;
            }
        }
        return 1;
    }

}