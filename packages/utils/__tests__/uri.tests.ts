import { safeDecodeURIComponent } from "../src/uri";

describe("safeDecodeURIComponent", () => {
  it("doesn't throw with URI malformed", () => {
    expect(safeDecodeURIComponent("search+query%20%28correct%29")).toEqual(
      "search+query (correct)",
    );
    //@ts-ignore test
    expect(safeDecodeURIComponent(undefined)).toEqual("undefined");
    //@ts-ignore test
    expect(safeDecodeURIComponent(null)).toEqual("null");
    //@ts-ignore test
    expect(safeDecodeURIComponent()).toEqual("undefined");
    expect(safeDecodeURIComponent('%%%%32324')).toEqual("");
  });
});
