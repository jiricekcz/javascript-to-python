const fs = require('fs');
const path = require('path');

const translate = require('./translate.js');


async function main() {
    let inputFile, outputFile;
    // Input handle
    try {
        inputFile = path.resolve(process.argv[2]);
    } catch (err) {
        throw new Error("Unable to load the input file, please make sure the file name is correct.");
    }
    outputFile = path.resolve(process.argv[3] || "out.py");
    const cdnLinkToSource = process.argv.includes("--saveSource");

    var file = fs.readFileSync(inputFile, 'utf8').toString();
    var output = "";


    // ----------------------- 

    output = await translate(file, cdnLinkToSource);
    //------------------------

    // Output handle
    try {
        fs.writeFileSync(outputFile, output);
    }
    catch (e) {
        console.warn("Unable to write file.");
        console.log(output);
    }
}
main();