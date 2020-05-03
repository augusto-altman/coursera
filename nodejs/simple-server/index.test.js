const func = (arg) => {
  if (arg === 1) {
    throw new Error("problem");
  }
  return ++arg;
};

describe("index", () => {
  it("first", () => {
    const obj1 = { id: 1, name: "as", la: 1 };
    const obj2 = { id: 1, name: "as" };
    expect(obj1).toMatchObject(obj2);
  });

  describe("func", () => {
    it("second", () => {
      expect(() => func(1)).toThrow();
    });

    it("third", () => {
      const res = func(2);
      expect(res).toBe(3);
    });
  });
});
