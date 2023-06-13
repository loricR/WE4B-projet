const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const key = require("./key");
const multer = require("multer");
const path = require("path");
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//database Connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",    
    database:"we4b",
    port:3306
});

// Repository of pictures chosen for games
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationDir = path.join(__dirname, '../frontend/src/assets/images');
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }
    cb(null, destinationDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${Date.now()}${fileExtension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });


// Check database connection
db.connect((err) => {
  if (err) console.log(err, "db_err");
  console.log("Database connected...");
});


// Get all data
app.get("/user", (req, res) => {
  let qr = "SELECT * FROM user";
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "errs");
      return res.status(500).json({ error: "Internal server error" });
    }
    res.send({
      message: "All users data",
      data: result,
    });
  });
});

// Get single data
app.get("/user/:id", (req, res) => {
  console.log(req.params.id, "getid=>");

  let gID = req.params.id;

  let qr = `SELECT * FROM user WHERE id = ${gID}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length > 0) {
      res.send({
        message: "Get single data",
        data: result,
      });
    } else {
      res.send({
        message: "Aucun utilisateur trouvé..",
      });
    }
  });
});

// Create data
app.post("/user", (req, res) => {
  console.log(req.body, "createdata");

  let username = req.body.username;
  let password = req.body.password;

  let qr = `INSERT INTO user(username, password, dev) VALUES ('${username}', '${password}', DEFAULT)`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.send({
      message: "Votre compte a été créé!",
    });
  });
});

// Update a user's data
app.put("/user/:id", (req, res) => {
  console.log(req.body, "updatedata");

  let gID = req.params.id;

  let username = req.body.username;
  let password = req.body.password;

  let qr = `UPDATE user SET password = '${password}', username = '${username}' WHERE id = ${gID}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.send({
      message: "Identifiants mis à jour!",
    });
  });
});

// Delete single user data
app.delete("/user/:id", (req, res) => {
  let gID = req.params.id;

  let qr = `DELETE FROM user WHERE ID = ${gID}`;
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.send({
      message: "Compte supprimé",
    });
  });
});

// Get all games done by a developer (id given in parameter)
app.get("/user/games/:id", (req, res) => {
  let devId = req.params.id;

  let qr = `SELECT * FROM game WHERE dev = ${devId}`;
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "errs");
      return res.status(500).json({ error: "Internal server error" });
    }

    res.send({
      message: "All games data",
      data: result,
    });
  });
});

// Posts a new game developed by a developer
app.post("/user/games/:id", (req, res) => {
  const dev = req.params.id;
  const gameName = req.body.name;
  const description = req.body.description;
  const longDescription = req.body.longDescription || '';
  const price = req.body.price || 0;
  const videoCode = req.body.videoCode || '';
  const cpu = req.body.cpu || '';
  const gpu = req.body.gpu || '';
  const ram = req.body.ram || '';

  const qr = `INSERT INTO game (name, description, dev, longDescription, price, videoCode, cpu, gpu, ram) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [gameName, description, dev, longDescription, price, videoCode, cpu, gpu, ram];

  db.query(qr, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    const gameId = result.insertId; 
    const images = req.body.images || '';
    const categories = req.body.category || '';

    const qr_insertImages = `INSERT INTO image (link, ID_game) VALUES (?, ?)`;

    // Insert all pictures from the images array of the game
    for (let i = 0; i < images.length; i++) {
      let valuesInsertImages = [images[i], gameId];

      db.query(qr_insertImages, valuesInsertImages, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal server error" });
        }

        console.log(`${i}th picture sent`);
      });
    }

    // INSERT OF DATAS FROM CATEGORIES 

    const qr_insertCategories = `INSERT INTO categorygame (ID_category, ID_game) VALUES (?, ?)`;

    for (let i = 0; i < categories.length; i++) {
      let nameCategory = categories[i];

      const qr_getID_cat = `SELECT ID FROM category WHERE name="${nameCategory}"`;

      db.query(qr_getID_cat, (err, result_name) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Internal server error" });
        }

        let currentID = result_name[0].ID;

        // console.log("Le current category id is : ", result_name);
        // console.log("Le current id is : ", result_name[0].ID);

        let valuesInsertCategories = [currentID, gameId];

        db.query(qr_insertCategories, valuesInsertCategories, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
          }
  
          console.log(`${categories[i]} category sent`);
        });



        console.log(`${i+1}th picture sent`);
      });
    }

    console.log("Images length : ",images.length);
    console.log("\nImages : ", images)

    res.send({
      message: "Game Inserted!",
    });
  });
});



// File upload endpoint
app.post('/user/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const fileExtension = path.extname(req.file.originalname);
  const allowedExtensions = ['.png', '.jpg', '.jpeg'];

  if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
    return res.status(400).json({ error: 'Invalid file type. Only PNG and JPG files are allowed.' });
  }

  // Move the file to the desired destination
  const newFilePath = path.join(__dirname, '../frontend/src/assets/images/', req.file.filename);
  fs.renameSync(req.file.path, newFilePath);

  // Send the new file name in the response
  const newFileName = req.file.filename;
  res.status(200).json({ message: 'File uploaded successfully.', newFileName });
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


app.get("/user/userinfo/:id", (req, res) => {

  
  let userId = req.params.id;

  console.log("Loading user info of", userId);

  let qr = `SELECT * FROM user WHERE ID = ${userId}`;
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "errs");
      return res.status(500).json({ error: "Internal server error" });
    }

    res.send({
      message: "Userinfo data",
      data: result,
    });
  });
});



// Get all games
app.get("/games", (req, res) => {

  let qr = "SELECT * FROM game";
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "errs");
      return res.status(500).json({ error: "Internal server error" });
    }
    res.send({
      message: "All games' data",
      data: result,
    });
  });
});

// GET ALL CATEGORIES
app.get("/games/categories/:id", (req, res) => {
  const gameID = req.params.id;

  const query = `
    SELECT c.name
    FROM categorygame cg
    INNER JOIN category c ON cg.ID_category = c.ID
    WHERE cg.ID_game = ${gameID}
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }

    const categoryNames = result.map((row) => row.name);

    // console.log("Catégories :", categoryNames);

    res.send({
      message: "Tous les noms de catégories",
      data: categoryNames,
    });
  });
});



// Get all images
app.get("/games/images/:id", (req, res) => {

  let game_id = req.params.id;

  let qr = `SELECT link FROM image WHERE ID_game = ${game_id}`;
  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "errs");
      return res.status(500).json({ error: "Internal server error" });
    }
    res.send({
      message: "All images link from the game",
      data: result,
    });
  });
});


// Post a commentary
app.post("/comment", (req,res) => {

  let ID_game = req.body.ID_game;
  let ID_user = req.body.ID_user;

  let content = req.body.content;
  let note = req.body.note;

  let qr = `INSERT INTO comment(content, ID_game, iD_user, note) VALUES (?,?,?,?)`;

  db.query(qr, [content, ID_game, ID_user, note], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log(`${content} : COMMENT sent`);
  });

})


// Get all comments
app.get("/comment/:id", (req, res) => {

  let game_id = req.params.id;

  let qr = `SELECT * FROM comment WHERE ID_game = ?`;

  db.query(qr, [game_id], (err, result) => {
    if (err) {
      console.log(err, "errs");
      return res.status(500).json({ error: "Internal server error" });
    }
    res.send({
      message: `All comments' data from game ${game_id}`,
      data: result,
    });
  });
});



app.listen(3000, () => {
  console.log("Server running");
});
