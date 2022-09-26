export const setupAd = skeletonProps => {
  const {
    data: { content },
  } = skeletonProps;
  if (content.length < 12) {
    return content;
  }
  content.splice(12, 0, { children: [], name: "ad" });
  if (content.length >= 18) {
    content.splice(18, 0, { children: [], name: "ad" });
  }
  return content;
};
