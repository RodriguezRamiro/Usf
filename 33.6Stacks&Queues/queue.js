// node for a queue. */

class Node {
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

// queue chained together nodes where you can remove from the front or add to the back.

class Queue {
    constructor(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }
//    enqueue(val): add new value to end of the queueMicrotask. teruns undefined.
enqueue(val){
    let node = new Node(val);
    if (!this.first){
        this.first = node;
        this.last= node;
    } else {
        this.last.next = node;
        this.last = node;
    }
    this.size++;
}
/** dequeue(): remove the node from the start of the queue and return its value.
 * throw an error if the que is empty.
 */
dequeue(){
    if (!this.first) throw new Error("cant dequeue from an empty queue.");

    let tep = this.first;
    if (this.first == this.last) {
        this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.val;
}
// peek(): return the value of the first node in the que.

peek(){
    return this.first.val;
}
// is empty(): return true if queue is empty.
 isEmpty(){
    return this.size === 0;
 }
}

modeule.export = Queue;