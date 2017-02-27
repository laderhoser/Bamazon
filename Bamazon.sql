CREATE DATABASE if not exists Bamazon_DB;

USE Bamazon_DB;

CREATE TABLE Products (
itemId integer(9) AUTO_INCREMENT NOT NULL,
prodName VARCHAR(23),
deptName VARCHAR(23),
price INTEGER(9),
stockQty INTEGER(9),
PRIMARY KEY (itemId)
);

INSERT INTO Products (prodName,deptName,price,stockQty)
VALUES ("Crest Toothpaste","Hygiene",2.50,10);

INSERT INTO Products (prodName,deptName,price,stockQty)
VALUES ("Mango Candy     ","Snacks ",1.25,12);

INSERT INTO Products (prodName,deptName,price,stockQty)
VALUES ("Peanuts         ","Snacks ",1.99,7);

INSERT INTO Products (prodName,deptName,price,stockQty)
VALUES ("Dial Bar Soap   ","Hygiene",2.50,15);


INSERT INTO Products (prodName,deptName,price,stockQty)
VALUES ("Purina Dog Chow ","Pet    ",5.00,5);

INSERT INTO Products (prodName,deptName,price,stockQty)
VALUES ("Kitty Litter    ","Pet    ",7.99,6);

INSERT INTO Products (prodName,deptName,price,stockQty)
VALUES ("Beef Jerky      ","Snacks ",3.99,7);

INSERT INTO Products (prodName,deptName,price,stockQty)
VALUES ("Shampoo         ","Hygiene",2.50,10);

INSERT INTO Products (prodName,deptName,price,stockQty)
VALUES ("Toilet Paper    ","Hygiene",1,1);

INSERT INTO Products (prodName,deptName,price,stockQty)
VALUES ("Salsa           ","Snacks ",3.99,17);

SELECT * FROM Products;



