const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'emails-input.min.js',
    library: 'EmailsInput',
    libraryExport: 'default',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'emails-input.min.css' })
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.svg$/i,
        type: 'asset/source',
      },
    ]
  },
  optimization: {
    minimize: true,
  }
}
