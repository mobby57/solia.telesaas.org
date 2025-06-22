import { register } from 'ts-node';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

register({
  transpileOnly: true,
  compilerOptions: {
    module: 'ESNext'
  }
});

const appPath = pathToFileURL(path.resolve(fileURLToPath(new URL('.', import.meta.url)), './src/app.ts')).href;

(async () => {
  await import(appPath);
})();
