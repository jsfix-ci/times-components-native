import React from "react";
import { View } from "react-native";
import { useIsConnected } from "@times-components-native/utils/src/useIsConnected";
import { editionBreakpoints } from "@times-components-native/styleguide";
import stylesFactory from "./styles";
import { ResponsiveSlice } from "../shared";
import { TileAJ, TileAK } from "../../tiles";
import { IProps } from "./types";

function Puzzle({ onPress, slice, puzzleMetaData }: IProps) {
  const { puzzles } = slice;
  const isConnected = useIsConnected();

  const getOfflineAvailability = (puzzleId: string) => {
    const pmd = puzzleMetaData || [];
    let isAvailableOffline = false;
    let i = 0;
    for (; i < pmd.length; i++) {
      const puzzle = pmd[i];
      if (puzzle.id.toLowerCase() === puzzleId) {
        isAvailableOffline = puzzle.isAvailableOffline;
        break;
      }
    }
    return isAvailableOffline;
  };

  const renderPuzzles = (breakpoint: string) => {
    const { container, tileContainer } = stylesFactory(breakpoint);
    return (
      // @ts-ignore
      <View style={container}>
        {puzzles.map(({ id, title, url, image }) => {
          const isAvailableOffline = getOfflineAvailability(id.toLowerCase());
          const isOffline = isAvailableOffline ? false : !isConnected;
          return (
            <View style={tileContainer} key={`puzzleItem-${id}`}>
              {breakpoint === editionBreakpoints.small ? (
                <TileAJ
                  id={id}
                  image={image}
                  onPress={onPress}
                  title={title}
                  url={url}
                  isOffline={isOffline}
                />
              ) : (
                <TileAK
                  id={id}
                  image={image}
                  onPress={onPress}
                  title={title}
                  url={url}
                  breakpoint={breakpoint}
                  isOffline={isOffline}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <ResponsiveSlice renderSmall={renderPuzzles} renderMedium={renderPuzzles} />
  );
}

export default Puzzle;
