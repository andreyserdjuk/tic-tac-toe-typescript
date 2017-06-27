const path = require('path');

module.exports = env => {
    const config = {
        entry: "./src/index.tsx",
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist"),
        },

        devtool: "source-map",

        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: "awesome-typescript-loader"
                    }
                },
                {
                    test: /\.js$/,
                    use: {
                        loader: "source-map-loader"
                    }
                }
            ]
        },

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
    };

    if (typeof env !== 'undefined' && env.debug) {
        console.log(env);
        debugger;
    }

    return config;
};