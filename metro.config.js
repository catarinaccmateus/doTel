module.exports = {
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'jpg'],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
