import express from "express";
import mysql from "mysql";
import cors from 'cors';
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import session from "express-session";

const app = express();

const conn2 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lagaras123",
  database: "clientdatabase"
});

conn2.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err);
    return;
  }
  console.log("Connected to the database");
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("hello, this is the backend");
});


app.use(session({
  secret: "ABC123",
  resave: false,
  saveUninitialized: true,
}));



app.post("/login", (req, res) => {
  const { mobile_no, user_pass } = req.body;
  const sql = "SELECT user_id FROM user_auth WHERE mobile_no = ? AND user_pass = ?";

  conn2.query(sql, [mobile_no, user_pass], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error occurred while authenticating." });
    }

    if (results.length === 1) {
      const user_id = results[0].user_id;

      // Store user_id in the session
      req.session.user_id = user_id;
      

      return res.json({ message: "Authentication successful" });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  });
});


// ITO YUNG SESSION HINDI KO MAGAWA

// app.get("/profile", (req, res) => {
//   // Get the user_id from the session
//   const userId = req.session.user_id;

//   if (!userId) {
//     return res.status(401).json({ message: "User not authenticated" });
//   }

//   const query = "SELECT * FROM user_personal WHERE user_id = ?";

//   conn2.query(query, [userId], (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error retrieving data');
//     } else {
//       res.json(data);
//     }
//   });
// });


// ITO YUNG UNA, YUNG SA AKIN ID LANG

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

// app.get("/auth", (req, res) => {
//   const query = "SELECT * FROM user_auth";

//   conn2.query(query, (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error retrieving data');
//     } else {
//       res.json(data);
//     }
//   });
// });


// app.post("/auth", async (req, res) => {
//   const { mobileNo, userPass } = req.body;
//   console.log("Received mobileNo:", mobileNo);
//   console.log("Received userPass:", userPass);

//   const query = "SELECT * FROM user_auth WHERE mobileNo = ?";
  
//   conn2.query(query, [mobileNo], async (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error retrieving data');
//       return;
//     }

//     if (results.length === 0) {
//       res.status(401).json({ message: "User not found" });
//       return;
//     }

//     const user = results[0];

//     // Check if the password matches
//     if (!bcrypt.compareSync(userPass, user.userPass)) {
//       res.status(401).json({ message: "Invalid password" });
//       return;
//     }

//     // Create and return a JSON Web Token (JWT) for the user
//     const token = jwt.sign({ userId: user.user_id }, "12345");
//     res.json({ token });
//   });
// });

// app.get('/profile/:id', (req, res) => {
//   const userId = req.params.id; // Get the user_id from the URL parameter.
//   const query = "SELECT * FROM user_personal WHERE user_id = ?";

//   conn2.query(query, [userId], (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error retrieving data');
//     } else {
//       res.json(result);
//     }
//   });
// });

app.listen(8800, () => {
  console.log("connected to backend");
});

     
app.get("/register", async (req, res) => {
  const query = "SELECT * FROM user_reg";
  const query1 = "SELECT * FROM user_auth";

  try {
    const result = await queryDatabase(query);
    const result1 = await queryDatabase(query1);
    
    res.json({ user_reg: result, user_auth: result1 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }
});


app.post('/register', async (req, res) => {
  const primaryKey = generatePrimaryKey(req.body.f_name, req.body.l_name, req.body.mobile_no);

  const query = "INSERT INTO user_reg (`f_name`, `l_name`, `mobile_no`, `user_id`) VALUES (?, ?, ?, ?)";
  const values = [req.body.f_name, req.body.l_name, req.body.mobile_no, primaryKey];

  const query1 = "INSERT INTO user_auth (`mobile_no`, `user_pass`, `user_id`) VALUES (?, ?, ?)";
  const values1 = [req.body.mobile_no, req.body.user_pass, primaryKey];

  try {
    const result = await queryDatabase(query, values);
    const result1 = await queryDatabase(query1, values1);

    res.json({
      message: "Successfully executed",
      user_reg_result: result,
      user_auth_result: result1,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error executing queries" });
  }
});


function queryDatabase(query, values) {
  return new Promise((resolve, reject) => {
    conn2.query(query, values, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

    
function generatePrimaryKey(firstName, lastName, mobileNo) {
      // Extract the first letter of the first name
      const firstLetterFirstName = firstName.charAt(0).toUpperCase();
    
      // Extract the first letter of the last name
      const firstLetterLastName = lastName.charAt(0).toUpperCase();
    
      // Extract the last 4 digits of the mobile number
      const last4DigitsMobile = mobileNo.slice(-4);
    
      // Concatenate the components to create the primary key
      const primaryKey = `${firstLetterFirstName}${firstLetterLastName}${last4DigitsMobile}`;
    
      console.log(primaryKey)
      return primaryKey;
    }


// app.get("/testing", (req, res) => {
//   const query = "SELECT * FROM testing_post";

//   conn2.query(query, (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error retrieving data');
//     } else {
//       res.json(data);
//     }
//   });
// });

// app.post("/testing", (req, res) => {
//   const q = "INSERT INTO testing_post (`f_name`, `l_name`, `mobile_no`) VALUES (?, ?, ?)";
//   const values = [req.body.f_name, req.body.l_name, req.body.mobile_no];

//   conn2.query(q, values, (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json(err);
//     }
//     return res.json("Successfully executed");
//   });
// });

      
        // conn2.query(
        //   'INSERT INTO user_reg (`f_name`, `l_name`, `mobile_no`, `user_id`) VALUES (?, ?, ?, ?)',
        //   [firstName, lastName, mobileNo, primaryKey],
        //   (err, results) => {
        //     if (err) {
        //       console.error('Error inserting user data: ' + err.stack);
        //       res.status(500).json({ message: 'Error registering user' });
        //     } else {
        //       console.log('User data inserted');
        //       res.json({ message: 'User registered successfully', user: { firstName, lastName, mobileNo, primaryKey } });
        //     }
        //   }
        // );


      // conn2.query(
      //   'INSERT INTO user_auth (`mobile_no`, `user_pass`, `user_id`) VALUES (?, ?, ?)',
      //   [mobileNo, userPass, primaryKey],
      //   (err, results) => {
      //     if (err) {
      //       console.error('Error inserting user authentication data into user_auth: ' + err.stack);
      //       res.status(500).json({ message: 'Error registering user' });
      //     } else {
      //       console.log('User authentication data inserted into user_auth');
      //       res.json({ message: 'User registered successfully', user: { firstName, lastName, mobileNo, primaryKey } });
      //     }
      //   }
      // );
    


      

      














 //   conn2.query(q,[...values, userID], (err, data)=>{
      //     if(err) return res.json(err)
      //     return res.json("item has been successfully updated")
      // })


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



