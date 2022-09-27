export const insertSectionAd = (isTablet: boolean) => (slices: any[]) => {
  const adSlotIndex = 3; // 0 based index

  if (!isTablet || slices.length <= adSlotIndex) return slices;

  return [
    ...slices.slice(0, adSlotIndex),
    {
      name: "SectionAd",
      slotName: "ad-leaderboard",
    },
    ...slices.slice(adSlotIndex),
  ];
};
