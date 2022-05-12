import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { LeadOneAndOneSlice } from "@times-components-native/slice-layout";
import { SectionContext } from "@times-components-native/context";
import { TileA, TileB, TileZ, TileColStandard } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class LeadOneAndOne extends PureComponent {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
    this.renderWide = this.renderWide.bind(this);
    this.bullets = Object.keys(this.props.slice)
      .filter((key) => key.toLowerCase().indexOf("bullet") !== -1)
      .filter((key) => this.props.slice[key] !== null)
      .map((bulletKey) => this.props.slice[bulletKey].article);
  }

  renderSmall(breakpoint) {
    const {
      onPress,
      slice: { lead, support },
    } = this.props;
    return (
      <SectionContext.Consumer>
        {({ hasDynamicBullets }) => {
          const bullets = hasDynamicBullets ? this.bullets : [];
          return (
            <LeadOneAndOneSlice
              breakpoint={breakpoint}
              lead={
                <TileA
                  onPress={onPress}
                  tile={lead}
                  tileName="lead"
                  bullets={bullets}
                />
              }
              support={
                <TileB onPress={onPress} tile={support} tileName="support" />
              }
            />
          );
        }}
      </SectionContext.Consumer>
    );
  }

  renderMedium(breakpoint, orientation) {
    const {
      onPress,
      slice: { lead, support },
    } = this.props;

    return (
      <SectionContext.Consumer>
        {({ hasDynamicBullets }) => {
          const bullets = hasDynamicBullets ? this.bullets : [];
          return (
            <LeadOneAndOneSlice
              breakpoint={breakpoint}
              lead={
                <TileColStandard
                  breakpoint={breakpoint}
                  onPress={onPress}
                  tile={lead}
                  tileName="lead"
                  orientation={orientation}
                  bullets={bullets}
                />
              }
              support={
                <TileColStandard
                  breakpoint={breakpoint}
                  onPress={onPress}
                  tile={support}
                  tileName="support"
                  orientation={orientation}
                />
              }
            />
          );
        }}
      </SectionContext.Consumer>
    );
  }

  renderWide(breakpoint, orientation) {
    const {
      onPress,
      slice: { lead, support },
    } = this.props;

    return (
      <SectionContext.Consumer>
        {({ hasDynamicBullets }) => {
          const bullets = hasDynamicBullets ? this.bullets : [];
          return (
            <LeadOneAndOneSlice
              breakpoint={breakpoint}
              lead={
                <TileZ
                  onPress={onPress}
                  tile={lead}
                  breakpoint={breakpoint}
                  tileName="lead"
                  bullets={bullets}
                />
              }
              support={
                <TileColStandard
                  onPress={onPress}
                  tile={support}
                  breakpoint={breakpoint}
                  tileName="support"
                  orientation={orientation}
                />
              }
            />
          );
        }}
      </SectionContext.Consumer>
    );
  }

  render() {
    return (
      <ResponsiveSlice
        renderSmall={this.renderSmall}
        renderMedium={this.renderMedium}
        renderWide={this.renderWide}
      />
    );
  }
}

LeadOneAndOne.propTypes = {
  onPress: PropTypes.func.isRequired,
  slice: PropTypes.shape({
    lead: PropTypes.shape({}).isRequired,
    support: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default LeadOneAndOne;
