/*
 * ===============
 *  Modules Import
 * ===============
 */
const fs = require('fs');

/*
 * ===============
 *  Class Do
 * ===============
 */
class Do {
  constructor() {

  }

  get actionsList() {
    return [
      { id: 1, name: "Init Project" },
      { id: 2, name: "Add Scene" },
      { id: 3, name: "Add Function" },
      { id: 4, name: "Add Subscene" },
      { id: 5, name: "Add Component" }
    ];
  }

  action(rl, id) {
    switch(id) {
      case 1:
        this.initProject();
        break;
      case 2:
        this.addScene(rl);
        break;
      case 3:
        this.addFunction(rl);
        break;
      case 4:
        this.addSubScene(rl);
        break;
      case 5:
        this.addComponent(rl);
        break;
      default:
        console.log('wrong action id');
        break;
    }
  }

  initProject() {
    fs.mkdirSync('./src');

    fs.mkdirSync('./src/actions');
    fs.createReadStream(__dirname + '/templates/actions-index.js').pipe(fs.createWriteStream('./src/actions/index.js'));
    fs.createReadStream(__dirname + '/templates/actions-types.js').pipe(fs.createWriteStream('./src/actions/types.js'));

    fs.mkdirSync('./src/reducers');
    fs.createReadStream(__dirname + '/templates/reducers-index.js').pipe(fs.createWriteStream('./src/reducers/index.js'));

    fs.mkdirSync('./src/subscenes');
    fs.createReadStream(__dirname + '/templates/subScenes-index.js').pipe(fs.createWriteStream('./src/subScenes/index.js'));

    fs.mkdirSync('./src/components');
    fs.createReadStream(__dirname + '/templates/components-index.js').pipe(fs.createWriteStream('./src/components/index.js'));

    fs.mkdirSync('./src/scenes');

    fs.createReadStream(__dirname + '/templates/app.js').pipe(fs.createWriteStream('./src/App.js'));
    fs.createReadStream(__dirname + '/templates/router.js').pipe(fs.createWriteStream('./src/Router.js'));
  }

  addScene(rl) {
    rl.question('Scene Name : ', answer => {
      const name = answer;
      const upperName = name.charAt(0).toUpperCase() + name.slice(1);
      let fileDir = '';
      let fileResult = '';
      let fileReplace = '';

      // scenes
      fileDir = './src/scenes/' + upperName + 'Scene.js';
      fileResult = fs.readFileSync(__dirname + '/templates/scenes-new.js', 'utf8');
      fileResult = fileResult.replace(/{name}/g, name).replace(/{upperName}/g, upperName);
      fs.writeFileSync(fileDir, fileResult, 'utf8');

      // actions
      fileDir = './src/actions/' + upperName + 'Actions.js';
      fs.createReadStream(__dirname + '/templates/actions-new.js').pipe(fs.createWriteStream(fileDir));

      // reducers
      fileDir = './src/reducers/' + upperName + 'Reducer.js';
      fs.createReadStream(__dirname + '/templates/reducers-new.js').pipe(fs.createWriteStream(fileDir));

      // actions index
      fileDir = "./src/actions/index.js";
      fileResult = fs.readFileSync(fileDir, 'utf8');
      fileReplace = "export * from './" + upperName + "Actions';\n/* new action export */";
      fileResult = fileResult.replace('/* new action export */', fileReplace);
      fs.writeFileSync(fileDir, fileResult, 'utf8');

      // reducers index
      fileDir = "./src/reducers/index.js";
      fileResult = fs.readFileSync(fileDir, 'utf8');
      fileReplace = "import " + upperName + "Reducer from './" + upperName + "Reducer';\n/* new reducer import */";
      fileResult = fileResult.replace('/* new reducer import */', fileReplace);
      fileReplace = name + ": " + upperName + "Reducer,\n\t/* new reducer export */";
      fileResult = fileResult.replace('/* new reducer export */', fileReplace);
      fs.writeFileSync(fileDir, fileResult, 'utf8');

      // router
      fileDir = "./src/Router.js";
      fileResult = fs.readFileSync(fileDir, 'utf8');
      fileReplace = "import " + upperName + "Scene from './scenes/" + upperName + "Scene';\n/* new scene import */";
      fileResult = fileResult.replace('/* new scene import */', fileReplace);
      // fileReplace = "<Scene key='" + name + "Scene' component={" + upperName + "Scene} title='" + upperName + "' />\n\t\t\t/* new scene export */";
      // fileResult = fileResult.replace('/* new scene export */', fileReplace);
      fs.writeFileSync(fileDir, fileResult, 'utf8');

      rl.close();
    });
  }

