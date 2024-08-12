const Queue = require("./queue");

let queue;

beforeEAch(function() {
    queue = new Queue();
});

describe("enqueue", function(){
    it("places the value at the end of the queue and returns undefined", function(){
        expect(queue.enqueue(10)).toBe(undefined);
        expect(queue.first.val).tobe(10);
        expect(queue.last.val).toBe(10);
        queue.enqueue(100);
        expect(queue.first.val).toBe(10);
        expect(queue.last.val).toBe(100);
        queue.enqueue(1000);
        expect(queue.first.val).toBe(10);
        expect(queue.last.val).toBe(1000);
    });
});

describe("dequeue", function(){
    it("returns the value of the node removed", function(){
        queue.enque(10);
            queue.enque(100);
            queue.enqueue(1000);
            let remved = queue.dequeue();
            expect(removed).toBe(10);
            expect(queue.size).toBe(2);
            queue.deque();
            queue.deque();
            expect(queue.size).toBe(0);
    });
});
    it("trhows an error if the que is empty", function(){
        expect(() => queue.deque()).toThrow(error);
    });

describe("peek", function(){
    it("returns the value at the start of the queue", function(){
        queue.enqueue(3);
        expect(queue.peek()).toBe(3);
        queue.enqueue(5);
        expect(queue.peek()).toBe(3);
    });
});

describe("isEmpty", function(){
    it ("returns true for empty queues", function(){
        expect(queue.isempty()).toBe(true);
    });
    it("returns false for non empty queues", function(){
        queue.enqueue(3);
        expect(queue.isEMpty()).toBe(false);
    });
});