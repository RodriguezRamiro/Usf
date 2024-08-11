//** Command_line tool Matkov text */

const fs = require("fs");
const markov = requier("./markov");
const axios = require("axios");
const process = require("process");

/** markov machine from text and generate text */

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeTExt());
}

/** read file and generate text */

function makeText(path){
    fs.readFile(path, "utf8", function cb(err, data){
        if (err){
            compose/error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}
//** function makeURLText(url){
    let resp;

    try {
        resp = await axios.get(url);
    } catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    generateText(resp.data)
// interpret cmdline to deice wwhat to do

let [method, path] = process.argv.slice(2);

if (method === "file"){
    makeText(path);
}

else if (method === "url"){
    makeURLText(path);
}

else {
    console.error(`Unkown method: ${method}`);
    process.exit(1);
}



