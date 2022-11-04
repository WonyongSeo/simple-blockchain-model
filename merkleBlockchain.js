const sha3_256 = require('js-sha3').sha3_256;

const { mainModule } = require('process');
const { Block, BlockData } = require('./merkleBlock');
const ZeroAddress = require('./constant').ZeroAddress;

class BlockChain {
    constructor () {
        this.blockChain = [this.genesisBlock(),];
    }

    genesisBlock() {
        return new Block(
            ZeroAddress,
            ZeroAddress
        );
    }

    createBlock(n) {
        for(let i = 0; i < n; i++) {
            const currBlockID = this.getBlockHeight();
            const newBlockID = '0x' + (parseInt(currBlockID, 16) + 1).toString(16).padStart(40, '0');
            const newBlockHash = '0x' + this.getNewHash();
            const newBlock = new Block(newBlockID, newBlockHash);
            this.blockChain.push(newBlock);
        }
        return ;
    }

    getBlockHeight() {
        return this.blockChain[this.blockChain.length - 1].blockID;
    }

    getNewHash() {
        let hashString = '';
        const currBlock = this.blockChain[this.blockChain.length - 1];
        hashString += currBlock.blockID.slice(2);
        hashString += currBlock.prevHash.slice(2);
        for (let i = 0; i < 8; i++) {
            const Data = currBlock.blockData[i];
            hashString += Data.txID.slice(2);
            hashString += Data.txData;
        }
        return sha3_256(hashString).slice(24);
    }
}

exports.BlockChain = BlockChain;

