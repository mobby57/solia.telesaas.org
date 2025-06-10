const path = require('path');

// INIT_CWD = folder where the user ran `npm install`
const cwd = process.env.INIT_CWD;
const root = __dirname.includes('scripts') ? path.resolve(__dirname, '..') : process.cwd();

if (cwd !== root) {
  console.error('❌ Please run npm install only at the root of the monorepo.');
  console.error(`📂 You are in: ${cwd}`);
  console.error(`🏠 Expected:  ${root}`);
  process.exit(1);
}
