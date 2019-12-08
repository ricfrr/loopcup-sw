var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var EventOrganizerDAO = require('../db/DAO/EventOrganizerDAO');
var DrinkDAO = require('../db/DAO/DrinkDAO');
var StationDAO = require('../db/DAO/StationDAO');

var Profile = require('../db/Entity/Profile');
var Drink = require('../db/Entity/Drink');
/* GET users listing. */




router.get('/info/:id', async function (req, res, next) {
    var organizer = await EventOrganizerDAO.getEventOrganizerById(req.params.id.toString());
    var bin = await EventOrganizerDAO.getBinByEventOrganizerId(req.params.id.toString());
    var drink = await EventOrganizerDAO.getDrinkByEventOrganizerId(req.params.id.toString());
    res.json({
        'money': organizer.getMoneyBin(),
        'drinks': drink,
        'name': organizer.getName(),
        'bin' : bin
    });
});


/*
 check if the trash is inside the bin
 */
router.get('/drink/:drink_id', async function (req, res, next) {
    console.log(req.params.drink_id.toString());
    try {
        var coupon = await DrinkDAO.getDrinkByTransactionId(req.params.drink_id.toString());
        var event_org = await EventOrganizerDAO.getEventOrganizerById(coupon.getEventId());
        res.status(200).json({
            message: coupon.getMessage(),
            organizer: event_org.getName()
        });
    } catch (err) {
        res.status(404).end();
    }
});

/*
    validate the coupon
*/
router.post('/drink', async function (req, res, next) {
    let coupon_id = req.body.coupon_id;

    if (coupon_id == undefined) {
        res.status(400).end();
        return;
    }

    try {
        let validation = await DrinkDAO.validateDrink(coupon_id);
        if(validation){
            res.status(200).end();
        }else{
            res.status(401).end;
        }
    } catch (error) {
        res.status(401).end();
        return;
    }
    
});

router.post('/drink', async function (req, res, next) {
    let id = req.body.id;
    let drink = req.body.drink;
    let cost = req.body.cost;

    if (drink == undefined || id == undefined || cost==undefined) {
        res.status(400).end();
        return;
    }

    let val = await EventOrganizerDAO.insertDrink(id, drink, cost);

    if (val) {
        res.status(200).end();
        return;
    } else {
        // check credentials
        res.status(500).end();
        return;
    }
});

router.post('/retrieve', async function (req, res, next) {
    let id = req.body.id;

    if (id == undefined) {
        res.status(400).end();
        return;
    }

    let val = await EventOrganizerDAO.retrieveMoney(id);

    if (val) {
        res.status(200).end();
        return;
    } else {
        // check credentials
        res.status(500).end();
        return;
    }
});

router.delete('/drink', async function (req, res, next) {
    let id = req.body.id;
    if (id == undefined) {
        res.status(400).end();
        return;
    }
    let val = await EventOrganizerDAO.deleteDrink(id);
    if (val) {
        res.status(200).end();
        return;
    } else {
        // check credentials
        res.status(500).end();
        return;
    }
});


router.post('/login', async function (req, res, next) {
    let mail = req.body.mail;
    let password = req.body.password;

    if (mail == undefined || password == undefined) {
        res.status(400).end();
        return;
    }

    let hash = crypto.createHash('sha256');
    let passwordHash = hash.update(password).digest('hex');
    let organizer = await EventOrganizerDAO.getProfileByMail(mail);

    if (organizer == undefined || organizer == null) {
        res.status(401).end();
        return;
    } else {
        // check credentials
        if (organizer.getPassword().localeCompare(passwordHash) === 0) {
            res.send(JSON.stringify({ id: organizer.getEventOrganizerId() }));
            res.status(200).end();
            return;
        } else {
            res.status(401).end();
            return;
        }
    }
});


module.exports = router;
