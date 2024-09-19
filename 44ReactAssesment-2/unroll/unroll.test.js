const unroll = require("./unroll");

describe("#unroll", function () {

  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });

  it("returns values in a spiral order for a 2x2 square", function () {
    const square = [
      [1, 2],
      [3, 4]
    ];
    expect(unroll(square)).toEqual([1, 2, 4, 3]);
  });

  it("returns values in a spiral order for a 3x3 square", function () {
    const square = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"]
    ];
    expect(unroll(square)).toEqual(["a", "b", "c", "f", "i", "h", "g", "d", "e"]);
  });

  it("returns values in a spiral order for a 4x4 square", function () {
    const square = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ];
    expect(unroll(square)).toEqual([1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]);
  });

  it("returns values in a spiral order for a 5x5 square", function () {
    const square = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
    ];
    expect(unroll(square)).toEqual([1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]);
  });

  it("returns an empty array for an empty square", function () {
    const square = [];
    expect(unroll(square)).toEqual([]);
  });

});
