// node: node for stack. */

class Node {
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

//* Stack: remove from the top or add to the top

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    // push()val: add new value to the end of the stack
}

push(val){
    let node = new Node(val);
    if (!this.first){
        this.first = node;
        this.last = node;
    } else {
        let temp = this.first;
        this.first = node;
        this.first.next = temp;
    }
    this.size++;
}

// pop(): remove the node from the top of the stack and return its value, throw error to signify stack is empty.

pop() {
    if (!this.first) throw new Error("Cant pop from and empty stack.");
    let temp = this.first;
    if (this.first == this.last) {
        this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.val;
}

// peek(): return the value of the last node in the stack

peek() {
    return this.first.val;
}

// isEmpty(): return ture if the stack is empty, otherwise false

isEmpty(){
    return this.size === 0;
}

module.exports = Stack;
