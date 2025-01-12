import React from "react";
import { ScrollView } from "react-native";
import {
  mockEditionSlice,
  mockDailyRegisterSlice,
} from "@times-components-native/fixture-generator";

import {
  TileA,
  TileAC,
  TileAD,
  TileAE,
  TileB,
  TileC,
  TileD,
  TileE,
  TileF,
  TileG,
  TileH,
  TileI,
  TileJ,
  TileK,
  TileL,
  TileM,
  TileN,
  TileO,
  TileP,
  TileQ,
  TileR,
  TileS,
  TileT,
  TileU,
  TileV,
  TileW,
  TileX,
  TileY,
  TileZ,
  TileAB,
  TileAH,
  TileAI,
  TileAL,
  TileAM,
  TileAN,
  TileAR,
  TileAS,
  TileAT,
  TileAU,
  TileAV,
  TileAW,
  TileAX,
  TileAY,
  TileAZ,
  TileBA,
  TileBB,
  TileBC,
  TileBD,
  TileBE,
  TileBF,
} from "./src/tiles";

const tile = mockEditionSlice(1).items[0];
const dailyRegisterItem = mockDailyRegisterSlice().birthdaysToday;

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    },
  ]);

const renderTile = (Tile, mockTile = tile) => (_, { decorateAction }) => (
  <ScrollView>
    <Tile
      onPress={preventDefaultedAction(decorateAction)("onPress")}
      tile={mockTile}
    />
  </ScrollView>
);

