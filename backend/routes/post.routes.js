const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Post = require('../models/posts');
const upload = require('../middleware/upload');
require('dotenv').config();
const webpush = require('web-push');

const publicVapidKey = 'BAcQobNWfSlPAmSJ_zP83DmWZPWm3CAgogulhEkmqcGa_dlMvlWp_bmYnBmip63bkytxy-YKOJT2fgnuWrHj_vo';
const privateVapidKey = 'UJHdouxtOPEnVwYe0Fco1WkUa6bTA7fpspK_Oj-g3E4';
const pushSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/eUr0tpolgiY:APA91bFfPBBCN2MqFfyfIywr3uP2ftmg1xdgQPSu8wNVDjCEnKPlKhh1JlpEkpRjS73rLnbhixT5_uueDE53J2r-3vWE-5D8APSbDVOQunXdRbM_wYt8wxCz9B3ao1EeZMTqatmMByL4',
    keys: {
        p256dh: 'BLq-_PeqkKMiWq4oBMV32LftGGIrNZ2nJLJVVrMGCK_I6pvV11I84eCitpe1Hf-M3njiKjz_Sa0H4ke7kEdyK8E',
        auth: 'qWnO3nvCJG7DChnPxteZEA'
    }
};

function sendNotification() {
    webpush.setVapidDetails('mailto:Antonia.Sperling@Student.HTW-Berlin.de', publicVapidKey, privateVapidKey);
    const payload = JSON.stringify({
        title: 'New Push Notification',
        content: 'New data in database!',
        openUrl: '/help'
    });
    webpush.sendNotification(pushSubscription,payload)
        .catch(err => console.error(err));
    console.log('push notification sent');
    // res.status(201).json({ message: 'push notification sent'});
}


// POST one post
router.post('/', upload.single('file'), async(req, res) => {
    // req.file is the `file` file
    if (req.file === undefined) {
        return res.send({
            "message": "no file selected"
        });
    } else {
        console.log('req.body', req.body);
        console.log('req.file', req.file);
        const newPost = new Post({
            title: req.body.title,
            location: req.body.location,
            image_id: req.file.filename
        })
        await newPost.save();
        sendNotification();
        return res.send(newPost);
    }
})

/* ----------------- GET ---------------------------- */

const credentials = process.env.PATH_TO_PEM

const connection = mongoose.createConnection(process.env.DB_CONNECTION, {
    sslKey: credentials,
    sslCert: credentials,
    dbName: "foto-pwa" });

function getOnePost(id) {
    return new Promise( async(resolve, reject) => {
        try {

            const post = await Post.findOne({ _id: id });
            let fileName = post.image_id;
            const files = connection.collection('posts.files');
            const chunks = connection.collection('posts.chunks');

            const cursorFiles = files.find({filename: fileName});
            const allFiles = await cursorFiles.toArray();
            const cursorChunks = chunks.find({files_id : allFiles[0]._id});
            const sortedChunks = cursorChunks.sort({n: 1});
            let fileData = [];
            for await (const chunk of sortedChunks) {
                fileData.push(chunk.data.toString('base64'));
            }
            let base64file = 'data:' + allFiles[0].contentType + ';base64,' + fileData.join('');
            let getPost = new Post({
                "title": post.title,
                "location": post.location,
                "image_id": base64file
            });
            //console.log('getPost', getPost)
            resolve(getPost)
        } catch {
            reject(new Error("Post does not exist!"));
        }
    })
}

function getAllPosts() {
    return new Promise( async(resolve, reject) => {
        const sendAllPosts = [];
        const allPosts = await Post.find();
        try {
            for(const post of allPosts) {
                // console.log('post', post)
                const onePost = await getOnePost(post._id);
                sendAllPosts.push(onePost);
            }
            // console.log('sendAllPosts', sendAllPosts)
            resolve(sendAllPosts)
        } catch {
            reject(new Error("Posts do not exist!"));
        }
    });
}

// GET one post via id
router.get('/:id', async(req, res) => {
    getOnePost(req.params.id)
        .then( (post) => {
            console.log('post', post);
            res.send(post);
        })
        .catch( () => {
            res.status(404);
            res.send({
                error: "Post does not exist!"
            });
        })
});

// GET all posts
router.get('/', async(req, res) => {

    getAllPosts()
        .then( (posts) => {
            res.send(posts);
        })
        .catch( () => {
            res.status(404);
            res.send({
                error: "Post do not exist!"
            });
        })
});

/* ----------------- DELETE ---------------------------- */

// DELETE one post via id
router.delete('/:id', async(req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        let fileName = post.image_id;
        await Post.deleteOne({ _id: req.params.id });
        await files.find({filename: fileName}).toArray( async(err, docs) => {
            await chunks.deleteMany({files_id : docs[0]._id});
        })
        await files.deleteOne({filename: fileName});
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post does not exist!" })
    }
});

module.exports = router;
