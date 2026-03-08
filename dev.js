const port = process.env.PORT || 3000;
process.chdir(__dirname);
require('child_process').execSync(`npx next dev -p ${port}`, { stdio: 'inherit' });
