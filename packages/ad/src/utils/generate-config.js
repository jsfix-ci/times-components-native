import sizes from "./sizes";

const getMaxSizes = adSizes => {
  if (!adSizes) {
    return { height: 0, width: 0 };
  }

  return adSizes.reduce(
    (max, [curWidth, curHeight]) => ({
      height: Math.max(max.height, curHeight),
      width: Math.max(max.width, curWidth),
    }),
    { height: 0, width: 0 },
  );
};

const getAdSizes = (adSizeMap, width) => {
  for (let i = adSizeMap.length - 1; i >= 0; i -= 1) {
    if (width >= adSizeMap[i].width) {
      return adSizeMap[i].sizes;
    }
  }
  return [];
};

const getSlotConfig = (slotName, width, orientation) => {
  const mappingsForOrientation = sizes.native.filter(mapping =>
    mapping.orientation.includes(orientation),
  );
  const adSizes = getAdSizes(mappingsForOrientation, width);
  const maxSizes = getMaxSizes(adSizes);

  return {
    maxSizes,
    sizes: adSizes,
    slotName,
  };
};

export { getSlotConfig };
