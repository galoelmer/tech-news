/* eslint-disable */
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('web.ts', 'web.tsx');

module.exports = config;
