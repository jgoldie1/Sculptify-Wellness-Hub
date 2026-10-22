/**
 * Sculptify x TRYAMM settlement calculation — pure reference module.
 * No checkout integration, money movement, or payment-provider access.
 * Input amounts are integer cents and MUST be verified server-side.
 */
export function calculateSculptifySplit({settledCents,taxCents=0,shippingPassThroughCents=0,processingFeeCents=0,refundCents=0,discountCents=0}){
  const vals={settledCents,taxCents,shippingPassThroughCents,processingFeeCents,refundCents,discountCents};
  for(const [name,value] of Object.entries(vals)){
    if(!Number.isSafeInteger(value)||value<0) throw new RangeError(name+' must be a nonnegative integer number of cents');
  }
  const deductions=taxCents+shippingPassThroughCents+processingFeeCents+refundCents+discountCents;
  if(!Number.isSafeInteger(deductions)||deductions>settledCents) throw new RangeError('Deductions exceed settled amount');
  const eligibleNetCents=settledCents-deductions;
  const tryammCents=Math.floor(eligibleNetCents*15/100);
  const sculptifyCents=eligibleNetCents-tryammCents;
  return Object.freeze({eligibleNetCents,tryammCents,sculptifyCents,status:'proposed_not_payable'});
}
