var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:date_string", function(req, res){
  var dateVal = req.params.date_string;
  var dateFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric"
  };
  if(isNaN(dateVal)){
       var naturalDate = new Date(dateVal);
      naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
      var unixDate = new Date(dateVal).getTime()/1000;
     }else{
       var unixDate = dateVal;
       var naturalDate = new Date(dateVal * 1000);
       naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
     }
  res.json({unix: unixDate, utc: naturalDate});
});
app.listen(3000, function(){
  console.log("Working");
});
module.exports = app;
