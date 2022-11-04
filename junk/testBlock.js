// const { sha3_256 } = require('js-sha3');

sha3_256 = require('js-sha3').sha3_256;
randomBytes = require('crypto').randomBytes;
// sha3_256('asdfasdf); // string type
// console.log(sha3_256(randomBytes(1064).toString("hex")));

class BlockData {
    constructor (txID, txData) {
        this.txID = txID;
        this.txData = txData;
    }
}

class Block {
    constructor (blockID, prevHash) {
        this.blockID = blockID;
        this.prevHash = prevHash;
        this.blockData = this.createBlockData();
    }
    createBlockData() {
        const blockData = [];
        for (let i = 0; i < 8; i++) {
            let Data = new BlockData;
            Data.txID = "0x0000000000000000000" + i.toString();
            Data.txData = randomBytes(108).toString("hex");
            blockData.push(Data);
        }
        // console.log(blockData);
        return blockData;
    }
    getBlockID () {
        return this.blockID;
    }



}


// function getBlockData() {
//     const blockData = [];
//     for (let i = 0; i < 8; i++) {
//         let Data = new BlockData;
//         Data.txID = "0x0000000000000000000" + i.toString();
//         Data.txData = randomBytes(108).toString("hex");
//         blockData.push(Data);
//     }
//     console.log(blockData);
//     return blockData;
// }

function createBlock() {
    const blockID = 0xaaaaaaaa;
    const prevHash = "0x00";
    // const blockData = getBlockData();
    // for (let i = 0; i < 8; i++) {
    //     let Data = new BlockData;
    //     Data.txID = "0x0000000000000000000" + i.toString();
    //     Data.txData = randomBytes(108).toString("hex");
    //     blockData.push(Data);
    //     // console.log("txID" + Data.txID);
    //     // console.log("txData" + Data.txData);
    // }
    return new Block(blockID, prevHash);

}

let newBlock = createBlock();
// console.log(newBlock);
// console.log(newBlock.blockData[1].txID);
// console.log(newBlock.blockData[1].txData.length);

// console.log(newBlock.blockID.length);
// console.log(newBlock.prevHash.length);
// console.log(typeof(randomBytes(1)));

console.log("--------------");
// console.log(sha3_256(0xaa));
console.log(sha3_256("0xaa"));



