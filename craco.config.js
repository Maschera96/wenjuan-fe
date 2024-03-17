module.exports = {
  webpack: {
    configure(webpackConfig) {
      if (webpackConfig.mode === "production") {
        // 抽离公共代码，只在生产环境
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {};
        }
        webpackConfig.optimization.splitChunks = {
          chunks: "all",
          cacheGroups: {
            antd: {
              name: "antd-chunk",
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: "reactDom-chunk",
              test: /react-dom/,
              priority: 99,
            },
            // 第三方插件
            vendors: {
              name: "vendors-chunk",
              test: /node_modules/,
              priority: 98,
            },
          },
        };

        // 设置打包后文件的引用路径
        webpackConfig.output = {
          ...webpackConfig.output,
          publicPath: "/",
        };
      }
      return webpackConfig;
    },
  },

  devServer: {
    port: 8000, // B端
    proxy: {
      "/api": "http://localhost:3001", // Mock
    },
  },
};
