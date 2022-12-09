import memoize from "fast-memoize";
import {
    Capital,
    CCA2,
    CCA3,
    CCN3,
    CIOC, CommonName, Country, CountryStatus, CurrencyCode,
    CurrencyName,
    CurrencySymbol,
    Lang, LanguageName,
    List,
    Listable,
    Mappable, OfficialName, Region, SubRegion,
    TLD
} from "./data/countries";

/**
 * Get the SVG flag
 * @param {CCA2}cca2 - The ISO2 code of the country
 * @return{SVGElement} - returns a svg
 */
export async function flag(cca2: CCA2 = 'ht'): Promise<string> {
    return await import(`@fruitsbytes/country-list-ts/dist/flags/${cca2.toLowerCase()}_flag`);
}

/**
 * Get the Geo-Json data of a country
 * @param cca2  - The ISO2 code of the country
 * @return{string} JSON
 */
export async function geo(cca2: CCA2 = 'ht'): Promise<object> {
    return await import(`@fruitsbytes/country-list-ts/dist/data/geo-json/${cca2.toLowerCase()}_geo_json`);
}

/**
 * Get the Topo-Json data of a country
 * @param cca2 - The ISO2 code of the country
 * @return{string} JSON
 */
export async function topo(cca2: CCA2 = 'ht'): Promise<object> {
    return await import(`@fruitsbytes/country-list-ts/dist/data/topo-json/${cca2.toLowerCase()}_topo_json`);
}

class Flag extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});

        const country = this.getAttribute("data-cca2") || 'ht';
        const width = Number(this.getAttribute("data-display") || '48');
        const shape = this.getAttribute("data-shape") || "default";


        const wrapper: HTMLSpanElement = document.createElement("span");
        wrapper.setAttribute("class", "fruits-bytes-country-flag");
        wrapper.style.position = "relative";
        flag(country).then(value => {
            const img = document.createElement("img");
            img.src = value;
            img.alt = country;
            wrapper.append(img);
        });

        wrapper.classList.add(shape);


        let height = width;

        if(!["square","round"].includes(shape)){
            height = width * 600 / 900

        }

        // Create some CSS to apply to the shadow DOM
        const style = document.createElement("style");
        style.textContent = `
        .fruits-bytes-country-flag{
            width:${width}px;
            height:${height}px;
        }
        .fruits-bytes-country-flag.square,  .fruits-bytes-country-flag.round{
            
        }
        .fruits-bytes-country-flag.round{
            
        }
     
        .fruits-bytes-country-flag img{
            display:block;
            width:100%;
            object-fit: contain
        }`;

        this.shadowRoot.append(style, wrapper);
    }

}

customElements.define("cl-flag", Flag);

/**
 * ### List of string values
 * @param {Listable} property - listable property
 * @return {Promise<string[]>} Array
 */
export async function ls(property: Listable = "commonName"): Promise<List> {
    switch (property) {
        case "cca2":
            const {CCA_2_ARRAY} = await import("./data/countries");
            return CCA_2_ARRAY;
        case "tld":
            const {TLD_ARRAY} = await import("./data/countries");
            return TLD_ARRAY;
        case "ccn3":
            const {CCN_3_ARRAY} = await import("./data/countries");
            return CCN_3_ARRAY;
        case "cca3":
            const {CCA_3_ARRAY} = await import("./data/countries");
            return CCA_3_ARRAY;
        case "cioc":
            const {CIOC_ARRAY} = await import("./data/countries");
            return CIOC_ARRAY;
        case "countryStatus":
            const {COUNTRY_STATUS_ARRAY} = await import("./data/countries");
            return COUNTRY_STATUS_ARRAY;
        case "officialName":
            const {OFFICIAL_NAME_ARRAY} = await import("./data/countries");
            return OFFICIAL_NAME_ARRAY;
        case "currencyCode":
            const {CURRENCY_CODE_ARRAY} = await import("./data/countries");
            return CURRENCY_CODE_ARRAY;
        case "currencyName":
            const {CURRENCY_NAME_ARRAY} = await import("./data/countries");
            return CURRENCY_NAME_ARRAY;
        case "currencySymbol":
            const {CURRENCY_SYMBOL_ARRAY} = await import("./data/countries");
            return CURRENCY_SYMBOL_ARRAY;
        case "region":
            const {REGION_ARRAY} = await import("./data/countries");
            return REGION_ARRAY;
        case "subRegion":
            const {SUB_REGION_ARRAY} = await import("./data/countries");
            return SUB_REGION_ARRAY;
        case "capital":
            const {CAPITAL_ARRAY} = await import("./data/countries");
            return CAPITAL_ARRAY;
        case "lang":
            const {LANG_ARRAY} = await import("./data/countries");
            return LANG_ARRAY;
        case "languageName":
            const {LANGUAGE_NAME_ARRAY} = await import("./data/countries");
            return LANGUAGE_NAME_ARRAY;
        case "default":
        case "commonName":
        default:
            const {COMMON_NAME_ARRAY} = await import("./data/countries");
            return COMMON_NAME_ARRAY;

    }
}

