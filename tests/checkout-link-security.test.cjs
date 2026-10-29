// Run: node --test tests/checkout-link-security.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Exercise the actual production function without loading browser-only app.js.
const source = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const start = source.indexOf('function approvedCheckoutUrl(value){');
assert.ok(start >= 0, 'Production checkout guard must exist');
const end = source.indexOf('\n}', start);
assert.ok(end > start, 'Production checkout guard must have a closing brace');
const snippet = source.slice(start, end + 2);
const approvedCheckoutUrl = vm.runInNewContext(snippet + '\napprovedCheckoutUrl;', { URL });

test('accepts Stripe-hosted HTTPS payment links', () => {
  assert.equal(approvedCheckoutUrl('https://buy.stripe.com/test_abc'), 'https://buy.stripe.com/test_abc');
  assert.equal(approvedCheckoutUrl('https://checkout.stripe.com/pay/abc'), 'https://checkout.stripe.com/pay/abc');
});
test('rejects non-Stripe and unsafe destinations', () => {
  for (const url of [null, '', 'javascript:alert(1)', 'http://buy.stripe.com/test', 'https://buy.stripe.com.evil.example/abc', 'https://evil.example/', '//buy.stripe.com/test']) {
    assert.equal(approvedCheckoutUrl(url), null, String(url));
  }
});
test('uses the guard in product checkout rendering', () => {
  assert.match(source, /approvedCheckoutUrl\(p\.checkout_url\)/);
  assert.match(source, /Checkout Pending/);
  assert.match(source, /noopener noreferrer/);
});
