const getExtraTag = content => {
  if (content.length < 18) {
    return { children: [], name: "ad", extraTag: { key: "value" } };
  }
  return { children: [], name: "ad" };
};

export const setupAd = skeletonProps => {
  const {
    data: { content },
  } = skeletonProps;
  if (content.length < 12) {
    return content;
  }
  content.splice(12, 0, getExtraTag(content));
  if (content.length >= 18) {
    content.splice(18, 0, {
      children: [],
      name: "ad",
      extraTag: { bc: "1" },
    });
  }
  return content;
};
