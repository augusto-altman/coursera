const count = require("./lib/count");
const main = require("./index");

xdescribe("main", () => {
  describe("getMagicSync", () => {
    it("should count to times and create the magical string", () => {
      const result = main.getMagicSync(2);
      expect(result).toContain(" sync");
      expect(result).toContain("2");
    });
  });

  describe("getMagicAsync", () => {
    it("should count to times and create the magical string", async () => {
      const result = await main.getMagicAsync(5);
      expect(result).toContain(" async");
      expect(result).toContain("5");
    });
  });
});