/**
 * List cca2 values
 */
export function cca2s(): Promise<CCA2[]> {
    return ls("cca2");
}

/**
 * List tld values
 */
export async function tlds(): Promise<TLD[]> {
    return ls("tld");
}

/**
 * List ccn3 values
 */
export function ccn3s(): Promise<CCN3[]> {
    return ls("ccn3");
}

/**
 * List cca3 values
 */
export function cca3s(): Promise<CCA3[]> {
    return ls("cca3");
}

/**
 * List cioc values
 */
export function ciocs(): Promise<CIOC[]> {
    return ls("cioc");
}

/**
 * List country status values
 */
export function countryStatuses(): Promise<CountryStatus[]> {
    return ls("countryStatus");
}

/**
 * List common name values
 */
export function commonNames(): Promise<CommonName[]> {
    return ls("commonName");
}

/**
 * List official name values
 */
export function officialNames(): Promise<OfficialName[]> {
    return ls("officialName");
}

/**
 * List currency code values
 */
export function currencyCodes(): Promise<CurrencyCode[]> {
    return ls("currencyCode");
}

/**
 * List currency name values
 */
export function currencyNames(): Promise<CurrencyName[]> {
    return ls("currencyName");
}

/**
 * List currency symbol values
 */
export function currencySymbols(): Promise<CurrencySymbol[]> {
    return ls("currencySymbol");
}

/**
 * List region values
 */
export function regions(): Promise<Region[]> {
    return ls("region");
}

/**
 * List subRegion values
 */
export function subRegions(): Promise<SubRegion[]> {
    return ls("subRegion");
}

/**
 * List capital values
 */
export function capitals(): Promise<Capital[]> {
    return ls("capital");
}

/**
 * List lang values
 */
export function langs(): Promise<Lang[]> {
    return ls("lang");
}

/**
 * List languageName values
 */
