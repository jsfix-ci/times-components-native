import { getMaxSizes, getSlotConfig } from "../../src/utils";

export default () => {
  it("returns the maximum height and width from an array of arrays of sizes", () => {
    const biggestValue = 300;
    const sizes = [
      [100, biggestValue],
      [biggestValue, 200],
      [100, 200],
    ];

    expect(getMaxSizes(sizes)).toEqual({
      height: biggestValue,
      width: biggestValue,
    });
  });

  it("returns zero values if the sizes are falsey", () => {
    const defaultZeroValues = { height: 0, width: 0 };

    expect(getMaxSizes()).toEqual(defaultZeroValues);
    expect(getMaxSizes(null)).toEqual(defaultZeroValues);
    expect(getMaxSizes(undefined)).toEqual(defaultZeroValues);
  });

  it("returns config for slot for portrait only", () => {
    const config = getSlotConfig("ad-leaderboard", 1024, "portrait");
    expect(config.sizes).toEqual([[728, 90]]);
    expect(config.maxSizes).toEqual({ height: 90, width: 728 });
    expect(config.slotName).toEqual("ad-leaderboard");
  });

  it("returns config for slot for landscape only", () => {
    const config = getSlotConfig("ad-leaderboard", 1024, "landscape");
    expect(config.sizes).toEqual([[728, 90]]);
    expect(config.maxSizes).toEqual({ height: 90, width: 728 });
    expect(config.slotName).toEqual("ad-leaderboard");
  });
};
