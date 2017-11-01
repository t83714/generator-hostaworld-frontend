'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`Welcome to the ${chalk.red("@hostaworld/frontend")} generator!`));
    const prompts = [{
        type: "confirm",
        name: "ready_to_create",
        message: "Are you ready to use template?",
        default: true,
        store: true
    }];

    return this.prompt(prompts).then((props) => {
        // To access props later use this.props.someAnswer;
        this.props = props;
    });
  }

  writing() {
    const fileList = [
        ".babelrc",
        ".eslintignore",
        ".eslintrc.json",
        "webpack.config.js",
        "scss/main.scss",
        "scss/_custom.scss",
        "ui-src/app.js",
        "ui-src/index.js",
        "ui-src/action/index.js",
        "ui-src/action/types.js",
        "ui-src/common/combineReducers.js",
        "ui-src/reducers/index.js",
        "ui-src/reducers/otherData.js",
        "ui-src/sagas/index.js",
        "ui-src/sagas/updateAppInit.js",
        "ui-src/views/MainView.js",
    ];
    fileList.forEach(item=>{
        this.fs.copy(
            this.templatePath(item),
            this.destinationPath(item),
        );
    });

    if (!this.fs.exists(this.destinationPath("package.json"))) {
        this.fs.copyTpl(
            this.templatePath("package.json"),
            this.destinationPath("package.json"),
            { name: "sample-app" },
        );
    }

    const npmPkgConfig = this.fs.readJSON(this.destinationPath("package.json"));
    npmPkgConfig["@std/esm"] = {
        esm: "all",
        cjs: true,
    };
    npmPkgConfig.engines = {
        node: ">=8.4.0",
    };
    if (!npmPkgConfig.scripts) npmPkgConfig.scripts = {};
    npmPkgConfig.scripts = { 
        ...npmPkgConfig.scripts,
        "test": "jest",
        "watch": "webpack --progress --colors --watch",
        "watch:min": "PROD_ENV=1 webpack --progress --colors --watch",
        "build": "webpack",
        "build:min": "PROD_ENV=1 webpack --progress --colors",
    };
    this.fs.writeJSON(this.destinationPath("package.json"), npmPkgConfig);
  }

  install() {
    this.npmInstall([
        "bootstrap",
        "font-awesome",
        "jquery",
        "lodash",
        "popper.js",
        "react",
        "react-dom",
        "react-redux",
        "redux",
        "redux-saga",
        "raf",
        "babel-polyfill",
    ], { save: true });

    this.npmInstall([
        "autoprefixer",
        "babel-core",
        "babel-jest",
        "babel-loader",
        "babel-preset-es2015",
        "babel-preset-react",
        "babel-preset-stage-2",
        "file-loader",
        "css-loader",
        "enzyme",
        "enzyme-adapter-react-16",
        "eslint",
        "eslint-config-airbnb",
        "eslint-plugin-import",
        "eslint-plugin-jsx-a11y",
        "eslint-plugin-react",
        "jest",
        "node-sass",
        "postcss-loader",
        "precss",
        "react-addons-test-utils",
        "react-test-renderer",
        "redux-mock-store",
        "sass-loader",
        "style-loader",
        "webpack",
    ], { "save-dev": true });
  }
};
