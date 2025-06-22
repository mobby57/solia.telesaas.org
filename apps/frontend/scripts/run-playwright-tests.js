import { spawn } from 'child_process';

async function run() {
  console.log('Running Playwright tests...');
  const test = spawn('npm', ['run', 'test:ui'], { stdio: 'inherit', shell: true });

  test.on('close', (code) => {
    console.log(`Playwright tests exited with code ${code}`);
    process.exit(code);
  });

  test.on('error', (err) => {
    console.error('Failed to start Playwright tests:', err);
    process.exit(1);
  });
}

run();
