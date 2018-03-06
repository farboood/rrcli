# React-Native Redux Command-Line

command-line for work with react-native and redux.

## When need

if the tree of react-native project be something like this:

    .
    ├── ...
    ├── src
    │   ├── actions
    │   │   ├── index.js
    │   │   ├── types.js
    │   │   └── ...               # actions
    │   ├── reducers
    │   │   ├── index.js
    │   │   └── ...               # reducers
    │   ├── scenes
    │   │   └── ...               # scenes
    │   ├── subScenes
    │   │   ├── index.js
    │   │   └── ...               # subScenes
    │   ├── components
    │   │   ├── index.js
    │   │   └── ...               # components
    │   ├── Router.js
    │   └── App.js
    ├── index.js
    └── ...

## Installation

```
npm install -g rrcli
```

## Usage

When run rrcli in terminal you have 5 options to choose:

* 1 : The first time you use rrcli make sure you run this command to init project. This make src folder and some other stuff.

* 2 : Create Scene and update actions and reducers with new scene.
  Issue: Router files not receive full change in this version.

* 3 : Create function for specific scene. This command add action and reducer, and update scene to receive this action. (The name of function must separate only with underline.)

* 4 : Create subScene for specific scene.

* 5 : Create component.
