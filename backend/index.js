const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");


const app = express();

app.use(cors());
app.use(bodyparser.json());

//database Connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"we4b",
    port:3306
});

// check database connection
db.connect(err=>{
    if (err) (console.log(err, "db_err"))
    console.log("database connected ...");
})

//get all data

app.get("/user",(req,res)=>{
    
    let qr = 'SELECT * FROM user';
    db.query(qr,(err,result)=>{

        if(err) {
            console.log(err,"errs");
        }

        if(result.length > 0) {
            res.send({
                message:'all users data',
                data:result
            });
        }
    });
});

// get single data
app.get("/user/:id",(req,res)=>{
    console.log(req.params.id, "getid=>");

    let gID = req.params.id;

    let qr = `SELECT * FROM user WHERE id = ${gID}`;

    db.query(qr,(err,result)=>{

        if(err) { console.log(err);}

        if(result.length > 0) {
            res.send({
                message:"get single data",
                data:result
            });
        } else {
            res.send({
                message:"Aucun utilisateur trouvé.."
            });
        }
    });
      
});

// create data

app.post('/user',(req,res)=>{

    console.log(req.body, 'createdata');

    let username = req.body.username;
    let password = req.body.password;
    
    let qr = `INSERT INTO user(username, password, dev) VALUES ('${username}', '${password}', DEFAULT)`;

    db.query(qr,(err,result)=> {

        if(err) { console.log(err);}

        res.send({
            message:"Votre compte a été créé!"
        });

    });
});

// update a user's data

app.put('/user/:id', (req, res) => {
    console.log(req.body, "updatedata");
  
    let gID = req.params.id;
  
    let username = req.body.username;
    let password = req.body.password;
  
    let qr = `UPDATE user SET password = '${password}', username = '${username}' WHERE id = ${gID}`;
  
    db.query(qr, (err, result) => {
      if (err) {
        console.log(err);
      }
  
      res.send({
        message: "Identifiants mis à jour!"
      });
    });
  });


// delete single user data 

app.delete("/user/:id",(req,res)=>{

    let gID = req.params.id

    let qr = `DELETE FROM user WHERE ID = ${gID}`;
    db.query(qr,(err,result)=>{
        if(err) { console.log(err)}

        res.send({
            message:"Compte supprimé"
        });
    });

});

app.listen(3000,()=> {
    console.log("server running");
});