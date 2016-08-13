const express = require('express');
const bookRouter = express.Router();
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

    bookRouter.get('/', (req, res) => {
        res.render('bookListView', {
            title: 'Books',
            nav,
            books,
        });
    });

    bookRouter.get('/:id', (req, res) => {
        const id = req.params.id;
        res.render('bookView', {
            title: 'Books',
            nav,
            book: books[id],
        });
    });

    return bookRouter;
};

module.exports = router;
