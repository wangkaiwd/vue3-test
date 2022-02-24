## Performance Optimize

### analysis build bundle

* build --report
  * [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
* ignorePlugin : remove no used moment local file
* split chunk from node_modules:
  * [runtimeChunk](https://webpack.js.org/configuration/optimization/#optimizationruntimechunk)
  * npm.xxx
* routes lazy load

### nginx
* brew install nginx
  * [homebrew china mirror](https://gist.github.com/shrekuu/af1c92f80f3d6e9b03e9d2f62ef67e29)
  * [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)
