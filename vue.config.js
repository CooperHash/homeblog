const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  devServer: {
    port: 3001
  },
  chainWebpack: config => {
    config.cache(true)
    // config.plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

    config.plugin('ignore')
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    config.plugin('speed')
      .use(SpeedMeasurePlugin)
    config.plugins.delete('prefetch')

    config.optimization.splitChunks({
      chunks: "all",
      minSize: 20000, // 允许新拆出 chunk 的最小体积，也是异步 chunk 公共模块的强制拆分体积
      maxAsyncRequests: 6, // 每个异步加载模块最多能被拆分的数量
      maxInitialRequests: 6, // 每个入口和它的同步依赖最多能被拆分的数量
      enforceSizeThreshold: 50000, // 强制执行拆分的体积阈值并忽略其他限制
      cacheGroups: {
        // commons: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'commons',
        //   chunks: 'initial',
        //   priority: 10,
        //   minChunks: 2
        // },
        antdesigns: {
          name: 'antdesigns',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](@ant-design)[\\/]/,
          priority: 20
        },
        antdesignVue: {
          name: 'antdesignVue',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](ant-design-vue)[\\/]/,
          priority: 30
        },
        commons: { // 公共模块包
          name: `chunk-commons`,
          minChunks: 2,
          priority: 0,
          reuseExistingChunk: true
        }
      }
    })

    const plugins = [];
    apply: (compiler) => {
      // 编译完成后
      compiler.hooks.done.tap('DonePlugin', compilation => {
        console.log('编译完成')
        // 通过配置 package.json , 执行指定node.js脚本
        exec('npm run upload', { stdio: 'inherit' });
      });
    }
    return { plugins }
  }
}