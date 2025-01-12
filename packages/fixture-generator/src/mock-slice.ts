import {
  ArticleSlice,
  CommentLeadAndCartoonSlice,
  DailyUniversalRegister,
  DailyUniversalRegisterItem,
  Flag,
  LeadersSlice,
  LeadOneAndFourSlice,
  LeadOneAndOneSlice,
  LeadOneAndTwoSlice,
  LeadOneFullWidthFrontSlice,
  LeadOneFullWidthSlice,
  LeadTwoFrontSlice,
  LeadTwoNoPicAndTwoSlice,
  PuffLiteInput,
  Puzzle,
  SecondaryFourSlice,
  SecondaryOneAndColumnistSlice,
  SecondaryOneAndFourSlice,
  SecondaryOneSlice,
  SecondaryTwoAndTwoSlice,
  SecondaryTwoNoPicAndTwoSlice,
  StandardSlice,
  Tile,
  TwoPicAndSixNoPicSlice,
} from "./types";
import MockPuzzle from "./mock-puzzle";

import MockTile from "./mock-tile";
import MockDailyRegister from "./mock-daily-register";
import MockMarkup from "./mock-markup";
import inTodaysEditionFixture from "@times-components-native/in-todays-edition/fixtures/in-todays-edition.json";

interface LeadOneAndFourSliceWithName extends LeadOneAndFourSlice {
  name: string;
}

interface StandardSliceWithName extends StandardSlice {
  name: string;
}

interface LeadOneFullWidthSliceWithName extends LeadOneFullWidthSlice {
  name: string;
}

interface LeadOneAndOneSliceWithName extends LeadOneAndOneSlice {
  name: string;
}

interface LeadOneAndTwoSliceWithName extends LeadOneAndTwoSlice {
  name: string;
}

interface LeadTwoFrontSliceWithName extends LeadTwoFrontSlice {
  name: string;
}

interface LeadTwoNoPicAndTwoSliceWithName extends LeadTwoNoPicAndTwoSlice {
  name: string;
}

interface SecondaryOneSliceWithName extends SecondaryOneSlice {
  name: string;
}

interface SecondaryOneAndColumnistSliceWithName
  extends SecondaryOneAndColumnistSlice {
  name: string;
}

interface SecondaryOneAndFourSliceWithName extends SecondaryOneAndFourSlice {
  name: string;
}

interface SecondaryFourSliceWithName extends SecondaryFourSlice {
  name: string;
  isConsecutive: boolean;
}

interface SecondaryTwoAndTwoSliceWithName extends SecondaryTwoAndTwoSlice {
  name: string;
}

interface CommentLeadAndCartoonSliceWithName
  extends CommentLeadAndCartoonSlice {
  name: string;
}

interface LeadersSliceWithName extends LeadersSlice {
  name: string;
}

interface SecondaryTwoNoPicAndTwoSliceWithName
  extends SecondaryTwoNoPicAndTwoSlice {
  name: string;
}

interface TwoPicAndSixNoPicSliceWithName extends TwoPicAndSixNoPicSlice {
  name: string;
}

interface PuzzleWithName extends Puzzle {
  name: string;
}

interface LeadOneFullWidthFrontSliceWithName
  extends LeadOneFullWidthFrontSlice {
  name: string;
}

interface SliceOptions {
  hasVideo?: boolean;
}

function getDailyRegisterItem(): DailyUniversalRegisterItem {
  const dailyRegisterItem = new MockDailyRegister().get();
  return {
    title: dailyRegisterItem.title,
    byline: dailyRegisterItem.byline,
    content: dailyRegisterItem.content,
  };
}

function getTiles(count: number): Array<Tile> {
  return new Array(count).fill(0).map(() => new MockTile({}).get());
}

function getVideoTiles(count: number): Array<Tile> {
  return new Array(count)
    .fill(0)
    .map(() => new MockTile({ hasVideo: true }).get());
}

function getDailyRegister(count: number): Array<DailyUniversalRegisterItem> {
  return new Array(count).fill(0).map(() => getDailyRegisterItem());
}

function mockLeadOneAndFourSlice(): LeadOneAndFourSliceWithName {
  const tiles = getTiles(5);

  const leadTile = {
    ...tiles[0],
    article: {
      ...tiles[0].article,
      hasVideo: true,
      label: "short label centered",
    },
  };

  return <LeadOneAndFourSliceWithName>{
    name: "LeadOneAndFourSlice",
    lead: leadTile,
    support1: tiles[1],
    support2: tiles[2],
    support3: tiles[3],
    support4: tiles[4],
    items: tiles,
  };
}

function mockStandardSlice(): StandardSliceWithName {
  const tiles = getTiles(5);
  return <StandardSliceWithName>{
    name: "StandardSlice",
    items: tiles,
  };
}

