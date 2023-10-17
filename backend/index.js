import express from "express";
import mysql from "mysql";
import cors from 'cors';
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

const conn2 = mysql.createConnection({
<<<<<<< Updated upstream
    host: "localhost",
    user: "root",
    password: "lagaras123",
    database: "clientdatabase"
=======
  host: "localhost",
  user: "root",
  password: "lagaras123",
  database: "clientdatabase"
});
>>>>>>> Stashed changes

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("hello, this is the backend");
});

app.get("/profile", (req, res) => {
  const userId = 'RL1741'; // Replace with the actual user_id you want to query.
  const query = "SELECT * FROM user_personal WHERE user_id = ?";

  conn2.query(query, [userId], (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data');
    } else {
      res.json(data);
    }
  });
});

app.get("/auth", (req, res) => {
  const query = "SELECT * FROM user_auth";

  conn2.query(query, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data');
    } else {
      res.json(data);
    }
  });
});


app.post("/auth", async (req, res) => {
  const { mobileNo, userPass } = req.body;
  console.log("Received mobileNo:", mobileNo);
  console.log("Received userPass:", userPass);

  const query = "SELECT * FROM user_auth WHERE mobileNo = ?";
  
  conn2.query(query, [mobileNo], async (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data');
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ message: "User not found" });
      return;
    }

<<<<<<< Updated upstream
    app.get('/profile:id', (req, res) => {
        const userID = req.params.user_id; // 'RL1741'
        const sql = "SELECT * FROM user_personal WHERE user_id = 'RL1741'";
      
        // Execute the SQL query and return the data as JSON.
        conn2.query(sql, [id], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data');
          } else {
            res.json(result);
          }
        });
      });
      
      app.put("/profile", (req, res)=>{
        const userID= req.params.user_id;
        const q= "UPDATE user_personal SET `f_name`=?, `m_name`=?, `l_name`=?, `suffix`=?, `sex_id`=?, `cvl_id`=?, `b_date`=?, `b_place`=?, `res_id`=?, `czn_id`=?, WHERE id=?"
        const values= [
                
            req.body.f_name,
            req.body.m_name,
            req.body.l_name,
            req.body.suffix,
            req.body.sex_id,
            req.body.cvl_id,
            req.body.b_date,
            req.body.b_place,
            req.body.res_id,
            req.body.czn_id
            
            
        ];
=======
    const user = results[0];

    // Check if the password matches
    if (!bcrypt.compareSync(userPass, user.userPass)) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // Create and return a JSON Web Token (JWT) for the user
    const token = jwt.sign({ userId: user.user_id }, "12345");
    res.json({ token });
  });
});

app.get('/profile/:id', (req, res) => {
  const userId = req.params.id; // Get the user_id from the URL parameter.
  const query = "SELECT * FROM user_personal WHERE user_id = ?";

  conn2.query(query, [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving data');
    } else {
      res.json(result);
    }
  });
});

app.listen(8800, () => {
  console.log("connected to backend");
});
>>>>>>> Stashed changes

        db.query(q,[...values, userID], (err, data)=>{
          if(err) return res.json(err)
          return res.json("item has been successfully updated")
      })
      })
      


// app.post("/furns", (req, res)=>{
//     const q= "INSERT INTO furnitures (`id`, `prod_name`, `prod_desc`, `prod_image`, `prod_price`) VALUES(?)";
//     const values= [
        
//         req.body.id,
//         req.body.prod_name,
//         req.body.prod_desc,
//         req.body.prod_image,
//         req.body.prod_price
       
//     ];
//     db.query(q, [values], (err, data)=>{
//         if(err) return res.json(err)
//         return res.json("Successfully executed")
//     })
// })

// app.delete("/furns/:id", (req, res)=>{
//     const furnId= req.params.id;
//     const q= "DELETE FROM furnitures WHERE id= ?"

//     db.query(q, [furnId], (err, data)=>{
//         if(err) return res.json(err)
//         return res.json("Successfully deleted")
//     })
// })





//     db.query(q,[...values, furnId], (err, data)=>{
//         if(err) return res.json(err)
//         return res.json("item has been successfully updated")
//     })
// })



<<<<<<< Updated upstream
app.listen(8800, ()=>{
    console.log("connected to backend")
})
      
=======

>>>>>>> Stashed changes
