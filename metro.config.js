const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  "@app": path.resolve(__dirname, "src/app"),
  "@core": path.resolve(__dirname, "src/core"),
  "@domain": path.resolve(__dirname, "src/domain"),
  "@infra": path.resolve(__dirname, "src/infra"),
  "main": path.resolve(__dirname, "src/main"),
  "@presentation": path.resolve(__dirname, "src/presentation"),
  "@styles": path.resolve(__dirname, "src/presentation/styles"),
  "@assets": path.resolve(__dirname, "src/assets"),
  "@components": path.resolve(__dirname, "src/presentation/components"),
  "@hooks": path.resolve(__dirname, "src/presentation/hooks"),
};

// Corrige o bug do “anonymous” no Windows
config.reporter = { update() { } };

module.exports = config;
