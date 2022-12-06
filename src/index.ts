
import memoize from "fast-memoize";
import {countries} from "./data/countries";
countries

export interface Country {

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

