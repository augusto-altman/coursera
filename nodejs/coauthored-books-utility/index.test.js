const generateArticleCoAuthorMatrix = require("./index");
const articlesClient = require("./clients/articles");
const fs = require("fs");

describe("generateArticleCoAuthorMatrix", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fs.promises.writeFile = jest.fn().mockResolvedValue();
  });

  it("should properly calculate the matrix when there is only one article with one author", async () => {
    articlesClient.getAllArticles = jest.fn().mockResolvedValue([
      {
        title: "t1",
        id: 1,
        authors: [
          { firstName: "name1", lastName: "lastName1", initials: "1", id: 1 },
        ],
      },
    ]);

    await generateArticleCoAuthorMatrix();
    const [actualPath, actualContent] = fs.promises.writeFile.mock.calls[0];
    const [author1] = JSON.parse(actualContent);

    expect(articlesClient.getAllArticles).toHaveBeenCalledTimes(1);
    expect(actualPath).toContain("out.txt");
    expect(author1).toMatchObject({
      firstName: "name1",
      lastName: "lastName1",
      initials: "1",
      id: 1,
      coAuthored: { "1": 1 },
    });
  });

  it("should properly calculate the matrix when there is only one article with multiple authors", async () => {
    articlesClient.getAllArticles = jest.fn().mockResolvedValue([
      {
        title: "t1",
        id: 1,
        authors: [
          { firstName: "name1", lastName: "lastName1", initials: "1", id: 1 },
          { firstName: "name2", lastName: "lastName2", initials: "2", id: 2 },
        ],
      },
    ]);

    await generateArticleCoAuthorMatrix();
    const [actualPath, actualContent] = fs.promises.writeFile.mock.calls[0];
    const [author1, author2] = JSON.parse(actualContent);

    expect(articlesClient.getAllArticles).toHaveBeenCalledTimes(1);
    expect(actualPath).toContain("out.txt");
    expect(author1).toMatchObject({
      firstName: "name1",
      lastName: "lastName1",
      initials: "1",
      id: 1,
      coAuthored: { "1": 1, "2": 1 },
    });
    expect(author2).toMatchObject({
      firstName: "name2",
      lastName: "lastName2",
      initials: "2",
      id: 2,
      coAuthored: { "1": 1, "2": 1 },
    });
  });

  it("should properly calculate the matrix when there are no co-authored articles", async () => {
    articlesClient.getAllArticles = jest.fn().mockResolvedValue([
      {
        title: "t1",
        id: 1,
        authors: [
          { firstName: "name1", lastName: "lastName1", initials: "1", id: 1 },
        ],
      },
      {
        title: "t2",
        id: 2,
        authors: [
          { firstName: "name2", lastName: "lastName2", initials: "2", id: 2 },
        ],
      },
    ]);

    await generateArticleCoAuthorMatrix();
    const [actualPath, actualContent] = fs.promises.writeFile.mock.calls[0];
    const [author1, author2] = JSON.parse(actualContent);

    expect(articlesClient.getAllArticles).toHaveBeenCalledTimes(1);
    expect(actualPath).toContain("out.txt");
    expect(author1).toMatchObject({
      firstName: "name1",
      lastName: "lastName1",
      initials: "1",
      id: 1,
      coAuthored: { "1": 1, "2": 0 },
    });
    expect(author2).toMatchObject({
      firstName: "name2",
      lastName: "lastName2",
      initials: "2",
      id: 2,
      coAuthored: { "1": 0, "2": 1 },
    });
  });
});