  addFunction(rl) {
    rl.question('Scene Name : ', answer => {
      const sceneName = answer;
      const upperSceneName = sceneName.charAt(0).toUpperCase() + sceneName.slice(1);
      rl.pause();

      rl.question('Function Name : ', answer => {
        const functionName = answer;
        let upperFunctionName = "";
        for (let i = 0; i < functionName.length; i++) {
          if (i == 0) {
            upperFunctionName += functionName[i].toUpperCase();
          } else {
            if (functionName[i] === '_') {
              i++;
              upperFunctionName += functionName[i].toUpperCase();
            } else {
              upperFunctionName += functionName[i];
            }
          }
        }
        const functionType = sceneName + '_' + functionName;
        const upperFunctionType = functionType.toUpperCase();
        const actionName = sceneName + upperFunctionName;
        let fileDir = '';
        let fileResult = '';
        let fileReplace = '';

        // scene
        fileDir = './src/scenes/' + upperSceneName + 'Scene.js';
        fileResult = fs.readFileSync(fileDir, 'utf8');
        fileReplace = actionName + ",\n\t/* new action import */";
        fileResult = fileResult.replace('/* new action import */', fileReplace);
        fileReplace = actionName + ",\n\t/* new action export */";
        fileResult = fileResult.replace('/* new action export */', fileReplace);
        fs.writeFileSync(fileDir, fileResult, 'utf8');

        // action
        fileDir = './src/actions/' + upperSceneName + 'Actions.js';
        fileResult = fs.readFileSync(fileDir, 'utf8');
        fileReplace = upperFunctionType + ",\n\t/* new type import */";
        fileResult = fileResult.replace('/* new type import */', fileReplace);
        fileReplace = "" +
        "export const " + actionName + " = (text) => {\n" +
        "\treturn {\n" +
        "\t\ttype: " + upperFunctionType + ',\n' +
        "\t\tpayload: text\n" +
        "\t};\n" +
        "};\n" +
        "\n" +
        "/* new action export */";
        fileResult = fileResult.replace('/* new action export */', fileReplace);
        fs.writeFileSync(fileDir, fileResult, 'utf8');

        // reducer
        fileDir = './src/reducers/' + upperSceneName + 'Reducer.js';
        fileResult = fs.readFileSync(fileDir, 'utf8');
        fileReplace = upperFunctionType + ",\n\t/* new type import */";
        fileResult = fileResult.replace('/* new type import */', fileReplace);
        fileReplace = "" +
        "case " + upperFunctionType + ":\n" +
        "\t\t\treturn { ...state };\n" +
        "\t\t/* new reducer */";
        fileResult = fileResult.replace('/* new reducer */', fileReplace);
        fs.writeFileSync(fileDir, fileResult, 'utf8');

        // type
        fileDir = './src/actions/types.js';
        fileResult = fs.readFileSync(fileDir, 'utf8');
        fileReplace = "export const " + upperFunctionType + " = '" + functionType + "';\n/* new type export */";
        fileResult = fileResult.replace('/* new type export */', fileReplace);
        fs.writeFileSync(fileDir, fileResult, 'utf8');

        rl.close();
      });
    });
  }

  addSubScene(rl) {
    rl.question('Scene Name : ', answer => {
      const sceneName = answer;
      const upperSceneName = sceneName.charAt(0).toUpperCase() + sceneName.slice(1);
      rl.pause();

      rl.question('SubScene Name : ', answer => {
        const subSceneName = answer;
        const upperSubSceneName = subSceneName.charAt(0).toUpperCase() + subSceneName.slice(1);
        const fullSubSceneName = upperSceneName + upperSubSceneName;
        let fileDir = '';
        let fileResult = '';
        let fileReplace = '';

        // subScenes
        fileDir = './src/subScenes/' + fullSubSceneName + 'SubScene.js';
        fileResult = fs.readFileSync(__dirname + '/templates/subScenes-new.js', 'utf8');
        fileResult = fileResult.replace(/{upperName}/g, fullSubSceneName);
        fs.writeFileSync(fileDir, fileResult, 'utf8');

        // scene
        fileDir = './src/scenes/' + upperSceneName + 'Scene.js';
        fileResult = fs.readFileSync(fileDir, 'utf8');
        fileReplace = fullSubSceneName + 'SubScene as ' + fullSubSceneName + ",\n\t/* new subScene import */";
        fileResult = fileResult.replace('/* new subScene import */', fileReplace);
        fs.writeFileSync(fileDir, fileResult, 'utf8');

        // subScenes index
        fileDir = "./src/subScenes/index.js";
        fileResult = fs.readFileSync(fileDir, 'utf8');
        fileReplace = "export * from './" + fullSubSceneName + "SubScene';\n/* new subScene export */";
        fileResult = fileResult.replace('/* new subScene export */', fileReplace);
        fs.writeFileSync(fileDir, fileResult, 'utf8');

        rl.close();
      });
    });
  }

  addComponent(rl) {
    rl.question('Component Name : ', answer => {
      const componentName = answer;
      const upperComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
      let fileDir = '';
      let fileResult = '';
      let fileReplace = '';

      // components
      fileDir = './src/components/' + upperComponentName + 'Component.js';
      fileResult = fs.readFileSync(__dirname + '/templates/components-new.js', 'utf8');
      fileResult = fileResult.replace(/{upperName}/g, upperComponentName);
      fs.writeFileSync(fileDir, fileResult, 'utf8');

      // components index
      fileDir = "./src/components/index.js";
      fileResult = fs.readFileSync(fileDir, 'utf8');
      fileReplace = "export * from './" + upperComponentName + "Component';\n/* new component export */";
      fileResult = fileResult.replace('/* new component export */', fileReplace);
      fs.writeFileSync(fileDir, fileResult, 'utf8');

      rl.close();
    });
  }
}

module.exports = Do;
