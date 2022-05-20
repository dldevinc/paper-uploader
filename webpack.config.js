const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        bundle: "./src/index.js"
    },
    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: "/",
        filename: "[name].js",
        library: "Uploader",
        libraryTarget: "umd",
        libraryExport: "default"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: [path.join(__dirname, "src"), "node_modules"],
        extensions: [".js"]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true
            })
        ]
    }
};
