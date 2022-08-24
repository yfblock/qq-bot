const path = require('path');
var nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: './src/index.ts',
    target: 'node',
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    externalsPresets: {
        node: true // in order to ignore built-in modules like path, fs, etc. 
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".ts"]
    }
}   