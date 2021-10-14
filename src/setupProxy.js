const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://3.37.167.224:8080',
          changeOrigin: true
      })
  )
};