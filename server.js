var express = require('express');        
var app = express();                 
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var config = require("config"); 
var customer = require("./routes/customer"); 
var port;        
if (process.env.NODE_ENV == "test"){
    port = 8080; 
    console.log("set port to 8080"); 
}
else
    port = process.env.PORT; 
var router = express.Router();              
var Schema = mongoose.Schema; 
var ObjectID = mongoose.Schema.Types.ObjectId;
var db;
mongoose.Promise = global.Promise;
mongoose.connect(config.DBHost, function(err, database){
    if (err)
        process.exit(1);
    db = database; 
    console.log("Database connection successful");
    console.log(config.DBHost); 
    var server = app.listen(port, function(){
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());         
        app.use('/api', router);           
        console.log("App is up"); 
        console.log(process.env.NODE_ENV);
    });
});
router.route("/").get(function(req, res) {
    res.json({ message: "capital one rest api" });   
});

router.route("/customers")
    .get(customer.getCustomers)
    .post(customer.postCustomer);

router.route("/customers/:id")
    .get(customer.getCustomer)
    .put(customer.updateCustomer)
    .delete(customer.deleteCustomer);

router.route("/customers/:id/friends")
    .get(customer.getFriends);

router.route("/customers/:id/friends/:friendID")
    .post(customer.postFriend) 
    .delete(customer.deleteFriend); 

module.exports = router; 