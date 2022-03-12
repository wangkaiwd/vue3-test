## Performance Optimize

### analysis build bundle

* build --report
  * [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
* ignorePlugin : remove no used moment local file
* split chunk from node_modules:
  * [runtimeChunk](https://webpack.js.org/configuration/optimization/#optimizationruntimechunk)
  * third party modules under `node_modules` -> npm.xxx
* routes lazy load

### nginx
* brew install nginx
  * [homebrew china mirror](https://gist.github.com/shrekuu/af1c92f80f3d6e9b03e9d2f62ef67e29)
  * [清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)
* [Beginner's Guide](https://nginx.org/en/docs/beginners_guide.html)

#### run nginx 

run follow command to start and shutdown nginx
```shell
# start nginx
nginx
# graceful shutdown
nginx -s quit
```
access page `locahost:8080` in browser, if page display successfully means that nginx is running

#### put bundle to nginx server root directory

view nginx configuration
```shell
nginx -V
#nginx version: nginx/1.21.6
#built by clang 13.0.0 (clang-1300.0.29.3)
#built with OpenSSL 1.1.1m  14 Dec 2021
#TLS SNI support enabled
#configure arguments: --prefix=/usr/local/Cellar/nginx/1.21.6 --sbin-path=/usr/local/Cellar/nginx/1.21.6/bin/nginx --with-cc-opt='-I/usr/local/opt/pcre/include -I/usr/local/opt/openssl@1.1/include' --with-ld-opt='-L/usr/local/opt/pcre/lib -L/usr/local/opt/openssl@1.1/lib' --conf-path=/usr/local/etc/nginx/nginx.conf --pid-path=/usr/local/var/run/nginx.pid --lock-path=/usr/local/var/run/nginx.lock --http-client-body-temp-path=/usr/local/var/run/nginx/client_body_temp --http-proxy-temp-path=/usr/local/var/run/nginx/proxy_temp --http-fastcgi-temp-path=/usr/local/var/run/nginx/fastcgi_temp --http-uwsgi-temp-path=/usr/local/var/run/nginx/uwsgi_temp --http-scgi-temp-path=/usr/local/var/run/nginx/scgi_temp --http-log-path=/usr/local/var/log/nginx/access.log --error-log-path=/usr/local/var/log/nginx/error.log --with-compat --with-debug --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_degradation_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-ipv6 --with-mail --with-mail_ssl_module --with-pcre --with-pcre-jit --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module
```
then cd `/usr/local/Cellar/nginx/1.21.6` (--prefix):
```shell
cd /usr/local/Cellar/nginx/1.21.6
ll
#total 664
#drwxr-xr-x  4 wangkai  admin   128B Jan 25 23:04 .bottle
#drwxr-xr-x  3 wangkai  admin    96B Jan 25 23:04 .brew
#-rw-r--r--  1 wangkai  admin   310K Jan 25 23:04 CHANGES
#-rw-r--r--  1 wangkai  admin   1.1K Feb 25 00:38 INSTALL_RECEIPT.json
#-rw-r--r--  1 wangkai  admin   1.4K Jan 25 23:04 LICENSE
#-rw-r--r--  1 wangkai  admin    49B Jan 25 23:04 README
#drwxr-xr-x  3 wangkai  admin    96B Jan 25 23:04 bin
#-rw-r--r--  1 wangkai  admin   484B Feb 25 00:38 homebrew.mxcl.nginx.plist
#-rw-r--r--  1 wangkai  admin   197B Feb 25 00:38 homebrew.nginx.service
#lrwxr-xr-x  1 wangkai  admin    16B Feb 25 00:38 html -> ../../../var/www
#drwxr-xr-x  4 wangkai  admin   128B Jan 25 23:04 share
```
find html is symbolic(soft link) to `.../.../../var/www`, it is root directory of nginx static server. we can open it with vscode:
```shell
code html
```
to there, we realize that put bundle to this directory can serve by nginx finally:
```shell
# cd project
cp -r dist/* /usr/local/Cellar/nginx/1.21.6/html
```

### http configuration
cache:
* expires: server set absolute cache time
  * client time may be inaccuracy
  * If there is a `Cache-Control` header with the `max-age` or `s-maxage` directive in response, the Expires header is ignored
* Cache-Control
* Last-Modified (If-Modified-Since)
* etag (If-None-Match)

compression:
* [gzip](https://www.digitalocean.com/community/tutorials/how-to-improve-website-performance-using-gzip-and-nginx-on-ubuntu-20-04#step-3-configuring-nginx-s-gzip-settings)
* brotli

document of directives:
* [add arbitrary response header](https://nginx.org/en/docs/http/ngx_http_headers_module.html#example)
* [etag](https://nginx.org/en/docs/http/ngx_http_core_module.html#etag)

http transmission optimize:
* Connection: keep-alive: keep connection in certain time frame which can avoid TCP handshake and wave for each request
  * [Timing breakdown phase explained](https://developer.chrome.com/docs/devtools/network/reference/?utm_source=devtools#timing-explanation)
  * DNS Lookup
  * Initial connection
  * nginx set `keepalive_timeout  0`, server set `Connection: close` response header

https and http2:
1. Binary nature
2. Multiplexing： parallel request amount not limited
3. Header Compression

[The Http/2 Module in nginx](https://www.nginx.com/blog/http2-module-nginx) 

#### think
* how to check nginx running status?