function mockLeadOneFullWidthSlice(): LeadOneFullWidthSliceWithName {
  const tiles = getTiles(1);
  return <LeadOneFullWidthSliceWithName>{
    name: "LeadOneFullWidthSlice",
    lead: tiles[0],
    items: tiles,
  };
}

// This needs to be replaced once TPA has updated the schema to include InTodaysEdition in the front section.
type InTodaysEditionItem = PuffLiteInput & { leadImage?: any };

interface InTodaysEditionSlice {
  items: InTodaysEditionItem[];
}

function mockInTodaysEditionSlice(): InTodaysEditionSlice {
  return {
    items: inTodaysEditionFixture,
  };
}

function mockLeadOneAndOneSlice(): LeadOneAndOneSliceWithName {
  const tiles = getTiles(2);
  const expirableFlags = [
    {
      type: Flag.Exclusive,
      expiryTime: "2030-03-14T12:00:00.000Z",
    },
    {
      type: Flag.New,
      expiryTime: "2030-03-14T12:00:00.000Z",
    },
    {
      type: Flag.Sponsored,
      expiryTime: "2030-03-14T12:00:00.000Z",
    },
    {
      type: Flag.Updated,
      expiryTime: "2030-03-14T12:00:00.000Z",
    },
  ];
  const leadTile = {
    ...tiles[0],
    article: { ...tiles[0].article, expirableFlags },
  };
  return <LeadOneAndOneSliceWithName>{
    name: "LeadOneAndOneSlice",
    lead: leadTile,
    support: tiles[1],
    items: tiles,
  };
}

function mockLeadOneAndTwoSlice(): LeadOneAndTwoSliceWithName {
  const tiles = getTiles(3);
  return <LeadOneAndTwoSliceWithName>{
    name: "LeadOneAndTwoSlice",
    lead: tiles[0],
    support1: tiles[1],
    support2: tiles[2],
    items: tiles,
  };
}

function mockLeadTwoNoPicAndTwoSlice(): LeadTwoNoPicAndTwoSliceWithName {
  const tiles = getTiles(4);
  return <LeadTwoNoPicAndTwoSliceWithName>{
    name: "LeadTwoNoPicAndTwoSlice",
    lead1: tiles[0],
    lead2: tiles[1],
    support1: tiles[2],
    support2: tiles[3],
    items: tiles,
  };
}

function mockLeadTwoFrontSlice({
  hasVideo = false,
}: SliceOptions): LeadTwoFrontSliceWithName {
  const tiles = hasVideo ? getVideoTiles(2) : getTiles(2);
  const leadTile = {
    ...tiles[0],
    article: {
      ...tiles[0].article,
      content: new MockMarkup().addParagraphs(20).get(),
    },
  };

  return <LeadTwoFrontSliceWithName>{
    name: "LeadTwoFrontSlice",
    lead1: leadTile,
    lead2: tiles[1],
    items: [leadTile, ...tiles.slice(1)],
  };
}

function mockLeadOneAndOneFrontSlice({
  hasVideo = false,
}: SliceOptions): LeadOneAndOneSliceWithName {
  const tiles = hasVideo ? getVideoTiles(2) : getTiles(2);
  const leadTile = {
    ...tiles[0],
    article: {
      ...tiles[0].article,
      content: new MockMarkup().addParagraphs(20).get(),
    },
  };
  const supportTile = {
    ...tiles[1],
    article: {
      ...tiles[1].article,
      template: "maincomment",
      content: new MockMarkup().addParagraphs(20).get(),
    },
  };
  return <LeadOneAndOneSliceWithName>{
    name: "LeadOneAndOneFrontSlice",
    lead: leadTile,
    support: supportTile,
    items: [leadTile, supportTile],
  };
}

function mockLeadOneFullWidthFrontSlice({
  hasVideo = false,
}: SliceOptions): LeadOneFullWidthFrontSliceWithName {
  const tiles = hasVideo ? getVideoTiles(1) : getTiles(1);
  const leadTile = {
    ...tiles[0],
    article: {
      ...tiles[0].article,
      content: new MockMarkup().addParagraphs(20).get(),
    },
  };
  return <LeadOneFullWidthFrontSliceWithName>{
    name: "LeadOneFullWidthFrontSlice",
    lead: leadTile,
    items: [leadTile],
  };
}

function mockSecondaryOneSlice(): SecondaryOneSliceWithName {
  const tiles = getTiles(1);
  return <SecondaryOneSliceWithName>{
    name: "SecondaryOneSlice",
    secondary: tiles[0],
    items: tiles,
  };
}

function mockSecondaryOneAndColumnistSlice(): SecondaryOneAndColumnistSliceWithName {
  const tiles = getTiles(2);
  return <SecondaryOneAndColumnistSliceWithName>{
    name: "SecondaryOneAndColumnistSlice",
    secondary: tiles[0],
    columnist: tiles[1],
    items: tiles,
  };
}

