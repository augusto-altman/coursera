const booksAPIBaseURL = process.env.API || "localhost:3000";
const booksAPI = `http://${booksAPIBaseURL}`;

module.exports = {
  booksAPI,
};
