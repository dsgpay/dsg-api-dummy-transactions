// @ts-check

/**
 * formatMoney
 *
 * @param {*} amount
 * @param {string} [locale="en-US"]
 * @returns {string}
 */
export const formatMoney = (amount, locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
