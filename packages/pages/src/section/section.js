import React, { Component } from "react";
import { AppState, DeviceEventEmitter, NativeModules } from "react-native";
import PropTypes from "prop-types";

import { SectionContext } from "@times-components-native/context";
import Section from "@times-components-native/section";
import trackSection from "./track-section";
import { RemoteConfigProvider } from "@times-components-native/remote-config";

const {
  getOpenedPuzzleCount,
  getSavedArticles,
  getSectionData,
  onArticlePress: onArticlePressBridge,
  onLinkPress: onLinkPressBridge,
  onPuzzleBarPress = () => null,
  onPuzzlePress: onPuzzlePressBridge,
  onArticleSavePress: onArticleSavePressBridge,
} = NativeModules.SectionEvents || {
  onArticlePress: () => null,
  onLinkPress: () => null,
  onPuzzleBarPress: () => null,
  onPuzzlePress: () => null,
};

const onArticlePress = ({ id, isPuff = false }) =>
  onArticlePressBridge(id, isPuff);
const onLinkPress = ({ url, isExternal = true }) =>
  onLinkPressBridge(url, isExternal);

const onPuzzlePress = ({ id, title, url }) =>
  onPuzzlePressBridge(url, title, id);

class SectionPage extends Component {
  constructor(props) {
    super(props);

    const existingReadArticles =
      props &&
      props.readArticles.map((articleId) => ({
        id: articleId,
        highlight: false,
      }));

    const { section } = this.props;
    this.state = {
      recentlyOpenedPuzzleCount: props ? props.recentlyOpenedPuzzleCount : 0,
      readArticles: existingReadArticles || [],
      savedArticles: null,
      section,
      hasDynamicBullets: props.hasDynamicBullets,
    };
    this.onAppStateChange = this.onAppStateChange.bind(this);
    this.toggleArticleSaveStatus = this.toggleArticleSaveStatus.bind(this);
    this.syncAppData = this.syncAppData.bind(this);
    this.updateSectionData = this.updateSectionData.bind(this);
    this.onArticleSavePress = this.onArticleSavePress.bind(this);
    this.updateReadArticles = this.updateReadArticles.bind(this);
    this.isSyncing = false;
  }

  componentDidMount() {
    this.appListener = AppState.addEventListener(
      "change",
      this.onAppStateChange,
    );
    this.updateSASubscription = DeviceEventEmitter.addListener(
      "updateSavedArticles",
      this.syncAppData,
    );
    this.updateSDSubscription = DeviceEventEmitter.addListener(
      "updateSectionData",
      this.updateSectionData,
    );
    this.updateRASubscription = DeviceEventEmitter.addListener(
      "updateReadArticles",
      this.updateReadArticles,
    );
    this.syncAppData();
  }

  componentWillUnmount() {
    this.appListener && this.appListener.remove();
    this.updateSASubscription.remove();
    this.updateSDSubscription.remove();
    this.updateRASubscription.remove();
  }

  onAppStateChange(nextAppState) {
    if (nextAppState === "active") {
      this.syncAppData();
    }
  }

  onArticleSavePress(save, articleId) {
    this.toggleArticleSaveStatus(save, articleId);

    onArticleSavePressBridge(save, articleId).catch(() => {
      this.toggleArticleSaveStatus(!save, articleId);
    });
  }

  async syncAppData() {
    const {
      section: { name },
    } = this.state;

    if (this.isSyncing) {
      return;
    }

    this.isSyncing = true;

    try {
      if (name === "PuzzleSection" && getOpenedPuzzleCount) {
        const count = await getOpenedPuzzleCount();

        this.setState({ recentlyOpenedPuzzleCount: count });
      }

      if (getSavedArticles) {
        const articleIds = await getSavedArticles();
        const savedArticles = !articleIds
          ? null
          : articleIds.reduce((saved, id) => {
            // eslint-disable-next-line no-param-reassign
            saved[id] = true;

            return saved;
          }, {});

        this.setState({
          savedArticles,
        });
      }
    } finally {
      this.isSyncing = false;
    }
  }

  updateSectionData() {
    const {
      section: { id },
    } = this.props;
    if (getSectionData) {
      getSectionData(id).then((data) => {
        this.setState({ section: JSON.parse(data) });
      });
    }
  }

  toggleArticleSaveStatus(save, articleId) {
    const { savedArticles } = this.state;
    savedArticles[articleId] = save || undefined;
    this.setState({ savedArticles });
  }

  updateReadArticles(readArticles) {
    this.setState({ readArticles });
  }

  render() {
    const { publicationName, remoteConfig, puzzlesMetaData } = this.props;
    const {
      hasDynamicBullets,
      readArticles,
      recentlyOpenedPuzzleCount,
      savedArticles,
      section,
    } = this.state;

    return (
      <SectionContext.Provider
        value={{
          onArticleSavePress: onArticleSavePressBridge
            ? this.onArticleSavePress
            : null,
          publicationName,
          readArticles,
          recentlyOpenedPuzzleCount,
          savedArticles,
          hasDynamicBullets,
        }}
      >
        <RemoteConfigProvider config={remoteConfig}>
          <Section
            adConfig={{ sectionName: section.name }}
            analyticsStream={trackSection}
            onArticlePress={onArticlePress}
            onLinkPress={onLinkPress}
            onPuzzleBarPress={onPuzzleBarPress}
            onPuzzlePress={onPuzzlePress}
            publicationName={publicationName}
            section={section}
            puzzlesMetaData={puzzlesMetaData}
          />
        </RemoteConfigProvider>
      </SectionContext.Provider>
    );
  }
}

SectionPage.propTypes = {
  publicationName: PropTypes.string,
  recentlyOpenedPuzzleCount: PropTypes.number,
  section: PropTypes.shape({}),
  hasDynamicBullets: PropTypes.bool,
  readArticles: PropTypes.arrayOf(PropTypes.string),
};

SectionPage.defaultProps = {
  publicationName: "TIMES",
  recentlyOpenedPuzzleCount: 0,
  section: null,
  hasDynamicBullets: false,
  readArticles: [],
};

export default SectionPage;
