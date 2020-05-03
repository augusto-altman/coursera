const articlesClient = require("./clients/articles");
const fs = require("fs");
const path = require("path");

const getArticlesByAuthor = (articles) => {
  const allAuthors = {};
  articles.forEach((article) =>
    article.authors.forEach((author) => {
      if (!allAuthors[author.id]) {
        allAuthors[author.id] = { author, articles: [article] };
      } else {
        allAuthors[author.id].articles.push(article);
      }
    })
  );
  return allAuthors;
};

const getCoAuthorMatrix = (articlesByAuthor) => {
  const articlesByAuthorArr = Object.values(articlesByAuthor);
  const initialCoAuthored = {
    ...articlesByAuthorArr.reduce(
      (acum, _) => ({ ...acum, [_.author.id]: 0 }),
      {}
    ),
  };
  return articlesByAuthorArr.map((principalAuthor) => {
    const coAuthored = { ...initialCoAuthored };
    principalAuthor.articles.forEach((art) =>
      art.authors.forEach((author) => {
        coAuthored[author.id] += 1;
      })
    );
    return {
      ...principalAuthor.author,
      coAuthored,
    };
  });
};

const generateArticleCoAuthorMatrix = async () => {
  const articles = await articlesClient.getAllArticles();
  const articlesByAuthor = getArticlesByAuthor(articles);
  const matrix = getCoAuthorMatrix(articlesByAuthor);
  const outputPath = path.resolve(__dirname, "./out.txt");
  await fs.promises.writeFile(outputPath, JSON.stringify(matrix), "UTF-8");
};

module.exports = generateArticleCoAuthorMatrix;
