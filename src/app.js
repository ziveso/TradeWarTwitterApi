require("dotenv").config();

const { streaming } = require("./twitter");

streaming();

console.log("start streaming");

// const { write } = require("./database");
// console.log("start writing db");

// write("12345");
