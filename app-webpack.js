!function(e){function t(r){if(o[r])return o[r].exports;var n=o[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var n=o(1),a=r(n),i=o(2),s=r(i),u=(0,a["default"])(),l=process.env.PORT||8080;u.set("views","./src/views"),u.set("view engine","ejs"),u.use(a["default"]["static"]("public")),u.use(s["default"].json()),u.use(s["default"].urlencoded({extended:!0}));var d=[{link:"/books",text:"Books"},{link:"/authors",text:"Authors"}],c=o(3)(d),f=o(4)(d);u.use("/books",c),u.use("/admin",f),u.get("/",function(e,t){t.render("index",{nav:d})}),u.listen(l,function(e){console.log("Running server on port "+l),e&&console.error(e)})},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("body-parser")},function(e,t,o){"use strict";var r=o(1),n=r.Router(),a=function(e){var t=[{title:"AAAA1",genre:"SSSS",author:"ASDA",read:!1},{title:"AAAA2",author:"ASDA",read:!1},{title:"AAAA3",genre:"SSSS",author:"ASDA",read:!1}];return n.get("/",function(o,r){r.render("bookListView",{title:"Books",nav:e,books:t})}),n.get("/:id",function(o,r){var n=o.params.id;r.render("bookView",{title:"Books",nav:e,book:t[n]})}),n};e.exports=a},function(e,t,o){"use strict";var r=o(1),n=r.Router(),a=(o(5),o(6)),i=o(7),s=i(),u=new a("node-app","root","121314",{host:"localhost",dialect:"mysql",pool:{max:5,min:0,idle:1e4}}),l=u.define("books",{id:{type:a.INTEGER,autoIncrement:!0,primaryKey:!0},title:{type:a.STRING,unique:!0,allowNull:!1,defaultValue:"Default title",validate:{len:{args:[3,150],msg:"Lenght must be morwe then 10 and less then 150 symbols"}}},genre:{type:a.STRING,defaultValue:"Default genre"},author:{type:a.STRING,validate:{startWithUpper:function c(e){var t=e.charAt(0),c=t===e[0].toUpperCase();if(!c)throw new Error("First letter must be in uppercase")}}},read:a.BOOLEAN},{hooks:{beforeValidate:function(e){console.log("beforeValidate"+e.dataValues.title),e.dataValues.title=e.dataValues.title+"dddd"},afterValidate:function(e){console.log("afterValidate")},beforeCreate:function(){console.log("beforeCreate")},afterCreate:function(){console.log("afterCreate")}}}),d=function(e){return n.get("/",function(e,t){t.render("admin")}),n.post("/",s.array(),function(e,t){t.json(e.body)}),n.get("/addBooks",function(e,t){u.sync({logging:console.log}).then(function(){l.bulkCreate([{title:"asdalexey",author:"Aasd",read:!1},{title:"asdalexey2",author:"Aasd2",read:!1}],{validate:!0,ignoreDuplicates:!0}).then(function(e){console.log(e),t.send(e)})["catch"](function(e){t.send(e)})})}),n};e.exports=d},function(e,t){e.exports=require("mysql")},function(e,t){e.exports=require("sequelize")},function(e,t){e.exports=require("multer")}]);