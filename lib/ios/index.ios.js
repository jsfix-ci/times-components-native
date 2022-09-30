import { AppRegistry } from "react-native";
import NewRelic from "newrelic-react-native-agent";
import { appToken, agentConfiguration, version } from "../../newRelicConfig";
import Page from "@times-components-native/pages";
import { FontStorage } from "@times-components-native/typeset";
import ttf from "../../fonts";
import { logboxSetup } from "@times-components-native/utils/src/logbox-setup";

logboxSetup();

NewRelic.startAgent(appToken, agentConfiguration);
NewRelic.setJSAppVersion(version);
console.log('NewRelic isAgentStarted=' + NewRelic.isAgentStarted());

Object.keys(ttf).forEach(fontName => {
  FontStorage.registerFont(fontName, ttf[fontName]);
});

AppRegistry.registerComponent("ArticlePage", () => Page("Article"));
AppRegistry.registerComponent("AuthorProfilePage", () => Page("AuthorProfile"));
AppRegistry.registerComponent("Section", () => Page("Section"));
AppRegistry.registerComponent("TopicPage", () => Page("Topic"));
AppRegistry.registerComponent("Search", () => Page("Search"));
