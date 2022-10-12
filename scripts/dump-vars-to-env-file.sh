#!/usr/bin/env bash
# Creates an .env from ENV variables for use with react-native-config
ENV_WHITELIST=${ENV_WHITELIST:-"^RN"}
printf "Creating an .env file with the following whitelist of RegEx:\n"
printf "%s\n" "$ENV_WHITELIST"
set | grep -E "$ENV_WHITELIST" | grep -v "^_" | grep -v "WHITELIST" > .env
[ -s .env ] || printf "\nERROR .env created with NO variables\n" && exit 1
printf "\n.env created with:\n"
cat .env

