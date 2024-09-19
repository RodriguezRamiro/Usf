const addCommas = require("./addCommas");

describe("#addCommas", () => {
  test("it is a function", () => {
    expect(typeof addCommas).toBe("function");
  });

  test("formats a simple number correctly", () => {
    expect(addCommas(1234567890)).toBe("1,234,567,890");
  });

  test("formats a small number without commas", () => {
    expect(addCommas(123)).toBe("123");
  });

  test("formats a number with decimals", () => {
    expect(addCommas(1234567.89)).toBe("1,234,567.89");
  });

  test("formats a negative number correctly", () => {
    expect(addCommas(-987654321)).toBe("-987,654,321");
  });

  test("formats a number with decimals and commas", () => {
    expect(addCommas(-1234567.89)).toBe("-1,234,567.89");
  });

  test("formats zero correctly", () => {
    expect(addCommas(0)).toBe("0");
  });
});
