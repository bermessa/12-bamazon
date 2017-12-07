var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProduct();
});

function readProduct() {
    connection.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;

        console.log("\nWelcome to BAMAZON! Browse through the inventory and select an item you would like to purchase.\n");

        for (var i = 0; i < result.length; i++) {
            console.log("\nItem ID: " + result[i].item_id + "\nProduct: " + result[i].product_name + "\nPrice: $" + result[i].price);
        }
        purchaseProduct();
    });
}

function purchaseProduct() {
    inquirer.prompt([
        {
            name: "item",
            message: "Enter the *Item ID* of the product you would like to purchase: "
        },
        {
            name: "item_quantity",
            message: "Enter the *quantity* you would like to purchase: "
        }
        ]).then(function(userInput) {
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, { item_id: userInput.item }, function(err, res) {
            if (err) throw err;

            if (res[0].stock_quantity >= userInput.item_quantity) {
                //updateProduct
                var newQuantity = res[0].stock_quantity - userInput.item_quantity;

                var query = "UPDATE products SET ? WHERE ?";
                connection.query(query, [{
                        stock_quantity: newQuantity
                },
                    {
                        item_id: userInput.item

                }], function(err, res) {
                    if (err) throw err;
                });


                var totalPrice = res[0].price * userInput.item_quantity;
                console.log("=======================");
                console.log("Total Price: $" + totalPrice);
                connection.end();

            }
            else {
                console.log("Insufficient quantity!");
                connection.end();
            }
        });

    });
}
