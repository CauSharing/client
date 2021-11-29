const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app){
//   app.use(
//       createProxyMiddleware('/api', {
//           target: 'http://3.37.167.224:8080',
//           changeOrigin: true
//       }),
//   )
// };

module.exports = function(app){
  app.use(
      createProxyMiddleware(
        ['/api', "/api/ws-stomp"], {
          target: 'http://3.37.167.224:8080',
          changeOrigin: true,
          ws: true
      }),
  )
};