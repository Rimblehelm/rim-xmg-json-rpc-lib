const fs = require('fs');
const libCoverage = require('istanbul-lib-coverage');
const libReport = require('istanbul-lib-report');
const reports = require('istanbul-reports');

const covFile = 'coverage/coverage-final.json';
if (!fs.existsSync(covFile)) {
  console.error('coverage/coverage-final.json not found. Run tests with coverage first.');
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(covFile, 'utf8'));
const map = libCoverage.createCoverageMap(raw);
const context = libReport.createContext({ dir: 'coverage', coverageMap: map });
const lcovReport = reports.create('lcovonly');
lcovReport.execute(context);
console.log('Generated coverage/lcov.info');
