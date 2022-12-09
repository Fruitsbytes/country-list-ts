<p align="center">
 <img src="./wiki/banner.png" alt="Showing the title of the repository, Country list , next to the Typsript logo and the fruitsBytes logo" width="800" title="Country list TS banner image">
</p>

# Country List TS

This repository is based from the list of countries provided by [mledoze/countries](https://github.com/mledoze/countries). 

It provides various compiled lists, mapped lists and tagged list of the property values. You can also search for a country based on the values in the property.

>⚠ Warning: 
>
>Not all entities in this project are independent countries; refer to the independent property to know if the
country is considered a sovereign state.

## Features

- Importable assets
    - flags
    - geo-json
    - topo-json
- 🚧 Flag WebComponent
- List
    - of names, capitals, languages, currencies ...
    - mapped lists by ISO 3166-1 alpha-2
    - with
- Search

## Installation

```shell
npm i 
```

### Compatibility table

| Version | JS target | JS lib |
|:-------:|:---------:|:------:|
|  1.0.0  |    ES5    | ES2017 |

## Usage

### List

Get list of country record member.

#### Simple list
```typescript
import {ls} from "country-list-ts";

const c = await ls('capital'); // ordered by country name

// Output:
// ["Oranjestad","Kabul","Luanda","The Valley","Mariehamn","Tirana", ... ]
````

It's the same as :

```typescript
import {capitals} from "country-list-ts";

const c = (await capitals()).sort(); // reorder alphabetically
// Output: 
// ['Abu Dhabi', 'Abuja', 'Accra', 'Adamstown', 'Addis Ababa', ... ]
```

| function call           | alias                    |
|-------------------------|--------------------------|
| `ls("cca2")`            | `cca2s()`                |
| `ls("tld") `            | `tlds()`                 |
| `ls("ccn3")`            | `ccn3s() `               |
| `ls("cca3")`            | `cca3s()`                |
| `ls("cioc")`            | `ciocs()`                |
| `ls("countryStatus")`   | `countryStatuses()`      |
| `ls("commonName") `     | `commonNames()`          |
| `ls("officialName") `   | `officialNames()`        |
| `ls("currencyCode")`    | `currencyCodes()`        |
| `ls("currencyName")`    | `currencyNames()`        |
| `ls("currencySymbol")`  | `currencySymbols()`      |
| `ls("region")`          | `regions()`              |
| `ls("subRegion")`       | `subRegions()`           |
| `ls("capital")`         | `capitals()`             |
| `ls("lang")`            | `langs()`                |
| `ls("languageName")`    | `languageNames()`        |


#### Tagged lists
```typescript
import {lsF} from "country-list-ts";

const currencies = await lsF("currencies");

// Output:
// [
//  { "currencies":{"AWG":{"name":"Aruban florin","symbol":"ƒ"}},"cca2":"AW"},
//  { "currencies":{"AFN":{"name":"Afghan afghani","symbol":"؋"}},"cca2":"AF"},
//   ...
//]

```
Here is an example with Angular ngFor:
````typescript
@Component({
  selector: 'app-select-country',
  template: '<select> ' +
          '<option *ngFor="let country of $countryList | async" [ngValue]="country.cca2">' +
          '{{country.name.official}}' +
          '</option> ' +
          '</select>',
  styleUrls: ['./select-country.scss']
})
export class SelectCountryComponent {
  public $countryList = lsF(); // default list name
}
````

#### Mapped list
```typescript
import {lsM} from "country-list-ts";
const gps = await lsM("latLng");
// Output:
// {"AW":[12.5,-69.96666666],"AF":[33,65],"AO":[-12.5,18.5],"AI":[18.25,-63.16666666],....]
```

Note, for tagged and mapped lists the available property values are:
<p>
name, tld, ccn3, cca3, cioc, independent, idd, countryStatus, currencies, region, subRegion, capitals, languages, translations, latLng, landlocked, borders, area, flag, demonyms, callingCodes
</p>

### All
You can get a list of all the country data:

```typescript
import {all} from "country-list-ts";

/**
 * @var {Country[]}
 */
const countries = await all();
```

An example of a Country object :

```typescript
const austria = {
    name: {
        common: "Austria",
        official: "Republic of Austria",
        native: {
            bar: {
                official: "Republik Österreich",
                common: "Österreich"
            }
        }
    },
    tld: [".at"],
    cca2: "AT",
    ccn3: "040",
    cca3: "AUT",
    cioc: "AUT",
    independent: true,
    status: "officially-assigned",
    unMember: true,
    currencies: {
        EUR: {
            name: "Euro",
            symbol: "€"
        }
    },
    idd: {
        "root": "+4",
        "suffixes": ["3"]
    },
    capital: ["Vienna"],
    altSpellings: ["AT", "Osterreich", "Oesterreich"],
    region: "Europe",
    subregion: "Western Europe",
    languages: {
        bar: "Austro-Bavarian German"
    },
    translations: {
        cym: {official: "Republic of Austria", common: "Awstria"},
        deu: {official: "Republik Österreich", common: "Österreich"},
        fra: {official: "République d'Autriche", common: "Autriche"},
        hrv: {official: "Republika Austrija", common: "Austrija"},
        ita: {official: "Repubblica d'Austria", common: "Austria"},
        jpn: {official: "オーストリア共和国", common: "オーストリア"},
        nld: {official: "Republiek Oostenrijk", common: "Oostenrijk"},
        por: {official: "República da Áustria", common: "Áustria"},
        rus: {official: "Австрийская Республика", common: "Австрия"},
        spa: {official: "República de Austria", common: "Austria"}
    },
    latlng: [47.33333333, 13.33333333],
    demonyms: {
        fra: {
            f: "Autrichienne",
            m: "Autrichien"
        },
        spa: {
            f: "Austriaco",
            m: "Austriaca"
        }
    },
    landlocked: true,
    borders: ["CZE", "DEU", "HUN", "ITA", "LIE", "SVK", "SVN", "CHE"],
    area: 83871,
    callingCodes: ["+43"],
    flag: "🇦🇹"
}
```

Definition:

- `name`
  - `common` - common name in english
  - `official` - official name in english
  - `native` - list of all native names
    - key: three-letter ISO 639-3 language code
    - value: name object
      - key: official - official name translation
      - key: common - common name translation
- `tld` - country code top-level domain 
- `cca2` - code ISO 3166-1 alpha-2
- `cca3` - code ISO 3166-1 alpha-3
- `ccn3` - code ISO 3166-1 numeric 
- `cioc` - code International Olympic Committee
- `independent` - ISO 3166-1 independence status  (denotes the country is considered a sovereign state)
- `status` - ISO 3166-1 assignment status 
- `unMember` - UN Member status
- `currencies` - list of all currencies
  - key: ISO 4217 currency code
  - value: currency object
    - key: `name` name of the currency
    - key: `symbol` symbol of the currency
-  `idd` - International Direct Dialing info 
  - `root` - the root geographical code prefix. e.g. +6 for New Zealand, +4 for UK.
  - `suffixes` - list of all suffixes assigned to this country. 4 for NZ, 809, 829, and 849 for Dominican Republic.
- `capital` - capital city(ies)
- `altSpellings` - alternative spellings 
- `region`
- `subregion`
- `languages` - list of official languages
  - key: three-letter ISO 639-3 language code
  - value: name of the language in english
- `translations` - list of name translations
  - key: three-letter ISO 639-3 language code
  - value: name object
    - key: official - official name translation
    - key: common - common name translation
- `latlng` - latitude and longitude
- `demonyms` - name of residents, translated & gendered
  - key: three-letter ISO 639-3 language code
  - value: genderized demonym object
    - key: `f` (female) or `m` (male)
    - value: genderized demonym translation
- `landlocked` - landlocked status, if the country has direct access to ports for its maritime trade
- `borders` - land borders
- `area` - land area in km²
- `flag` - Emoji flag
- `callingCodes` - calling codes

### Search

You can search for a country using the property name:

```typescript
import {find} from "country-list-ts";

/**
 * @var {Country}
 */
const haiti = await find("name.common", "Haiti") ;
const {capital} = await find("name.common", "Canada"); // ["Ottawa"]
```
The `find` frunction returns the first Country that satisfies the search value. To get a list use `get`

```typescript
import {get} from "country-list-ts";

/**
 * @var {Country[]}
 */
const tropicals = await get("region", "Caribbean") ;
```

Both `find` and `get` are memoized;

### Assets

#### Flags

```typescript jsx
// React
import {bra_flag} from "@fruitsbytes/country-list-ts/dist/flags";

export function BrasilFlag() {
  
    return (
        <img src={bra_flag}/>
    )
}

```
example: [Brasil](./src/data/geo-json/usa.geo.json)

#### Geo-JSON
```typescript
import {usa_geo_json} from "@fruitsbytes/country-list-ts/dist/geo-json";
```
example: [USA](./src/data/geo-json/usa.geo.json)


#### Topo-JSON
```typescript
import {ht} from "@fruitsbytes/country-list-ts/dist/topo-json";
```

example: [USA](./src/data/topo-json/usa.topo.json)

## Extend
For specific use case you can combine it with othe libraries:

### Fuzzy search

[Fuse.js](https://fusejs.io/) is a powerful, lightweight fuzzy-search library, with zero dependencies.

Generally speaking, fuzzy searching (more formally known as approximate string matching) is the technique of finding strings that are approximately equal to a given pattern (rather than exactly

You can use FuseJS for country list suggestion/TypeHead input

````javascript
import {all} from "country-list-ts";
import Fuse from 'fuse.js';

const countries = await all();

const fuse = new Fuse(countries, {
  keys: ['cca2', 'cca3', 'name.common']
})

const found = fuse.search('hait');

// Output:
// [
//   {
//     item: {
//        {
//         ...
//         "tld": [".ht"],
//         "cca2": "HT",
//         ...
//        }
//     },
//     refIndex: 0
//   },
// ...
// ]
````


More examples :

- [Search String Array](https://fusejs.io/examples.html#search-string-array)
- [Search Object Array](https://fusejs.io/examples.html#search-object-array)
- [Nested Search - dot notation](https://fusejs.io/examples.html#nested-search)
- [Weighted Search](https://fusejs.io/examples.html#weighted-search)
- [Extended Search](https://fusejs.io/examples.html#extended-search)

### Phone number
[libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) is a simpler and smaller rewrite of Google Android's  libphonenumber library in javascript.

See the [demo](https://catamphetamine.gitlab.io/libphonenumber-js/). 

You can use this library to get the country of a phone number:

```typescript
// my-file.ts

import parsePhoneNumber from 'libphonenumber-js';
import {find} from "country-list-ts";

function getCountryByPhonenumber(phone: string) {
  const phoneNumber = parsePhoneNumber(phone);

  if (phoneNumber) {
    return find("cca2", phoneNumber.country);
  }

  return undefined;
}

/**
 * @var {Country|undefined}
 */
const country = find("+50934524301");

console.log(country?.name?.common, country?.flag); // Haiti 🇭🇹

```

## Licence

MIT

