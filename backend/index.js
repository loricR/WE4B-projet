const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const key = require("./key");


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

app.post("/auth/signin", (req, res) => {    //Query to login
    try {
        let qr = 'SELECT id, username, dev FROM user WHERE username = ? AND password = ?';
    db.query(qr, [req.body.username, req.body.password], (err,result)=>{

        if(err) {
            console.log(err,"errs");
        }

        if(result.length > 0) {   //If we find a user with this username/password
            const token = jwt.sign({ id: result.ID },
                key.secret,
                {
                 algorithm: 'HS256',
                 allowInsecureKeySizes: true,
                 expiresIn: 30, // 24 hours
                });

            result[0].accessToken = token;  //Add token to the data
            res.status(200).send({
                data:result
            });
        }        
        //TODO: Sinon, si l'utilisateur existe, mdp incorrect et sinon juste l'utilisateur existe pas
    });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
});