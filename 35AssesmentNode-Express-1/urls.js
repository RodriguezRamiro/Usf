const fs = require('fs');
const https = require('https');
const http = require('http');
const url = require('url');

// Function to download HTML content from a URL
const downloadHTML = (urlString, outputFilename) => {
  return new Promise((resolve, reject) => {
    const parsedUrl = url.parse(urlString);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    protocol.get(urlString, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to load ${urlString}`));
        return;
      }

      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        fs.writeFile(outputFilename, data, (err) => {
          if (err) {
            reject(new Error(`Failed to write to ${outputFilename}`));
          } else {
            resolve(outputFilename);
          }
        });
      });
    }).on('error', (err) => {
      reject(new Error(`Failed to load ${urlString}: ${err.message}`));
    });
  });
};

// Main function to read URLs from file and download HTML
const main = async (filename) => {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    const urls = data.split('\n').filter(Boolean);

    const promises = urls.map(async (urlString) => {
      const parsedUrl = url.parse(urlString);
      const hostname = parsedUrl.hostname;
      const outputFilename = hostname;

      try {
        const result = await downloadHTML(urlString, outputFilename);
        console.log(`Wrote to ${result}`);
      } catch (err) {
        console.error(err.message);
      }
    });

    await Promise.all(promises);
  } catch (err) {
    console.error(`Couldn't read file ${filename}: ${err.message}`);
    process.exit(1);
  }
};

// Get the filename from command-line arguments and execute main
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1);
}

const filename = args[0];
main(filename);


// To run the script, save it as urls.js and ensure you have a file named urls.txt with the URLs you want.
// Then run: node urls.js urls.txt in bash.
