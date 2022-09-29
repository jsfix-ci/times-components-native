import { AppRegistry } from "react-native";
import Page from "@times-components-native/pages";
import { FontStorage } from "@times-components-native/typeset";
import NRMAModularAgentWrapper from 'newrelic-react-native-agent';
import ttf from "../../fonts";
import { appToken, agentConfiguration, version } from '../../newRelicConfig'

NRMAModularAgentWrapper.startAgent(appToken, agentConfiguration);
NRMAModularAgentWrapper.setJSAppVersion(version);
console.log(NRMAModularAgentWrapper.isAgentStarted());

Object.keys(ttf).forEach(fontName => {
  FontStorage.registerFont(fontName, ttf[fontName]);
});

throw new Error('jaime testing new relic from')

AppRegistry.registerComponent("Article", () => Page("Article"));
AppRegistry.registerComponent("AuthorProfile", () => Page("AuthorProfile"));
AppRegistry.registerComponent("Section", () => Page("Section"));
AppRegistry.registerComponent("Topic", () => Page("Topic"));
AppRegistry.registerComponent("Search", () => Page("Search"));
