## Performance Optimize

### analysis build bundle

* build --report
  * [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
* ignorePlugin : remove no used moment local file
* split chunk from node_modules:
  * [runtimeChunk](https://webpack.js.org/configuration/optimization/#optimizationruntimechunk)
  * npm.xxx
* routes lazy load
