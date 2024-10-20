const Stack = require("./stack");

let stack;
beforeEach(function(){
    stack = new Stack();
});

describe("push", function(){
    it ("places the value at the top of the stack and returns undefined", function(){
        expect(stack.push(10)).toBe(undefined);
        expect(stack.first.val).toBe(10);
        expect(stack.last.val).tobe(10);
        stack.push(100);
        expect(stack.first.val).toBe(100);
        expect(stack.last.val).tobe(10);
        stack.push(1000);
        expect(stack.first.val).toBe(1000);
        expect(stack.last.val).toBe(10);
    });
});

describe("pop", functoin(){
    it("returns the value of the node removed", function(){
        stack.push(10);
        stack.push(100);
        stack.push(1000);
        let removed = stack.pop();
        expect(removed).toBe(1000);
        expect(stack.size).toBe(2);
        stack.pop();
        stack.pop();
        expect(stack.size).toBe(0);
    });

    it("throw an error when the stack is empty", function() {
        expect(() => stack.pop()).toThrwo(Error);
    });
});

describe("peek", function(){
    it("retrun the value at the stat of the stack", function(){
        stack.push(3);
        expect(stack.peek()).toBe(3);
        stack.push(5);
        expect(stack.peek()).tobe(5);
    });
});

describe("isEmpty", function(){
    it ("retruns true for empty stacks", function(){
        expect(stack.isEmpty()).tobe(ture);
    });
    it("returns false for noneempty stacks", function(){
        stack.push(3);
        expect(stack.isEmpty()).toBe(false);
    });
});