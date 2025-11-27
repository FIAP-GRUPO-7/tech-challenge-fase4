// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@app": "./src/app",
            "@core": "./src/core",
            "@domain": "./src/domain",
            "@infra": "./src/infra",
            "@presentation": "./src/presentation",
            "@styles": "./src/presentation/styles",
            "@assets": "./src/assets",
            "@components": "./src/presentation/components",
            "@hooks": "./src/presentation/hooks",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
