import { buildSliceData } from "../../src/utils/buildSliceData";
import realSlicesDump from "../real-slices-dump.json";

describe("buildSliceData", () => {
  const isTablet = false;
  const sectionTitle = "News";
  it("should add elementId and ignore Separator properties on real data", () => {
    const newData = buildSliceData(isTablet, sectionTitle)(realSlicesDump);
    expect(newData).toMatchSnapshot();
  });

  it("should add elementId and ignore Separator properties", () => {
    const originalData = [
      { id: "a", name: "LeadersSlice" },
      { id: "b", name: "DailyUniversalRegister" },
      { id: "c", name: "OtherSlice" },
      { id: "d", name: "LeadersSlice" },
      { id: "e", name: "DailyUniversalRegister" },
      { id: "f", name: "OtherSlice" },
      { id: "g", name: "OtherSlice" },
      { id: "h", name: "LeadersSlice" },
      { id: "i", name: "OtherSlice" },
      { id: "j", name: "OtherSlice" },
      { id: "k", name: "OtherSlice" },
      { id: "l", name: "DailyUniversalRegister" },
    ];
    const newData = buildSliceData(isTablet, sectionTitle)(originalData);

    expect(newData).toMatchSnapshot();
  });

  it("should not mutate passed data", () => {
    const originalData = [
      { id: "a", name: "LeadersSlice" },
      { id: "b", name: "DailyUniversalRegister" },
      { id: "c", name: "OtherSlice" },
      { id: "d", name: "LeadersSlice" },
      { id: "e", name: "DailyUniversalRegister" },
      { id: "f", name: "OtherSlice" },
      { id: "g", name: "OtherSlice" },
      { id: "h", name: "LeadersSlice" },
      { id: "i", name: "OtherSlice" },
      { id: "j", name: "OtherSlice" },
      { id: "k", name: "OtherSlice" },
      { id: "l", name: "DailyUniversalRegister" },
    ];
    const json = JSON.stringify(originalData);
    buildSliceData(isTablet, sectionTitle)(originalData);
    expect(JSON.stringify(originalData)).toEqual(json);
  });
});
