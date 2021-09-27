const path = require("path");
const webpack = require("webpack");
const FILENAME = require("./package.json").name;
const DIST_FOLDER = path.resolve(__dirname, '..', 'plugin', 'assets');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: FILENAME+".js",
        path: DIST_FOLDER
    },

    // Enable sourcemaps for debugging webpack's output.
    // devtool: "source-map",
    // mode: "development",
    mode: "production",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json", "svg"]
    },

    module: {
        rules: [
            { loader: 'cache-loader' },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
              test: /\.tsx?$/,
              loader: "ts-loader",
              options: {
                transpileOnly: true
              }
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            //image
            {
              test: /\.(pdf|jpg|png|gif|svg|ico)$/,
              use: [
                  {
                      loader: 'url-loader'
                  },
              ]
            }
        ]
    },

    plugins: [
        new ForkTsCheckerWebpackPlugin({
            memoryLimit: 2048,
            workers: 1
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};
