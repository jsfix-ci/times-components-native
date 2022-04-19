# Android-App package

Use this package to run the android react-native development server for the
existing native application, or to bundle a native library for android app
releases. This is useful when building components that are reliant on the
behaviour of the actual app outside of the storybook.

When ran as a development server, react-native launches a webpack server that bundles
components on-the-fly. Launch the app in debug mode to connect to development
server.

When bundled, it gets assembled as a native android library, including the js
bundle, image assets and native dependencies.

## Dev Server

In order to run the dev server, run `yarn android:native`. This will start react-native bundler and provide
on-the-fly bundles for the react development.

## Bundling and release

To publish this repo to maven, it needs to be built as a native android library.
Run `yarn android:build-lib` to achieve this, and publish using `yarn android:publish-lib`.

This bundling process first creates the js bundle, puts it inside an android
library and assembles the android library, alongside any native dependencies.
All native dependencies and the xnative library should be published to maven so
it can be consumed by the native applications.

## Adding new native dependencies

Whenever a native dependency is added to times-components, it should also be
added to the `build.gradle` scripts. Add the
library name to `reactProjects` in build.gradle so it can be bundled and
uploaded to maven.

## How to get the android app set up and running on latest times-components

### Prerequisites

- Get the latest code on `develop` for [nuk-tnl-app-android-universal](https://github.com/newsuk/nuk-tnl-app-android-universal)
- Get the latest Android Studio [here](https://developer.android.com/studio/)
- Install mobile emulator, see details [here](https://developer.android.com/studio/run/managing-avds)

### Step-by-step Guide

- Run the mobile emulator
- Run `yarn android:native` in `times-components` to bundles the latest code on-the-fly once the emulator request a bundle.
- Run `adb reverse tcp:8081 tcp:8081`
- Run `./gradlew installGPD` in `nuk-tnl-app-android-universal` to install the latest android app
- Open the Times app in the mobile emulator
- Navigate to an article page on the app
- Reload the article by pressing key `]` to load the react-native article
- To update the app to the latest times-components-native, find and update the `uk.co.thetimes:times-xnative` dependency version in `nuk-tnl-app-android-universal`.

### Locally install Times Component library on devices

1. Check Android SDK path is exported to \$ANDROID_HOME. In Mac, android sdk is installed to ~/Library/Android/sdk by default. `export ANDROID_HOME="/Users/<USERNAME>/Library/Android/sdk"`
2. update the version in android-app package.json and chnage the android build.gradle package version correspondingly
3. Build lib `yarn android:build-lib`
4. Copy newly built android bundle to andriod repo `cp android-app/xnative/src/main/assets/index.android.bundle ../../nu-projectd-times-smartphone-android/mobile/src/main/assets/index.android.bundle`
5. before building, update the version in android-app/package.json to something that doesnt exist in nu-android, mobile/build.gradle change the version to match in the top-level build.gradle add the local repo: `maven { url "../../times-components/android-app/repo"}`
6. then using android studio build the app onto the device

### Upgrade Times Component in the Android app

see [Readme](https://github.com/newsuk/nu-projectd-times-smartphone-android/blob/develop/CONTRIBUTING.md#upgrading-to-the-latest-times-component)
