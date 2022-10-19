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

 const error = new Error('spongebobjaime')

// NewRelic.recordError(error);

  /**
   * Creates and records a custom event, for use in New Relic Insights.
   * The event includes a list of attributes, specified as a map.
   * @param eventType {string} The type of event.
   * @param eventName {string} Use this parameter to name the event.
   * @param attributes {Map<string, string|number>} A map that includes a list of attributes.
   */
  NewRelic.setUserId('XXXX-1982-1982')
  NewRelic.recordCustomEvent('spongebobjaime', { foo: 'bar'});
  NewRelic.setAttribute('developer', 'jaglop');
  // NewRelic.recordCustomEvent('error', 'spongebobjaime', { foo: 'bar'})



  NewRelic.NRMAModularAgentWrapper.execute(
        "recordStack",
        "Pages" + error.name,
        error.message + "\n" + error.cause,
        // errorInfo.componentStack + "\n\n\n" + error.stack,
        error.stack,
        false,//isFatal,
        NewRelic.JSAppVersion,
      );

// throw


AppRegistry.registerComponent("Article", () => Page("Article"));
AppRegistry.registerComponent("AuthorProfile", () => Page("AuthorProfile"));
AppRegistry.registerComponent("Section", () => Page("Section"));
AppRegistry.registerComponent("Topic", () => Page("Topic"));
AppRegistry.registerComponent("Search", () => Page("Search"));
