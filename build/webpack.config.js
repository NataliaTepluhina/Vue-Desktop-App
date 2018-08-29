const path = require( 'path' );
const webpack = require( 'webpack' );
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' );
const VuidoTemplateCompiler = require( 'vuido-template-compiler' );

module.exports = function( { production } = {} ) {
  if ( production )
    process.env.NODE_ENV = 'production';

  const config = {
    mode: production ? 'production' : 'development',
    entry: './src/main.js',
    output: {
      path: path.resolve( __dirname, '../dist' ),
      filename: production ? 'main.min.js' : 'main.js'
    },
    target: 'node',
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compiler: VuidoTemplateCompiler
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.js', '.vue', '.json' ]
    },
    plugins: [
      new webpack.ExternalsPlugin( 'commonjs', [ 'libui-node' ] ),
      new VueLoaderPlugin()
    ],
    performance: {
      hints: false
    },
    stats: {
      children: false,
      modules: false
    },
    devtool: false
  };

  return config;
}
