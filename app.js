const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');


const app = express();
const port = process.env.PORT || 5000;

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/auth', authRouter);
app.use(cookieParser());
app.use(session({ secret: 'library' }));
require('./src/config/passport')(app);

app.get('/', (req, res) => {
    res.render('index', {
        nav,
    });
});

app.listen(port, (err) => {
    console.log(`Running server on port ${port}`);
    if (err) console.error(err);
});
