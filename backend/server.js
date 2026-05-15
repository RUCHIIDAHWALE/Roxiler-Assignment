require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

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

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});