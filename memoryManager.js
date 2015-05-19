// Allocated memory Ascii code: 920
// Not Allocated memory Ascii code: 45

function MemoryManager(memory) {
    this.freeBlocks = [{ index: 0, size: memory.length }];
    this.memory = memory;
}

MemoryManager.prototype.allocate = function (size) {
    var allocatedBlock;
    var block = this.freeBlocks.filter(function (block) {
        return block.size >= size;
    }).sort(function(a, b) {
        return a.size - b.size;
    });

    if (block.length) {
        // console.log('Free block found', block);
        if (block[0].length === size) {
            allocatedBlock = this.freeBlocks.splice(this.freeBlocks.indexOf(block[0]), 1);
        } else {
            allocatedBlock = this.freeBlocks.splice(this.freeBlocks.indexOf(block[0]), 1, {
                index: block[0].index + size,
                size: block[0].size - size
            });
        }
        // console.log('Allocated block:', allocatedBlock);
        return allocatedBlock[0].index;
        // this.freeBlocks.splice()
        // return block;
    } else {
        throw new Error('No memory available');
    }
}

MemoryManager.prototype.release = function (index) {
    console.log('Releasing memory');
}

MemoryManager.prototype.write = function (size) {

}

MemoryManager.prototype.read = function (size) {

}

MemoryManager.prototype.dump = function () {
    var dump = '';
    for(var i = 0; i < this.memory.length; i++) {
        dump += typeof this.memory[i] === 'undefined' ? memoryManager.printASCIIchar(45) : memoryManager.printASCIIchar(927);
    }
    console.log(dump);
}

MemoryManager.prototype.printASCII = function (size) {
    var result = [];
    for (var i = 0; i < size; i++) {
        result.push(String.fromCharCode(i));
    }
    console.log(result.join(' '));
}

MemoryManager.prototype.printASCIIchar = function (number) {
    return String.fromCharCode(number);
}

var memoryArray = new Array(10);
var memoryManager = new MemoryManager(memoryArray);
console.log('Memory allocated at', memoryManager.allocate(10));
memoryManager.dump();
// MemoryManager.printASCIIchar(45);   // -
// MemoryManager.printASCIIchar(927);  // O
// MemoryManager.printASCIIchar(920);  // Θ