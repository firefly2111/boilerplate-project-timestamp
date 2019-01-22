// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

app.get("/",(req,res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use("/:dateVal",(req,res) => {
    try{
      decodeURIComponent(req.params.dateVal)
    }catch(error){
      console.log(error)
      res.send("Bad Request")
    }
    var param = decodeURIComponent(req.params.dateVal);
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    var dateOptions = {month : 'long' , year: 'numeric' , day: 'numeric'};
    //treating natural date input
    if(isNaN(param)){
      if(String(new Date(param)) === "Invalid Date"){
        res.json({unix:null, natural:null}); 
      }
      var naturalDate = new Date(param);
      naturalDate = naturalDate.toLocaleDateString('en-US', dateOptions);
      var unixDate = new Date(param).getTime()/1000;
    }
    //treating unix input
    else{
      var unixDate = Number(param)
      var naturalDate = new Date(unixDate*1000);
      naturalDate = naturalDate.toLocaleDateString('en-US', dateOptions);
    }
    res.json({unix:unixDate, natural:naturalDate}); 

   
})
// listen for requests :)
const  listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)

})
