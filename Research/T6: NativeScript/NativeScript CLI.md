# NativeScript CLI Setup and Basics

## NativeScript Setup
- install node.js, NativeScript CLI based on nodejs
- install NativeScript CLI:
  > $ npm install -g nativescript

  Might face some issue because of npm registry, please run below to edit the registry(delete the jetblue npm registry) and revert configuration back afterwards if necessary
  > $ npm config edit

- install iOS and Android requirements
  > $ ruby -e "$(curl -fsSL https://www.nativescript.org/setup/mac)"

  Auto setup reqruiements for macOs system, however, when you try to verify your installation, you might still have some components missed like Android SDK Home path settings and other packages. We can refer to [MacOs Setup](https://docs.nativescript.org/angular/start/ns-setup-os-x)

  While running below script to install necessary packages for android, we might run into issues because Java Home Version:
  > $ANDROID_HOME/tools/bin/sdkmanager "tools" "emulator" "platform-tools" "platforms;android-28" "build-tools;28.0.3" "extras;android;m2repository" "extras;google;m2repository"

  We can set `JAVA_HOME` to v1.8 like below and then try above again:
  > export JAVA_HOME=`/usr/libexec/java_home -v 1.8`

## Run Nativescript-rwb app
- to install all the dependencies
  > $ yarn 
- run code on simulator
  > $ tns run ios
- run code with web app
  > $ yarn start 

## Key items
- It's a separate, different repo from existing RWB, couple of modules have been migrated here to support implementation of Nativescript POC on search page, flights result page and trip summary page
- NativeScript can support one repo deploy to multiple platforms: can be deployed as web app as well as ios app or android app
- mimic search page from dotcom booker behavior
- Nativescript does not support jb-component-library,
- implement basic structure of flight results page and trip summary page with backend API
- Totally responsive for web app, and mobile behavior is actually native because the build can be actually opened within xcode
- There will always be disadvantages:
  1. Existing RWB project might be 30% can be reused, because Nativescript has it's own syntax and mechanisim for components to use at mobile platforms
  2. jb-component-library cannot be used, we need to re-implement what we need in Nativescript
  3. Although we can deploy one repo to different platforms, the actual code share between Native App code and Web app code is around 30%(kind of low). Because there will be different dependencies, packages reqruied from different platforms.
  4. NativeScript has a relatively small community, some plugins are currently missing(eg. local storage plugins), which means we will nee to build from scratch. Those will increase our efforts