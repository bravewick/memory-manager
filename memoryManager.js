// Allocated memory Ascii code: 920
// Not Allocated memory Ascii code: 45

function MemoryManager(memory) {
    this.freeBlocks = [{ index: 0, size: memory.length }];
    this.blocks = [];
    this.memory = memory;
}

MemoryManager.prototype.allocate = function (size) {
    let allocatedBlock;
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
        allocatedBlock = { index: allocatedBlock[0].index, size };
        this.blocks.push(allocatedBlock);
        this.blocks.sort((a, b) => a.index - b.index);

        return allocatedBlock.index;
    } else {
        throw new Error('No memory available');
    }
}

MemoryManager.prototype.release = function (index) {
    const blockIndex = this.blocks.findIndex((block) => block.index === index);
    if (blockIndex >= 0) {
        const block = this.blocks.splice(blockIndex, 1);
        let start = 0;
        this.freeBlocks = [];
        this.blocks.forEach((allocatedBlock) => {
            if (allocatedBlock.index > start) {
                this.freeBlocks.push({
                    index: start,
                    size: allocatedBlock.index - start
                });
            }
            start = allocatedBlock.index + allocatedBlock.size;
        });
        if (start < this.memory.length) {
            this.freeBlocks.push({
                index: start,
                size: this.memory.length - start
            });
        }

    } else {
        throw new Error('Not and index to an allocated memory block');
    }
}

MemoryManager.prototype.write = function (index, value) {

    if (this.isFree(index)) {
        this.memory[index] = value;
    } else {
        throw new Error('The memory is not allocated');
    }
}

MemoryManager.prototype.read = function (index) {
    if (this.isFree(index)) {
        return this.memory[index];
    } else {
        throw new Error('The memory is not allocated');
    }
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
