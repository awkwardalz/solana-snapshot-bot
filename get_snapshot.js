const fs = require("fs");
require('dotenv').config()
const fetch = require('node-fetch');
const JSONdb = require('simple-json-db');
var myObject = []
const key = process.env.NFTPORT_API_KEY;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: process.env.NFTPORT_API_KEY
    }
};

// Checking if arguments are passed
if (process.argv.length < 3) {
    console.log("Usage: node get_snapshot.js <project_name>");
    process.exit(1);
}
// If using peach, change the page number to a bigger number

// collection slug
let project = "";
switch (process.argv[2]) {
    case "project_name":
        project = process.env.NFTPORT_COLLECTION_SLUG
        break;
// add more cases if you need to track several projects
}

// check existing file  
const filename = `json/snapshot_${process.argv[2]}.json`
const filename2 = `csv/snapshot_${process.argv[2]}.csv`
//create new file if not exist
if (!fs.existsSync(filename)) {
    fs.closeSync(fs.openSync(filename, 'w'));
}
const file = fs.readFileSync(filename)
if (file.length > 0) {
    console.log("file exists, append data")
    var jsn = JSON.parse(file.toString())
    jsn = [...jsn, ...myObject];
    myObject = jsn;
}

else {
    console.log("Create file: ", filename)
}



let i = 1;

setTimeout(getowners, 400)
console.log("start")
let results = [];
// fetch API
function getowners() {
    if (i <= 100000) {
        fetch(`https://api.nftport.xyz/v0/solana/nfts/${project}?page_number=${i}&page_size=50&include=metadata&refresh_metadata=false`, options)
            .then(response => response.json())
            .then(response => {
                response = response["nfts"]
                results = response.length;
                myObject.push(...response)
                fs.writeFileSync(filename, JSON.stringify(myObject), () => { })
            })
            .catch(err => console.error(err));
        console.log("page number: " + i);
        if (results === 0) {
            return;
        }
        else {
            i++;
            setTimeout(getowners, 400)
        }
    }
    else {
        // Create holders snapshot CSV

        const db = new JSONdb(filename);

        const header = [
            { id: 'mint_address', title: 'Mint Address' },
            { id: 'name', title: 'Token ID' },
            { id: 'owner', title: 'Owner' }
        ];

        const createCsvWriter = require('csv-writer').createObjectCsvWriter;
        const csvWriter = createCsvWriter({
            header,
            path: filename2
        });

        var data = [];
        for (i = 0; i < db.storage.length; i++) {
            const mint_address = db.storage[i].mint_address;
            let name = db.storage[i].metadata.name.replace(/^\D+/g, '').replace(/\s/g, '');
            const owner = db.storage[i].owner;
            data[i] = { mint_address, name, owner }
        };


        console.log("Completed. Output file: " + filename + ", " + filename2)
    }
}

