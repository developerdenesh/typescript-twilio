import { convertCommasToSpaces } from '../controllers/dynamo'

const summation = (a: number, b: number): number => {
  return a + b;
}

describe("test add function", () => {
  it("should return 15 for add(10,5)", () => {
    expect(summation(10, 5)).toBe(15);
  });

  it("should return 5 for add(2,3)", () => {
    expect(summation(2, 3)).toBe(5);
  });
});

describe("test string convertion for DB", () => {
  it("it should remove duplicate commas", () => {
    expect(convertCommasToSpaces({ input: ",,,,,,,,,,,,"})).toBe("")
  })

  it("it should remove ending space", () => {
    expect(convertCommasToSpaces({ input: "somevalue "})).toBe("somevalue")
  })

  it("it should reduce multiple spaces to a single space", () => {
    expect(convertCommasToSpaces({ input: "    orange      "})).toBe("orange")
  })
})
