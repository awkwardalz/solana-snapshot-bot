require('dotenv').config()
const fetch = require('node-fetch');
var myObject = []
const key = process.env.NFTPORT_API_KEY;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: process.env.NFTPORT_API_KEY
    }
};

const mint_address = "Gqz2fY9GrNng6y8Pn2ANSfiKrDoonwCW7z27Xc4RrPsW" // Enter the mint address of an NFT of the collection you want to get the collection slug for.

fetch(`https://api.nftport.xyz/v0/solana/nft/${mint_address}?refresh_metadata=false`, options)
  .then(response => response.json())
  .then(response => console.log(response.nft.collection_id))
  .catch(err => console.error(err));