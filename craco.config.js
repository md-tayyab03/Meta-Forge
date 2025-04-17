module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove any problematic polyfills
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "fs": false,
        "net": false,
        "tls": false,
        "path": false,
        "crypto": false,
        "stream": false,
        "url": false,
        "zlib": false,
        "http": false,
        "https": false,
        "assert": false,
        "os": false
      };
      return webpackConfig;
    }
  }
}; 