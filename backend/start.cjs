require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'CommonJS'
  }
});

require('./src/app.ts');
