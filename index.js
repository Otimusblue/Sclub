var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views","./views");
app.engine('html', require('ejs').renderFile);
app.listen(3000);

var Pool = require('pg-pool')

var pool = new Pool()

var pool2 = new Pool({
  database: 'sclub',
  user: 'postgres',
  password: '1',
  port: 5432,
  ssl: false,
  max: 20, // set pool max size to 20
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
})

app.get("/sinhvien/list", function(req,res){
    pool2.connect("SELECT * from sinhvien",(err,res)=>{
        console.log(err,res);
        pool2.end();
    })
    console.log("HELlo WO")
    res.render("sinhvien_list.ejs");
})
app.get("/",function(req,res){
    res.render("main");
})