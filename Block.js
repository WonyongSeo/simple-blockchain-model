const randomBytes = require('crypto').randomBytes;
const ZeroAddress = require('./constant').ZeroAddress;

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
        for (let i = 0; i < 8; i++) { // since each tx is the size of 1024bit, block data contains 8 tx per block
            let Data = new BlockData;
            Data.txID = ZeroAddress.slice(0, -1) + i.toString(); // 160bit txID
            Data.txData = randomBytes(108).toString("hex"); // 864bit txData
            blockData.push(Data);
        }
        return blockData;
    }
}

exports.Block = Block;
exports.BlockData = BlockData;