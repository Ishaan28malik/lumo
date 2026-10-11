module.exports = {
  mode: 'production',
  devtool: 'source-map',
  performance: {
    maxAssetSize: 3000000, // 3MB size limit
    maxEntrypointSize: 3000000, // 3MB entrypoint size limit
    hints: false, // Disable warnings
  },
  plugins: [],
};
