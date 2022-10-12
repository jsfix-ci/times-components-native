import React from "react";

import { useIsConnected } from "@times-components-native/utils/src/useIsConnected";
import { useResponsiveContext } from "@times-components-native/responsive";
import { getNarrowArticleBreakpoint } from "@times-components-native/styleguide";

import { getSlotConfig } from "./utils";

import DOMContext from "./dom-context";

interface IAdConfig {
  sectionName: string;
  slug: string;
}

type TSlotName = "ad-section" | "ad-inarticle-mpu";

interface IProps {
  adConfig: IAdConfig;
  baseUrl?: string;
  keyId?: string;
  narrowContent?: boolean;
  slotName: TSlotName;
}

function Ad({
  adConfig,
  baseUrl = "https://www.thetimes.co.uk/",
  keyId = "",
  narrowContent = false,
  slotName,
}: IProps) {
  const { orientation, windowWidth } = useResponsiveContext();
  const isConnected = useIsConnected();

  const config = getSlotConfig(slotName, windowWidth, orientation);

  const sizeProps = {
    height: config.maxSizes.height,
    width: narrowContent
      ? getNarrowArticleBreakpoint(windowWidth).content
      : windowWidth,
  };

  return (
    <>
      {!isConnected ? null : (
        <DOMContext
          baseUrl={baseUrl}
          keyId={keyId}
          sectionName={adConfig.sectionName}
          slug={adConfig.slug}
          slotName={slotName}
          {...sizeProps}
        />
      )}
    </>
  );
}

export default Ad;
