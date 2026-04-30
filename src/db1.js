const connection = require("./db/Conn");


// simple query
// connection.query(
//   `SELECT * FROM pet`,
//   function(err, results, fields) {
//     if (err) {
//         return console.error(err);
//       }
//     console.log(results); // results contains rows returned by server
//     console.log(results[0].name); // results contains rows returned by server
//     ob = results;
//   }
// );
// connection.query(
//   `SELECT * FROM images`,
//   function(err, results, fields) {
//     if (err) {
//         return console.error(err);
//       }
//     console.log(results); // results contains rows returned by server
//     console.log(results[0].image_name); // results contains rows returned by server
//   }
// );


// var sql = "CREATE TABLE Product(Pid INT PRIMARY KEY, Pname VARCHAR(255), Category VARCHAR(255), Firstimg VARCHAR(255), Secondimg VARCHAR(255), Thirdimg VARCHAR(255), price INT)";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });

// var sql = "CREATE TABLE Product_sizes(Pid INT, size INT, price INT,FOREIGN KEY(PID) REFERENCES Product(Pid))";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });


// var sql = "INSERT INTO Product (Pid, Pname,Category,Firstimg,Secondimg,Thirdimg,price) VALUES ?";
// var values = [
//     [1234, 'BM4231', 'Sneakers','/images/1.png','/images/2.png','/images/3.png',200],
//     [1235, 'DS4432', 'Sneakers','/images/4.png','/images/5.png','/images/6.png',300],
//     [1236, 'FD4643', 'Sneakers','/images/7.png','/images/8.png','/images/9.png',100],
//     [1237, 'GH4254', 'Sneakers','/images/10.png','/images/11.png','/images/12.png',120],
//     [1238, 'FG4965', 'Sneakers','/images/13.png','/images/14.png','/images/15.png',340],
//     [1239, 'DV4676', 'Sneakers','/images/16.png','/images/17.png','/images/18.png',530],
//     [1240, 'WR4187', 'Sneakers','/images/19.png','/images/20.png','/images/21.png',110],
//     [1241, 'HN4298', 'Sneakers','/images/22.png','/images/23.png','/images/24.png',220]
//   ];
//   connection.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });

// var sql = "INSERT INTO Product_sizes (Pid, size,price) VALUES ?";
// var values = [
//     [1234, 40 ,10],
//     [1234, 41 ,10],
//     [1234, 42 ,10],
//     [1234, 43 ,10],
//     [1235, 40 ,10],
//     [1235, 41 ,10],
//     [1235, 42 ,10],
//     [1235, 43 ,10],
//     [1236, 40 ,10],
//     [1236, 41 ,10],
//     [1236, 42 ,10],
//     [1236, 43 ,10],
//     [1237, 40 ,10],
//     [1237, 41 ,10],
//     [1237, 42 ,10],
//     [1237, 43 ,10],
//     [1238, 40 ,10],
//     [1238, 41 ,10],
//     [1238, 42 ,10],
//     [1238, 43 ,10],
//     [1239, 40 ,10],
//     [1239, 41 ,10],
//     [1239, 42 ,10],
//     [1239, 43 ,10],
//     [1240, 40 ,10],
//     [1240, 41 ,10],
//     [1240, 42 ,10],
//     [1240, 43 ,10],
//     [1241, 40 ,10],
//     [1241, 41 ,10],
//     [1241, 42 ,10],
//     [1241, 43 ,10]
//   ];
//   connection.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });


// var sql = "ALTER TABLE Product_sizes RENAME COLUMN price TO quantity";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table Modified");
// });





