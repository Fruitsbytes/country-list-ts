/// <reference types="../globals" />

// import * as _flags from "./data/flags";
// import memoize from "fast-memoize";
import {
    AreaFatList,
    AreaMap, BordersFatList,
    BordersMap,
    CallingCodesFatList,
    CallingCodesMap, Capital,
    CAPITAL_ARRAY, CapitalsFatList,
    CapitalsMap,
    CCA2, CCA3, CCA3FatList,
    CCA3Map,
    CCA_2_ARRAY,
    CCA_3_ARRAY, CCN3, CCN3FatList,
    CCN3Map,
    CCN_3_ARRAY, CIOC,
    CIOC_ARRAY, CIOCFatList,
    CIOCMap,
    COMMON_NAME_ARRAY, CommonName, countries, Country,
    COUNTRY_STATUS_ARRAY, CountryStatus, CountryStatusFatList,
    CountryStatusMap, CurrenciesFatList,
    CurrenciesMap,
    CURRENCY_CODE_ARRAY,
    CURRENCY_NAME_ARRAY,
    CURRENCY_SYMBOL_ARRAY, CurrencyCode, CurrencyName, CurrencySymbol,
    DemonymsFatList,
    DemonymsMap,
    FlagsFatList,
    FlagsMap,
    IDDFatList,
    IDDMap, IndependentFatList,
    IndependentMap, LandlockedFatList,
    LandlockedMap, Lang,
    LANG_ARRAY,
    LANGUAGE_NAME_ARRAY, LanguageName, LanguagesFatList,
    LanguagesMap, LatLngFatList,
    LatLngMap,
    List,
    Listable,
    Mappable, NamesFatList,
    NamesMap,
    OFFICIAL_NAME_ARRAY, OfficialName, Region,
    REGION_ARRAY,
    RegionFatList,
    RegionMap,
    SUB_REGION_ARRAY, SubRegion, SubRegionFatList,
    SubRegionMap, TLD,
    TLD_ARRAY, TLDFatList,
    TLDMap, TranslationsFatList,
    TranslationsMap
} from "./data/countries";
import memoize from "fast-memoize";

/**
 * ### List of string values
 * @param {Listable} property - listable property
 * @return {string[]} Array
 */
export function ls(property: Listable = "commonName"): List {
    switch (property) {
        case "cca2":
            return CCA_2_ARRAY;
        case "tld":
            return TLD_ARRAY;
        case "ccn3":
            return CCN_3_ARRAY;
        case "cca3":
            return CCA_3_ARRAY;
        case "cioc":
            return CIOC_ARRAY;
        case "countryStatus":
            return COUNTRY_STATUS_ARRAY;
        case "officialName":
            return OFFICIAL_NAME_ARRAY;
        case "currencyCode":
            return CURRENCY_CODE_ARRAY;
        case "currencyName":
            return CURRENCY_NAME_ARRAY;
        case "currencySymbol":
            return CURRENCY_SYMBOL_ARRAY;
        case "region":
            return REGION_ARRAY;
        case "subRegion":
            return SUB_REGION_ARRAY;
        case "capital":
            return CAPITAL_ARRAY;
        case "lang":
            return LANG_ARRAY;
        case "languageName":
            return LANGUAGE_NAME_ARRAY;
        case "default":
        case "commonName":
        default:
            return COMMON_NAME_ARRAY;

    }
}

/**
 * List cca2 values
 */
export function cca2s(): CCA2[] {
    return ls("cca2");
}

/**
 * List tld values
 */
export function tlds(): TLD[] {
    return ls("tld");
}

/**
 * List ccn3 values
 */
export function ccn3s(): CCN3[] {
    return ls("ccn3");
}

/**
 * List cca3 values
 */
export function cca3s(): CCA3[] {
    return ls("cca3");
}

/**
 * List cioc values
 */
export function ciocs(): CIOC[] {
    return ls("cioc");
}

/**
 * List country status values
 */
export function countryStatuses(): CountryStatus[] {
    return ls("countryStatus");
}

/**
 * List common name values
 */
export function commonNames(): CommonName[] {
    return ls("commonName");
}

/**
 * List official name values
 */
export function officialNames(): OfficialName[] {
    return ls("officialName");
}

/**
 * List currency code values
 */
export function currencyCodes(): CurrencyCode[] {
    return ls("currencyCode");
}

/**
 * List currency name values
 */
export function currencyNames(): CurrencyName[] {
    return ls("currencyName");
}

/**
 * List currency symbol values
 */
export function currencySymbols(): CurrencySymbol[] {
    return ls("currencySymbol");
}

