const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use((req, res, next) => {
        // Установим CSP заголовок
        res.setHeader(
            'Content-Security-Policy',
            "script-src 'self' 'unsafe-inline' 'unsafe-eval';"
        );
        next();
    });
};
