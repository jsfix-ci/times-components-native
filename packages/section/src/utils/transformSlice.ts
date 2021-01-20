import { baseLeadTwoNoPicAndTwoVariant2Config } from "@times-components-native/edition-slices/src/slices/leadtwonopicandtwovariant2/baseLeadTwoNoPicAndTwoVariant2Config";
import { TileConfig } from "@times-components-native/types";
import merge from "lodash.merge";

const baseConfigs = {
  LeadTwoNoPicAndTwoSlice: baseLeadTwoNoPicAndTwoVariant2Config,
};

interface Slice {
  support: {
    config?: TileConfig;
  };
  name: string;
  id: string;
  [key: string]: any;
}

interface TransformSlice {
  name: string;
  sectionTitle: string;
  transform: (slice: Slice) => Slice;
}

const leadOneAndOneNewsTransform = {
  sectionTitle: "News",
  name: "LeadOneAndOneSlice",
  transform: (slice: Slice) => ({
    ...slice,
    support: { ...slice.support, config: { showImage: true } },
  }),
};

const sliceTransformations: TransformSlice[] = [leadOneAndOneNewsTransform];

export const transformSlice = (isTablet: boolean, sectionTitle: string) => (
  slice: Slice,
): Slice => {
  if (!isTablet) return slice;

  const transformation = sliceTransformations.find(
    (st) =>
      st.name == slice.name &&
      st.sectionTitle.toUpperCase() === sectionTitle.toUpperCase(),
  );

  // no transform object and no default only use slice in old format
  if (!transformation && !baseConfigs[slice.name]) return slice;

  //merges existing slice tile data with the base config
  const mergeBaseConfig = Object.keys(slice).reduce((acc, curtileName) => {
    return Object.keys(baseConfigs[slice.name]).includes(curtileName)
      ? {
          ...acc,
          [curtileName]: {
            ...slice[curtileName],
            ...baseConfigs[slice.name][curtileName],
          },
        }
      : acc;
  }, {});

  // no transform but base config so passes the default config to a possible flexible slice
  if (!transformation && baseConfigs[slice.name]) {
    return {
      ...slice,
      ...mergeBaseConfig,
    };
  }

  // uses base config if someone forgets to set it in ovverrides
  if (!transformation.overrides)
    return {
      ...slice,
      ...mergeBaseConfig,
    };

  //merges existing slice tile data with the transform ovverrides
  const mergeTileOverrideData = Object.keys(slice).reduce(
    (acc, curtileName) => {
      return Object.keys(baseConfigs[slice.name]).includes(curtileName)
        ? {
            ...acc,
            [curtileName]: {
              ...slice[curtileName],
              config: merge(
                baseConfigs[slice.name][curtileName],
                transformation.overrides[curtileName],
              ),
            },
          }
        : acc;
    },
    {},
  );

  // merges ovverrides with exsisting tile data
  return { ...slice, ...mergeTileOverrideData };
};
