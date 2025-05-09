const path = require('path');
// importuję bibliotękę [path] z [node.js]
const HtmlWebpackPlugin = require('html-webpack-plugin');
// importuję odpowiedni plugin
module.exports = {
    entry: './assets/js/script.js',
    // definiuje plik wejściowy
    output: {
        path: path.resolve(__dirname, 'build'),
        // definiuje ścieżką wyjściową
        filename: 'script.min.js',
        // definiuję nazwę pliku wyjściowego
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // określam jakie pliki 
                // będą brane pod uwagę
                exclude: /node_modules/,
                // określam wykluczenia
                use: 'babel-loader',
                // określam jaki [loader]
                // ma być wykorzystany
            }
        ]
        // obecnie brak dodatkowych ustawień
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            // wskazuje plik źródłowy
            filename: 'index.html'
            // określam nazwę dla pliku
        })
    ],
    devServer: {
        static: './',
    },
}
// eksportuję ustawienia dla webpack-a