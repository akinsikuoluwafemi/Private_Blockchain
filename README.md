# Private Blockchain Application

You are starting your journey as a Blockchain Developer, this project allows you to demonstrate
that you are familiar with the fundamental concepts of a Blockchain platform.
Concepts like: - Block - Blockchain - Wallet - Blockchain Identity - Proof of existence

Are some of the most important components in the Blockchain Framework that you will need to describe and also
why not? Implement too.


## What problem will you solve implementing this private Blockchain application?

Your employer is trying to make a test of concept on how a Blockchain application can be implemented in his company.
He is an astronomy fan and he spends most of his free time searching for stars in the sky, that's why he would like
to create a test application that will allow him to register stars, and also some of his friends can register stars
too but make sure the application knows who owned each star.

### What is the process described by the employer to be implemented in the application?

1. The application will create a Genesis Block when we run the application.
2. The user will request the application to send a message to be signed using a Wallet and in this way verify the ownership over the wallet address. The message format will be: `<WALLET_ADRESS>:${new Date().getTime().toString().slice(0,-3)}:starRegistry`;
3. Once the user has the message the user can use a Wallet to sign the message.
4. The user will try to submit the Star object for that it will submit: `wallet address`, `message`, `signature` and the `star` object with the star information.
   The Start information will be formed in this format:
   ```json
       "star": {
           "dec": "68° 52' 56.9",
           "ra": "16h 29m 1.0s",
           "story": "Testing the story 4"
   	}
   ```
5. The application will verify if the time elapsed from the request ownership (the time is contained in the message) and the time when you submit the star is less than 5 minutes.
6. If everything is okay the star information will be stored in the block and added to the `chain`
7. The application will allow us to retrieve the Star objects belonging to an owner (wallet address).

## What tools or technologies I will use to create this application?

- This application will be created using Node.js and Javascript programming language. The architecture will use ES6 classes
  because it will help us to organize the code and facilitate the maintenance of the code.
- The company suggests using Visual Studio Code as an IDE to write your code because it will help you debug the code easily
  but you can choose the code editor you feel comfortable with.
- Some of the libraries or npm modules you will use are:
  - "bitcoinjs-lib": "^4.0.3",
  - "bitcoinjs-message": "^2.0.0",
  - "crypto-js": "^3.1.9-1",
  - "express": "^4.16.4",
  - "hex2ascii": "0.0.3",
  - "morgan": "^1.9.1"
    Remember if you need to install any other library you will use `npm install <npm_module_name>`

Libraries purpose:

1. `bitcoinjs-lib` and `bitcoinjs-message`. Those libraries will help us to verify the wallet address ownership, we are going to use it to verify the signature.
2. `express` The REST API created for the purpose of this project is being created using the Express.js framework.
3. `crypto-js` This module contains some of the most important cryptographic methods and will help us to create the block hash.
4. `hex2ascii` This library will help us to **decode** the data saved in the body of a Block.

## Understanding the code base.

The code base is a simple architecture for a Blockchain application, it includes a REST API application to expose your Blockchain application methods to your client applications or users.

1. `app.js` file. It contains the configuration and initialization of the REST API.
2. `BlockchainController.js` file. It contains the routes of the REST API. Those are the methods that expose the URLs you will need to call when make a request to the application.
3. `src` folder. Here we are going to have the main two classes we need to create our Blockchain application, we are going to create a `block.js` file and a `blockchain.js` file that will contain the `Block` and `BlockChain` classes.

### Starting with the code base:

First thing first, we are going to download or clone our code base.

Then we need to install all the libraries and module dependencies, to do that: open a terminal and run the command `npm install`

**( Remember to be able to work on this project you will need to have installed in your computer Node.js and npm )**

At this point we are ready to run our project for the first time, use the command: `node app.js`

You can check in your terminal that the Express application is listening in the PORT 8000

## What do I need to implement to satisfy my employer's requirements?