function mockSecondaryOneAndFourSlice(): SecondaryOneAndFourSliceWithName {
  const tiles = getTiles(5);
  const secondaryTile = {
    ...tiles[0],
    strapline: "Readers share their top tips",
  };
  return <SecondaryOneAndFourSliceWithName>{
    name: "SecondaryOneAndFourSlice",
    secondary: secondaryTile,
    support1: tiles[1],
    support2: tiles[2],
    support3: tiles[3],
    support4: tiles[4],
    items: tiles,
  };
}

function mockSecondaryFourSlice(
  { isConsecutive } = {
    isConsecutive: false,
  },
): SecondaryFourSliceWithName {
  const tiles = getTiles(4);
  return <SecondaryFourSliceWithName>{
    name: "SecondaryFourSlice",
    secondary1: tiles[0],
    secondary2: tiles[1],
    secondary3: tiles[2],
    secondary4: tiles[3],
    items: tiles,
    isConsecutive,
  };
}

function mockSecondaryTwoNoPicAndTwoSlice(): SecondaryTwoNoPicAndTwoSliceWithName {
  const tiles = getTiles(4);
  return <SecondaryTwoNoPicAndTwoSliceWithName>{
    name: "SecondaryTwoNoPicAndTwoSlice",
    secondary1: tiles[0],
    secondary2: tiles[1],
    support1: tiles[2],
    support2: tiles[3],
    items: tiles,
  };
}

function mockSecondaryTwoAndTwoSlice(): SecondaryTwoAndTwoSliceWithName {
  const tiles = getTiles(4);
  const secondaryOneTile = {
    ...tiles[0],
    article: {
      ...tiles[0].article,
      hasVideo: true,
      label: "long label | video icon too",
    },
  };

  const secondaryTwoTile = {
    ...tiles[1],
    article: {
      ...tiles[1].article,
      label: "long label | by some author",
    },
  };

  return <SecondaryTwoAndTwoSliceWithName>{
    name: "SecondaryTwoAndTwoSlice",
    secondary1: secondaryOneTile,
    secondary2: secondaryTwoTile,
    support1: tiles[2],
    support2: tiles[3],
    items: tiles,
  };
}

function mockListTwoAndSixNoPicSlice(): TwoPicAndSixNoPicSliceWithName {
  const tiles = getTiles(8);
  return <TwoPicAndSixNoPicSliceWithName>{
    name: "TwoPicAndSixNoPicSlice",
    lead1: tiles[0],
    lead2: tiles[1],
    support1: tiles[2],
    support2: tiles[3],
    support3: tiles[4],
    support4: tiles[5],
    support5: tiles[6],
    support6: tiles[7],
    items: tiles,
  };
}

function mockLeadersSlice(): LeadersSliceWithName {
  const tiles = getTiles(3);
  return <LeadersSliceWithName>{
    name: "LeadersSlice",
    leader1: tiles[0],
    leader2: tiles[1],
    leader3: tiles[2],
    items: tiles,
  };
}

function mockCommentLeadAndCartoonSlice(): CommentLeadAndCartoonSliceWithName {
  const tiles = getTiles(2);
  const leadTile = {
    ...tiles[0],
    article: { ...tiles[0].article, section: "opinion" },
  };
  return <CommentLeadAndCartoonSliceWithName>{
    name: "CommentLeadAndCartoonSlice",
    lead: leadTile,
    cartoon: tiles[1],
    items: tiles,
  };
}

function mockDailyRegisterSlice(): DailyUniversalRegister {
  const dailyRegister = getDailyRegister(4);
  return <DailyUniversalRegister>{
    briefing: dailyRegister[0],
    onThisDay: dailyRegister[1],
    natureNotes: dailyRegister[2],
    birthdaysToday: dailyRegister[3],
    items: dailyRegister,
  };
}

function mockArticleSlice(count: number): ArticleSlice {
  return { items: getTiles(count), sections: [] };
}

function mockPuzzleSlice(hideOnMobile: boolean = false): Puzzle {
  return <PuzzleWithName>{
    name: "Puzzle",
    ...new MockPuzzle(hideOnMobile).get(),
  };
}

export default mockArticleSlice;
export {
  mockCommentLeadAndCartoonSlice,
  mockDailyRegisterSlice,
  mockInTodaysEditionSlice,
  mockLeadOneAndFourSlice,
  mockStandardSlice,
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockLeadOneAndTwoSlice,
  mockLeadTwoNoPicAndTwoSlice,
  mockLeadersSlice,
  mockListTwoAndSixNoPicSlice,
  mockSecondaryOneSlice,
  mockSecondaryOneAndColumnistSlice,
  mockSecondaryOneAndFourSlice,
  mockSecondaryFourSlice,
  mockSecondaryTwoAndTwoSlice,
  mockSecondaryTwoNoPicAndTwoSlice,
  mockPuzzleSlice,
  mockLeadTwoFrontSlice,
  mockLeadOneAndOneFrontSlice,
  mockLeadOneFullWidthFrontSlice,
};
