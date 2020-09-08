const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const is_DEV = process.env.NODE_ENV === 'development';
const is_PROD = !is_DEV;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if (is_PROD) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ];
    }

    return config;
}

const filename = extension => is_DEV ? `[name].${extension}` : `[name].[hash].${extension}`;

const scriptLoaders = preset => {
    const loaders = [{
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
        }
    }];

    if (preset) loaders[0].options.presets.push(preset);

    if (is_DEV) loaders.push('eslint-loader');

    return loaders;
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.ts']
    },
    output: {
        filename: filename('.js'),
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 3000,
        hot: is_DEV
    },
    devtool: is_DEV ? 'source-map' : undefined,
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    optimization: optimization(),
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: is_PROD,
                // removeComments: is_PROD,
                // removeRedundantAttributes: is_PROD,
                // useShortDoctype: is_PROD
            }
        }),
        new CopyPlugin({
            patterns: [{
                from: 'assets',
                to: 'assets',
            },
                {
                    from: 'views',
                    to: 'views',
                }]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader:
                        MiniCssExtractPlugin.loader,
                        options: {
                            hmr: is_DEV,  // hot module replacement
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: scriptLoaders()
            },
            {
                test: /\.ts$/,
                exclude: '/node_modules/',
                use: scriptLoaders('@babel/preset-typescript')
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                include: path.resolve(__dirname, 'src/images'),
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                include: path.resolve(__dirname, 'src/fonts'),
                use: ['file-loader']
            }
        ]
    }
};
