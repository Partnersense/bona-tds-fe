const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      admin: './src/admin/index.js', // Ensure this file exists
      product: './src/product/index.js', // Ensure this file exists
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]/bundle.[contenthash].js', // Separate bundles for each app
      clean: true, // Clean the output directory before emit
      publicPath: '/', // Set public path to root for correct routing
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // JavaScript and JSX files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/, // CSS files
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader', // Add PostCSS loader for Tailwind and Autoprefixer
              options: {
                postcssOptions: {
                  plugins: [
                    require('tailwindcss'),
                    require('autoprefixer'),
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/, // Image files
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[hash][ext][query]', // Output pattern for images
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/, // Font files
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[hash][ext][query]', // Output pattern for fonts
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/admin.html', // Ensure this file exists
        filename: 'admin.html', // Output HTML for Admin app
        chunks: ['admin'], // Include only the Admin bundle
      }),
      new HtmlWebpackPlugin({
        template: './public/product.html', // Ensure this file exists
        filename: 'product.html', // Output HTML for Product app
        chunks: ['product'], // Include only the Product bundle
      }),
      new MiniCssExtractPlugin({
        filename: '[name]/styles.[contenthash].css', // Extract CSS into separate files in production
      }),
    ],
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 8080,
      open: true,
      historyApiFallback: {
        rewrites: [
          { from: /^\/admin/, to: '/admin.html' }, // Serve Admin app at /admin
          { from: /^\/product/, to: '/product.html' }, // Serve Product app at /product
        ],
      },
    },
    resolve: {
      extensions: ['.js', '.jsx'], // Resolve these extensions
    },
    optimization: {
      splitChunks: {
        chunks: 'all', // Enable code splitting
      },
    },
  };
};