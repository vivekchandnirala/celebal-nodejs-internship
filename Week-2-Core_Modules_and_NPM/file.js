const fs = require('fs');

// Create a new file and write some content to it
fs.writeFileSync("execute2.txt", "File successfully created by Synchronous");    // Synchronous method to write to a file
fs.writeFile("execute1.txt", "File successfully created by Asynchronous", (err)=>{});    // Asynchronous method to write to a file



// Read the content of the file
const result = fs.readFileSync("execute2.txt", "utf-8");    // Synchronous method to read a file
console.log(result);    
// Read the content of the file asynchronously
fs.readFile("execute1.txt", "utf-8", (err, result) => {
    if(err){
        console.error("Error reading file:", err);
    }else{
        console.log(result);    // Asynchronous method to read a file
    }
})



// Append the content of the file
fs.appendFile("execute1.txt","\nThis is the appended content", (err,data) =>{
    if(err){
        console.error("Error appending to file:", err);
    }else{
        console.log("File successfully appended");
    }
})

fs.appendFileSync("execute2.txt", "\nAppending the Content Synchronously");    // Synchronous method to append to a file