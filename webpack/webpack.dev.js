// const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const apiMockMiddleware = require('./middleware/api-mock-middleware');

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      middlewares.unshift(apiMockMiddleware);
      return middlewares;
    },
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    // Specify development API URL
    // new webpack.DefinePlugin({
    //     "process.env": {
    //         NODE_ENV: JSON.stringify("development"),
    //     },
    // }),
    new ReactRefreshWebpackPlugin(),
  ],
};
