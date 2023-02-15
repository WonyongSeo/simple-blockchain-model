const { BlockChain } = require('../merkleBlockchain');

const sha3_256 = require('js-sha3').sha3_256;
// const ZeroAddress = require('../constant').ZeroAddress;
const randomBytes = require('crypto').randomBytes;
const { MerkleTree } = require('merkletreejs');

/*
For faster verification, I stored txdata into merkle tree.
It has the searching time complexity of O(logN).

Prerequisites
- Adding extra merkle root hash values into blockdata
- Nonmalicious blockdata should be saved externally
*/

describe('Q2. merkle proof', function() {
    const newBlockChain = new BlockChain();
    
    before('create 5 blocks', function() {
        newBlockChain.createBlock(5);
    });

    it('log blocks', function() {
        console.log(newBlockChain);
    });
    
    it('merkle proof of 1st txdata, genesis block', function() {
        const genesisBlock = newBlockChain.blockChain[0];
        let leaves = [];
        for (let i = 0; i < 8; i++) {
            leaves.push(genesisBlock.blockData[i].txData);
        }
        leaves = leaves.map(x => sha3_256(x));
        const tree = new MerkleTree(leaves, sha3_256);
        const root = genesisBlock.createMerkleRoot();
        const leaf = sha3_256(genesisBlock.blockData[0].txData);
        const proof = tree.getProof(leaf);

        console.log(`merkleRoot : ${root}`);
        console.log(tree.toString());
        console.log(tree.verify(proof, leaf, root));
    });

});

describe('Q3. verify malicious data', function() {
    const newBlockChain = new BlockChain();
    
    before('create 5 blocks then modify 8th data, 5th block', function() {
        newBlockChain.createBlock(5);
        
        console.log(newBlockChain.blockChain[5]);

        newBlockChain.blockChain[5].blockData[7].txData = randomBytes(108).toString("hex");
        
        console.log(newBlockChain.blockChain[5].blockData);
    });

    it('merkle proof of 5th block', function() {
        const fifthBlock = newBlockChain.blockChain[5];
        let leaves = [];
        for (let i = 0; i < 8; i++) {
            leaves.push(fifthBlock.blockData[i].txData);
        }
        leaves = leaves.map(x => sha3_256(x));
        const tree = new MerkleTree(leaves, sha3_256);
        const root = fifthBlock.merkleRoot;
        const leaf = sha3_256(fifthBlock.blockData[4].txData);
        const proof = tree.getProof(leaf);


        console.log(proof);
        console.log(`merkleRoot : ${root}`);
        console.log(tree.toString());
        console.log(tree.verify(proof, leaf, root));
    });
    
});