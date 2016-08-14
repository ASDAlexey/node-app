const express = require('express');
const adminRouter = express.Router();
const mongodb = require('mongodb').MongoClient;

const router = (nav) => {
    const books = [
        {
            title: 'AAAA1',
            genre: 'SSSS',
            author: 'ASDA',
            read: false,
        },
        {
            title: 'AAAA2',
            author: 'ASDA',
            read: false,
        },
        {
            title: 'AAAA3',
            genre: 'SSSS',
            author: 'ASDA',
            read: false,
        },
    ];
    adminRouter.get('/addBooks', (req, res) => {
        const url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, (error, db) => {
            const collection = db.collection('books');
            collection.insertMany(books, (err, results) => {
                res.send(results);
            });
            db.close();
        });
    });

    return adminRouter;
};

module.exports = router;
