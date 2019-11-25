var express = require('express');
var router = express.Router();
var ProfileDAO = require('../db/DAO/ProfileDAO');
var DrinkDAO = require('../db/DAO/DrinkDAO');
var EventOrganizerDAO = require('../db/DAO/EventOrganizerDAO');


/*
 list of coupons
 */
router.get('/all', async function (req, res, next) {

    var coupon_list = await DrinkDAO.getAllDrink();
    res.json(coupon_list);
});



router.get('/user/:id', async function (req, res, next) {
    if (req.params.id == undefined) {
        res.status(400).end();
        return;
    }
    var coupon = await ProfileDAO.getCouponByProfileId(req.params.id.toString());   
    console.log(coupon); 
});

router.post('/buy', async function (req, res, next) {
    let profile_id = req.body.profile_id;
    let drink_id = req.body.drink_id;
    let cup_number = req.body.cup_number;

    if (profile_id == undefined || drink_id == undefined) {
        res.status(400).end();
        return;
    }

    let profile = await ProfileDAO.getProfileById(profile_id);
    let drink = await DrinkDAO.getDrinkById(drink_id);
    try {
        if (profile != undefined && drink != undefined && profile.getLoopCoins()>=drink.getCost()) {
            var result = await DrinkDAO.buyCoupon(profile_id, drink_id);
            if (cup_number==0){
                await ProfileDAO.decreaseLoopCoins(profile_id, 20);
                bar_own = await EventOrganizerDAO.getEventOrganizerByDrinkId(drink_id);
                await EventOrganizerDAO.increaseLoopCoins(bar_own.getEventOrganizerId(),20)
            }
            if (result == undefined || result == null) {
                res.status(401).end();
                return;
            } else {
                res.status(200).end();
                return;
            }
        } else {
            res.status(401).end();
        }
        
    } catch (error) {
        console.log(error)
    }
    
});





module.exports = router;
