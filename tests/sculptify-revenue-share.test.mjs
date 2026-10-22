import assert from 'node:assert/strict';
import {calculateSculptifySplit} from '../lib/sculptify-revenue-share.mjs';
assert.throws(()=>calculateSculptifySplit({settledCents:10000}),/WITHDRAWN/);
console.log('PASS: withdrawn Sculptify sales split cannot execute');
