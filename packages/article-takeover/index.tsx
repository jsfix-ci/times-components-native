/* eslint-disable react/require-default-props */
import React, { FC, useEffect, useRef } from "react";
import { NativeModules, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import { ResponsiveContext } from "@times-components-native/responsive";
import Context from "@times-components-native/responsive/src/context";

interface Props {
  article: {
    url: string;
  };
}

/**
 * NOTES:
 *
 * I have an ios branch https://github.com/newsuk/nuk-tnl-app-ios-universal/tree/josh/auth-cookie-test
 * that is needed to get the authCookie value from the bridge. Not 100% if this will be needed, but it might be....
 *
 * authCookie gives acs_tnl and sacs_tnl values in a string. acs_tnl is what the web team think should authenticate the user - it seems like this sometimes works but the suspicion is there's a race condition meaning it doesn't always get set before the page request is made.
 *
 * sourcepointAuthId is the CPN number
 *
 * consentString is unused, but I've left in in case it's useful
 */

const ArticleTakeover: FC<Props> = ({ article }) => {
  const webview = useRef();
  const {
    sourcepointAuthId,
    userId,
    authCookie,
    consentString,
  } = NativeModules.ReactConfig;

  /** Note: left this in case it's useful */
  useEffect(() => {
    console.log("authCookie:", authCookie);
    console.log("consentString:", consentString);
    console.log("sourcepointAuthId:", sourcepointAuthId);
  }, [authCookie, userId, consentString, sourcepointAuthId]);

  const scriptToInject = `(function() { 
    window._sp_ = {
      "config":{
        "mmsDomain": "https://cmp.thetimes.co.uk",
        "wrapperAPIOrigin": "https://wrapper-api.sp-prod.net/tcfv2",
        "accountId": 259,
        "propertyId": 5049,
        "authId": "${String(sourcepointAuthId)}",
      }
    }
    document.cookie = 'authId=${String(sourcepointAuthId)}; ${String(
    authCookie,
  )}'
  })();`;

  return (
    <ResponsiveContext.Consumer>
      {() => (
        <Context.Consumer>
          {() => (
            <ScrollView
              style={{
                width: "100%",
                minHeight: 600,
              }}
            >
              {article?.url ? (
                <WebView
                  ref={webview}
                  source={{
                    uri:
                      "https://www.thetimes.co.uk/article/cambridge-streets-named-black-alumni-qbrxjfw68" +
                      "?enableEmbeddedMode=true",
                  }}
                  injectedJavaScriptBeforeContentLoaded={scriptToInject}
                  style={{
                    flex: 1,
                    width: "100%",
                    minHeight: 600,
                  }}
                  startInLoadingState={true}
                  sharedCookiesEnabled
                />
              ) : (
                <></>
              )}
            </ScrollView>
          )}
        </Context.Consumer>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default ArticleTakeover;