/**
 * List region values
 */
export function regions(): Region[] {
    return ls("region");
}

/**
 * List subRegion values
 */
export function subRegions(): SubRegion[] {
    return ls("subRegion");
}

/**
 * List capital values
 */
export function capitals(): Capital[] {
    return ls("capital");
}

/**
 * List lang values
 */
export function langs(): Lang[] {
    return ls("lang");
}

/**
 * List languageName values
 */
export function languageNames(): LanguageName[] {
    return ls("languageName");
}


/**
 * ### Mapped list of string values
 *
 * Example:
 * ```
 *  const topLevelDomains = lsM('tld');   // {'HT': ['.ht'], ...}
 * ```
 * @param {Mappable} property - mappable property
 * @return {Record<string, any>} - a Record of values.
 */
export function lsM(property: Mappable = "name") {
    switch (property) {
        case "tld":
            return TLDMap;
        case "ccn3":
            return CCN3Map;
        case "cca3":
            return CCA3Map;
        case "cioc":
            return CIOCMap;
        case "independent":
            return IndependentMap;
        case "idd":
            return IDDMap;
        case "countryStatus":
            return CountryStatusMap;
        case "currencies":
            return CurrenciesMap;
        case "region":
            return RegionMap;
        case "subRegion":
            return SubRegionMap;
        case "capitals":
            return CapitalsMap;
        case "languages":
            return LanguagesMap;
        case "translations":
            return TranslationsMap;
        case "latLng":
            return LatLngMap;
        case "landlocked":
            return LandlockedMap;
        case "borders":
            return BordersMap;
        case "area":
            return AreaMap;
        case "flag":
            return FlagsMap;
        case "demonyms":
            return DemonymsMap;
        case "callingCodes":
            return CallingCodesMap;
        case "default":
        case "name":
        default:
            return NamesMap;

    }
}

/**
 * ### Tagged list of string values
 *
 * Example:
 * ```
 *  const topLevelDomains = lsF('tld');   // [{tld: ['.ht'], cca2: 'HT'}, ...]
 * ```
 * @param {Mappable} property - mappable property
 * @return {string[]} - array of objects.
 */
export function lsF(property: Mappable = "name") {
    switch (property) {
        case "tld":
            return TLDFatList;
        case "ccn3":
            return CCN3FatList;
        case "cca3":
            return CCA3FatList;
        case "cioc":
            return CIOCFatList;
        case "independent":
            return IndependentFatList;
        case "idd":
            return IDDFatList;
        case "countryStatus":
            return CountryStatusFatList;
        case "currencies":
            return CurrenciesFatList;
        case "region":
            return RegionFatList;
        case "subRegion":
            return SubRegionFatList;
        case "capitals":
            return CapitalsFatList;
        case "languages":
            return LanguagesFatList;
        case "translations":
            return TranslationsFatList;
        case "latLng":
            return LatLngFatList;
        case "landlocked":
            return LandlockedFatList;
        case "borders":
            return BordersFatList;
        case "area":
            return AreaFatList;
        case "flag":
            return FlagsFatList;
        case "demonyms":
            return DemonymsFatList;
        case "callingCodes":
            return CallingCodesFatList;
        case "default":
        case "name":
        default:
            return NamesFatList;

    }
}

/**
 * ### Get a list of all the countries
 * @return {Country[]} All the countries
 */
export function all(): Country[] {
    return countries;
}

function _find(property: string, value: string): Country | undefined {

    const c = property.split(".");

    for (let country of countries) {
        try {
            if (property.split('.').reduce((o, i) => o[i], country) === value) {
                return country;
            }
        } catch (e) {
            return undefined;
        }
    }

}


/**
 * ### Find Countries
 *
 * example:
 * ```javascript
 * const haiti = find("name.common", "Haiti") ;
 * const {capital} = find("name.common", "Canada"); // ["Ottawa"]
 * ```
 * @param {string} property Searchable property
 * @param {string} value Property value
 * @return {Country|undefined}
 */
export const find = memoize(_find);

function _get(property: string, value: string): Array<Country>{
    let result =[];
    for (let country of countries) {
        try {
            if (property.split('.').reduce((o, i) => o[i], country) === value) {
                result.push(country);
            }
        } catch (e) {
           // do Nothing
        }
    }
    return result
}

/**
 * ### Search for Countries
 *
 * example:
 * ```javascript
 * const tropicals = get("region", "Caribbean") ;
 * ```
 * @param {string} property Searchable property
 * @param {string} value Property value
 * @return {Country[]}
 */
export const get = memoize(_get);
