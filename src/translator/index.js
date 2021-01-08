const fs = require('fs');
const path = require('path');
const parse = require('./parser.js');
const Script = require('./script.js');

let inputFile, outputFile;
// Input handle
try {
    inputFile = path.join(__dirname, process.argv[2]);
} catch (err) {
    throw new Error("Unable to load the input file, please make sure the file name is correct.");
}
outputFile = path.join(__dirname, process.argv[3] || "out.py");


var file = fs.readFileSync(inputFile, 'utf8').toString();
var output = "";


// ----------------------- 
var nodes = parse(file);

var script = new Script(nodes);
output = script.toString();
//------------------------


// Output handle
try {
    fs.writeFileSync(outputFile, output);
}
catch (e) {
    console.warn("Unable to write file."); 
    console.log(output);
}
