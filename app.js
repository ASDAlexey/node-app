import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
const app = express();
const port = process.env.PORT || 8080;

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(morgan('combined'));
app.use(function (req, res, next) {
    var start = Date.now();
    res.on('finish', function () {
        var duration = Date.now() - start;
        console.log( `${duration}mc`);
    });
    next();
});

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());

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
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.render('index', {
        nav,
    });
});

app.listen(port, (err) => {
    console.log(`Running server on port ${port}`);
    if (err) console.error(err);
});
