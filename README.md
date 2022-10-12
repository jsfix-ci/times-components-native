# times-components-native [![circleci][circleci-image]][circleci-url]

Home of The Times' `react native` components used in the mobile and tablet apps.

## Table of Contents

- [Getting Started](#getting-started)
- [Native Apps & TCN](#native-apps--tcn)
- [Testing](#testing)
- [Branching Model](#branching-model)
- [Releases](#releases)
- [Miscellaneous](#miscellaneous)
- [Contributing](#contributing)

## Prerequisites

- [Node 10+](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Xcode](https://developer.apple.com/xcode),
- [Android Studio](https://developer.android.com/studio/index.html),
- [JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html)

For more details read the React Native [documentation](https://reactnative.dev/docs/environment-setup).

## Getting Started

1. Install [fontforge](http://fontforge.github.io/en-US/): `brew install fontforge` (See [Fonts section](#fonts))
2. Run `yarn install`
3. Components can be seen running in a storybook:
4. `cd ios && pod install && cd -`
5. `yarn start` and leave it running
6. Run the iOS app using XCode or open the Android project to run on Android.
7. We use [react-native-config](https://github.com/luggit/react-native-config) to keep secrets out of git. You might need to `$ cp env.example .env` and check it out.
## Native Apps & TCN

In order to run development servers for native applications, start react-native dev
server via:

`yarn android:native` or `yarn ios:native`

For step by step guide, see the corresponding documentation for [android](./lib/android/README.md) and [iOS](./lib/ios/README.md).

## Testing

There is a mixture of different checks & tests split across linting, typechecking and unit tests.

```
yarn lint
yarn test:all
yarn test:android
yarn test:ios
yarn test:common
```

## Branching Model

In TCN we follow a Trunk based approach for our branching model.

This means we have a `master` branch that is used to branch off for feature branches, short lived `feature` branches for larger pieces of work, and long lived `release` branches which have hot fixes applied to.

This approach was decided on after trying GitFlow which was found to be cumbersome and slow in its approach to releases.

### Master Branch

`format: master`

This is the main 'trunk' that lives for the lifetime of the project.
When developing you should branch off this to create a feature branch.

### Feature Branch

`format: feat/TNLT-XXX-new-feature-branch-name`

This is a short lived branch that holds new features being built and tested or even hot fixes for an existing release branch.

It is recommended you use feature branches for larger changes that need reviewed and to avoid siloing of knowledge, amongst other reasons for reviewing changes.

Once reviewed and tests are passing you should squash & merge your branch into master.

### Release Branch

`format: release/X.X.X`

Release branches will live for as long as that version is in production. Regular pruning should take place to delete unused release branches.

Release branches are never merged back into master as master already has these changes. You may see merge conflicts in the PR but these can be ignored.

Changes should never be made on a release branch, changes should be made in master and cherry picked into the release branch. More on this in [Hot Fixes](#hot-fixes)

## Releases


See https://github.com/luggit/react-native-config#different-environments

### Production Releases

To release a production build use the following steps;
- bump version in feature branch and merge into master
  - branch format - `chore/feature-release-X.X.X`
  - commit format - `chore(NO_JIRA): feature release X.X.X`
- create a new release branch with the format - `release/X.X.X`
- when tests and builds pass you can select `hold_release` to release a production build

This publishes the builds to the following locations;

- iOS - https://github.com/newsuk/times-components-ios-artifacts/tags
- Android - <NEWS_ARTIFACTORY_URL>/times-components-android-artifacts


### Beta Releases

To release a beta production use the following steps;
- bump version in feature branch and merge into master - `chore/feature-release-X.X.X-beta`
  - branch format - `chore/feature-release-X.X.X-beta`
  - commit format - `chore(NO_JIRA): feature release X.X.X-beta`
- create a new release branch with the format - `release/X.X.X-beta`
- when tests and builds pass you can select `hold_release` to release a beta build

This publishes the builds to the following locations;

- iOS - https://github.com/newsuk/times-components-ios-artifacts-BETA/tags
- Android - <NEWS_ARTIFACTORY_URL>/times-components-android-artifacts-beta

### Hot Fixes

When a bug is found in a pre-existing release you may want to push a fix to that release.

To do this you can;
- create a feature branch to make and test changes and go through the process of merging feature into master
- check out the existing release branch you are updating and cherry-pick the merge-commit
	- `git cherry-pick -m 1 -x <MERGE_COMMIT_SHA>`
- checkout a new release branch off of the existing release branch and bump the version to match in the branch name
	- e.g if you are on `release/1.0.0` and adding a hotfix, your new branch will be `release/1.0.1`
- now create a build by selecting the `hold_release` option in circleci for your new release branch
- clean up by deleting this latest release branch

`NB:` This extra release branch step is required due to an issue with `conventional-github-releaser` referencing the branch name in some way to check if an existing release exists for that version.
So even if we update the version in package.json the publish notes step fails.


### Updating the native apps

Once a release is published you will have to bump the version in the native apps.

These are found in `Podfile` for `iOS` and `build.gradle` for Android.

## Miscellaneous

### Fonts ⚠️

In order to view the storybook on native, you'll need to fix broken fonts. This
fix is done automatically when running storybook (both web and native), but
requires that [fontforge](http://fontforge.github.io/en-US/) is installed,
otherwise the fix won't be applied and you'll get the classic red error screen
when trying to use a broken font.

### Schema

See [utils package](packages/utils/README.md) on how to update the schema

## Contributing

See the [CONTRIBUTING.md](.github/CONTRIBUTING.md) for an extensive breakdown of
the project

[circleci-image]: https://circleci.com/gh/newsuk/times-components-native.svg?style=svg&circle-token=80d0af899358a9d50ea9c157366f319a809d88ae
[circleci-url]: https://circleci.com/gh/newsuk/times-components-native
