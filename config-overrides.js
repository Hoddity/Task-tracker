module.exports = function override(config, env) {
    if (env === 'development') {
        config.devServer = {
            ...config.devServer,
            headers: {
                'Content-Security-Policy': "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
            },
        };
    }
    return config;
};