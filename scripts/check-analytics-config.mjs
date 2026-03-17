import fs from 'node:fs';
import vm from 'node:vm';

const strict = process.env.STRICT_ANALYTICS === '1';
const path = 'analytics.config.js';

function fail(message, code = 1) {
  console.error(`[check:analytics] ${message}`);
  process.exit(code);
}

if (!fs.existsSync(path)) {
  if (strict) fail('analytics.config.js is missing in strict mode.');
  console.log('[check:analytics] analytics.config.js not found (non-strict mode).');
  process.exit(0);
}

const source = fs.readFileSync(path, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);

try {
  vm.runInContext(source, sandbox, { filename: path });
} catch (error) {
  fail(`unable to parse ${path}: ${error instanceof Error ? error.message : String(error)}`);
}

const cfg = sandbox.window.PORTFOLIO_ANALYTICS;
if (!cfg || typeof cfg !== 'object') {
  fail('window.PORTFOLIO_ANALYTICS must be an object.');
}

const provider = typeof cfg.provider === 'string' ? cfg.provider.trim() : '';
if (!provider) {
  if (strict) fail('provider is required in strict mode.');
  console.log('[check:analytics] provider is empty (non-strict mode).');
  process.exit(0);
}

if (provider === 'plausible') {
  const domain = typeof cfg.domain === 'string' ? cfg.domain.trim() : '';
  if (!domain) fail('plausible provider requires domain.');
  console.log(`[check:analytics] valid plausible config for domain: ${domain}`);
  process.exit(0);
}

if (provider === 'ga4') {
  const measurementId = typeof cfg.measurementId === 'string' ? cfg.measurementId.trim() : '';
  if (!measurementId) fail('ga4 provider requires measurementId.');
  console.log(`[check:analytics] valid ga4 config for measurement id: ${measurementId}`);
  process.exit(0);
}

fail(`unsupported provider: ${provider}`);
