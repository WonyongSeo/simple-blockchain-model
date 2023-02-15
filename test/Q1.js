const { BlockChain } = require('../Blockchain');

describe('Q1. simple model implement', function() {
    const newBlockChain = new BlockChain();
    
    before('create 5 blocks', function() {
        // newBlockChain.createBlock(5);
    });

    it('log genesis block details', function () {
        console.log(newBlockChain.blockChain[0]);
    });

    it('log recent block', function() {
        let blockHeight = parseInt(newBlockChain.getBlockHeight())
        console.log(`blockHeight : ${blockHeight}`);
        console.log(newBlockChain.blockChain[blockHeight]);
    });
});