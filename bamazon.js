//requires
var fs = require("fs");
var mysql = require("mysql");
var inquirer = require("inquirer");

//db
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "jubling09",
    database: "bamazon"
});

//save the quantities 
var quant = [];
connection.connect(function(err) {
    if (err) console.log(err);
    console.log("connected as id " + connection.threadId + "\n");
});
//print products
connection.query("SELECT itemID, product_name, price, stock FROM products", function(err, res) {
  //WHERE stock > 0
    if (err) console.log(err);
    // Log all results of the SELECT statement
    //console.log(res);
    for (i = 0; i < res.length; i++) {
        console.log("Product Number " + res[i].itemID + ": stock of " +res[i].stock + " " + res[i].product_name + " priced at $" + res[i].price);
        quant.push(res[i].stock);
    }
});
// ask what dey want
inquirer.prompt([
  {
    type: "input",
    name: "product",
    message: "Enter the product number of the product you would like to purchase"
  },
    {
    type: "input",
    name: "num",
    message: "How many u want"
  }
  ]).then(function(res) {
    //not enough stock
    if(quant[res.product] < res.num ){
      console.log("There aren't "+res.num+ " of product number "+res.product+ "WE WILL RESTOCK SOON");
      restock();
    }
    //enough stock to buy
    else{
      newstock = quant[res.product] - res.num;
      connection.query("UPDATE products SET stock ="+newstock+" WHERE itemID ="+res.product, function(err, res) { if (err) console.log(err);});
      console.log("ordered "+res.num+" "+res.product+"!");
    }
  });

//if out of stock restock without having to go to workbench
function restock(){
  console.log("Restocked Products!");
  connection.query("UPDATE products SET stock = 50 WHERE itemID = 1 OR itemID = 2 OR itemID = 3", function(err, res) { if (err) console.log(err);});
  connection.query("UPDATE products SET stock = 5 WHERE itemID = 4 OR itemID = 5 OR itemID = 6 OR itemID = 7 OR itemID = 8 OR itemID = 9 OR itemID = 10", function(err, res) { if (err) console.log(err);});
}