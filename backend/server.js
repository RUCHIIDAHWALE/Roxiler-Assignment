require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());



// HOME ROUTE
app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});



// REGISTER API
app.post("/register", async (req, res) => {

    const { name, email, password, address } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users(name, email, password, address)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [name, email, hashedPassword, address],
            (err, result) => {

                if(err){
                    return res.status(500).json(err);
                }

                res.json({
                    message: "User Registered Successfully"
                });
            }
        );

    } catch(error){
        res.status(500).json(error);
    }

});



// LOGIN API
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {

        if(err){
            return res.status(500).json(err);
        }

        if(result.length === 0){
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            "SECRETKEY",
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token,
            user
        });

    });

});


app.get("/test", (req, res) => {
    res.send("LOGIN ROUTE ACTIVE");
});

// SERVER
app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});