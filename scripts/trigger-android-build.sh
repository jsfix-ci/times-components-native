#!/usr/bin/env bash

# exit when any command fails
set -euo pipefail

android_dir=times-android

new_version=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

# Clone the Times Android app repository
if [ ! -d "$android_dir" ] ; then
	git clone git@github.com:newsuk/nuk-tnl-app-android-universal.git "$android_dir" --quiet
fi
(cd "$android_dir" && git checkout --force develop && git pull origin develop) &> /dev/null


# Check if the TCN version is already up to date
cur_version=$(grep uk.co.thetimes:times-xnative "$android_dir/gradle/libs.versions.toml" | awk -F\" '{ print $4 }')
echo "The Android project is currently using TCN version $cur_version."

if [ "$cur_version" == "$new_version" ]; then
	echo "Nothing to update."
	exit 0
fi

# Check if GraphQL queries changed since last TCN version
graphql_changes=$(git diff v"$cur_version" v"$new_version" -- ./packages/provider-queries/src/*.graphql)


cd "$android_dir"

# Create a new branch and update the TCN version
new_branch="chore/NOJIRA/update-tcn-$new_version"
git checkout -b "$new_branch" --quiet
echo "Updating the TCN version from $cur_version to $new_version."
sed -i "s/uk.co.thetimes:times-xnative\", version=\"[0-9]\+\.[0-9]\+\.[0-9]\+.*\"/uk.co.thetimes:times-xnative\", version=\"$new_version\"/g" gradle/libs.versions.toml

# If GraphQL queries have been updated,
# 1. Bump the database version
# 2. Regenerate the test fixtures
if [ -z "$graphql_changes" ]
then
	graphql_message="Simple TCN update, no GraphQL queries changed."
else
	graphql_message="TCN update with changed GraphQL queries."
	database_file=mobile/src/main/java/uk/co/thetimes/database/TimesRoomDatabase.kt
	echo "Bumping the database."
	sed -i -r 's/(.*)(version = )([0-9]+)$/echo "\1\2$((\3+1))"/ge' "$database_file"

	echo "Regenerating test fixtures."
	mobile/scripts/generate_tpa_fixtures.sh
fi

# Commit the changes and open a PR
git add .
commit_message="chore(NOJIRA): Update TCN to $new_version"
git config user.email "times-components-native-ci@news.co.uk"
git config user.name "TCN"
echo "Committing: $commit_message"
git commit -m "$commit_message" --quiet

echo "Pushing: $new_branch..."
git push origin "$new_branch" --quiet

pr_description="
## NOJIRA

$graphql_message

##### Tests added
N/A

- [ ] Unit tests
- [ ] Integration tests
- [ ] UI tests

##### Screenshots
N/A"

gh pr create --title "$commit_message" --body "$pr_description" --head "$new_branch"

cd ..
