// Import (require) Express, router, and burger.js

var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");


// Create all our routes and set up logic within those routes where required.
// update with all burger values
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    console.log('burger ' + req.body.burger)
    burger.create(["burger"], [req.body.burger], function(result) {
        // Send back the ID of the new burger
        res.json({ id: result.insertId });
    });
});


// Update eat_Me value for corresponding burger
router.post("/", function(req, res) {
    console.log(req);
    connection.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.burger], function(err, result) {
        if (err) {
            throw err;
        }; 
        res.redirect("/");
    });
});

router.post("/api/burgers", function(req, res) {
    console.log('eat ' + req.body.burger)
    burger.create(["burger"], [req.body.burger], function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});


  
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id || {eat_Me: true}
    console.log("burger_id: ", condition);

    burger.update({eat_Me: req.body.eat_Me},condition,function(result) {
        if (result.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }; 
        res.status(200).end();
    });
});

// Export router to use.
module.exports = router;