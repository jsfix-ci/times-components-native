import { LogBox } from "react-native";

const ignoredWarnings = ["Warning: Failed prop type"];
const ignoredLogs = ["Running"];

export const logboxSetup = () => {
  // eslint-disable-next-line no-undef
  if (global.__DEV__) {
    // eslint-disable-next-line no-console
    const _warn = console.warn;

    // eslint-disable-next-line no-console
    console.warn = function (...args) {
      if (
        !args.some(
          arg =>
            typeof arg === "string" &&
            ignoredWarnings.some(iWarn => arg.includes(iWarn)),
        )
      ) {
        _warn.apply(console, args);
      }
    };

    LogBox.ignoreLogs(ignoredLogs.concat(ignoredWarnings));
  }
  //Might come in handy
  console.reportErrorsAsExceptions = false; // https://github.com/facebook/react-native/blob/b633cc130533f0731b2577123282c4530e4f0abe/Libraries/Core/ExceptionsManager.js#L115
};

export const getFirstParagraphText = article => {
  const p = article.find(e => e.name === "paragraph");
  return (p?.children[0] && p.children[0].attributes?.value) || "";
};
