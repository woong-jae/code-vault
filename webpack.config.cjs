const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const src = path.join(__dirname, 'src');

const mode = process.env.NODE_ENV ?? 'development';
const isProduction = mode === 'production';

const port = 8080;
const hotScript = 'webpack/hot/dev-server';
const clientScript = `webpack-dev-server/client?hot=true&protocol=ws&hostname=localhost&port=${port}`;

module.exports = {
  mode,
  entry: {
    background: [path.join(src, 'app/chrome-extension/background/index.ts')],
    programmers: [
      path.join(src, 'app/chrome-extension/scripts/programmers/index.ts'),
    ],
    boj: [path.join(src, 'app/chrome-extension/scripts/boj/index.ts')],
    leetcode: [
      path.join(src, 'app/chrome-extension/scripts/leetcode/index.ts'),
    ],
    common_isolated: [
      path.join(src, 'app/chrome-extension/scripts/common-isolated/index.ts'),
    ],
    setting: [
      path.join(src, 'app/user-config/index.ts'),
      ...(isProduction ? [] : [hotScript, clientScript]),
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
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
      '@base': path.resolve(__dirname, 'src/base'),
    },
  },
  devtool: isProduction ? false : 'inline-source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: '.' }],
      options: {},
    }),
    new CleanWebpackPlugin(),
    ...(isProduction
      ? []
      : [
          new webpack.HotModuleReplacementPlugin(),
          new ReactRefreshWebpackPlugin({
            overlay: false,
          }),
        ]),
  ],
  devServer: {
    port,
    hot: false,
    client: false,
    allowedHosts: 'all',
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      watch: false,
    },
  },
};
