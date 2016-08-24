/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _bodyParser = __webpack_require__(4);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _morgan = __webpack_require__(5);

	var _morgan2 = _interopRequireDefault(_morgan);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();
	var port = process.env.PORT || 8080;

	app.set('views', './src/views');
	app.set('view engine', 'ejs');
	app.use(_express2.default.static('public'));
	app.use((0, _morgan2.default)('combined'));
	app.use(function (req, res, next) {
	    var start = Date.now();
	    res.on('finish', function () {
	        var duration = Date.now() - start;
	        console.log(duration + 'mc');
	    });
	    next();
	});

	// parse application/json
	app.use(_bodyParser2.default.json());
	// parse application/x-www-form-urlencoded
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	// app.use(multer());

	var nav = [{
	    link: '/books',
	    text: 'Books'
	}, {
	    link: '/authors',
	    text: 'Authors'
	}];

	var bookRouter = __webpack_require__(3)(nav);
	var adminRouter = __webpack_require__(2)(nav);

	app.use('/books', bookRouter);
	app.use('/admin', adminRouter);

	app.get('/', function (req, res) {
	    res.render('index', {
	        nav: nav
	    });
	});

	app.listen(port, function (err) {
	    console.log('Running server on port ' + port);
	    if (err) console.error(err);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var adminRouter = express.Router();
	var mysql = __webpack_require__(7);
	var Sequelize = __webpack_require__(8);
	// const multiparty = require('multiparty');
	var multer = __webpack_require__(6);
	var upload = multer();
	// connection string
	var sequelize = new Sequelize('node-app', 'root', '121314', {
	    host: 'localhost',
	    dialect: 'mysql',
	    pool: {
	        max: 5,
	        min: 0,
	        idle: 10000
	    }
	});

	// model schema
	var Books = sequelize.define('books', {
	    id: {
	        type: Sequelize.INTEGER,
	        autoIncrement: true,
	        primaryKey: true
	    },
	    title: {
	        type: Sequelize.STRING,
	        unique: true,
	        allowNull: false,
	        defaultValue: 'Default title',
	        validate: {
	            len: {
	                args: [3, 150],
	                msg: 'Lenght must be morwe then 10 and less then 150 symbols'
	            }
	        }
	    },
	    genre: {
	        type: Sequelize.STRING,
	        defaultValue: 'Default genre'
	    },
	    author: {
	        type: Sequelize.STRING,
	        validate: {
	            startWithUpper: function startWithUpper(authorVal) {
	                var first = authorVal.charAt(0);
	                var startWithUpper = first === authorVal[0].toUpperCase();
	                if (!startWithUpper) {
	                    throw new Error('First letter must be in uppercase');
	                }
	            }
	        }
	    },
	    read: Sequelize.BOOLEAN
	}, {
	    hooks: {
	        beforeValidate: function beforeValidate(res) {
	            console.log('beforeValidate' + res.dataValues.title);
	            res.dataValues.title = res.dataValues.title + 'dddd';
	        },
	        afterValidate: function afterValidate(user) {
	            console.log('afterValidate');
	            // user.pasword= bcrypt.hasSync(user.password,8);
	        },
	        beforeCreate: function beforeCreate() {
	            console.log('beforeCreate');
	        },
	        afterCreate: function afterCreate() {
	            console.log('afterCreate');
	        }
	    }
	});

	var router = function router(nav) {
	    adminRouter.get('/', function (req, res) {
	        res.render('admin');
	    });
	    adminRouter.post('/', upload.array(), function (req, res) {
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

	    adminRouter.get('/addBooks', function (req, res) {
	        // create DB table if one does not exist already
	        sequelize.sync({
	            logging: console.log
	        }).then(function () {
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
	            Books.bulkCreate([{
	                title: 'asdalexey',
	                author: 'Aasd',
	                read: false
	            }, {
	                title: 'asdalexey2',
	                author: 'Aasd2',
	                read: false
	            }], {
	                validate: true,
	                ignoreDuplicates: true
	            }).then(function (data) {
	                console.log(data);
	                res.send(data);
	            }).catch(function (err) {
	                res.send(err);
	            });
	        });
	    });
	    return adminRouter;
	};

	module.exports = router;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var express = __webpack_require__(1);
	var bookRouter = express.Router();
	var router = function router(nav) {
	    var books = [{
	        title: 'AAAA1',
	        genre: 'SSSS',
	        author: 'ASDA',
	        read: false
	    }, {
	        title: 'AAAA2',
	        author: 'ASDA',
	        read: false
	    }, {
	        title: 'AAAA3',
	        genre: 'SSSS',
	        author: 'ASDA',
	        read: false
	    }];

	    bookRouter.get('/', function (req, res) {
	        res.render('bookListView', {
	            title: 'Books',
	            nav: nav,
	            books: books
	        });
	    });

	    bookRouter.get('/:id', function (req, res) {
	        var id = req.params.id;
	        res.render('bookView', {
	            title: 'Books',
	            nav: nav,
	            book: books[id]
	        });
	    });

	    return bookRouter;
	};

	module.exports = router;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("multer");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("mysql");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("sequelize");

/***/ }
/******/ ]);