1.  `block.js` file. In the `Block` class we are going to implement the method:
    `validate()`.
    /\*\*
    - The `validate()` method will validate if the block has been tampered or not.
    - Been tampered means that someone from outside the application tried to change
    - values in the block data as a consequence the hash of the block should be different.
    - Steps:
    - 1. Return a new promise to allow the method to be called asynchronous.
    - 2. Save the auxiliary variable the current hash of the block (`this` represents the block object)
    - 3. Recalculate the hash of the entire block (Use SHA256 from the crypto-js library)
    - 4. Compare if the auxiliary hash value is different from the calculated one.
    - 5. Resolve true or false depending if it is valid or not.
    - Note: to access the class values inside a Promise code you need to create an auxiliary value `let self = this;`
      \*/
2.  `block.js` file. In the `Block` class we are going to implement the method:
    `getBData()`.
    /\*\*
    - Auxiliary Method to return the block body (decoding the data)
    - Steps:
    -
    - 1. Use the hex2ascii module to decode the data
    - 2. Because data is a javascript object use JSON.parse(string) to get the Javascript Object
    - 3. Resolve with the data and make sure that you don't need to return the data for the `genesis block`
    -     or Reject with an error.
      \*/
3.  `blockchain.js` file. In the `Blockchain` class we are going to implement the method:
    `_addBlock(block)`.
    /\*\*
    - \_addBlock(block) will store a block in the chain
    - @param {\*} block
    - The method will return a Promise that will resolve with the block added
    - or reject if an error happens during the execution.
    - You will need to check for the height to assign the `previousBlockHash`,
    - assign the `timestamp` and the correct `height`...In the end, you need to
    - create the `block hash` and push the block into the chain array. Don't forget
    - to update the `this. height`
    - Note: the symbol `_` in the method name indicates in the javascript convention
    - that this method is private.
      \*/
4.  `blockchain.js` file. In the `Blockchain` class we are going to implement the method:
    `requestMessageOwnershipVerification(address)`
    /\*\*
    - The requestMessageOwnershipVerification(address) method
    - will allow you to request a message that you will use to
    - Sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
    - This is the first step before submitting your Block.
    - The method returns a Promise that will resolve with the message to be signed
    - @param {_} address
      _/
5.  `blockchain.js` file. In the `Blockchain` class we are going to implement the method:
    `submitStar(address, message, signature, star)`
    /\*\*
    - The submitStar(address, message, signature, star) method
    - will allow users to register a new Block with the star object
    - into the chain. This method will resolve with the Block added or
    - reject with an error.
    - Algorithm steps:
    - 1. Get the time from the message sent as a parameter example: `parseInt(message.split(':')[1])`
    - 2. Get the current time: `let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));`
    - 3. Check if the time elapsed is less than 5 minutes
    - 4. Verify the message with the wallet address and signature: `bitcoinMessage.verify(message, address, signature)`
    - 5. Create the block and add it to the chain
    - 6. Resolve with the block added.
    - @param {\*} address
    - @param {\*} message
    - @param {\*} signature
    - @param {_} star
      _/
6.  `blockchain.js` file. In the `Blockchain` class we are going to implement the method:
    `getBlockByHash(hash)`
    /\*\*
    - This method will return a Promise that will resolve the Block
    - with the hash passed as a parameter.
    - Search on the chain array for the block that has the hash.
    - @param {_} hash
      _/
7.  `blockchain.js` file. In the `Blockchain` class we are going to implement the method:
    `getStarsByWalletAddress (address)`
    /\*\*
    - This method will return a Promise that will resolve with an array of Stars objects existing in the chain
    - and belong to the owner with the wallet address passed as a parameter.
    -
    - @param {_} address
      _/
8.  `blockchain.js` file. In the `Blockchain` class we are going to implement the method:
    `validateChain()`
    /\*\*
    - This method will return a Promise that will resolve the list of errors when validating the chain.
    - Steps to validate:
    - 1. You should validate each block using `validateBlock`
    - 2. Each Block should check with the previousBlockHash
         \*/

## How to test your application functionalities?
Use Postman to test the API

1. Run your application using the command `node app.js`
   You should see in your terminal a message indicating that the server is listening in port 8000:

   > Server Listening for port: 8000

2. To make sure your application is working fine and it creates the Genesis Block you can use POSTMAN to request the Genesis block:
3. Make your first request of ownership by sending your wallet address:
4. Sign the message with your Wallet:
5. Submit your Star
6. Retrieve Stars owned by me
