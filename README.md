# React-Native Redux Command-Line

command-line for work with react-native and redux.

## When need

if the tree of react-native project be something like this: \n
. \n
+-- src \n
|   +-- actions \n
|   |   +-- index.js \n
|   |   +-- types.js \n
|   |   +-- ... \n
|   +-- reducers \n
|   |   +-- index.js \n
|   |   +-- ... \n
|   +-- scenes \n
|   +-- router.js \n
|   +-- app.js \n
+-- index.android.js \n
+-- index.ios.js \n

## Installation

```
npm install -g rrcli
```

## Usage

if choose 1:
  will make src folder with files

if choose 2:
  get a name and create scene for it and update actions and reducers with new scene.

  issue: router file not receive changes in this version.

if choose 3:
  get scene name and function name, then create new function and add that to actions and reducer and scene.
  the name of function must separate only with underline.
