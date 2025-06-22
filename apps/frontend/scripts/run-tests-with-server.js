#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';

const isWindows = process.platform === 'win32';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const cwd = path.resolve(__dirname, '..');

function getBinPath(binName) {
  return path.resolve(cwd, 'node_modules', '.bin', isWindows ? `${binName}.cmd` : binName);
}

const nextBin = getBinPath('next');
const playwrightBin = getBinPath('playwright');

const devServer = spawn(nextBin, ['dev'], { cwd, stdio: 'inherit' });



devServer.on('error', (err) => {
  console.error('Failed to start dev server:', err);
  process.exit(1);
});

devServer.stdout?.on('data', (data) => {
  const output = data.toString();
  if (output.includes('ready')) {
    console.log('Dev server is ready. Starting Playwright tests...');
    const testRunner = spawn(playwrightBin, ['test'], { stdio: 'inherit' });
    testRunner.on('close', (code) => {
      console.log(`Playwright tests exited with code ${code}`);
      devServer.kill();
      process.exit(code ?? 0);
    });
  }
});




devServer.on('close', (code) => {
  console.log(`Dev server process exited with code ${code}`);
  process.exit(code ?? 0);
});
