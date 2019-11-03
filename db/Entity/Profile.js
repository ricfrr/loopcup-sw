'use strict';
module.exports = class Profile {

    /**
     * Creates a profile entity
     */
    constructor(profile_id,profile_name,mail, age,profile_pic,password,money_bin) {
        this.setProfileId(profile_id);
        this.setName(profile_name);
        this.setMail(mail);
        this.setAge(age);
        this.setProfilePic(profile_pic);
        this.setPassword(password);
        this.setMoneyBin(money_bin);
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
     * Returns the age
     * @returns {string} age
     */
    getAge() {
        return this.age;
    }

    /**
     * Sets a new given age
     * @param {string} age - The new age
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - age is undefined
     */
    setAge(age) {
        if (age!== undefined) {
            if (!isNaN(age)) {
                this.age = age;
                return 0;
            }
        }
        return 1;
    }


    /**
     * Returns the password of a Profile
     * @returns {string} password of the Profile
     */
    getProfilePic() {
        return this.profile_pic;
    }

    /**
     * Sets a new given profile_pic
     * @param {string} profile_pic - The new profile_pic
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - profile_pic is undefined
     */
    setProfilePic(profile_pic) {
        if(profile_pic !== undefined) {
            if(profile_pic === null) {
                this.profile_pic = profile_pic;
            } else {
                this.profile_pic = profile_pic + '';
            }
            return 0;
        }
        return 1;
    }


        /**
     * Returns the password of a Profile
     * @returns {string} password of the Profile
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