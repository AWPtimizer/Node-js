const fs = require('fs');

// how to create a file and insert data in it ->
// Synchronous Method:
// fs.writeFileSync('./text.txt', "Hey world");

// Asynchronous Method:
// fs.writeFile('./text.txt', "Hey world Async", (err) => {});


// how to read file ->
// Synchronous Method:
// here it return the result and if there is any error it return an error which 
// we can handle using try catch block.

// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

// Asynchronous Method:
// here it does'nt return anything, it expects that we will provide a callback in which it will provide err or result if any

// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log("Error",err);
//   } else {
//     console.log(result);
//   }
// });

// how to append data in file->
// fs.appendFileSync('./text.txt', `${Date.now()} Hey there \n`);

// how to copy a file ->
// fs.cpSync("./text.txt", "./copy.txt");

// how to delete a file ->
// fs.unlinkSync("./copy.txt");

// how to see status of a file ->
console.log(fs.statSync("./text.txt"));
console.log(fs.statSync("./text.txt").isFile());