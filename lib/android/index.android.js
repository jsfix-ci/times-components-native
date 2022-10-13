import { AppRegistry } from "react-native";
import Page from "@times-components-native/pages";
import { FontStorage } from "@times-components-native/typeset";
import NewRelic from 'newrelic-react-native-agent';
import ttf from "../../fonts";
import { appToken, agentConfiguration, version } from '../../newRelicConfig'

NewRelic.startAgent(appToken, agentConfiguration);
NewRelic.setJSAppVersion(version);
console.log('isAgentStarted' + NewRelic.isAgentStarted());

Object.keys(ttf).forEach(fontName => {
  FontStorage.registerFont(fontName, ttf[fontName]);
});



AppRegistry.registerComponent("Article", () => Page("Article"));
AppRegistry.registerComponent("AuthorProfile", () => Page("AuthorProfile"));
AppRegistry.registerComponent("Section", () => Page("Section"));
AppRegistry.registerComponent("Topic", () => Page("Topic"));
AppRegistry.registerComponent("Search", () => Page("Search"));
