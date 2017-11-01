const path = require("path");
const webpack = require("webpack");

const PROD = JSON.parse(process.env.PROD_ENV || "0");
const plugins = [];
if (PROD) {
    plugins.push(new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production"),
        },
    }));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
    }));
}
plugins.push(new webpack.NoEmitOnErrorsPlugin());
plugins.push(new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default'],
}));

module.exports = {
    target: "web",
    devtool: "sourcemap",
    plugins,
    entry: {
        index: [
            "./ui-src/index.js",
        ],
    },
    output: {
        path: path.resolve(__dirname, "public/dist"),
        filename: PROD ? "[name].bundle.min.js" : "[name].bundle.js",
    },

    module: {
        loaders: [{
            test: /\.jsx$|\.js$/,
            loader: "babel-loader",
            query: {
                presets: ["es2015", "react", "stage-2"],
            },
            exclude: /node_modules/,
            include: [path.resolve(__dirname, "..")],
        }, {
            test: /\.json?$/,
            loader: "json-loader",
            exclude: /node_modules/,
            include: [path.resolve(__dirname, "..")],
        }, {
            test: /\.css$/,
            loader: "style!css",
            // exclude: /node_modules/,
            include: [path.resolve(__dirname, "..")],
        },{
            test: /\.(scss)$/,
            use: [{
              loader: 'style-loader', // inject CSS to page
            }, {
              loader: 'css-loader', // translates CSS into CommonJS modules
            }, {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            }, {
              loader: 'sass-loader' // compiles SASS to CSS
            }]
        },{
            test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'font-awesome/',    // where the fonts will go
                publicPath: '../dist/'       // override the default path
              }
            }]
        }],
    },
    resolve: {
        extensions: [".js", ".jsx", ".css"],
    },
};
