const xml2js = require("xml2js");
const fs = require("fs");
const path = require("path");
const util = require("util");

const parseXMLString = util.promisify(xml2js.parseString);

const formatAuthorList = (authorList, memoizedAuthors) =>
  authorList[0].Author.map((author) => {
    const [firstName, lastName, initials] = [
      author.ForeName[0],
      author.LastName[0],
      author.Initials[0],
    ];
    if (!memoizedAuthors[`${firstName}_${lastName}_${initials}`]) {
      memoizedAuthors[`${firstName}_${lastName}_${initials}`] = {
        firstName,
        lastName,
        initials,
        id: Object.keys(memoizedAuthors).length + 1,
      };
    }

    return memoizedAuthors[`${firstName}_${lastName}_${initials}`];
  });

const getAllArticles = async () => {
  const effectiveXMLPath = path.resolve(__dirname, "./data.xml");
  const fileContent = await fs.promises.readFile(effectiveXMLPath, "UTF-8");
  const parsedXML = await parseXMLString(fileContent);
  const memoizedAuthors = {};
  return parsedXML.MedlineCitationSet.Article.map((rawArt, i) => ({
    title: rawArt.ArticleTitle[0],
    id: i + 1,
    authors: formatAuthorList(rawArt.AuthorList, memoizedAuthors),
  }));
};

module.exports = { getAllArticles };
