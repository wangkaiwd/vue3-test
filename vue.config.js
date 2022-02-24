const webpack = require('webpack');
// const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: {
    optimization: {
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        minSize: 100 * 1024,
        cacheGroups: {
          npm: {
            test: /[\\/]node_modules[\\/]/,
            priority: -9,
            reuseExistingChunk: true,
            chunks: 'all',
            name (module, chunk, cacheGroupKey) {
              const regex = /[\\/]node_modules[\\/](.*?)(?:[\\/]|$)/;
              const moduleName = module.context.match(regex)[1];
              return `${cacheGroupKey}.${moduleName.replace('@', '')}`;
            },
          },
        }
      }
    },
    // why only set this plugin, change theme will work
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    ]
  }
};
