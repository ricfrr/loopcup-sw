'use strict';
module.exports = class Sation {

    /**
     * Creates a station entity
     */
    constructor(station_id,level,locked,event_id) {
        this.setStationId(station_id);
        this.setLevel(level);
        this.setLocked(locked)
        this.setEventId(event_id);
    }
    

    /**
     * Returns the Station_id of a Station
     * @returns {number} Station_id of the Station
     */
    getStationId() {
        return this.station_id;
    }

    /**
     * Sets a new given station_id
     * @param {number} station_id - The new station_id
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - station_id is undefined
     */
    setStationId(station_id) {
        if(station_id != undefined) {
            this.station_id = station_id + '';
            return 0;
        }
        return 1;
    }

    /**
     * Returns the level of a station
     * @returns {number} level of the station
     */
    getLevel() {
        return this.level;
    }

    /**
     * Sets a new given money_trash
     * @param {number} level - The new money_trash
     * @returns {number} 0 - changes were applied successfully
     * @returns {number} 1 - money_trash is undefined
     */
    setLevel(level) {
        if (level !== undefined) {
            if (!isNaN(level)) {
                this.level = level;
                return 0;
            }
        }
        return 1;
    }

    /**
     * return the locked status of the station
     */
    getLocked(){
        return this.locked;
    }

    /**
     * set the locked status of the station
     * @param locked boolean value of the locked status
     * @returns {number} 1 successuful 0 fail
     */
    setLocked(locked){
        if(locked != undefined) {
            this.locked = locked;
            return 0;
        }
        return 1;
    }

    /**
     * Returns the event_id of a event_id
     * @returns {string} event_id of the Station
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