module.exports = {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.js'], // Tratar arquivos .js como ESM
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transforma arquivos usando Babel
  },
  transformIgnorePatterns: [
    '/node_modules/(?!chai)', // Transforma módulos dentro de node_modules, exceto chai
  ],
  moduleFileExtensions: ['js', 'json', 'node'], // Extensões válidas
}
