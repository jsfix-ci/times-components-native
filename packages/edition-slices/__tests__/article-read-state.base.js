import { getArticleReadState } from "../src/tiles/shared/article-summary";

// eslint-disable-next-line global-require
jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");
  rn.NativeModules.SectionEvents = {
    addListener: jest.fn(),
  };
  return rn;
});

export default () => {
  describe("getArticleReadState", () => {
    test("returns correct value when readArticles is null", () => {
      expect(getArticleReadState(null, "foo")).toEqual({
        read: false,
        animate: false,
      });
    });
    test("returns correct value when readArticles is empty array", () => {
      expect(getArticleReadState([], "foo")).toEqual({
        read: false,
        animate: false,
      });
    });
    test("returns correct value when readArticles are set but id doesn't match", () => {
      expect(
        getArticleReadState(
          [
            {
              id: "foo",
              highlight: false,
            },
          ],
          "bar",
        ),
      ).toEqual({
        read: false,
        animate: false,
      });
    });
    test("returns correct value when readArticles are set and id matches", () => {
      expect(
        getArticleReadState(
          [
            {
              id: "bar",
              highlight: false,
            },
          ],
          "bar",
        ),
      ).toEqual({
        read: true,
        animate: false,
      });
    });
    test("returns correct value when readArticles are set, id matches and highlight is set", () => {
      expect(
        getArticleReadState(
          [
            {
              id: "bar",
              highlight: true,
            },
          ],
          "bar",
        ),
      ).toEqual({
        read: true,
        animate: true,
      });
    });
    test("returns false for read articles if the article is live", () => {
      expect(
        getArticleReadState([{ read: true, animate: false }], "x", true),
      ).toEqual({
        read: false,
        animate: false,
      });
    });
  });
};
