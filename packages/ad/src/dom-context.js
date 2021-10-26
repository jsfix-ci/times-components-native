import React, { PureComponent } from "react";
import { View, Linking, Platform } from "react-native";
import { WebView } from "react-native-webview";
import { Viewport } from "@skele/components";
import DeviceInfo from "react-native-device-info";
import logger from "./utils/logger";
import { propTypes, defaultProps } from "./dom-context-prop-types";
import styles, { calculateViewportVisible } from "./styles/index";

const ViewportAwareView = Viewport.Aware(View);

class DOMContext extends PureComponent {
  static hasDifferentOrigin(url, baseUrl) {
    return url && url.indexOf(baseUrl) === -1 && url.indexOf("://") > -1;
  }

  static openURLInBrowser(url) {
    console.log("OPEN IN BROWSER: ", url);
    return Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          return console.error("Cant open url", url); // eslint-disable-line no-console
        }
        return Linking.openURL(url);
      })
      .catch((err) => console.error("An error occurred", err)); // eslint-disable-line no-console
  }

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      height: props.maxHeight + styles.containerAdditionalHeight.height,
    };
  }

  componentDidMount() {
    this.deviceInfo = {
      applicationName: DeviceInfo.getApplicationName(),
      buildNumber: DeviceInfo.getBuildNumber(),
      bundleId: DeviceInfo.getBundleId(),
      deviceId: DeviceInfo.getDeviceId(),
      readableVersion: DeviceInfo.getReadableVersion(),
      version: DeviceInfo.getVersion(),
    };
  }

  handleNavigationStateChange = ({ url }) => {
    const { baseUrl } = this.props;
    const reactPostmessageBridgePrefix = "react-js-navigation://";
    if (
      url.indexOf(reactPostmessageBridgePrefix) !== 0 &&
      DOMContext.hasDifferentOrigin(url, baseUrl)
    ) {
      this.webView.stopLoading();
      DOMContext.openURLInBrowser(url);
    }
    // CATCH ADS INSIDE "times.co.uk" domain.
    if (url.indexOf(baseUrl) > -1 && url !== baseUrl) {
      this.webView.stopLoading();
      DOMContext.openURLInBrowser(url);
    }
  };

  handleMessageEvent = (e) => {
    const { onRenderComplete, onRenderError, data, isInline } = this.props;
    const json = e.nativeEvent.data;

    if (
      json.indexOf("isTngMessage") === -1 &&
      json.indexOf("unrulyLoaded") === -1
    ) {
      // don't try and process postMessage events from 3rd party scripts
      return;
    }
    const { type, detail } = JSON.parse(json);
    const { loaded } = this.state;
    const { isVisible } = this;
    switch (type) {
      case "renderFailed":
        onRenderError();
        break;
      case "unrulyLoaded": {
        if (loaded && isVisible) {
          this.inViewport();
        }
        break;
      }
      case "renderComplete":
        onRenderComplete();
        break;
      case "setAdWebViewHeight": {
        const adHeight = detail.height;
        const webViewHeight =
          adHeight > 1 ? adHeight + styles.containerAdditionalHeight.height : 0;

        this.setState({
          height: isInline ? adHeight : webViewHeight,
        });
        break;
      }
      default:
        if (data.debug) {
          logger(type, detail);
        }
    }
  };

  outViewport = () => {
    this.isVisible = false;

    if (this.webView) {
      this.webView.injectJavaScript(`
        if (typeof unrulyViewportStatus === "function") {
          unrulyViewportStatus(${JSON.stringify({
            ...this.deviceInfo,
            visible: false,
          })});
        };
      `);
    }
  };

  loadAd = () => {
    this.setState({
      loaded: true,
    });
  };

  inViewport = () => {
    this.isVisible = true;

    if (this.webView) {
      this.webView.injectJavaScript(`
          if (typeof unrulyViewportStatus === "function") {
            unrulyViewportStatus(${JSON.stringify({
              ...this.deviceInfo,
              visible: true,
            })})
          };
        `);
    }
  };

  render() {
    const { baseUrl, data, width } = this.props;
    const { height } = this.state;

    // TODO: Refactor the following hardcoded strings and find a better solution
    // for injecting javascript into the webview (under Hermes engine.
    // Hermes cannot get the source code via Function.prototype.toString
    // (see https://github.com/facebook/hermes/issues/114)
    // Using the "show source" directive that is proposed as a workaround
    // does seem to work sometimes but seems very flaky.
    const webviewEventCallbackSetupAsString = `function(n){var o=n.window;o.eventCallback=function(n,t){o.postMessage(JSON.stringify({detail:t,isTngMessage:!0,type:n}))},o.addEventListener("error",function(n){var t=(n.filename||"").substring(0,100);o.eventCallback("error","msg="+(n.message||"")+", file="+t+", line="+(n.lineno||"")+", col="+(n.colno||""))}),o.console.error=function(){for(var n=arguments.length,t=new Array(n),l=0;l<n;l++)t[l]=arguments[l];o.eventCallback("error",t.join("\\n"))}}`;
    const initAsString = `function(t){var s=t.el,o=t.data,c=t.platform,u=t.eventCallback,l=t.window,p=/^native-(inline|section|(single|double)-mpu)/;l.googletag=l.googletag||{},l.googletag.cmd=l.googletag.cmd||[],l.pbjs=l.pbjs||{},l.pbjs.que=l.pbjs.que||[],l.apstag=l.apstag||{_Q:[],addToQueue:function(t,n){this._Q.push([t,n])},fetchBids:function(){this.addToQueue("f",arguments)},init:function(){this.addToQueue("i",arguments)},setDisplayBids:function(){return null},targetingKeys:function(){return[]}};var f=l.apstag,h=l.document,b=l.encodeURIComponent,v=l.googletag,w=l.location,y=l.pbjs,I=l.Promise,x=l.Set,S=l.XMLHttpRequest,T=!1,N="web"===c,j=o.prebidConfig,z=j.timeout,k=j.bidders,E=k&&k.amazon&&k.amazon.accountId;return{init:function(){var t=this;if(o.disableAds)return I.resolve("ads disabled");var n=[I.resolve()];return l.initCalled||((!o.bidInitialiser&&N||!N)&&this.loadScripts(),n.push(this.apstag.process(),this.prebid.process(),this.gpt.process())),l.initCalled=!0,T||n.push(this.gpt.bid()),T=!0,I.all(n).then(function(){t.gpt.refreshAd(),u("renderComplete")}).catch(function(t){u("error",t.stack),u("renderFailed")})},loadScripts:function(){N&&(this.breakpoints(),this.utils.loadScript(this.prebid.url)),this.utils.loadScript(this.gpt.url),this.utils.loadScript(this.apstag.url),this.admantx.init()},breakpoints:function(){var t=this,n={huge:"(min-width: 1320px)",medium:"(min-width: 768px) and (max-width: 1023px)",small:"(max-width: 767px)",wide:"(min-width: 1024px) and (max-width: 1319px)"};l.matchMedia&&Object.keys(n).forEach(function(s){l.matchMedia(n[s]).addListener(t.handleBreakPointChange.bind(t,s))})},handleBreakPointChange:function(t,n){n.matches&&(this.gpt.setPageTargeting({breakpoint:t,refresh:"true"}),v.cmd.push(function(){return v.pubads().refresh()}))},admantx:{extractNames:function(t){var s=new x(t.map(function(t){return t.name.toLowerCase().trim().replace(/\\s+/g,"_").replace(/["'=!+#*~;^()<>[\\],&]/g,"")}));return(0,n.default)(s).join(",")},getUrl:function(){return"https://euasync01.admantx.com/admantx/service?request="+b(JSON.stringify({key:"f1694ae18c17dc1475ee187e4996ad2b484217b1a436cb04b7ac3dd4902180b6",method:"descriptor",mode:"async",decorator:"json",filter:"default",type:"URL",body:w.href}))},init:function(){var t=this,n=new S;n.open("GET",this.getUrl()),n.send(),n.onload=function(){if(200!==n.status)u("Error: "+n.status+": "+n.statusText);else{var s=n.response;if(s.admants||s.categories||s.entities||s.feelings){var o={admantx_bs:t.extractNames(s.admants),admantx_cat:t.extractNames(s.categories),admantx_emotion:t.extractNames(s.feelings),admantx_ents:t.extractNames(s.entities)};v.cmd.push(function(){return t.gpt.setPageTargeting(o)})}}},n.onerror=function(){u("Error in ADmantx request")}}},gpt:{url:"https://www.googletagservices.com/tag/js/gpt.js",setSlotTargeting:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o,c=n.networkId,l=n.adUnit,p=n.section,f=n.slotTargeting;v.cmd.push(function(){try{var n=t.slotName,o=t.sizes,h=t.mappings,b=v.defineSlot("/"+c+"/"+l+"/"+p,o,n);if(!b)return;b.addService(v.pubads()),s&&(s.id="wrapper-"+n,s.innerHTML="<div id=\\""+n+"\\"></div>",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.margin="0 auto",s.style.height="100%");var w=v.sizeMapping();h.forEach(function(t){return w.addSize([t.width,t.height],t.sizes)}),b.defineSizeMapping(w.build()),Object.keys(f||[]).forEach(function(t){return b.setTargeting(t,f[t])});var y=Math.floor(10*Math.random()).toString();b.setTargeting("timestestgroup",y),b.setTargeting("pos",n),v.display(n),u("warn","[Google] INFO: set slot targeting - "+n)}catch(t){u("error",t.stack)}})},setPageTargeting:function(t){return v.cmd.push(function(){try{var n=v.pubads();Object.keys(t).forEach(function(s){n.setTargeting(s,t[s])}),u("warn","[Google] INFO: set page target"),u("log",t)}catch(t){u("error",t.stack)}}),this.waitUntilReady()},init:function(){v.cmd.push(function(){var t=v.pubads();t.disableInitialLoad(),t.enableSingleRequest(),t.collapseEmptyDivs(!0,!0),t.addEventListener("slotRenderEnded",function(t){if(t&&t.slot&&p.test(t.slot.getSlotElementId())&&!t.isEmpty){var n=t&&t.size&&t.size[1]&&t.size[1]>1?t.size[1]:0;u("setAdWebViewHeight",{height:n})}}),v.enableServices(),u("warn","[Google] INFO: initialised")})},bid:function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:o).config;return this.setSlotTargeting(t),this.waitUntilReady()},refreshAd:function(){v.cmd.push(function(){N&&y.setTargetingForGPTAsync(),f.setDisplayBids(),v.pubads().refresh(),u("warn","[Google] INFO: pubads refresh")})},process:function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:o).pageTargeting;return this.init(),this.setPageTargeting(t),this.waitUntilReady()},waitUntilReady:function(){return new I(function(t){return v.cmd.push(function(){t()})})}},prebid:{url:"https://www.thetimes.co.uk/d/js/vendor/prebid.min-4c674b73bd.js",bid:function(){var t=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:o).slots;return new I(function(n,s){y.que.push(function(){try{if(t.length>0)u("warn","[Prebid] INFO: requesting bids"),u("log",t),t.forEach(function(t){return y.removeAdUnit(t.code)}),y.addAdUnits(t),y.requestBids({bidsBackHandler:function(t){u("warn","[Prebid] INFO: bid response"),u("log",t),n(t)}});else{var o="[Prebid] INFO: no slots are defined";u("warn",o),n(o)}}catch(t){s(t)}})})},process:function(){if(N)return this.init(),this.bid();var t="[Prebid] INFO: no prebid on native";return u("warn",t),I.resolve(t)},init:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,n=t.prebidConfig,s=t.debug,c=void 0!==s&&s,p=n.init,f=n.bidderSettings;l.pbjs.bidderTimeout=z,l.pbjs.bidderSettings=f&&f(n),y.que.push(function(){p.debug=c,y.setConfig(p),u("warn","[Prebid] INFO: initialised"),u("log",p)})}},apstag:{url:"https://c.amazon-adsystem.com/aax2/apstag.js",getConfig:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o,n=t.slots,s=t.networkId,c=t.adUnit,u=t.section,l=[s,c];u&&l.push(u);var p=l.reduce(function(t,n,s){return 1===s?"/"+t+"/"+n:t+"/"+n});return n.map(function(t){return{sizes:t.sizes,slotID:t.code,slotName:p}})},bid:function(){var t=this;return new I(function(n){try{var s=t.getConfig();if(s.length>0)u("warn","[Amazon] INFO: requesting bids"),u("log",s),f.fetchBids({slots:s},function(t){u("warn","[Amazon] INFO: bids response"),u("log",t),n(t)});else{var o="[Amazon] INFO: no slots are defined";u("warn",o),n(o)}}catch(t){u("error",t.stack),n(t)}})},process:function(){if(E)return this.init();var t="[Amazon] INFO: amazonAccountID undefined";return u("warn",t),I.resolve(t)},init:function(){var t=this,n={adServer:"googletag",bidTimeout:z,gdpr:{cmpTimeout:z},pubID:E};u("log",n),f.init(n,function(){return u("warn","[Amazon] INFO: initialised"),t.bid()})}},utils:{scriptsInserted:{},createScriptElement:function(t,n,s){try{var o=h.createElement("script");o.type="text/javascript",o.defer=!0,n&&o.addEventListener("load",n),s&&o.addEventListener("error",s),o.src=t,h.head.appendChild(o)}catch(t){u("error",t.stack)}},loadScript:function(t){var n=this;return this.scriptsInserted[t]?I.resolve("Inserting \\""+t+"\\" twice."):(this.scriptsInserted[t]=!0,new I(function(s,o){n.createScriptElement(t,function(){s("loaded "+t)},function(){o(new Error("load error for "+t))})}))}}}}`;

    // NOTE: if this generated code is not working, and you don't know why
    // because React Native doesn't report errors in webview JS code, try
    // connecting a debugger to the app, console.log(html), copy and paste
    // the HTML into a file and run it in a browser.
    const html = `
      <html>
        <head>
        <meta name="viewport" content="initial-scale=1,user-scalable=no">
        <style>
          html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        </style>
        <script>
          window.googletag = window.googletag || {};
          window.googletag.cmd = window.googletag.cmd || [];
          window.pbjs = window.pbjs || {};
          window.pbjs.que = window.pbjs.que || [];
          window.apstag = {
            _Q: [],
            addToQueue(action, d) {
              this._Q.push([action, d]);
            },
            fetchBids() {
              this.addToQueue("f", arguments);
            },
            init() {
              this.addToQueue("i", arguments);
            },
            setDisplayBids() { return null; },
            targetingKeys() {
              return [];
            }
          };
        </script>
        </head>
        <body>
          <div></div>
          <script>
            window.theTimesBaseUrl = "${String(baseUrl)}";
            window.postMessage = function(data) {
              var message = typeof data === "string" ? data : JSON.stringify(data);
              window.ReactNativeWebView.postMessage(message);
            };
            (${webviewEventCallbackSetupAsString})({window});
          </script>
          <script>
          (${initAsString})({
            el: document.getElementsByTagName("div")[0],
            eventCallback: eventCallback,
            data: ${JSON.stringify(data)},
            platform: "native",
            window
          }).init();
          </script>
        </body>
      </html>
    `;

    const { loaded } = this.state;

    return (
      // Note that this ViewportAwareView must be contained by a Viewport.Tracker to work properly
      <ViewportAwareView
        onViewportEnter={this.loadAd}
        style={{
          height,
          width,
        }}
      >
        {(Platform.OS === "ios" || loaded) && (
          <WebView
            onMessage={this.handleMessageEvent}
            onNavigationStateChange={this.handleNavigationStateChange}
            originWhitelist={
              Platform.OS === "android"
                ? ["http://.*", "https://.*"]
                : undefined
            }
            ref={(ref) => {
              this.webView = ref;
            }}
            source={{
              baseUrl,
              html,
            }}
            allowsInlineMediaPlayback={true}
            androidLayerType={"software"}
          />
        )}
        {height !== 0 && (
          <ViewportAwareView
            onViewportEnter={this.inViewport}
            onViewportLeave={this.outViewport}
            style={calculateViewportVisible(height)}
          />
        )}
      </ViewportAwareView>
    );
  }
}

DOMContext.propTypes = propTypes;
DOMContext.defaultProps = defaultProps;

export default DOMContext;
