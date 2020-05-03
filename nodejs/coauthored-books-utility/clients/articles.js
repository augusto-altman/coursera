const fetch = require("node-fetch");
const { booksAPI } = require("./common");

const articlesAPI = `${booksAPI}/api/articles`;

const getAllArticles = async () => {
  const response = await fetch(articlesAPI);
  const articles = await response.json();
  return articles;
};

module.exports = {
  articlesAPI,
  getAllArticles,
};
