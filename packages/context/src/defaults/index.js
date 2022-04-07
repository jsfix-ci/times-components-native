import { scales } from "@times-components-native/styleguide";

export default {
  makeArticleUrl: ({ slug, shortIdentifier }) =>
    slug && shortIdentifier
      ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
      : "",
  makeTopicUrl: ({ slug }) => `/topic/${slug}`,
  maxFontSizeMultiplier: 2,
  minimumFontScale: 0.7,
  theme: {
    scale: scales.medium,
  },
};
