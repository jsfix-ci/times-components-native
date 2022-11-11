import { getArticleAuthors } from "@times-components-native/article/src/utils";

test("get array of author names from byline data", () => {
  const bylineData = [
    {
      byline: [
        {
          name: "author",
          attributes: {
            slug: "Author Name",
          },
        },
        {
          name: "inline",
          children: [],
        },
      ],
    },
  ];

  const authorNames = getArticleAuthors(bylineData);
  expect(authorNames).toEqual(["Author Name"]);
});
