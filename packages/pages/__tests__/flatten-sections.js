import { flattenSlices } from "../src/section";
import { basicInput, basicOutput } from "./container-test-mocks";

export default () => {
  describe("Handling containers in edition sections", () => {
    it("should extract collection slices from nested arrays, and label them", () => {
      const output = flattenSlices(basicInput);
      expect(output).toEqual(basicOutput.slices);
    });
  });
};
