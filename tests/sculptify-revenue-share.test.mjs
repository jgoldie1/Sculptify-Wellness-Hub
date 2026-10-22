import assert from 'node:assert/strict';
import {calculateSculptifySplit} from '../lib/sculptify-revenue-share.mjs';
assert.deepEqual(calculateSculptifySplit({settledCents:10000,taxCents:800,shippingPassThroughCents:700,processingFeeCents:300}),{eligibleNetCents:8200,tryammCents:1230,sculptifyCents:6970,status:'proposed_not_payable'});
assert.deepEqual(calculateSculptifySplit({settledCents:101}),{eligibleNetCents:101,tryammCents:15,sculptifyCents:86,status:'proposed_not_payable'});
assert.throws(()=>calculateSculptifySplit({settledCents:100,refundCents:101}),RangeError);
assert.throws(()=>calculateSculptifySplit({settledCents:-1}),RangeError);
assert.throws(()=>calculateSculptifySplit({settledCents:1.5}),RangeError);
console.log('Revenue share unit tests passed');
