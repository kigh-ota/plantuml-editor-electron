const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');
const TS_MODULE = {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader'
    }],
};

module.exports = [
    {
        target: 'electron-main',
        entry: './src/main/main.ts',
        mode: 'development',
        devtool: 'cheap-source-map',
        output: {
            path: path.join(__dirname, 'app', 'generated'),
            filename: 'main.js'
        },
        module: TS_MODULE,
        resolve: {
            extensions: [
                '.ts',
                '.tsx',
                '.js', // node_modulesのライブラリ読み込みに必要
            ]
        },
        externals: [
            function(context, request, callback) {
                if (/^sqlite3$/.test(request)) {
                    return callback(null, 'commonjs ' + request);
                }
                callback();
            }
        ],
        plugins: [
            new CleanWebpackPlugin(['./app/generated'])
        ],
    },
    {
        target: 'electron-renderer',
        entry: './src/renderer/index.tsx',  // 起点となるファイル
        // development は、 source map file を作成、再ビルド時間の短縮などの設定となる
        // production は、コードの圧縮やモジュールの最適化が行われる設定となる
        mode: 'development', // "production" | "development" | "none"
        devtool: 'source-map',    // ソースマップのタイプ
        // 出力先設定 __dirname は node でのカレントディレクトリのパスが格納される変数
        output: {
            path: path.join(__dirname, 'app', 'generated'),
            filename: 'renderer.js'
        },
        module: TS_MODULE,
        resolve: {
            extensions: [
                '.ts',
                '.tsx',
                '.js', // node_modulesのライブラリ読み込みに必要
            ]
        }
    },
    {
        target: 'node',
        entry: './src/cli/main.ts',
        mode: 'development',
        devtool: 'source-map',
        output: {
            path: __dirname,
            filename: 'cli.js'
        },
        module: TS_MODULE,
        resolve: {
            extensions: [
                '.ts',
                '.js', // node_modulesのライブラリ読み込みに必要
            ]
        },
        externals: [
            function(context, request, callback) {
                if (/^sqlite3$/.test(request)) {
                    return callback(null, 'commonjs ' + request);
                }
                callback();
            }
        ]
    }
];
