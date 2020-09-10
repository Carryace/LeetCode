# Angular Code Share with NativeScript

## Blockers
1. Need to use different html structure/tags and sass properties, some normal css properties are not supported by nativescript.
2. Cannot rely on jb-component-library anymore, most of the existing scss classes cannot be used.
3. Images like svg cannot be used, jpg and png are supported


## Necessary impacts
1. Need to add in `nativescript` related widgets or components to support it on mobile native app, such as Radio button, checkbox..., some elements or animations might very or might not find proper replacement since nativescript pulgins are kind of limited