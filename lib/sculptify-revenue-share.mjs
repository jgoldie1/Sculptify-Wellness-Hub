/**
 * Legacy revenue-share module DISABLED by founder direction.
 * Sculptify keeps 100% of Sculptify's own sales. No TRYAMM deduction.
 * This fail-closed module prevents accidental use of the withdrawn 15/85 model.
 */
export function calculateSculptifySplit(){
  throw new Error('WITHDRAWN: Do not split Sculptify revenue. Use a separately approved TRYAMM Scout referral program.');
}
