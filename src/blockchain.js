const CryptoJS = require('crypto-js');

class Block {
    constructor(index, hash, previousHash, timestamp, data) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }
}

const genesisBlock = new Block(
    0,
    'AC5C3584F9E07BA287B9237AB67673FF73C98BE02B3EAC000D9FFC263CBEDFCB',
    null,
    1526817148049,
    "This is the genesis block!!",
);

let blockchain = [genesisBlock];

const getLastBlock = () => blockchain[blockchain.length - 1];
const getTimestamp = () => new Date().getTime() / 1000;
const createHash = (index, previousHash, timestamp, data) => 
    CryptoJS.SHA256(index + previousHash + timestamp + JSON.stringify(data)).toString();
const createNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimestamp = getTimestamp();
    const newHash = createHash(
        newBlockIndex,
        previousBlock.hash,
        newTimestamp,
        data
    );

    newBlock = new Block(
        newBlockIndex,
        newHash,
        previousBlock.hash,
        newTimestamp,
        data
    );

    return newBlock;
}

const getBlocksHash = (block) => createHash(block.index, block.previousHash, block.timestamp, block.data);

const isNewBlockValid = (candidateBlock, lastestBlock) => {
    if(!isNewStructureValid(candidateBlock)) {
        console.log("The candidate block is not valid.");
        return false;
    }
    else if(lastestBlock.index + 1 !== candidateBlock.index) {
        console.log("The candidate block doesn't have a valid block.");
        return false;
    }
    else if(lastestBlock.hash !== candidateBlock.previousHash) {
        console.log("The previousHash of the candidate block is not the hash of the last block.");
        return false;
    }
    else if(getBlocksHash(candidateBlock) !== candidateBlock.hash) {
        console.log("The hash of this block is invalid.");
        return false;
    }

    return true;
}

const isNewStructureValid = block => {
    return (
        typeof block.index === 'number' &&
        typeof block.hash === 'string' &&
        typeof block.previousHash === 'string' &&
        typeof block.timestamp === 'number' &&
        typeof block.data === 'string'
    )
}

const isChainValid = candidateChain => {
    const isGenesisValid = block => {
        return JSON.stringify(block) === JSON.stringify(genesisBlock);
    }

    if(!isGenesisValid(candidateChain[0])) {
        console.log("The candidateChain's genesisBlock is not the same as our genesisBlock.");
        return false;
    }

    for(let i = 1; i < candidateChain.length; i++) {
        if(!isNewBlockValid(candidateChain[i], candidateChain[i - 1])) 
            return false;
    }
    return true;
}