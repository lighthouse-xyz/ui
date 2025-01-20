const webpack = require("webpack");
const copyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve("buffer"),
    assert: require.resolve("assert"),
    "process/browser": require.resolve("process/browser"),
    stream: require.resolve("stream-browserify"),
    url: require.resolve("url"),
    http: false,
    https: false,
    os: false,
  };
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];
  config.resolve.plugins = [new TsconfigPathsPlugin()];
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new copyWebpackPlugin({
      patterns: [{ from: "serve.json" }],
    }),
    new CompressionPlugin({
      test: /\.(png|jpg|jpeg|js|css)$/i,
      algorithm: "gzip",
      compressionOptions: { level: 9 },
      threshold: 8192,
    }),
  ];

  return config;
};
