const count = require("./count");

const magicSync = (str) => `${str} - ${count.getCount()}`;

const magicAsync = (str, time) =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(`${str} - ${count.getCount()}`), time)
  );

module.exports = {
  magicSync,
  magicAsync,
};
