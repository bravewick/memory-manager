// Allocated memory Ascii code: 920
// Not Allocated memory Ascii code: 45

function MemoryManager(memory) {
    this.freeBlocks = [{ index: 0, size: memory.length }, { index: 12, size: 20 }, { index: 50, size: 16 }];
    this.memory = memory;
}

MemoryManager.prototype.allocate = function (size) {

    var block = this.freeBlocks.filter(function (block) {
        return block.size >= size;
    }).sort(function(a, b) {
        return a.size - b.size;
    });

    if (block !== -1) {
        console.log('Free block found', block);
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

MemoryManager.prototype.printASCII = function (size) {
    var result = [];
    for (var i = 0; i < size; i++) {
        result.push(String.fromCharCode(i));
    }
    console.log(result.join(' '));
}

MemoryManager.prototype.printASCIIchar = function (number) {
    console.log(String.fromCharCode(number));
}

var memoryArray = new Array(10);
var memoryManager = new MemoryManager(memoryArray);
memoryManager.allocate(10);
// MemoryManager.printASCIIchar(45);   // -
// MemoryManager.printASCIIchar(927);  // O
// MemoryManager.printASCIIchar(920);  // Θ