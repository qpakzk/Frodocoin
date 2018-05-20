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

console.log(blockchain)