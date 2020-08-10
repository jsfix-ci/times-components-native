import React from "react";
import TestRenderer from "react-test-renderer";
import {
  mockEditionSlice,
  mockDailyRegisterSlice,
  mockPuzzleSlice,
} from "@times-components-native/fixture-generator";

export const tile = mockEditionSlice(1).items[0];
export const dailyRegisterItem = mockDailyRegisterSlice().birthdaysToday;
export const puzzle = mockPuzzleSlice();

export const testTile = (
  Tile,
  breakpoint,
  mockTile = tile,
  otherProps = {},
) => {
  const output = TestRenderer.create(
    <Tile
      onPress={() => null}
      tile={mockTile}
      breakpoint={breakpoint}
      {...otherProps}
    />,
  );
  expect(output).toMatchSnapshot();
};

export const testPuzzleTile = (Tile, breakpoint) => {
  const output = TestRenderer.create(
    <Tile
      id={puzzle.id}
      image={puzzle.image}
      onPress={() => null}
      title={puzzle.title}
      url={puzzle.url}
      breakpoint={breakpoint}
    />,
  );
  expect(output).toMatchSnapshot();
};
