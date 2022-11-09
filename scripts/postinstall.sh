#! /usr/bin/env bash

##
# postinstall scripts for package.json
#
# Intended to be run by yarn/npm
##

## any script/line that fails will block execution of later scripts
set -e

yarn gen:types

node ./scripts/fetch-fonts

# Pod install locally on OSX, skip on CI
if [[ "$CI" != "true" ]]  && [[ "$OSTYPE" == darwin* ]]
then
  pushd ios
  pod install --repo-update
  popd
fi
