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