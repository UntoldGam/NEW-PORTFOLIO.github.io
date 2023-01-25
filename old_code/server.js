const express = require("express");
const app = express();

app.use(express.json());

app.use('ejs', require("ejs").renderFile)

app.get("/")