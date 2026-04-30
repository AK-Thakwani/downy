let Element1 = document.getElementById("product-sec11");
const mysql = require('mysql2');

// get the client
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "7258",
  database: 'test',
  insecureAuth : true
});



var cat1 = 'Sneakers';
let price;
let name1;
let img;
let id;


connection.query(
    `SELECT * FROM Product where Category = ?`,
    function(err, [cat1], results, fields) {
        if (err) {
            return console.log(err);
        }
        for (let i = 0; i < length.results; i++) 
        {
            price = results[i].price;
            name1 = results[i].Pname;
            img = results[i].Firstimg;
            id = results[i].Pid;
            Element1.innerHTML+= `<div class="col-md-4 product-men">
                            <div class="product-shoe-info shoe">
                                <div class="men-pro-item">
                                    <div class="men-thumb-item">
                                        <img src='${img}' alt="err">
                                        <div class="men-cart-pro">
                                            <div class="inner-men-cart-pro">
                                                <form action="/single" method="POST">
                                                    <input type="hidden" name="cmd" value="_cart">
                                                    <input type="hidden" name="add" value="1">
                                                    <input type="hidden" name="shoe_item" value="${name1}">
                                                    <input type="hidden" name="amount" value="${price}">
                                                    <input type="hidden" name="id" value="${id}">
                                                    
                                                    <button type="submit" value="Register" class="link-product-add-cart">Quick View
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                        <span class="product-new-top">New</span>
                                    </div>
                                    <div class="item-info-product">
                                        
                                        <h4 >
                                            <a >${name1}</a>
                                        </h4>
                                        <div class="info-product-price">
                                            <div class="grid_meta">
                                                <div class="product_price">
                                                    <div class="grid-price ">
                                                        <span class="money ">$${price}</span>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>`    
        }
    }
);


          

connection.end();