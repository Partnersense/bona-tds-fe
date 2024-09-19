const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  
  const isProduction = argv.mode === 'production';

  

  return {

    entry: {
      admin: './src/admin/index.js', // Entry for the Admin app
      product: './src/product/index.js', // Entry for the Product app
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]/bundle.asset.js', // Generates a unique hash for JS files
      publicPath: '', // Use relative paths for standalone HTML files
      clean: true, // Cleans the output directory before build
    },

  

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/, // Handle JavaScript and JSX files
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'], // Use Babel presets for React
            },
          },
        },
        {
          test: /\.css$/, // Handle CSS files
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // Extract CSS in production
            'css-loader',
            {
              loader: 'postcss-loader', // PostCSS for Tailwind and Autoprefixer
              options: {
                postcssOptions: {
                  plugins: [
                    require('tailwindcss'), // TailwindCSS
                    require('autoprefixer'), // Autoprefixer
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/, // Handle image files
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[hash][ext][query]', // Output pattern for images with unique hash
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/, // Handle font files
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[hash][ext][query]', // Output pattern for fonts with unique hash
          },
        },
      ],
    },

    plugins: [
      // Generate admin.html and inject CSS and JS
      new HtmlWebpackPlugin({
        template: './public/admin.html', // Template for the Admin app
        filename: 'admin.html', // Output HTML for Admin app
        chunks: ['admin'], // Include only the Admin bundle
        inject: 'body', // Ensure JS bundle is injected at the bottom of the body
      }),

      // Generate product.html and inject CSS and JS
      new HtmlWebpackPlugin({
        template: './public/product.html', // Template for the Product app
        filename: 'product.html', // Output HTML for Product app
        chunks: ['product'], // Include only the Product bundle
        inject: 'body', // Ensure JS bundle is injected at the bottom of the body
      }),

      // Extract CSS into separate files with unique hash for each entry
      new MiniCssExtractPlugin({
        filename: '[name]/styles.css', // Extract CSS into separate files with unique hash
      }),
    ],

    resolve: {
      extensions: ['.js', '.jsx'], // Resolve JS and JSX file extensions
    },

    devtool: 'source-map',
    
    optimization: {
      minimize: false,
      splitChunks: {
        chunks: 'all', // Enable code splitting for better optimization
      },
    },

    ...(isProduction
      ? {} // No devServer for production
      : {
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
        }),
  };
};
