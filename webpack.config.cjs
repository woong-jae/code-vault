const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const src = path.join(__dirname, 'src');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: isProduction
    ? {
        background: path.join(src, 'chrome-extension/background/index.ts'),
        programmers: path.join(
          src,
          'chrome-extension/scripts/programmers/index.ts',
        ),
        common_isolated: path.join(
          src,
          'chrome-extension/scripts/common-isolated/index.ts',
        ),
      }
    : './src/app/dev.ts',
  output: isProduction
    ? {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
      }
    : {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
      },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  devtool: isProduction ? false : 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '.', context: 'public' }],
      options: {},
    }),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
  ],
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
};
