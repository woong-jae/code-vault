const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const src = path.join(__dirname, 'src');

const mode = process.env.NODE_ENV ?? 'development';
const isProduction = mode === 'production';

module.exports = {
  mode,
  entry: isProduction
    ? {
        background: path.join(src, 'app/chrome-extension/background/index.ts'),
        programmers: path.join(
          src,
          'app/chrome-extension/scripts/programmers/index.ts',
        ),
        boj: path.join(src, 'app/chrome-extension/scripts/boj/index.ts'),
        leetcode: path.join(
          src,
          'app/chrome-extension/scripts/leetcode/index.ts',
        ),
        common_isolated: path.join(
          src,
          'app/chrome-extension/scripts/common-isolated/index.ts',
        ),
        setting: path.join(src, 'app/setting/index.ts'),
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
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: "swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: 'typescript'
              }
            }
          }
        }
      },
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
    ...(isProduction
      ? []
      : [new HtmlWebpackPlugin({ template: 'src/dev.html' })]),
  ],
  devServer: {
    hot: true,
    compress: true,
    historyApiFallback: true,
    // client: {
    //   webSocketURL: 'ws://localhost:8080/ws',
    // },
    // devMiddleware: {
    //   writeToDisk: true,
    // },
  },
};
