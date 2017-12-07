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
    managerMenu();
});

function managerMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "manager",
            message: "Welcome to the manager portal. What would you like to do today?",
            choices: [
                { value: "VIEW_PRODUCTS", name: "View Products for Sale" },
                { value: "LOW_INVENTORY", name: "View Low Inventory" },
                { value: "ADD_INVENTORY", name: "Add to Inventory" },
                { value: "ADD_PRODUCT", name: "Add New Product" },
            ]
        }
        ]).then(function(userInput) {

        if (userInput.manager === "VIEW_PRODUCTS") {
            viewProducts();
        }

        if (userInput.manager === "LOW_INVENTORY") {
            viewLowInventory();
        }

        if (userInput.manager === "ADD_INVENTORY") {
            addInventory();
        }

        if (userInput.manager === "ADD_PRODUCT") {
            addProduct();
        }

    });
}


function viewProducts() {
    connection.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;

        for (var i = 0; i < result.length; i++) {
            console.log("\nItem ID: " + result[i].item_id + "\nProduct: " + result[i].product_name + "\nPrice: $" + result[i].price + "\nQuantity: " + result[i].stock_quantity);
        }
        connection.end();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;

        console.log("\nThe following products have an inventory of 5 or less: ");

        for (var i = 0; i < result.length; i++) {

            if (result[i].stock_quantity <= 5) {
                console.log("\nItem ID: " + result[i].item_id + "\nProduct: " + result[i].product_name + "\nQuantity: " + result[i].stock_quantity + "\n");
            }
        }

        addMoreInventory();
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;

        for (var i = 0; i < result.length; i++) {
            console.log("\nItem ID: " + result[i].item_id + "\nProduct: " + result[i].product_name + "\nQuantity: " + result[i].stock_quantity);
        }

        console.log("\nEnter the following details to add more inventory to a product:");

        inquirer.prompt([
            {
                name: "id",
                message: "Item ID: "
            },
            {
                name: "quantity",
                message: "Quantity: "
            }
            ]).then(function(userInput) {

            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: userInput.id }, function(err, res) {

                if (err) throw err;

                var newQuantity = parseInt(userInput.quantity) + res[0].stock_quantity;

                connection.query("UPDATE products SET ? WHERE ?", [
                    {
                        stock_quantity: newQuantity
                            },
                    {
                        item_id: userInput.id

                            }
                            ], function(err, res) {
                    if (err) throw err;

                    console.log("\n" + res.affectedRows + " product updated!\n");
                    addMoreInventory();
                });
            });
        });
    });
}

function addMoreInventory() {
    inquirer.prompt([
        {
            type: "list",
            name: "addMore",
            message: "Would you like to add inventory to a product?",
            choices: ["Yes", "No"]
                }
                ]).then(function(userInput) {
        if (userInput.addMore === "Yes") {
            addInventory();
        }
        else {
            console.log("\nTransaction complete!\n");
            connection.end();
        }
    });
}

function addProduct() {
    console.log("\nEnter the following details to add a product to your inventory:");

    inquirer.prompt([
        {
            name: "product",
            message: "Product: "
                },
        {
            name: "department",
            message: "Department: "
                },
        {
            name: "price",
            message: "Price: "
                },
        {
            name: "quantity",
            message: "Quantity: "
                }
                ]).then(function(userInput) {
        connection.query("INSERT INTO products SET ?", {
            product_name: userInput.product,
            department_name: userInput.department,
            price: userInput.price,
            stock_quantity: userInput.quantity
        }, function(err, res) {
            if (err) throw err;
            console.log("\n" + res.affectedRows + " product added!\n");
            connection.end();
        });
    });



}
