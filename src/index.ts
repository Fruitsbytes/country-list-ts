import continentsJson from './data/continents.json';
import continentJson from './data/continent.json';
import isoAlpha3Json from './data/iso_alpha_3.json';
import capitalJson from './data/capital.json';
import currencyJson from './data/currency.json';
import currencyInfoJson from './data/currency_info.json';
import namesJson from './data/names.json';
import phoneJson from './data/phone.json';
import regionsJson from './data/regions.json';
import provincesJson from './data/provinces.json';
import memoize from "fast-memoize";

import {CountriesMap, Country, SearchableCountryRecordMember, ISO2} from "./types";

export const RAW = {
    continent: continentJson,
    ISO2_contient: continentsJson,
    ISO2_ISO3: isoAlpha3Json,
    ISO2_capital: capitalJson,
    ISO2_currency: currencyJson,
    currency_info: currencyInfoJson,
    ISO2_names: namesJson,
    ISO2_phoneCountryCode: phoneJson,
    ISO2_region: regionsJson,
    ISO2_province: provincesJson,
} as const;

function _all(): CountriesMap {
    let a: CountriesMap = {};

    Object.keys(isoAlpha3Json).forEach((iso2: ISO2) => {
        a[iso2] = {
            capital: capitalJson[iso2],
            code: {
                iso2,
                iso3: isoAlpha3Json[iso2]
            },
            continent: continentsJson[continentJson[iso2]],
            currency: {
                code: currencyJson[iso2],
                symbol: currencyInfoJson[currencyJson[iso2]].symbol,
                decimal: currencyInfoJson[currencyJson[iso2]].decimal
            },
            dialing_code: phoneJson[iso2],
            name: namesJson[iso2],
            provinces: provincesJson[iso2],
            region: regionsJson[iso2]
        };
    });
    return a;
}

/**
 * Map of all countries
 * @var {CountriesMap}
 */
export const all = memoize(_all);

function _allArray(): Array<Country> {
    return Object.values(all())
}

/**
 * List of all countries
 */
export const allArray = memoize(_allArray);

function _ls(member: SearchableCountryRecordMember): Promise<Array<string | undefined>> {
    return Promise.resolve(Object.keys(all()).map(k => this.all[k][member]))
}

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
export const ls = memoize(_ls);

/**
 * Get list of country names
 */
export function names(): Promise<string[]> {
    return ls("name")
}

/**
 * Get list of coutry continents
 */
export function continents(): Promise<string[]> {
    return ls("continent");
}

/**
 * Get list of capitals
 */
export function capitals(): Promise<string[]> {
    return ls("capital");
}

/**
 * Get list of dialing codes
 */
export function dialing_codes(): Promise<string[]> {
    return ls("dialing_code")
}


/**
 *
 * @param {string} iso2
 */
export function findByIso2(iso2: string): Country | undefined {
    return all()[iso2];
}

export function findByIso3(iso3: string): Country | undefined {
    return allArray().find(({code: {iso3: i}}) => i === iso3);
}

export function findByName(name: string): Country | undefined {
    return allArray().find(({name: n}) => n.normalize("NFD").replace(/\p{Diacritic}/gu, "") === name.normalize("NFD").replace(/\p{Diacritic}/gu, ""));
}

export function findByCapital(capital: string): Country | undefined {
    return allArray().find(({capital: c}) => c.normalize("NFD").replace(/\p{Diacritic}/gu, "") === capital.normalize("NFD").replace(/\p{Diacritic}/gu, ""));
}

/**
 * Find country by currency
 * @param {string}currency
 */
export function findByCurrency(currency: string): Country | undefined {
    return allArray().find(({currency: {code}}) => code === currency);
}

/**
 * Find country by province
 * @param {string}province
 */
export function findByProvince(province: string): Country | undefined {
    return allArray().find(({provinces}) => {

        const names = provinces.map(
            (
                {name, short}
            ) => {
                const p = province.normalize("NFD").replace(/\p{Diacritic}/gu, "");
                return name.normalize("NFD").replace(/\p{Diacritic}/gu, "") === p ||
                    short.normalize("NFD").replace(/\p{Diacritic}/gu, "") === p
            }
        )
    });
}

