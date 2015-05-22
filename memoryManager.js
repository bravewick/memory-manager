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
        if (block[0].length === size) {
            allocatedBlock = this.freeBlocks.splice(this.freeBlocks.indexOf(block[0]), 1);
        } else {
            allocatedBlock = this.freeBlocks.splice(this.freeBlocks.indexOf(block[0]), 1, {
                index: block[0].index + size,
                size: block[0].size - size
            });
        }
        return allocatedBlock[0].index;
    } else {
        throw new Error('No memory available');
    }
}

MemoryManager.prototype.release = function (index) {
    console.log('Releasing memory');
}

MemoryManager.prototype.write = function (index, value) {

    if (this.isFree(index)) {
        this.memory[index] = value;
    } else {
        throw new Error('The memory is not allocated');
    }
}

MemoryManager.prototype.read = function (size) {
    return this.memory[size];
}

MemoryManager.prototype.dump = function () {
    var dump = '';
    for(var i = 0; i < this.memory.length; i++) {
        dump += typeof this.memory[i] === 'undefined' ? memoryManager.printASCIIchar(45) : memoryManager.printASCIIchar(927);
    }
    console.log('+++++++++++++++++++++++ MEMORY ++++++++++++++++++++++++');
    console.log(dump);
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++');

}

MemoryManager.prototype.isFree = function (index) {
    return !this.freeBlocks.some(function (allocation) {
        if (index >= allocation.index && index < allocation.index + allocation.size) {
            return true;
        }
    });
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

var memoryArray = new Array(100);
var memoryManager = new MemoryManager(memoryArray);
console.log('Allocating 10 blocks', memoryManager.allocate(10));
console.log('Allocating 4 blocks', memoryManager.allocate(4));
console.log('Allocating 40 blocks', memoryManager.allocate(40));
console.log('Allocating 20 blocks', memoryManager.allocate(20));
// console.log('Allocating 23 blocks', memoryManager.allocate(23));

// console.log('Allocating 100 blocks', memoryManager.allocate(100));
// memoryManager.dump();
memoryManager.write(10);
memoryManager.read(10);
memoryManager.isFree();
// MemoryManager.printASCIIchar(45);   // -
// MemoryManager.printASCIIchar(927);  // O
// MemoryManager.printASCIIchar(920);  // Θ