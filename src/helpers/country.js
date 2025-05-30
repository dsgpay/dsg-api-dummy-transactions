import currencyCodes from 'currency-codes';
import countries from 'i18n-iso-countries';

/**
 * Get a default ISO 3166-1 alpha-2 country code by ISO 4217 currency code
 * @param {string} currencyCode - e.g., 'EUR'
 * @returns {string|null} - e.g., 'DE'
 */
export function getCountryCodeByCurrency(currencyCode) {
  if (!currencyCode) return null;

  const currency = currencyCodes.code(currencyCode.toUpperCase());
  if (!currency || !currency.countries?.length) return null;

  // Get the first country name
  const firstCountryName = currency.countries[0];

  // Convert to alpha-2 country code
  const alpha2 = countries.getAlpha2Code(firstCountryName, 'en');

  return alpha2 || null;
}
