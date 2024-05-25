const mysql = require("mysql2");
const express = require("express");
const bodyParse = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParse.json());

const connection = mysql.createConnection({
    host: "",
    user: "root",
    password: "",
    database: "comar"
})

connection.connect(err => {
    if(err){console.log("Erro ao se conectar com o banco")}
    else{console.log("Sucesso ao se conectar com o banco!")}
});

app.post("/cadastro", (req, res) => {
    //Continuar
})
