var mysql = require('mysql');
var inquirer = require('inquirer');



var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'Bamazon_DB'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
})
showAll();

function showAll(){

connection.query("SELECT * FROM PRODUCTS", function(err, res) {
    if (err) {
        console.log(err);
    } else {
        // console.log(res);

        //Table Styled in Columns and Rows
        console.log("Bamazon Inventory")
        console.log("|Id|Product Name    |Dept   |Price|Stk Qty|")
        console.log("|--|----------------|-------|-----|-------|")
        for (var i = 0; i < res.length; i++) {
            if (res[i].itemId < 10) {

                //Need to account if #'s are over 10 to make table columns aligned

                //if itemId is less than 10 and stockQty is less than 10, add a "0" in front of both so it displays as 01 instead of 1
                if (res[i].stockQty < 10) {
                    console.log("|" + "0" + res[i].itemId + "|" + res[i].prodName + "|" + res[i].deptName + "|" + "$" + res[i].price + ".00" + "|" + "Qty: " + "0" + res[i].stockQty + "|")
                        //if just itemId is less than 10 add a "0" in front so it displays as 01 instead of 1
                } else {
                    console.log("|" + "0" + res[i].itemId + "|" + res[i].prodName + "|" + res[i].deptName + "|" + "$" + res[i].price + ".00" + "|" + "Qty: " + res[i].stockQty + "|")

                }

            } else {
                console.log("|" + res[i].itemId + "|" + res[i].prodName + "|" + res[i].deptName + "|" + "$" + res[i].price + ".00" + "|" + "Qty: " + res[i].stockQty + "|")
            }
        }
        start();
    }
})
}

function start() {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "What is the Id of the product you would like to buy?",
    }, {
        name: "units",
        type: "input",
        message: "How many units would you like?"

    }]).then(function(answer) {
        
        connection.query('SELECT * FROM `Products` WHERE `itemId` = ?', [answer.id], function(error, results, fields) {

            for (var i = 0; i < results.length; i++) {
                if (results[i].itemId == answer.id) {
                    var chosenItem = results[i];
                   // console.log(chosenItem.stockQty + "<--- in stock")
                   // console.log(answer.units + "<--wanted by user")
                   var unitsWanted = parseInt(answer.units);
                
                   // console.log(chosenItem.price + "<--price")
                    if (chosenItem.stockQty > unitsWanted || chosenItem.stockQty == unitsWanted) {
                    	// console.log("yeahhh theres enough in stock")
                    	var totalPrice = unitsWanted * chosenItem.price
                    	var newQty = chosenItem.stockQty - unitsWanted
                    	// console.log(totalPrice+ "<--- total price")
                    	// console.log(newQty + "number to update to")
                        connection.query("UPDATE Products SET ? WHERE ?", [{
                            stockQty: newQty
                        },{
                            itemId: chosenItem.itemId
                        
                        }], function(err, res) {
                            if(err){
                            	console.log(err)
                            }
                            else{
                            
                            console.log("Order placed successfully!");
                            console.log("Total cost of purchase was:  $" + totalPrice + ".00" )
                            showAll();
                        }
                        });
                    } else {
                        console.log("Sorry, there is not enough in stock for your order, TRY AGAIN.");
                        showAll();
                    }
                }

            }

   
})

})
}