// var sql = "INSERT INTO Product (Pid, Pname,Category,Firstimg,Secondimg,Thirdimg,price) VALUES ?";
// var values = [
//     [1242, 'SD4231', 'Causals','/images/25.png','/images/26.png','/images/27.png',100],
//     [1243, 'DA4432', 'Causals','/images/28.png','/images/29.png','/images/30.png',200],
//     [1244, 'FH4643', 'Causals','/images/31.png','/images/32.png','/images/33.png',110],
//     [1245, 'GN4254', 'Causals','/images/34.png','/images/35.png','/images/36.png',120],
//     [1246, 'FC4965', 'Causals','/images/37.png','/images/38.png','/images/39.png',540],
//     [1247, 'DS4676', 'Causals','/images/40.png','/images/41.png','/images/42.png',330],
//     [1248, 'WA4187', 'Causals','/images/43.png','/images/44.png','/images/45.png',210],
//     [1249, 'SF4298', 'Causals','/images/46.png','/images/47.png','/images/48.png',250]
//   ];
//   connection.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });

// var sql = "INSERT INTO Product_sizes (Pid, size,quantity) VALUES ?";
// var values = [
//     [1242, 40 ,10],
//     [1242, 41 ,10],
//     [1242, 42 ,10],
//     [1242, 43 ,10],
//     [1243, 40 ,10],
//     [1243, 41 ,10],
//     [1243, 42 ,10],
//     [1243, 43 ,10],
//     [1244, 40 ,10],
//     [1244, 41 ,10],
//     [1244, 42 ,10],
//     [1244, 43 ,10],
//     [1245, 40 ,10],
//     [1245, 41 ,10],
//     [1245, 42 ,10],
//     [1245, 43 ,10],
//     [1246, 40 ,10],
//     [1246, 41 ,10],
//     [1246, 42 ,10],
//     [1246, 43 ,10],
//     [1247, 40 ,10],
//     [1247, 41 ,10],
//     [1247, 42 ,10],
//     [1247, 43 ,10],
//     [1248, 40 ,10],
//     [1248, 41 ,10],
//     [1248, 42 ,10],
//     [1248, 43 ,10],
//     [1249, 40 ,10],
//     [1249, 41 ,10],
//     [1249, 42 ,10],
//     [1249, 43 ,10]
//   ];
//   connection.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });





// var sql = "INSERT INTO Product (Pid, Pname,Category,Firstimg,Secondimg,Thirdimg,price) VALUES ?";
// var values = [
//     [1250, 'WE4231', 'Formals','/images/49.png','/images/50.png','/images/51.png',100],
//     [1251, 'DF4432', 'Formals','/images/52.png','/images/53.png','/images/54.png',200],
//     [1252, 'FS4643', 'Formals','/images/55.png','/images/56.png','/images/57.png',110],
//     [1253, 'HZ4254', 'Formals','/images/58.png','/images/59.png','/images/60.png',120],
//     [1254, 'AC4965', 'Formals','/images/61.png','/images/62.png','/images/63.png',540],
//     [1255, 'FS4676', 'Formals','/images/64.png','/images/65.png','/images/66.png',330],
//     [1256, 'HA4187', 'Formals','/images/67.png','/images/68.png','/images/69.png',210],
//     [1257, 'SF4298', 'Formals','/images/70.png','/images/71.png','/images/72.png',250]
//   ];
//   connection.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });

// var sql = "INSERT INTO Product_sizes (Pid, size,quantity) VALUES ?";
// var values = [
//     [1250, 40 ,10],
//     [1250, 41 ,10],
//     [1250, 42 ,10],
//     [1250, 43 ,10],
//     [1251, 40 ,10],
//     [1251, 41 ,10],
//     [1251, 42 ,10],
//     [1251, 43 ,10],
//     [1252, 40 ,10],
//     [1252, 41 ,10],
//     [1252, 42 ,10],
//     [1252, 43 ,10],
//     [1253, 40 ,10],
//     [1253, 41 ,10],
//     [1253, 42 ,10],
//     [1253, 43 ,10],
//     [1254, 40 ,10],
//     [1254, 41 ,10],
//     [1254, 42 ,10],
//     [1254, 43 ,10],
//     [1255, 40 ,10],
//     [1255, 41 ,10],
//     [1255, 42 ,10],
//     [1255, 43 ,10],
//     [1256, 40 ,10],
//     [1256, 41 ,10],
//     [1256, 42 ,10],
//     [1256, 43 ,10],
//     [1257, 40 ,10],
//     [1257, 41 ,10],
//     [1257, 42 ,10],
//     [1257, 43 ,10]
//   ];
//   connection.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });





