type TPuzzleMetaData = {
  id: string;
  isAvailableOffline: boolean;
};

type TCrop32 = {
  ratio: string;
  url: string;
};

type TPuzzleImage = {
  crop32: TCrop32;
};

type TPuzzle = {
  hideOnMobie: boolean;
  id: string;
  image: TPuzzleImage;
  name: string;
  title: string;
  url: string;
};

type TSlice = {
  elementId: string;
  id: string;
  name: string;
  puzzles: TPuzzle[];
};

export interface IProps {
  onPress: () => null;
  slice: TSlice;
  puzzleMetaData: TPuzzleMetaData[];
}