export function languageNames(): Promise<LanguageName[]> {
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
export async function lsM(property: Mappable = "name") {
    switch (property) {
        case "tld":
            const {TLDMap} = await import("./data/countries");
            return TLDMap;
        case "ccn3":
            const {CCN3Map} = await import("./data/countries");
            return CCN3Map;
        case "cca3":
            const {CCA3Map} = await import("./data/countries");
            return CCA3Map;
        case "cioc":
            const {CIOCMap} = await import("./data/countries");
            return CIOCMap;
        case "independent":
            const {IndependentMap} = await import("./data/countries");
            return IndependentMap;
        case "idd":
            const {IDDMap} = await import("./data/countries");
            return IDDMap;
        case "countryStatus":
            const {CountryStatusMap} = await import("./data/countries");
            return CountryStatusMap;
        case "currencies":
            const {CurrenciesMap} = await import("./data/countries");
            return CurrenciesMap;
        case "region":
            const {RegionMap} = await import("./data/countries");
            return RegionMap;
        case "subRegion":
            const {SubRegionMap} = await import("./data/countries");
            return SubRegionMap;
        case "capitals":
            const {CapitalsMap} = await import("./data/countries");
            return CapitalsMap;
        case "languages":
            const {LanguagesMap} = await import("./data/countries");
            return LanguagesMap;
        case "translations":
            const {TranslationsMap} = await import("./data/countries");
            return TranslationsMap;
        case "latLng":
            const {LatLngMap} = await import("./data/countries");
            return LatLngMap;
        case "landlocked":
            const {LandlockedMap} = await import("./data/countries");
            return LandlockedMap;
        case "borders":
            const {BordersMap} = await import("./data/countries");
            return BordersMap;
        case "area":
            const {AreaMap} = await import("./data/countries");
            return AreaMap;
        case "flag":
            const {FlagsMap} = await import("./data/countries");
            return FlagsMap;
        case "demonyms":
            const {DemonymsMap} = await import("./data/countries");
            return DemonymsMap;
        case "callingCodes":
            const {CallingCodesMap} = await import("./data/countries");
            return CallingCodesMap;
        case "default":
        case "name":
        default:
            const {NamesMap} = await import("./data/countries");
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
export async function lsF(property: Mappable = "name") {
    switch (property) {
        case "tld":
            const {TLDFatList} = await import("./data/countries");
            return TLDFatList;
        case "ccn3":
            const {CCN3FatList} = await import("./data/countries");
            return CCN3FatList;
        case "cca3":
            const {CCA3FatList} = await import("./data/countries");
            return CCA3FatList;
        case "cioc":
            const {CIOCFatList} = await import("./data/countries");
            return CIOCFatList;
        case "independent":
            const {IndependentFatList} = await import("./data/countries");
            return IndependentFatList;
        case "idd":
            const {IDDFatList} = await import("./data/countries");
            return IDDFatList;
        case "countryStatus":
            const {CountryStatusFatList} = await import("./data/countries");
            return CountryStatusFatList;
        case "currencies":
            const {CurrenciesFatList} = await import("./data/countries");
            return CurrenciesFatList;
        case "region":
            const {RegionFatList} = await import("./data/countries");
            return RegionFatList;
        case "subRegion":
            const {SubRegionFatList} = await import("./data/countries");
            return SubRegionFatList;
        case "capitals":
            const {CapitalsFatList} = await import("./data/countries");
            return CapitalsFatList;
        case "languages":
            const {LanguagesFatList} = await import("./data/countries");
            return LanguagesFatList;
        case "translations":
            const {TranslationsFatList} = await import("./data/countries");
            return TranslationsFatList;
        case "latLng":
            const {LatLngFatList} = await import("./data/countries");
            return LatLngFatList;
        case "landlocked":
            const {LandlockedFatList} = await import("./data/countries");
            return LandlockedFatList;
        case "borders":
            const {BordersFatList} = await import("./data/countries");
            return BordersFatList;
        case "area":
            const {AreaFatList} = await import("./data/countries");
            return AreaFatList;
        case "flag":
            const {FlagsFatList} = await import("./data/countries");
            return FlagsFatList;
        case "demonyms":
            const {DemonymsFatList} = await import("./data/countries");
            return DemonymsFatList;
        case "callingCodes":
            const {CallingCodesFatList} = await import("./data/countries");
            return CallingCodesFatList;
        case "default":
        case "name":
        default:
            const {NamesFatList} = await import("./data/countries");
            return NamesFatList;

    }
}

async function _all(): Promise<Country[]> {
    const {countries} = await import("./data/countries");
    return countries;
}

/**
 * ### Get a list of all the countries
 * @return {Country[]} All the countries
 */
export const all = memoize(_all);

async function _find(property: string, value: string): Promise<Country | undefined> {
    const countries = await all();

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

async function _get(property: string, value: string): Promise<Array<Country>> {
    const countries = await all()
    let result = [];
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
