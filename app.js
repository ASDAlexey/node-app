const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
    {
        link: '/books',
        text: 'Books',
    },
    {
        link: '/authors',
        text: 'Authors',
    },
];
const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use(express.static('public'));
app.use('/books', bookRouter);

app.get('/', (req, res) => {
    res.render('index', {
        nav,
    });
});

app.listen(port, (err) => {
    console.log(`Running server on port ${port}`);
    if (err) console.error(err);
});
