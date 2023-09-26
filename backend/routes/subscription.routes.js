const express = require('express');
const webpush = require('web-push');
const router = express.Router();

const publicVapidKey = 'BLp3BGxSyYIv3rfy07KC-saKtiCVI073LWw5Eh24gHoRGV7hhT1kVwo6gnhjrUszZguRy8b9lGroKNRy9iCUcCI';
const privateVapidKey = '9HPDFyx8Xd3lu2ctDHGdf3TNSjDUU2nsAuwwLe2d_6A';

router.post('/', async(req, res) => {
    const subscription = req.body;
    console.log('subscription', subscription);
    res.status(201).json({ message: 'subscription received'});

    webpush.setVapidDetails('mailto:freiheit@htw-berlin.de', publicVapidKey, privateVapidKey);
});

module.exports = router;
