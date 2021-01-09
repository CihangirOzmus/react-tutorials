const path = require("path");

module.exports = {
    entry: ["babel-polyfill", "./src/app.js"],
    output: {
        path: path.resolve(__dirname, "public/scripts"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
           },
           {
               test:/\.s?css$/,
               use: ["style-loader", "css-loader", "sass-loader"]
           }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        publicPath: "/scripts"
    },
    devtool: "source-map"
}
