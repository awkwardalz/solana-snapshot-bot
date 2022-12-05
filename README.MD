# Solana Tools

Simple tool to fetch ME activities and to take holder snapshot for solana NFT sales (latest 1000 records. Modify to your needs).
Using ME API (no API key required) and NFTPort API (new).

## Getting Started

### Setting up

* Get an [NFTPort API Key](https://dashboard.nftport.xyz/).
* Run `node get_NFTport_slug.js` to get the collection slug.
* Set up .env file:
```
ME_COLLECTION_SLUG=""
NFTPORT_COLLECTION_SLUG=""
NFTPORT_API_KEY=""
```

### Dependencies

* "csv-writer": "^1.6.0",
* "dotenv": "^16.0.3",
* "fs": "^0.0.1-security",
* "json2csv": "^5.0.7",
* "node-fetch": "^2.6.7",
* "simple-json-db": "^2.0.0"

### Installing

* `npm i`

### ME activities

* Run `node get_MEactivities.js`
* Will return activities as `results.json` and `csv.csv`.

### Holders' Snapshot

* Run `node get_snapshot.js <project>` where `<project>` is defined in the switch cases.
* Data will be saved in `/json` and `/csv` folder.
* The json file includes metadata of the NFTs as well for other usage.