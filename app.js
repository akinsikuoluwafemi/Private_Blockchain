/**
 *                 ApplicationServer
 *             (Do not change this code)
 * Require Modules to setup the REST Api
 * - `express` Express.js is a Web Framework
 * - `morgan` Isn't required but help with debugging and logging
 * - `body-parser` This module allows to parse the body of the post request into a JSON
 */
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// const bitcoin = require("bitcoinjs-lib");
// const bitcoinMessage = require("bitcoinjs-message");

// const block = require("./src/block.js");
// const blockchain = require("./src/blockchain.js");
/**
 * Require the Blockchain class. This allow us to have only one instance of the class.
 */
const BlockChain = require("./src/blockchain.js");

class ApplicationServer {
  constructor() {
    //Express application object
    this.app = express();
    //Blockchain class object
    this.blockchain = new BlockChain.Blockchain();
    //Method that initialized the express framework.
    this.initExpress();
    //Method that initialized middleware modules
    this.initExpressMiddleWare();
    //Method that initialized the controllers where you defined the endpoints
    this.initControllers();
    //Method that run the express application.
    this.start();
  }

  initExpress() {
    this.app.set("port", 8000);
  }

  initExpressMiddleWare() {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  initControllers() {
    require("./BlockchainController.js")(this.app, this.blockchain);
  }

  start() {
    let self = this;
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server Listening for port: ${self.app.get("port")}`);

      // ------------------------------------------------------

      // // Test Block
      // let newBlock = new block.Block("Test Block");
      // let anotherBlock = new block.Block("Another Block");
      // let blockChain = new blockchain.Blockchain();

      // blockChain._addBlock(newBlock);
      // blockChain._addBlock(anotherBlock);

      // console.log(blockChain.chain);
      // console.log(newBlock.getBData());
      // console.log(blockChain.chain.length);
      // console.log("------------------");
      // blockChain.getBlockByHeight(1).then((result) => console.log(result));
      // console.log("------------------");

      // //
      // const wifPrivateKey =
      //   "L3Tf8zy84U25XcZ8qjwBssUPxhS1xZSPzKCV22EuuztowYDXhnbX";

      // // Create an ECPair (Elliptic Curve key pair) from the WIF private key
      // const keyPair = bitcoin.ECPair.fromWIF(wifPrivateKey);

      // const privateKey = keyPair.privateKey;

      // const message =
      //   "bc1qysv4cqd3eugamr7wcuk4k4vqgcvnvk8n2mkrsz:1702217604:starRegistry";

      // const address = "bc1qysv4cqd3eugamr7wcuk4k4vqgcvnvk8n2mkrsz";

      // var signature = bitcoinMessage.sign(
      //   message,
      //   privateKey,
      //   keyPair.compressed
      // );
      // console.log("signature", signature.toString("base64"));

      // // const verify = bitcoinMessage.verify(message, address, signature);

      // // console.log("verify", verify);

      // console.log("keyPair", keyPair);
      // console.log("privateKey", privateKey);

      //

      // blockChain.validateChain().then((result) => console.log(result));

      // blockChain
      //   .getBlockByHash(
      //     "8c0866242ce303217775af393bb028c42af75ec174f8d5ae331d86bfd6642b96"
      //   )
      //   .then((result) => console.log(result));

      // console.log("newBlock", newBlock);

      // Validate Test Block
      // newBlock.validate().then((result) => {
      //   console.log(`result: ${result}`);
      // });

      // const BData = newBlock.getBData();
      // console.log(BData === "Test Block" ? new Error("null") : BData);

      // ------------------------------------------------------
    });
  }
}

new ApplicationServer();
