import memoizeOne from "memoize-one";
import { transformSlice as transformSliceFunction } from "@times-components-native/section/src/utils/transformSlice";

const withIgnoredSeparator = (slice: any) => ({
  ...slice,
  ignoreSeparator: true,
});

const shouldIgnoreSeparator = ({ name }: { name: string }) =>
  name === "LeadersSlice" || name === "DailyUniversalRegister";

export const buildSliceData = memoizeOne(
  (isTablet: boolean, sectionTitle: string) => (data: any[]) => {
    const transformSlice = transformSliceFunction(isTablet, sectionTitle);

    return data.reduce((newSlices, oldSlice, idx) => {
      const nextSlice = data[idx + 1];

      if (nextSlice && shouldIgnoreSeparator(nextSlice)) {
        newSlices[idx] = withIgnoredSeparator(oldSlice);
        newSlices[idx + 1] = withIgnoredSeparator(nextSlice);
      } else if (!newSlices[idx]) {
        newSlices[idx] = oldSlice;
      }

      const currentSlice = transformSlice(newSlices[idx]);
      let generatedId = currentSlice.id || "";

      Object.keys(currentSlice).forEach(key => {
        if (currentSlice[key] !== null) {
          if (currentSlice[key].article) {
            generatedId += currentSlice[key].article.id;
          } else if (currentSlice[key].articleId) {
            generatedId += currentSlice[key].articleId;
          } else if (typeof currentSlice[key] === "string") {
            generatedId += currentSlice[key];
          }
        }
      });

      newSlices[idx] = {
        ...currentSlice,
        elementId: `${generatedId}.${idx}`,
      };

      return newSlices;
    }, []);
  },
);
