const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        nav: [
            {
                link: '/books',
                text: 'Books',
            },
            {
                link: '/authors',
                text: 'Authors',
            },
        ],
    });
});
app.get('/books', (req, res) => res.send('Hello Books'));

app.listen(port, (err) => {
    console.log(`Running server on port ${port}`);
    if (err) console.error(err);
});
