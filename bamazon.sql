USE bamazon;

CREATE TABLE products(
  itemID INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50),
  department_name VARCHAR(50),
  price DECIMAL(10,2),
  stock INT(10),
  PRIMARY KEY(itemID)
);