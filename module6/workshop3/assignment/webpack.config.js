const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules:[
            {
                test: /\.jsx?$/,
                use: ['babel-loader']
            },
            {
                test: /\.(jpe?g|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: { limit: 1500 },
                },
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                        },
                        optionpng: {
                            optimizationLevel: 7
                        }
                    }
                }]
            }
        ]
    },
    output: {
        filename: 'bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Gify Loader',
            template: 'src/template.html'
        })
    ]
}