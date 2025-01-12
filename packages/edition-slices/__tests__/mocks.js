jest.mock("../src/tiles", () => {
  const tileMocks = {};
  Object.keys(jest.requireActual("../src/tiles")).forEach(key => {
    tileMocks[key] = key;
  });
  return tileMocks;
});
jest.mock("@times-components-native/article-flag", () => ({
  ArticleFlags: "ArticleFlags",
}));
jest.mock("@times-components-native/icons", () => ({
  IconStar: "IconStar",
  TheSTLogo: "TheSTLogo",
  TheTimesLogo: "TheTimesLogo",
}));

jest.mock("@times-components-native/ad", () => "Ad");
jest.mock("@times-components-native/image", () => "Image");
jest.mock("@times-components-native/link", () => "Link");
jest.mock("@times-components-native/gradient", () => "Gradient");
jest.mock(
  "@times-components-native/in-todays-edition",
  () => "InTodaysEdition",
);
