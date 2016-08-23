!function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var r=o(1),a=n(r),i=o(2),s=n(i),u=o(3),l=n(u),d=(0,a["default"])(),c=process.env.PORT||8080;d.set("views","./src/views"),d.set("view engine","ejs"),d.use(a["default"]["static"]("public")),d.use((0,l["default"])("combined")),d.use(function(e,t,o){var n=Date.now();t.on("finish",function(){var e=Date.now()-n;console.log(e+"mc")}),o()}),d.use(s["default"].json()),d.use(s["default"].urlencoded({extended:!0}));var f=[{link:"/books",text:"Books"},{link:"/authors",text:"Authors"}],p=o(4)(f),g=o(5)(f);d.use("/books",p),d.use("/admin",g),d.get("/",function(e,t){t.render("index",{nav:f})}),d.listen(c,function(e){console.log("Running server on port "+c),e&&console.error(e)})},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("morgan")},function(e,t,o){"use strict";var n=o(1),r=n.Router(),a=function(e){var t=[{title:"AAAA1",genre:"SSSS",author:"ASDA",read:!1},{title:"AAAA2",author:"ASDA",read:!1},{title:"AAAA3",genre:"SSSS",author:"ASDA",read:!1}];return r.get("/",function(o,n){n.render("bookListView",{title:"Books",nav:e,books:t})}),r.get("/:id",function(o,n){var r=o.params.id;n.render("bookView",{title:"Books",nav:e,book:t[r]})}),r};e.exports=a},function(e,t,o){"use strict";var n=o(1),r=n.Router(),a=(o(6),o(7)),i=o(8),s=i(),u=new a("node-app","root","121314",{host:"localhost",dialect:"mysql",pool:{max:5,min:0,idle:1e4}}),l=u.define("books",{id:{type:a.INTEGER,autoIncrement:!0,primaryKey:!0},title:{type:a.STRING,unique:!0,allowNull:!1,defaultValue:"Default title",validate:{len:{args:[3,150],msg:"Lenght must be morwe then 10 and less then 150 symbols"}}},genre:{type:a.STRING,defaultValue:"Default genre"},author:{type:a.STRING,validate:{startWithUpper:function c(e){var t=e.charAt(0),c=t===e[0].toUpperCase();if(!c)throw new Error("First letter must be in uppercase")}}},read:a.BOOLEAN},{hooks:{beforeValidate:function(e){console.log("beforeValidate"+e.dataValues.title),e.dataValues.title=e.dataValues.title+"dddd"},afterValidate:function(e){console.log("afterValidate")},beforeCreate:function(){console.log("beforeCreate")},afterCreate:function(){console.log("afterCreate")}}}),d=function(e){return r.get("/",function(e,t){t.render("admin")}),r.post("/",s.array(),function(e,t){t.json(e.body)}),r.get("/addBooks",function(e,t){u.sync({logging:console.log}).then(function(){l.bulkCreate([{title:"asdalexey",author:"Aasd",read:!1},{title:"asdalexey2",author:"Aasd2",read:!1}],{validate:!0,ignoreDuplicates:!0}).then(function(e){console.log(e),t.send(e)})["catch"](function(e){t.send(e)})})}),r};e.exports=d},function(e,t){e.exports=require("mysql")},function(e,t){e.exports=require("sequelize")},function(e,t){e.exports=require("multer")}]);