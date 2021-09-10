const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: { path: path.join(__dirname, 'build'), filename: 'index.bundle.js' },
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
  devServer: { port: 3010, contentBase: path.join(__dirname, 'build') },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(?:ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: './public/accounting.png',
    }),
    new CleanWebpackPlugin(),
  ],
};
