const express = require('express');
const adminRouter = express.Router();
const mysql = require('mysql');
const Sequelize = require('sequelize');
const multiparty = require('multiparty');
const multer = require('multer');
var upload = multer()
// connection string
const sequelize = new Sequelize('node-app', 'root', '121314', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
});


// model schema
const Books = sequelize.define('books', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        defaultValue: 'Default title',
        validate: {
            len: {
                args: [3, 150],
                msg: 'Lenght must be morwe then 10 and less then 150 symbols',
            },
        },
    },
    genre: {
        type: Sequelize.STRING,
        defaultValue: 'Default genre',
    },
    author: {
        type: Sequelize.STRING,
        validate: {
            startWithUpper(authorVal){
                const first = authorVal.charAt(0);
                const startWithUpper = first === authorVal[0].toUpperCase();
                if (!startWithUpper) {
                    throw new Error('First letter must be in uppercase');
                }
            },
        },
    },
    read: Sequelize.BOOLEAN,
}, {
    hooks: {
        beforeValidate: (res) => {
            console.log('beforeValidate' + res.dataValues.title);
            res.dataValues.title = res.dataValues.title + 'dddd';
        },
        afterValidate: (user) => {
            console.log('afterValidate');
            // user.pasword= bcrypt.hasSync(user.password,8);
        },
        beforeCreate: () => {
            console.log('beforeCreate');
        },
        afterCreate: () => {
            console.log('afterCreate');
        },
    },
});

const router = (nav) => {
    adminRouter.get('/', (req, res) => {
        res.render('admin');
    });
    adminRouter.post('/', upload.array(), (req, res) => {
        res.json(req.body);

        // var form = new multiparty.Form();
        // form.parse(req, function(err, fields, files) {
        //     console.log(files);
        // });

    });
    // adminRouter.post('/', (req, res) => {
    //     res.json(req.body);
    //
    //     // var form = new multiparty.Form();
    //     // form.parse(req, function(err, fields, files) {
    //     //     console.log(files);
    //     // });
    //
    // });

    adminRouter.get('/addBooks', (req, res) => {
        // create DB table if one does not exist already
        sequelize.sync({
            logging: console.log,
        }).then(() => {
            // add books to table
            // Books.create({
            //  title: 'asdalexey',
            //  author: 'Aasd',
            //  read: false,
            //  }, {
            //  fields: ['title', 'genre'],
            //  }).then((data) => {
            //  // Books.findById(1).then((foundedObj) => {
            //  //     // console.log(foundedObj.dataValues);
            //  //
            //  // });
            //  res.send(data.dataValues);
            //  }).catch((err) => {
            //  res.send(err);
            //  });
            Books.bulkCreate(
                [
                    {
                        title: 'asdalexey',
                        author: 'Aasd',
                        read: false,
                    },
                    {
                        title: 'asdalexey2',
                        author: 'Aasd2',
                        read: false,
                    },
                ],
                {
                    validate: true,
                    ignoreDuplicates: true,
                }
            ).then((data) => {
                console.log(data);
                res.send(data);
            }).catch((err) => {
                res.send(err);
            });
        });
    });
    return adminRouter;
};

module.exports = router;
