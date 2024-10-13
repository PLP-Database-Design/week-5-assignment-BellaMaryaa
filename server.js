// import the dependencies
const express = require("express")
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')

// configure environment variables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
});



// test the database connection
db.connect((err) => {
    // connection is not successful
       if(err) {
        return console.log("Error connecting to the database", err)
       } 

    // connection is successful
    console.log("Successfully connected to MySQL:", db.threadId)
})



//1. retrieve all patients
app.get('/patients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, results) => {
        if(err) {
            return res.status(400).send("Failed to get patients:", err)
        }

        res.status(200).render('data');
    });
});



//2. retrieve all providers
app.get('/data', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        // if I have an error
        if(err) {
            return res.status(400).send("Failed to get providers:", err)
        }

        res.status(200).send(data)
    })
})



//3.  Filter patients by First Name
app.get('/patients/:Firstname', (req, res) => {
    const { firstName } = req.params;
    const query =  "SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?"
        db.query(query, [firstName], (err, results) => {
        if(err) {
            return res.status(400).send("Failed to get patient firstname:", err)
        }

        res.status(200).send(data)
    })
})



//4. //3.  Retrieve all providers by their specialty
app.get('/pproviders/specialty/:specialty', (req, res) => {
    const { specialty } = req.params;
    const query =  "SELECT first_name, last_name, FROM providers WHERE provider_specialty = ?"
        db.query(query, [specialty], (err, results) => {
        if(err) {
            return res.status(400).send("Failed to get provider specialty:", err)
        }

        res.status(200).send(data)
    })
})


// start and listen to the server
app.listen(8040, () => {
    console.log("server is running on port 8040...")
})