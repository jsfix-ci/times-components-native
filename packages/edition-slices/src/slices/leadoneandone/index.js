import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { LeadOneAndOneSlice } from "@times-components-native/slice-layout";
import { TileA, TileB, TileZ, TileColStandard } from "../../tiles";
import { ResponsiveSlice } from "../shared";

class LeadOneAndOne extends PureComponent {
  constructor(props) {
    super(props);
    this.renderSmall = this.renderSmall.bind(this);
    this.renderMedium = this.renderMedium.bind(this);
    this.renderWide = this.renderWide.bind(this);
    this.bullets = Object.keys(this.props.slice)
      .filter(key => key.toLowerCase().indexOf("bullet") !== -1)
      .filter(key => this.props.slice[key] !== null)
      .sort((a, b) => a.localeCompare(b))
      .map(bulletKey => this.props.slice[bulletKey].article);
  }

  renderSmall(breakpoint) {
    const {
      onPress,
      slice: { lead, support },
    } = this.props;
    return (
      <LeadOneAndOneSlice
        breakpoint={breakpoint}
        lead={
          <TileA
            onPress={onPress}
            tile={lead}
            tileName="lead"
            bullets={this.bullets}
          />
        }
        support={<TileB onPress={onPress} tile={support} tileName="support" />}
      />
    );
  }

  renderMedium(breakpoint, orientation) {
    const {
      onPress,
      slice: { lead, support },
    } = this.props;

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
            bullets={this.bullets}
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
  }

  renderWide(breakpoint, orientation) {
    const {
      onPress,
      slice: { lead, support },
    } = this.props;

    return (
      <LeadOneAndOneSlice
        breakpoint={breakpoint}
        lead={
          <TileZ
            onPress={onPress}
            tile={lead}
            breakpoint={breakpoint}
            tileName="lead"
            bullets={this.bullets}
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
