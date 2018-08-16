var mysql = require("mysql");
var inquirer = require("inquirer");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: "localhost",

    
// Your port; if not 3306
port: 3306,

// Your username
    user: "root",

// Your password
    password: "",
    database: "Bamazon_db"
});

connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
    // console.log("connected as id " + connection.threadId + "\n");
    afterConnection();     
    }
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    runApp();
    });
}

function runApp() {
// Created a series of questions
inquirer.prompt([{
            type: "list",
            name: "action",
            message: "What is the ID you would like to purchase??? [Quit with Q]",
            validate: function(val){
            return !isNaN(val) || val.toLocaleLowerCase() === "q";
            }
        }
    ]).then(function(val) {
        checkIfShouldExit(val.choice);
        var choiceID = parseInt(val.choice);
        var product = checkInventory(choiceID, inventory);
        if(product){
            promptCustomerForQuantity(product);
        } else {
            console.log("That item is not in the inventory");
            runApp();
        }
        })
    }
// check to see if the product chose exists in the inventory
function checkInventory(choiceID, inventory){
    for (var i = 0; i<inventory.length; i++){
        if(inventory[i].item_id === choiceID){
            return inventory[i]
        }
    }
    return null;
};

//check for quantity of items

function promptCustomerForQuantity(product){
    inquirer
        .prompt([
            {
                type: "Input",
                name: "Quantity",
                message: "How many would you like? [Quit with Q]",
                validate: function(val){
                    return val > 0 || val.toLocaleLowerCase() === "q";
                }
            }
        ])
        .then(function(val){
            checkIfShouldExit(val.quantity);
            var quantity = parseInt(val.quantity);
            // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
        if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        runApp();
        }
        else {
        // Otherwise run makePurchase, give it the product information and desired quantity to purchase
        makePurchase(product, quantity);
        }
    });
}       

// Final purchase if sufficient quantity

function makePurchase (product, quantity){
    inquirer
        .prompt([
            {
                type: "Input",
                name: "Quantity",
                message: "How many would you like? [Quit with Q]",
                validate: function(val){
                    return val > 0 || val.toLocaleLowerCase() === "q";
                    }
            },
            {
                type: "input",
                name: "product_id",
                message: "Input a product id",
            }
        ]).then(function(val){
            checkIfShouldExit(val.quantity);
            var userPick = parseInt(val.quantity);
        if (userPick <= product.stock_quantity) {
        console.log("Enjoy your Purchase");
        }
        else {(userPick > product.stock_quantity)
                console.log("\nInsufficient quantity!");
                runApp();
                };
        })
    };
// Check to see if the user wants to quit the program
function checkIfShouldExit(choice) {
    if (choice.toLowerCase() === "q") {
    // Log a message and exit the current node process
    console.log("Goodbye!");
    process.exit(0);
        }
    };
