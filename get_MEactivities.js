const fetch = require("node-fetch");
const JSONdb = require('simple-json-db');
const fs = require('fs');
const { parse } = require('json2csv');
const filename = 'json/results.json';
const filename2 = "csv/csv.csv"
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

if (!fs.existsSync(filename)) {
  //create new file if not exist
  fs.closeSync(fs.openSync(filename, 'w'));
}

const collection_slug = process.env.ME_COLLECTION_SLUG

fetch(`https://api-mainnet.magiceden.dev/v2/collections/${collection_slug}/activities?offset=0&limit=1000`, requestOptions)
  .then(response => response.json())
  .then(result => {
    var tojson = JSON.stringify(result)
    fs.writeFile(filename, tojson, (err) => {
      if (err) throw err;
      console.log("New data added");
    })
    const csv = parse(result, { delimiter: ',' });
    fs.writeFile(filename2, csv.replace(/"/g, ""), (err) => {
      if (err) throw err;
      console.log("csv created");
    })
  }
  )
  .catch(error => console.log('error', error));