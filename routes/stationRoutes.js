var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var ProfileDAO = require('../db/DAO/ProfileDAO');
var StationDAO = require('../db/DAO/StationDAO');
var EventOrganizerDAO = require('../db/DAO/EventOrganizerDAO');
var CupDAO = require('../db/DAO/CupDAO');




/*
 check if the cup is inside the bin
 */
router.get('/cup/:cup_id', async function (req, res, next) {
    console.log(req.params.cup_id.toString());
    var cup = await CupDAO.getCupById(req.params.cup_id.toString());
    if (cup != undefined) {
        var is_inside = await StationDAO.isCupInsideTheBin(req.params.cup_id.toString());
        res.json({ inside: is_inside });
    } else {
        res.json({ inside: true });
    }

});

router.get('/info/:bin_id', async function (req, res, next) {

    // insert cup in bin, check if the cup is paired with someone and increments the reward
    let bin_id = req.params.bin_id.toString();

    let cup = await StationDAO.getCupInsideBin(bin_id);
    if (cup != undefined) {
        res.status(200).send(cup);
        return;
    } else {
        // check credentials
        res.status(500);
        return;
    }
});

/**
 * insert cup inside the bin and update the money in the virtual wallet of the user
 */
router.post('/cup', async function (req, res, next) {
    let bin_id = req.body.bin_id;
    let cup_id = req.body.cup_id;

    if (bin_id == undefined || cup_id == undefined) {
        res.status(401).end();
        return;
    }
    try {
        let cup = await CupDAO.getCupById(cup_id);
        if (cup == undefined) {
            res.status(401).end();
            return;
        }
        let val = await StationDAO.insertCupBin(bin_id, cup_id);
        if (val) {
            let bar_own = await EventOrganizerDAO.getEventOrganizerByLoopStationId(bin_id);
            await EventOrganizerDAO.decreaseLoopCoins(bar_own.getEventOrganizerId(), 20);
            let profile_id = await ProfileDAO.getProfileIdByCupId(cup_id);
            if (profile_id!= undefined){
                let resp = await ProfileDAO.increaseLoopCoins(profile_id, 20);
            } 
            res.status(200).end();
            return;
        } else {
            // check credentials
            res.status(200).end();
            return;
        }
    } catch(err){
        res.status(500).end();
        return;
    }
});


/**
 * update the level of the cup in the loopstation
 */
router.post('/level', async function (req, res, next) {
    let bin_id = req.body.bin_id;
    let level = req.body.level;

    if (bin_id == undefined || level == undefined) {
        res.status(401).end();
        return;
    }
    try {
        let val = await StationDAO.updateBinLevel(bin_id, level);
        if (val) {
           res.status(200).end();
           return;
        } else {
            // check credentials
            res.status(200).end();
            return;
        }
    } catch(err){
        res.status(500).end();
        return;
    }
});

/**
 * insert cup inside the bin and update the money in the virtual wallet of the user
 */
router.post('/unlock', async function (req, res, next) {
    let security_deposit = 20;
    let bin_id = req.body.bin_id;
    let profile_id = req.body.profile_id;

    if (bin_id == undefined || profile_id == undefined) {
        res.status(401).end();
        return;
    }
    try {
        let bin = await StationDAO.getBinById(bin_id);
        if (bin == undefined) {
            res.status(401).end();
            return;
        }
        let profile = await ProfileDAO.getProfileById(profile_id);
        if (profile == undefined) {
            res.status(401).end();
            return;
        }
        if (profile.getMoneyBin()>=security_deposit){ 
                console.log("connected "+ bin.getBinId())
                client.subscribe("bin_topic", function (err) {
                  if (!err) {
                    client.publish(
                        'bin_topic'
                       ,'test', {qos:2}
                      );

                    //client.publish("bin_topic", 'unlock')    
                    //client.end()
                    ProfileDAO.decreaseLoopCoins(profile_id,security_deposit);
                    res.status(200).end();
                  }else {
                    res.status(401).end(); 
                  }
                })         
        }else {
            res.status(401).end(); 
        }
    } catch(err){
        res.status(500).end();
        return;
    }
});

/**
 * remove all the cups inside that bin 
 */
router.post('/empty', async function (req, res, next) {
    let bin_id = req.body.bin_id;

    if (bin_id == undefined) {
        res.status(401).end();
        return;
    }

    try {
        await StationDAO.deleteCupBin(bin_id);
        res.status(200).end();
    } catch(err){
        res.status(500).end();
    }
    return;
});


module.exports = router;
