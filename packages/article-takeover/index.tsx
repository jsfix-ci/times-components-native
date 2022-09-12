/* eslint-disable react/require-default-props */
import React, { FC, useEffect, useRef, useState } from "react";
import { NativeModules, ScrollView, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { ResponsiveContext } from "@times-components-native/responsive";
import Context from "@times-components-native/responsive/src/context";

interface Props {
  article: {
    url: string;
  };
}

const ArticleTakeover: FC<Props> = ({ article }) => {
  // authCookie result is acs_tnl=tid%3D78dc3cb9-aef7-4b72-b317-2215ad2be19d%26eid%3DAAAA063161001%26e%3D1%26a%3DSm9zaCBPbGRoYW0%3D%26u%3D73cac147-0c33-4acb-b66d-4d0274395a63%26t%3D1662718375%26h%3Dcc47779938fed01098552f7e53e03265; sacs_tnl=4d434a8f-bb92-40b3-8cf3-70d310bd4e37;
  const { sourcepointAuthId, userId, authCookie } = NativeModules.ReactConfig;

  useEffect(() => {
    console.log("authCookie +++", authCookie);
  }, [authCookie]);

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


    document.cookie = 'google_swg=true; exps=; _sp_v1_csv=null; _sp_v1_lt=1:; nuk-consent-personalisation=1; nukt_sp_consent=ABCDEFGHIJ; nukt_sp_consent_v2=ABCDEFGHIJ%7CNOPQRSTUV; consentUUID=47442b86-a2b2-424d-9079-de79794f7228_4_6_10; _sp_v1_opt=1:login|true:last_id|11:; anon_article_GB=17; nuk_zephr_decisions=e30=; _sp_v1_ss=1:H4sIAAAAAAAAAItWqo5RKimOUbKKRmbkgRgGtbE6MUqpIGZeaU4OkF0CVlBdi1tCSQduIFSKkLJoYtRT0T5qKIsFAHwq1ZY3AQAA; _sp_v1_consent=1!1:1:1:0:0:0; liveagent_oref=; liveagent_sid=8711cf4a-2034-45ed-ae08-6582b10e7e6a; liveagent_vc=2; liveagent_ptid=8711cf4a-2034-45ed-ae08-6582b10e7e6a; nuk_customer_location_hint=UK; nuk_customer_country_code=GB; nuk_customer_region_code=ENG; optimizelyEndUserId=oeu1662718451244r0.7077487615691378; sampledUser=false; rc_id2=0182828a18d1000c71c4efc9f27504079003407100bd0; nuPixelApp=j%3A%7B%22id%22%3A%22268ca510-3028-11ed-93d1-f1521d5eda9f%22%7D; _fbp=fb.2.1662718452333.2041327641; LPVID=QyODhhZjEyOWZjODJmNWMy; LPSID-75931016=SzS4t8uaSnChg0Sr3n_8XA; iam_tgt=C%3DGB%3AP%3DE3%3AA%3D2%3AG%3D1; acs_tnl=tid%3Da19575af-3600-4a0f-9588-5ce49afb942c%26eid%3DAAAA063161001%26e%3D1%26a%3DSm9zaCBPbGRoYW0%3D%26u%3D73cac147-0c33-4acb-b66d-4d0274395a63%26t%3D1662718466%26h%3Dca9bdd50d351eb80ab8eed48667f3f84; blaize_jwt=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJjcG5cIjpcIkFBQUEwNjMxNjEwMDFcIixcInByb2R1Y3RzXCI6W1wiVGhlIFRpbWVzIFNpdGUgUHJvZHVjdFwiLFwiVGltZXMgU3BvcnRzIEFwcFwiLFwiVGhlIFRpbWVzIEVQTCBWaWRlbyBQcm9kdWN0XCIsXCJUaGUgU3VuZGF5IFRpbWVzIGlQaG9uZSBhcHAgcHJvZHVjdFwiLFwiRW1haWwgQnVsbGV0aW5zIFByb2R1Y3RcIixcIlRoZSBTdW5kYXkgVGltZXMgTW9iaSBQcm9kdWN0XCIsXCJUaGUgU3VuZGF5IFRpbWVzIGlQYWQgYXBwIHByb2R1Y3RcIixcImUtcGFwZXIgUHJvZHVjdFwiLFwiRGFpbHkgQ3Jvc3N3b3JkIFByb2R1Y3RcIixcIlRoZSBTdW5kYXkgVGltZXMgU2l0ZSBQcm9kdWN0XCIsXCJUaGUgVGltZXMgTW9iaSBQcm9kdWN0XCIsXCJUaGUgVGltZXMgaVBhZCBhcHAgUHJvZHVjdFwiLFwiRGlnaXRhbCBTdWJzY3JpcHRpb24gUHJvZHVjdFwiLFwiVGhlIFRpbWVzIGlQaG9uZSBhcHAgcHJvZHVjdFwiLFwiVGltZXMrIG1lbWJlcnNoaXAgYmVuZWZpdHMgUHJvZHVjdFwiXX0iLCJpc3MiOiIudGhldGltZXMuY28udWsiLCJleHAiOjE2NjMzMjMyNjgsImlhdCI6MTY2MjcxODQ2OH0.LnAmhx3ZR6Pnb93mUtZ9HT3iOZW_35HAd1DVMkx79Yk; nukt_reg_type=full%20registration; login_event_fired=true; nukt_lv=1662716854824|||3e9faa86-2fa0-11ed-9b12-7a2e56f7aeb6; utag_main=v_id:0182828a18d1000c71c4efc9f27504079003407100bd0$_sn:19$_se:28$_ss:1$_st:1662994089621$_pn:1%3Bexp-session$ses_id:1662992289621%3Bexp-session; nukt_mem=s=1662992289621|ppn=homepage|ppt=homepage|pps=homepage; _sp_v1_uid=1:816:23f096bf-057d-4356-b878-3cf14535c4e8; _sp_v1_data=2:370905:1662417598:0:28:0:28:0:0:_:-1; authId=${String(
      userId,
    )}; ${authCookie}'


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
              {article?.url && authCookie ? (
                <WebView
                  source={{
                    uri:
                      "https://www.thetimes.co.uk/article/stone-of-destiny-will-travel-to-westminster-for-coronation-tkrnw762l" +
                      "?enableEmbeddedMode=true",
                  }}
                  injectedJavaScriptBeforeContentLoaded={scriptToInject}
                  style={{
                    flex: 1,
                    width: "100%",
                    minHeight: 600,
                  }}
                  startInLoadingState={true}
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
