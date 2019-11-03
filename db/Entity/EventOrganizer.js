'use strict';
module.exports = class EventOrganizer {

    /**
     * Creates a event_organizer entity
     */
    constructor(event_organizer_id,event_organizer_name,mail, password,money_trash, money_bin) {
        this.setEventOrganizerId(event_organizer_id);
        this.setName(event_organizer_name)
        this.setMail(mail);
        this.setPassword(password);
        this.setMoneyTrash(money_trash);
        this.setMoneyBin(money_bin);
    }

    /**
     * Returns the EventOrganizer_id of a EventOrganizer
     * @returns {number} EventOrganizer_id of the EventOrganizer
     */
    getEventOrganizerId() {
        return this.event_organizer_id;
    }

    /**
     * Sets a new given event_organizer_id
     * @param {number} event_organizer_id - The new event_organizer_id
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - event_organizer_id is undefined
     */
    setEventOrganizerId(event_organizer_id) {
        if(event_organizer_id != undefined) {
            this.event_organizer_id = event_organizer_id + '';
            return 0;
        }
        return 1;       
    }

    /**
     * Returns the name of a EventOrganizer
     * @returns {string} name of the EventOrganizer
     */
    getName() {
        return this.event_organizer_name;
    }

    /**
     * Sets a new given name
     * @param {string} name - The new name
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - name is undefined
     */
    setName(event_organizer_name) {
        if(event_organizer_name != undefined) {
            this.event_organizer_name = event_organizer_name + '';
            return 0;
        }
        return 1;
    }


    /**
     * Returns the mail of a EventOrganizer
     * @returns {string} mail of the EventOrganizer
     */
    getMail() {
        return this.mail;
    }

    /**
     * Sets a new given mail
     * @param {string} surname - The new mail
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
     * Returns the password of a EventOrganizer
     * @returns {string} password of the EventOrganizer
     */
    getPassword() {
        return this.password;
    }

    /**
     * Sets a new given password
     * @param {string} password - The new password
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - password is undefined
     */
    setPassword(password) {
        if(password !== undefined) {
            if(password === null) {
                this.password = password;
            } else {
                this.password = password + '';    
            }
            return 0;
        }
        return 1;
    }

        /**
     * Returns the money_trash of a Coupon
     * @returns {string} money_trash of the Coupon
     */
    getMoneyTrash() {
        return this.money_trash;
    }

    /**
     * Sets a new given money_trash
     * @param {string} money_trash - The new money_trash
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - money_trash is undefined
     */
    setMoneyTrash(money_trash) {
        if (money_trash !== undefined) {
            if (!isNaN(money_trash)) {
                this.money_trash = money_trash;
                return 0;
            }
        }
        return 1;
    }


    
        /**
     * Returns the money_bin of a Coupon
     * @returns {string} money_bin of the Coupon
     */
    getMoneyBin() {
        return this.money_bin;
    }

    /**
     * Sets a new given money_bin
     * @param {string} money_bin - The new money_bin
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - money_bin is undefined
     */
    setMoneyBin(money_bin) {
        if (money_bin !== undefined) {
            if (!isNaN(money_bin)) {
                this.money_bin = money_bin;
                return 0;
            }
        }
        return 1;
    }

}