const tileStories = [
  {
    name: "Tile A - Bottom image, 35pt headline, no teaser",
    Tile: TileA,
  },
  {
    name: "Tile B - No image, 25pt headline, with teaser",
    Tile: TileB,
  },
  {
    name: "Tile C - Top image, 22pt headline, no teaser",
    Tile: TileC,
  },
  {
    name: "Tile D - Side 3/2 image, 22pt headline, no teaser",
    Tile: TileD,
  },
  {
    name: "Tile E - Side 4/5 image, 22pt headline, no teaser",
    Tile: TileE,
  },
  {
    name: "Tile F - 35pt Headline, no image, strapline and teaser",
    Tile: TileF,
  },
  {
    name: "Tile G - Roundel image, 22pt headline, no teaser",
    Tile: TileG,
  },
  {
    name:
      "Tile H - 22pt headline, teaser, byline at bottom all on left, image 2:3 right bottom",
    Tile: TileH,
  },
  {
    name: "Tile I - Vertical, top image, centered aligned summary",
    Tile: TileI,
  },
  {
    name:
      "Tile AC - Vertical, top image, centered aligned summary. Font size 30",
    Tile: TileAC,
  },
  {
    name: "Tile J - Horizontal, image left of article summary with 2:3 ratio",
    Tile: TileJ,
  },
  {
    name:
      "Tile K - Horizontal Aligned - Image left to Article summary Flex: 2:2 ratio",
    Tile: TileK,
  },
  {
    name:
      "Tile AD - Horizontal, image left of article summary with 2:3 ratio. Font size 20",
    Tile: TileAD,
  },
  {
    name:
      "Tile AL - Vertical, top image with 2:3 ratio, 22pt headline, centered aligned summary",
    Tile: TileAL,
  },
  {
    name: "Tile L - No image, 22pt headline, no teaser",
    Tile: TileL,
  },
  {
    name:
      "Tile M - No image, 22pt headline, no teaser, comment article, center align",
    Tile: TileM,
  },
  {
    name: "Tile N - Square image, 22pt headline, white color, black background",
    Tile: TileN,
  },
  {
    name:
      "Tile O - No image, 20pt headline, no teaser, white color, black background",
    Tile: TileO,
  },
  {
    name:
      "Tile P - Profile roundel image, 35pt headline, no teaser, central aligned summary",
    Tile: TileP,
  },
  {
    name: "Tile Q - Image with padding",
    Tile: TileQ,
  },
  {
    name: "Tile R - Bottom image, 40pt headline, no teaser",
    Tile: TileR,
  },
  {
    mockTile: dailyRegisterItem,
    name:
      "Tile S - 22pt headline (centered), comment article, byline, left align",
    Tile: TileS,
  },
  {
    name: "Tile T - Side 16:9 image, 22pt headline, no teaser",
    Tile: TileT,
  },
  {
    name:
      "Tile U - Horizontal, Flex: 1:3, Summary left no teaser, Image 3:2 right",
    Tile: TileU,
  },
  {
    name: "Tile V - Top image, 35pt headline, no teaser ",
    Tile: TileV,
  },
  {
    name: "Tile W - Horizontal, Flex: 1:3, Summary left, Image 3:2 right",
    Tile: TileW,
  },
  {
    name: "Tile X - No Image, 45pt Headline, Strapline, Teaser",
    Tile: TileX,
  },
  {
    name: "Tile Y - 35pt Headline, 225 teaser",
    Tile: TileY,
  },
  {
    name: "Tile Z - Horizontal, Summary left, Image 3:2 right",
    Tile: TileZ,
  },
  {
    name:
      "Tile AB - 30pt headline, teaser, byline at bottom, image 2:3 left at the top",
    Tile: TileAB,
  },
  {
    name: "Tile AE - 35pt headline, 125 teaser, no image",
    Tile: TileAE,
  },
  {
    name:
      "Tile AH - Profile roundel image, 30pt headline, no teaser, central aligned summary",
    Tile: TileAH,
  },
  {
    name: "Tile AI - Image with padding",
    Tile: TileAI,
  },
  {
    name: "Tile AM - Top image, 35pt headline, with teaser",
    Tile: TileAM,
  },
  {
    name: "Tile AN - Roundel image, 22pt headline, with teaser",
    Tile: TileAN,
  },
  {
    name: "Tile AR - Top image 16:9, 20pt headline, with teaser",
    Tile: TileAR,
  },
  {
    name: "Tile AS - Top image 3:2, 18pt headline, with teaser",
    Tile: TileAS,
  },
  {
    name: "Tile AT - Top image 3:2, 30pt headline, with teaser",
    Tile: TileAT,
  },
  {
    name: "Tile AU - Top image 16:9, 35pt headline, no teaser",
    Tile: TileAU,
  },
  {
    name: "Tile AV - 20pt headline, with teaser",
    Tile: TileAV,
  },
  {
    name: "Tile AW - Top image 16:9, Times Modern headline, no teaser",
    Tile: TileAW,
  },
  {
    name: "Tile AX - Top image 3:2, 24/30pt headline, no teaser",
    Tile: TileAX,
  },
  {
    name: "Tile AY - Top image 16:9, 20pt headline, no teaser",
    Tile: TileAY,
  },
  {
    name: "Tile AZ - Top image 3:2, Times Modern headline, no teaser",
    Tile: TileAZ,
  },
  {
    name: "Tile BA - image 16:9, Times Modern headline, no teaser",
    Tile: TileBA,
  },
  {
    name: "Tile BB - image 3:2, Times Modern headline, no teaser",
    Tile: TileBB,
  },
  {
    name: "Tile BC - image 3:2 or 16:9, Times Modern headline, no teaser",
    Tile: TileBC,
  },
  {
    name:
      "Tile BD - image 1:1 roundel, Times Modern headline, no teaser, horizontal",
    Tile: TileBD,
  },
  {
    name:
      "Tile BE - image 1:1 roundel, Times Modern headline, no teaser, vertical",
    Tile: TileBE,
  },
  {
    name: "Tile BF - Horizontal, Flex: 1:2, Summary left, Image 16:9 right",
    Tile: TileBF,
  },
];

export default {
  children: tileStories.map(({ name, Tile, mockTile }) => ({
    component: renderTile(Tile, mockTile),
    name,
    type: "story",
    platform: "native",
  })),
  name: "Composed/Edition/Tiles",
};
