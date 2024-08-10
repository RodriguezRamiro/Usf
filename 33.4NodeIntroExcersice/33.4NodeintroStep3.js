const fs = require('fs');
const process = require('process');
const axios = require('axios');

/** handle output write to file given, else print */

function handleOutput(txt, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function(err){
            if (err) {
                console.error(`Cant write $out{out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

/** print file from path  */

function cat(path, out){
    fs.readFile(path, 'utf8', function(err, data){
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            handleOutput(data, out);
        }
    });
}

/** print page from url */

async function webCat(url, out){
    try {
        let resp = await axios.get(url);
        handleOutput(resp.data, out);
    } catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}