const express = require('express');
const webpush = require('web-push');
const router = express.Router();

const publicVapidKey = 'BAcQobNWfSlPAmSJ_zP83DmWZPWm3CAgogulhEkmqcGa_dlMvlWp_bmYnBmip63bkytxy-YKOJT2fgnuWrHj_vo';
const privateVapidKey = 'UJHdouxtOPEnVwYe0Fco1WkUa6bTA7fpspK_Oj-g3E4';

router.post('/', async(req, res) => {
    const subscription = req.body;
    console.log('subscription', subscription);
    res.status(201).json({ message: 'subscription received'});

    webpush.setVapidDetails('mailto:Antonia.Sperling@Student.HTW-Berlin.de', publicVapidKey, privateVapidKey);
});

module.exports = router;
