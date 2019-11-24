var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var ProfileDAO = require('../db/DAO/ProfileDAO');
var CupDAO = require('../db/DAO/CupDAO');
var StationDAO = require('../db/DAO/StationDAO');
const paypal = require("paypal-rest-sdk");

var Profile = require('../db/Entity/Profile');
var Coupon = require('../db/Entity/Drink');
/* GET users listing. */


router.get('/coupon/:id', async function (req, res, next) {
    if (req.params.id == undefined) {
        res.status(400).end();
        return;
    }
    var coupons = await ProfileDAO.getCouponByProfileId(req.params.id.toString());

    res.json(coupons);
    req.params.id;
});

router.get('/cup/:id', async function (req, res, next) {
    console.log(req.params.id.toString());
    var cups = await ProfileDAO.getAllCupsByProfileId(req.params.id.toString());

    res.json(cups);
    req.params.id;
});

router.post('/pair', async function (req, res, next) {
    let profile_id = req.body.profile_id;
    let trash_id = req.body.trash_id;

    if (profile_id == undefined || trash_id == undefined) {
        res.status(400).end();
        return;
    }
    var profile;
    var trash;
    var is_collected;
    var is_paired;

    try {
        profile = await ProfileDAO.getProfileById(profile_id);
        trash = await CupDAO.getTrashById(trash_id);
        is_collected = await StationDAO.isTrashInsideTheBin(trash_id);
        is_paired = await CupDAO.isAlreadyPaired(trash_id)
    } catch (err) {
        res.status(200).json({ paired: false }).end();
    }


    if (profile != undefined && trash != undefined) {
        if (!is_collected && !is_paired) {
            let result = await ProfileDAO.insertTrashProfile(profile_id, trash_id);
            if (result == 0) {

                return;
            } else {
                res.status(200).json({ paired: true }).end();
                return;
            }
        } else {
            res.status(200).json({ paired: false }).end();
        }

    } else {
        res.status(200).json({ paired: false }).end();
    }
});

router.post('/trash', async function (req, res, next) {
    let profile_id = req.body.profile_id;
    let trash_id = req.body.trash_id;

    if (profile_id == undefined || trash_id == undefined) {
        res.status(400).end();
        return;
    }

    let val = await ProfileDAO.insertTrashProfile(profile_id, trash_id);

    if (val) {
        res.status(200).end();
        return;
    } else {
        // check credentials
        res.status(500).end();
        return;
    }
});

router.get('/info/:mail', async function (req, res, next) {
    var profile = await ProfileDAO.getProfileByMail(req.params.mail.toString());
    if (profile != null) {
        var drinks = await ProfileDAO.getCouponByProfileId(profile.getProfileId());
        var cups = await ProfileDAO.getCupsByProfileId(profile.getProfileId());
        res.json({
            'loop_coins': profile.getLoopCoins(),
            'drinks': drinks,
            'cups': cups.length,
            'name': profile.getName(),
            'id': profile.getProfileId()
        });
    } else {
        res.json({
            'id': 0
        });
    }

});

router.post('/register', async function (req, res, next) {
    let mail = req.body.mail;
    let name = req.body.name;
    let loop_coins = 0;
    res = await ProfileDAO.insertProfile(mail, name, loop_coins)
    if (res == 1) {
        res.status(200).end();
        return;
    } else {
        res.status(400).end();
        return;
    }
});

router.get('/success/:id/:amount', async function (req, res, next) {
    try {
        ProfileDAO.increaseMoneyBin(req.params.id, req.params.amount * 10);
        res.sendStatus(200).end()
    } catch (error) {
        res.sendStatus(401).end()
    }
});

router.get('/cancel', async function (req, res, next) {
    res.sendStatus(200).end()
});


router.get('/pay/:id/:amount', async function (req, res, next) {
    let amount = req.params.amount;
    let profile_id = req.params.id;
    var profile = await ProfileDAO.getProfileById(profile_id);
    if (amount == undefined || profile_id == undefined) {
        res.status(400).end();
        return;
    }

    if (profile == undefined) {
        res.status(401).end();
    }

    var url = "http://192.168.1.41:5000/profile/";
    //var url = "http://52.143.156.181/profile/";


    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": url + "success/" + profile_id + "/" + amount,
            "cancel_url": url + "/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": amount,
                    "currency": "EUR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "EUR",
                "total": amount
            },
            "description": "LoopCoins!"
        }]
    };


    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.redirect(payment.links[1].href);
        }
    });
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
    let profile = await ProfileDAO.getProfileByMail(mail);

    if (profile == undefined || profile == null) {
        res.status(401).end();
        return;
    } else {
        // check credentials
        if (profile.getPassword().localeCompare(passwordHash) === 0) {
            res.send(JSON.stringify({ id: profile.getProfileId() }));
            res.status(200).end();
            return;
        } else {
            res.status(401).end();
            return;
        }
    }
});


module.exports = router;

