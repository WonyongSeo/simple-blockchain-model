const randomBytes = require('crypto').randomBytes;
const ZeroAddress = require('./constant').ZeroAddress;
const { MerkleTree } = require('merkletreejs');
const sha3_256 = require('js-sha3').sha3_256;

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
        this.merkleRoot = this.createMerkleRoot();
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

    createMerkleRoot() {
        let leaves = [];
        for (let i = 0; i < 8; i++) {
            leaves.push(this.blockData[i].txData);
        }
        leaves = leaves.map(x => sha3_256(x))
        const tree = new MerkleTree(leaves, sha3_256);
        const root = tree.getRoot().toString("hex");
        
        return root;
    }
}

exports.Block = Block;
exports.BlockData = BlockData;