// noinspection JSUnusedGlobalSymbols

const { resolve, join } = require("path");
const HTMLPlugin = require("html-webpack-plugin");

const BUILD_PATH = resolve("target");
const SOURCE_PATH = resolve("src");
const IS_DEV_MODE =
  process.argv.reduce((acc, arg) => acc || arg.includes("development"), false);

const config = {
  devtool: IS_DEV_MODE && "cheap-module-source-map",
  entry: join(SOURCE_PATH, "index.js"),
  output: {
    path: BUILD_PATH,
    filename: "[name].[contenthash:8].js",
    clean: true,
  },
  optimization: getOptimizations(),
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: getLoaders(),
  },
  plugins: getPlugins(),
  devServer: getDevServer(),
};

function getOptimizations() {
  return {
    minimize: !IS_DEV_MODE,
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
  };
}

function getLoaders() {
  return [
    {
      test: /\.glsl$/,
      loader: "webpack-glsl-loader",
      exclude: /node_modules/,
    },
  ];
}

function getPlugins() {
  return [
    new HTMLPlugin({ template: join(SOURCE_PATH, "index.html") }),
  ];
}

function getDevServer() {
  return {
    client: {
      logging: "none",
    },
    static: {
      directory: BUILD_PATH,
    },
    compress: false,
    port: 4200,
  };
}

module.exports = config;
