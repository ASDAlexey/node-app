const express = require('express');
const adminRouter = express.Router();
const mysql = require('mysql');
const Sequelize = require('sequelize');
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
        allowNull: false,
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
});

const router = (nav) => {
    adminRouter.get('/addBooks', (req, res) => {
        // create DB table if one does not exist already
        sequelize.sync({
            logging: console.log,
        }).then(() => {
            // add books to table
            Books.create({
                title: 'asdalexey',
                genre: '',
                author: 'Aasd',
                read: false,
            }).then((data) => {
                // Books.findById(1).then((foundedObj) => {
                //     // console.log(foundedObj.dataValues);
                //
                // });
                res.send(data.dataValues);
            }).catch((err) => {
                res.send(err);
            });

        });
    });
    return adminRouter;
};

module.exports = router;
