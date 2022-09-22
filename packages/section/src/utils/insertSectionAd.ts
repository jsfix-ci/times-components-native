export const insertSectionAd = () => (slices: any[]) => {
  const adSlotIndex = 3; // 0 based index

  return [
    ...slices.slice(0, adSlotIndex),
    { name: "SectionAd", slotName: "ad-section" },
    ...slices.slice(adSlotIndex),
  ];
};
