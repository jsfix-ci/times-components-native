/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useResponsiveContext } from "@times-components-native/responsive";
import { getNarrowArticleBreakpoint } from "@times-components-native/styleguide";

import { getPrebidSlotConfig, getSlotConfig, prebidConfig } from "./utils";
import adInit from "./utils/ad-init";
import AdContainer from "./ad-container";
import DOMContext from "./dom-context";
import { defaultProps, propTypes } from "./ad-prop-types";
import styles from "./styles";

const determineData = (
  config,
  { contextUrl, orientation, screenWidth, slotName, adConfig },
) => {
  const allSlotConfigs = adConfig.globalSlots
    .concat(adConfig.bidderSlots)
    .map((slot) => getSlotConfig(slot, screenWidth, orientation));

  const slots = adConfig.bidderSlots.map((slot) =>
    getPrebidSlotConfig(
      slot,
      adConfig.slotTargeting.section,
      config.maxSizes.width,
      adConfig.biddersConfig.bidders,
      orientation,
    ),
  );

  return {
    adUnit: adConfig.adUnit,
    allSlotConfigs: allSlotConfigs || slots,
    bidInitialiser: adConfig.bidInitialiser || false,
    config,
    contextUrl,
    debug: adConfig.debug || false,
    disableAds: adConfig.disabled || false,
    networkId: adConfig.networkId,
    pageTargeting: adConfig.pageTargeting,
    prebidConfig: Object.assign(prebidConfig, {
      bidders: adConfig.biddersConfig.bidders,
      bucketSize: adConfig.biddersConfig.bucketSize,
      maxBid: adConfig.biddersConfig.maxBid,
      minPrice: adConfig.biddersConfig.minPrice,
      timeout: adConfig.biddersConfig.timeout,
    }),
    section: adConfig.slotTargeting.section,
    sizingMap: config.mappings,
    slotName,
    slots,
    slotTargeting: adConfig.slotTargeting,
  };
};

export const AdBase = ({
  adConfig,
  contextUrl,
  baseUrl,
  display,
  isLoading,
  narrowContent,
  screenWidth,
  style,
  slotName,
  orientation,
  width,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isAdReady, setIsAdReady] = useState(false);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let mounted = true;
    let unsubscribe = null;
    NetInfo.fetch()
      .then((state) => {
        if (mounted) setOffline(!state.isConnected);
      })
      .then(() => {
        unsubscribe = NetInfo.addEventListener((state) => {
          if (state.isConnected && this.state.offline)
            if (mounted) setOffline(false);
        });
      });
    return () => {
      mounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const setAdReady = () => setIsAdReady(true);
  const setAdError = () => setHasError(true);

  const config = getSlotConfig(slotName, width || screenWidth, orientation);
  const data = determineData(config, {
    contextUrl,
    orientation,
    screenWidth,
    slotName,
    adConfig,
  });

  if (hasError || offline) return null;

  const sizeProps =
    !isAdReady || hasError
      ? { width: 0 }
      : {
          width:
            width ||
            (narrowContent
              ? getNarrowArticleBreakpoint(screenWidth).content
              : screenWidth),
        };

  const isInline = display === "inline";

  return (
    <View
      style={[styles.container, style, isInline && styles.inlineAd]}
      testID="article-advertisement"
    >
      {isInline && (
        <View style={[styles.inlineAdTitle, { width: sizeProps.width }]}>
          <Text style={styles.inlineAdTitleText}>Advertisement</Text>
        </View>
      )}
      {!isLoading && (
        <DOMContext
          baseUrl={baseUrl}
          data={data}
          init={adInit}
          onRenderComplete={setAdReady}
          onRenderError={setAdError}
          isInline={isInline}
          maxHeight={config.maxSizes.height}
          {...sizeProps}
        />
      )}
    </View>
  );
};

const Ad = (props) => {
  const { windowWidth, orientation } = useResponsiveContext();
  return (
    <AdBase {...props} screenWidth={windowWidth} orientation={orientation} />
  );
};

Ad.propTypes = propTypes;
Ad.defaultProps = defaultProps;

export { AdContainer };
export default Ad;
