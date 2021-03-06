const count = require("./lib/count");
const main = require("./index");

count.incCount = jest.fn();

describe("main", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getMagicSync", () => {
    it("should count to times and create the magical string", () => {
      count.getCount = jest.fn().mockReturnValue(2);
      const result = main.getMagicSync(2);
      expect(result).toContain(" sync");
      expect(result).toContain("2");
      expect(count.incCount).toHaveBeenCalledTimes(2);
    });
  });

  describe("getMagicAsync", () => {
    it("should count to times and create the magical string", async () => {
      count.getCount = jest.fn().mockReturnValue(5);
      const result = await main.getMagicAsync(5);
      expect(result).toContain(" async");
      expect(result).toContain("5");
      expect(count.incCount).toHaveBeenCalledTimes(5);
    });
  });
});
