import continentsJson from './data/continents.json';
import continentJson from './data/continent.json';
import iso3Json from './data/iso_alpha_3.json';
import capitalJson from './data/capital.json';
import currencyJson from './data/currency.json';
import currencyInfoJson from './data/currency_info.json';
import namesJson from './data/names.json';
import phoneJson from './data/phone.json';
import regionsJson from './data/regions.json';

export type ISO2 = keyof typeof iso3Json;
export type ISO3 = typeof iso3Json[ISO2];
export type Continent = keyof typeof continentsJson;

export interface RAW  {
    continent: typeof continentJson;
    ISO2_contient: typeof continentsJson;
    ISO2_ISO3 : ISO3;
    ISO2_capital: typeof capitalJson;
    ISO2_currency: typeof currencyJson;
    currency_info: typeof currencyInfoJson;
    ISO2_names: typeof namesJson;
    ISO2_phoneCountryCode: typeof phoneJson;
    ISO2_region: typeof regionsJson;
}

export interface CountryCode {
    iso2: ISO2;
    iso3: ISO3;
}

export interface Currency {
    code: string;
    decimal: string;
    symbol: string;
}

export interface Country {
    name: string;
    region: string;
    capital: string;
    continent: Continent;
    dialing_code: string;
    code: CountryCode;
    currency: Currency;
}

export type CountriesMap = Record<any, Country>;

export type SearchableCountryRecordMember =
    | 'name'
    | 'region'
    | 'capital'
    | 'continent'
    | 'dialing_code'
    | 'iso2'
    | 'iso3';


/**
 * ### Get list of country record member.
 * example:
 *
 * ```typescript
 * const country_names = ls('name');
 * ```
 *
 * @param {SearchableCountryRecordMember} member
 * @return {Promise<Array<string | undefined>>}
 */
export function ls(member: SearchableCountryRecordMember): Promise<Array<string | undefined>>;

/**
 * Get list of names
 */
export function names(): Promise<string[]>;

/**
 *Get list of continents
 */
export function continents(): Promise<Continent[]>;

/**
 * Get list of capitals
 */
export function capitals(): Promise<string[]>;

/**
 *Get list of dialing_codes
 */
export function dialing_codes(): Promise<string[]>;

/**
 *Get list of codes
 */
export function codes(): Promise<string[]>;

/**
 *Get list of currencies
 */
export function currencies(): Promise<string[]>;

/**
 *Get list of provinces
 */
export function provinces(): Promise<string[]>;


/**
 * Find country by ISO2
 * @param {string}iso2
 */
export function findByIso2(iso2: string): Country | undefined;

/**
 * Find country by ISO3 code
 * @param {string}iso3
 */
export function findByIso3(iso3: string): Country | undefined;

/**
 * Find country by name
 * @param {string}name
 */
export function findByName(name: string): Country | undefined;

/**
 * Find country by capital
 * @param {string}capital
 */
export function findByCapital(capital: string): Country | undefined;

/**
 * Find country by currency
 * @param {string}currency
 */
export function findByCurrency(currency: string): Country | undefined;

/**
 * Find country by province
 * @param {string}province
 */
export function findByProvince(province: string): Country | undefined;

/**
 * Map of all countries
 */
export const all: CountriesMap;

/**
 * Lisat of all countries
 */
export const allArray: Country[];