// var sql = "INSERT INTO Product (Pid, Pname,Category,Firstimg,Secondimg,Thirdimg,price) VALUES ?";
// var values = [
//     [1258, 'FS4231', 'Sandals','/images/73.png','/images/74.png','/images/75.png',400],
//     [1259, 'DA4432', 'Sandals','/images/76.png','/images/77.png','/images/78.png',230],
//     [1260, 'SS4643', 'Sandals','/images/79.png','/images/80.png','/images/81.png',120],
//     [1261, 'DZ4254', 'Sandals','/images/82.png','/images/83.png','/images/84.png',120],
//     [1262, 'GD4965', 'Sandals','/images/85.png','/images/86.png','/images/87.png',560],
//     [1263, 'AS4676', 'Sandals','/images/88.png','/images/89.png','/images/90.png',550],
//     [1264, 'AA4187', 'Sandals','/images/91.png','/images/92.png','/images/93.png',280],
//     [1265, 'SC4298', 'Sandals','/images/94.png','/images/95.png','/images/96.png',290]
//   ];
//   connection.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });

// var sql = "INSERT INTO Product_sizes (Pid, size,quantity) VALUES ?";
// var values = [
//     [1258, 40 ,10],
//     [1258, 41 ,10],
//     [1258, 42 ,10],
//     [1258, 43 ,10],
//     [1259, 40 ,10],
//     [1259, 41 ,10],
//     [1259, 42 ,10],
//     [1259, 43 ,10],
//     [1260, 40 ,10],
//     [1260, 41 ,10],
//     [1260, 42 ,10],
//     [1260, 43 ,10],
//     [1261, 40 ,10],
//     [1261, 41 ,10],
//     [1261, 42 ,10],
//     [1261, 43 ,10],
//     [1262, 40 ,10],
//     [1262, 41 ,10],
//     [1262, 42 ,10],
//     [1262, 43 ,10],
//     [1263, 40 ,10],
//     [1263, 41 ,10],
//     [1263, 42 ,10],
//     [1263, 43 ,10],
//     [1264, 40 ,10],
//     [1264, 41 ,10],
//     [1264, 42 ,10],
//     [1264, 43 ,10],
//     [1265, 40 ,10],
//     [1265, 41 ,10],
//     [1265, 42 ,10],
//     [1265, 43 ,10]
//   ];
//   connection.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });



// var sql = "CREATE TABLE Cart(Pid INT, size INT, price INT,FOREIGN KEY(PID) REFERENCES Product(Pid))";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });



// var sql = "ALTER TABLE Cart RENAME COLUMN price TO quantity";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table Modified");
// });




// var sql = "CREATE TABLE Customer_Purchasing(Order_id INT PRIMARY KEY, Full_name VARCHAR(255), Mobile_no VARCHAR(255), City VARCHAR(255), Postal_code VARCHAR(255), Address VARCHAR(255))";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });


// var sql = "CREATE TABLE Order_Details(Order_id INT, Pid INT, size INT,quantity INT, price INT,FOREIGN KEY(Order_id) REFERENCES Customer_Purchasing(Order_id),FOREIGN KEY(PID) REFERENCES Product(Pid))";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });


// var sql = "CREATE TABLE Payment(Order_id INT, Card_name VARCHAR(255), Card_no VARCHAR(255),CVV INT, EXP_date DATE,Method VARCHAR(255),Total_amount INT,FOREIGN KEY(Order_id) REFERENCES Customer_Purchasing(Order_id))";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });



// var sql = "ALTER TABLE Payment ADD (Dates DATE)";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("");
// });


