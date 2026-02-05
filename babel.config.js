module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }], // Use NativeWind's JSX source
      'nativewind/babel', // Add nativewind preset
    ],
    // Keep other plugins here, e.g., 'react-native-reanimated/plugin'
    plugins: ['react-native-reanimated/plugin'],
  };
};
