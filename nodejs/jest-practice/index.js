const magic = require("./lib/magic");
const count = require("./lib/count");

const getMagicSync = (times) => {
  for (let i = 0; i < times; i++) {
    count.incCount();
  }
  return magic.magicSync("is sync");
};

const getMagicAsync = async (times) => {
  for (let i = 0; i < times; i++) {
    count.incCount();
  }
  const result = await magic.magicAsync("is async", 2000);
  return result;
};

module.exports = {
  getMagicSync,
  getMagicAsync,
};
