const path = require("path");

module.exports = {
    mode: "production",
    entry: "./frontend/App.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js",
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", { targets: "defaults" }],
                            "@babel/preset-react",
                        ],
                    },
                },
            },
        ],
    },
    // resolve: {
    //   fallback: {
    //     net: false,
    //     zlib: "browserify-zlib",
    //     crypto: "crypto-browserify",
    //     buffer: "buffer",
    //     http: "stream-http",
    //     stream: "stream-browserify",
    //     url: "url",
    //     vm: 'vm-browserify',
    //     console: 'console-browserify',
    //     path: 'path-browserify',
    //     fs: false,
    //     util: 'util',
    //     repl: false,
    //     assert: false,
    //     module: false,
    //     os: 'os-browserify/browser',
    //     async_hooks: "async-hooks"
    //     // "url": require.resolve("url/"),
    //     // "path": require.resolve("path-browserify"),
    //     // "util": require.resolve("util/"),
    //     // "stream": require.resolve("stream-browserify"),
    //     // "buffer": require.resolve("buffer/"),
    //     // "http": require.resolve("stream-http"),
    //     // "crypto": require.resolve("crypto-browserify"),
    //     // "zlib": require.resolve("browserify-zlib"),
    //     // "assert": require.resolve("assert/"),
    //     // "fs": false,
    //     // "net": false,
    //     // "path": false,
    //     // "util": false,
    //     // "stream": false,
    //     // "buffer": false,
    //     // "string_decoder": false,
    //   }
    // },
    // node: {
    //   global: true,
    // }
};
