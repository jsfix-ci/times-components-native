import React from "react";
import { Dimensions } from "react-native";
import TestRenderer from "react-test-renderer";
import { SectionContext } from "@times-components-native/context";
import { iterator } from "@times-components-native/test-utils";
import {
  mockCommentLeadAndCartoonSlice,
  mockDailyRegisterSlice,
  mockLeadOneAndFourSlice,
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockLeadTwoNoPicAndTwoSlice,
  mockLeadersSlice,
  mockSecondaryOneSlice,
  mockSecondaryOneAndColumnistSlice,
  mockSecondaryFourSlice,
  mockStandardSlice,
  mockListTwoAndSixNoPicSlice,
  mockSecondaryTwoAndTwoSlice,
  mockSecondaryTwoNoPicAndTwoSlice,
  mockSecondaryOneAndFourSlice,
  getPuzzleSlices,
} from "@times-components-native/fixture-generator";
import Responsive from "@times-components-native/responsive";
import "./mocks";
import {
  CommentLeadAndCartoonSlice,
  DailyRegisterLeadFourSlice,
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  LeadOneFullWidthSlice,
  LeadTwoNoPicAndTwoSlice,
  ListTwoAndSixNoPicSlice,
  LeadersSlice,
  SecondaryOneSlice,
  SecondaryOneAndColumnistSlice,
  SecondaryFourSlice,
  SecondaryOneAndFourSlice,
  SecondaryTwoAndTwoSlice,
  SecondaryTwoNoPicAndTwoSlice,
  PuzzleSlice,
  StandardSlice,
  SectionAd,
} from "../src/slices";

const slices = [
  {
    mock: mockDailyRegisterSlice(),
    name: "daily universal register",
    Slice: DailyRegisterLeadFourSlice,
  },
  {
    mock: mockLeadOneFullWidthSlice(),
    name: "lead one full width",
    Slice: LeadOneFullWidthSlice,
  },
  {
    mock: mockLeadOneAndOneSlice(),
    name: "lead one and one",
    Slice: LeadOneAndOneSlice,
  },
  {
    mock: mockLeadOneAndFourSlice(),
    name: "lead one and four",
    Slice: LeadOneAndFourSlice,
  },
  {
    mock: mockStandardSlice(),
    name: "standard",
    Slice: StandardSlice,
  },
  {
    mock: mockLeadTwoNoPicAndTwoSlice(),
    name: "lead Two No Pic And Two",
    Slice: LeadTwoNoPicAndTwoSlice,
  },
  {
    mock: mockSecondaryOneSlice(),
    name: "secondary one",
    Slice: SecondaryOneSlice,
  },
  {
    mock: mockSecondaryOneAndColumnistSlice(),
    name: "secondary one and columnist",
    Slice: SecondaryOneAndColumnistSlice,
  },
  {
    mock: mockSecondaryFourSlice(),
    name: "secondary four",
    Slice: SecondaryFourSlice,
  },
  {
    mock: mockSecondaryOneAndFourSlice(),
    name: "secondary one and four",
    Slice: SecondaryOneAndFourSlice,
  },
  {
    mock: mockSecondaryTwoAndTwoSlice(),
    name: "secondary two and two",
    Slice: SecondaryTwoAndTwoSlice,
  },
  {
    mock: mockSecondaryTwoNoPicAndTwoSlice(),
    name: "secondary two no pic and two",
    Slice: SecondaryTwoNoPicAndTwoSlice,
  },
  {
    mock: mockListTwoAndSixNoPicSlice(),
    name: "list two and six no pic",
    Slice: ListTwoAndSixNoPicSlice,
  },
  {
    mock: mockLeadersSlice(),
    name: "leaders",
    Slice: LeadersSlice,
  },
  {
    mock: mockCommentLeadAndCartoonSlice(),
    name: "Comment lead and cartoon",
    Slice: CommentLeadAndCartoonSlice,
  },
  {
    mock: { puzzles: getPuzzleSlices(3) },
    name: "puzzle",
    Slice: PuzzleSlice,
  },
  {
    mock: { slotName: "native-section-ad" },
    name: "sectionad",
    Slice: SectionAd,
  },
];

const slicesWithPubLogo = [
  {
    mock: mockSecondaryOneAndFourSlice(),
    name: "secondary one and four",
    Slice: SecondaryOneAndFourSlice,
  },
  {
    mock: mockLeadersSlice(),
    name: "leaders",
    Slice: LeadersSlice,
  },
];

jest.spyOn(Dimensions, "get").mockReturnValue({ width: 500, height: 700 });

const testsWithPublictaion = publicationName =>
  slicesWithPubLogo.map(({ mock, name, Slice }) => ({
    name,
    test: () => {
      const output = TestRenderer.create(
        <Responsive>
          <SectionContext.Provider value={{ publicationName }}>
            <Slice onPress={() => null} slice={mock} />
          </SectionContext.Provider>
        </Responsive>,
      );

      expect(output).toMatchSnapshot();
    },
  }));

export default () => {
  const commonTests = slices.map(({ mock, name, Slice }) => ({
    name,
    test: () => {
      const output = TestRenderer.create(
        <Responsive>
          <Slice onPress={() => null} slice={mock} />
        </Responsive>,
      );

      expect(output).toMatchSnapshot();
    },
  }));

  const testsForTimes = testsWithPublictaion("TIMES");

  const testsForST = testsWithPublictaion("SUNDAYTIMES");

  iterator(commonTests);
  iterator(testsForST);
  iterator(testsForTimes);
};