// var sql = "SELECT * FROM Payment";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });
// var sql = "SELECT * FROM Customer_Purchasing";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });
// var sql = "SELECT * FROM Order_Details";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });




// let num  = 333333333;
// let str = "sdfd";
// console.log((num.toString()).length);
// console.log(str.length);

// var sql = "DELETE FROM Customer_Purchasing";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("dsf");
// });




// var sql = "ALTER TABLE Product DROP COLUMN Category";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });



// var sql = "CREATE TABLE Product_Category(Pid INT, Category VARCHAR(255),FOREIGN KEY(PID) REFERENCES Product(Pid))";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });


// sql = "SELECT * from Product_Category";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });




// var sql = "INSERT INTO Product_Category (Pid, Category) VALUES ?";
// var values = [
//     [1234, 'Sneakers'],
//     [1235, 'Sneakers'],
//     [1236, 'Sneakers'],
//     [1237, 'Sneakers'],
//     [1238, 'Sneakers'],
//     [1239, 'Sneakers'],
//     [1240, 'Sneakers'],
//     [1241, 'Sneakers']
//   ];
//   connection.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });


  // var sql = "INSERT INTO Product_Category (Pid, Category) VALUES ?";
  // var values = [
  //     [1242, 'Causals'],
  //     [1243, 'Causals'],
  //     [1244, 'Causals'],
  //     [1245, 'Causals'],
  //     [1246, 'Causals'],
  //     [1247, 'Causals'],
  //     [1248, 'Causals'],
  //     [1249, 'Causals']
  //   ];
  //   connection.query(sql, [values], function (err, result) {
  //     if (err) throw err;
  //     console.log("Number of records inserted: " + result.affectedRows);
  //   });



    // var sql = "INSERT INTO Product_Category (Pid, Category) VALUES ?";
    // var values = [
    //     [1250, 'Formals'],
    //     [1251, 'Formals'],
    //     [1252, 'Formals'],
    //     [1253, 'Formals'],
    //     [1254, 'Formals'],
    //     [1255, 'Formals'],
    //     [1256, 'Formals'],
    //     [1257, 'Formals']
    //   ];
    //   connection.query(sql, [values], function (err, result) {
    //     if (err) throw err;
    //     console.log("Number of records inserted: " + result.affectedRows);
    //   });    


// var sql = "INSERT INTO Product_Category (Pid, Category) VALUES ?";
// var values = [
//     [1258, 'Sandals'],
//     [1259, 'Sandals'],
//     [1260, 'Sandals'],
//     [1261, 'Sandals'],
//     [1262, 'Sandals'],
//     [1263, 'Sandals'],
//     [1264, 'Sandals'],
//     [1265, 'Sandals']
//   ];
//   connection.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });    


// var sql = "ALTER TABLE Payment DROP COLUMN Card_name";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("DONE");
// });

// var sql = "ALTER TABLE Payment DROP COLUMN Card_no";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("DONE");
// });

// var sql = "ALTER TABLE Payment DROP COLUMN CVV";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("DONE");
// });

// var sql = "ALTER TABLE Payment DROP COLUMN EXP_date";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("DONE");
// });

// var sql = "ALTER TABLE Payment ADD COLUMN Payid INT AUTO_INCREMENT PRIMARY KEY";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("DONE");
// });


// var sql = "CREATE TABLE Payment_Method(Payid INT, Card_name VARCHAR(255), Card_no VARCHAR(255),CVV INT, EXP_date DATE,FOREIGN KEY(Payid) REFERENCES Payment(Payid))";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });




// sql = "ALTER TABLE Payment_Method MODIFY CVV VARCHAR(255)";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log(result);
// });

// var sql36 = "delete * from cart c where c.Pid = ? "
// const [Carttt,fields] = connection.query(sql36,1234);
// console.log(Carttt);

sql = "SELecT * FROM Payment_Method"; 
connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log(result.sort());
});



connection.end();