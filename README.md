# Block Notal - Public Notary


Block Notal - Public Notary is a decentralized notary for people and/or entities make public agreements using Blockchain technology.

### Tech

Block Notal - Public Notary uses a number of open source projects to work properly:

* Ethereum - For sign agreements using smart contracts
* Arweave - For store document files
* React.js
* Material-ui

### Using Block Notal

##### Deploy Agreements:
For deploy new agreements you will need first a Arweave Wallet File( You can get one with a free token here: https://tokens.arweave.org/ ) and a Ethereum Wallet(i recommend Metamask)

`1 - Go to "Storage" section and load your Arweave Wallet, after that you will be able to upload a document( Warning: the file will be public on Arweave Blockchain )`
`2 - Go to "Home" section and click on "New Agreement" button, you will be able to select a document ( that you already upload on "Storage" section ), after select the document you can put the Ethereum Address of the signataries `


##### Sign Agreements:
For sign agreements you will need only a Ethereum Wallet with ether.

`1 - On "Agreements for Sign" section you will be able to view all requests to your address, you can view the document and all the signataries`
`2 - For confirm you signatature you will click on "Sign Request", the Ethereum Wallet will request you to sign like a "Json" data with the Url of the Document on Arweave and the hash(SHA-256) of the file, after you sign Metamask will ask you to confirm the transaction. `




### Installation

Block Notal - Public Notary requires Node.js to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install or  yarn install
$ npm start or  yarn start
```




