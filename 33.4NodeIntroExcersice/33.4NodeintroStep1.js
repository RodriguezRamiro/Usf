const fs = require('fs');
const proess = require('process');

/** print out file at path. */

function cat(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log.error('error reading ${path}: ${err}');
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

cat(process.argv[2]);