import React, { PureComponent } from "react";
import { Dimensions, View, Platform } from "react-native";
import PropTypes from "prop-types";
import fixtures from "@times-components-native/interactive-wrapper/fixtures";

import { ResponsiveSlice } from "../shared";
import {
  InteractiveWrapper,
  WebviewWrapper,
} from "@times-components-native/interactive-wrapper";

import styleFactory from "@times-components-native/article-skeleton/src/styles/article-body";

// import { useResponsiveContext } from "@times-components-native/responsive";

const interactiveProps = {
  attributes: {
    chaptercounter: "Chapter%20one",
    heading: "Xxxx%20xxxxxx%20xxxx%20xxxxx%20",
    standfirst:
      "Xxxx%20xxxxxx%20xxxx%20xxxxx%20xxxxxxxx%20xxxxxx%20xxxx%20xx%20xxxxxxxx",
  },
  element: "chapter-header",
  id: "a0534eee-682e-4955-8e1e-84b428ef1e79",
  source:
    "//components.timesdev.tools/lib2/times-chapter-header-1.0.0/chapter-header.html",
};

class LeadOneFullWidthSlice extends PureComponent {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
  }

  renderSmall() {
    // const {
    //   slice: { lead },
    //   onPress,
    // } = this.props;
    return <InteractiveWrapper {...interactiveProps} />;
    //    return <TileA onPress={onPress} tile={lead} tileName="lead" />;
  }

  renderMedium(breakpoint) {
    // const {
    //   slice: { lead },
    //   onPress,
    // } = this.props;
    // return <InteractiveWrapper {...interactiveProps} />;
    // return (
    //   <TileR
    //     breakpoint={breakpoint}
    //     onPress={onPress}
    //     tile={lead}
    //     tileName="lead"
    //   />
    // );
    const { fontScale } = Dimensions.get("window");
    // const { narrowArticleBreakpoint } = useResponsiveContext();
    const styles = styleFactory({
      // scale,
      // narrowContent,
      fontScale,
      // narrowArticleBreakpoint,
    });
    const key = "interactive=-test";
    console.log(
      "🚀 ~ file: index.js ~ line 67 ~ LeadOneFullWidthSlice ~ renderMedium ~ key",
      key,
    );
    const interactiveProps = fixtures.testOctober;
    console.log(
      "🚀 ~ file: index.js ~ line 73 ~ LeadOneFullWidthSlice ~ renderMedium ~ interactiveProps",
      interactiveProps,
    );

    return (
      <View
        key={key}
        style={[
          // styles.interactiveContainer,
          // isArticleTablet && styles.interactiveContainerTablet,
          styles.interactiveContainerFullWidth,
        ]}
      >
        {Platform.OS === "android" ? (
          <InteractiveWrapper config={interactiveProps} {...interactiveProps} />
        ) : (
          <WebviewWrapper config={interactiveProps} {...interactiveProps} />
        )}
      </View>
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderSmall={this.renderMedium}
        renderMedium={this.renderMedium}
      />
    );
  }
}

LeadOneFullWidthSlice.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({ lead: PropTypes.shape({}).isRequired }).isRequired,
};

export default LeadOneFullWidthSlice;
