#! /usr/bin/env node
import chalk from "chalk";
import {existsSync, mkdirSync, statSync, truncateSync, writeFileSync, appendFileSync, readFileSync} from "fs";
import {error, exit} from "shelljs";
import {parse} from "path";
import cliSpinners from "cli-spinners";
import ora from 'ora';
import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";
import startCase from "lodash.startcase";

function pascalCase(str) {
    return startCase(camelCase(str)).replace(/ /g, '');
}

console.log(chalk.blackBright('                                   &&&&&&&&##    \n' +
    '           &&#BBGGGBB#&&       &B55Y555555YJ5     \n' +
    '       &#P5YYYYYYYYYYYYY5G#&  PJ5GBGGPP55YJP      \n' +
    '     #PYJJJJ?????JJJYY555YYYP55#BY?7777??JG       \n' +
    '   #5JJ?7777777???????JY5YYYYY5Y77??????J??5B&    \n' +
    '  GJ?77:   ..  ~7??????77.  .YJ??777777?YYJ?77?Y# \n' +
    ' GJ??:   :7!~.   ~?!!!!      J?777777777!!!7JP#   \n' +
    '#J???:   ^J.     ~?. ..      YYJ?77?77?JYP#&      \n' +
    '5????:   ^J^.    ~??????7    Y555YP               \n' +
    'Y????:   .^!J.   ~??????7    Y5YYYP               \n' +
    '5????:     ^J.   ~??????7    J5PGBB&              \n' +
    '&????:   .^!J.   ~??????7    P#&###BB#&           \n' +
    ' B7??!^.  ...  :^7??????7   7#J?Y5!5G775          \n' +
    '  B?7??!~~~~~~~7?????????!77BP.:~P.YP ::&         \n' +
    '   &5?7?????????????????J5555B5YPGJPGJJG          \n' +
    '     &GJ?77??????????JYYYYYPB  &##BBB&            \n' +
    '        &BPYJJ??JJJYY55PG#&                       \n' +
    '             &&&###&&&                            \n'));

const OK = "✅ ";
const ERROR = "❌ ";

function printError(message) {
    console.log(ERROR + chalk.redBright(` ${message}`));
}

function printSuccess(message) {
    console.log(OK + chalk.greenBright(` ${message}`));
}

function printStatic(message) {
    process.stdout.write(chalk.grey('- ' + message + '\r'));
}

function printLog(message) {
    console.log(chalk.grey('- ' + message));
}

console.log(chalk.bgCyan.black.bold(' <FruitsBytes> '));

const countries_file = './src/data/countries.ts';
const path_to_dependency = "./node_modules/world-countries";

if (!existsSync(path_to_dependency)) {
    printError("Missing dependency: " + chalk.bold("world-countries") + ".");
    exit(1)
}

// const spinner = ora({
//     color: "blue",
//     spinner: cliSpinners.dots
// });
//
// spinner.start();
//
// await setTimeout(() => {
//
//     spinner.stop();
// }, 5000);


function prepareFile(path) {
    const parts = parse(path);

    try {
        statSync(path);
        printLog(`Found ${parts.base}...`);
        truncateSync(path, 0);
        printLog(`Cleared ${parts.base}...`)
    } catch (e) {
        const dir = parts.dir;
        if (!existsSync(dir)) {
            mkdirSync(dir, '0744');
        }
    }

    try {
        writeFileSync(countries_file, `// ${parts.name} file`);
    } catch (e) {
        printError(`Could not create ${parts.name} file.`);
        exit(1);
    }

}

prepareFile(countries_file);

let countriesString = "[]";

try {
    const interfaceCountry = `
    
 export interface Currency{ name :  CurrencyName;  symbol :  CurrencySymbol; }
 export interface  Name {
  common: string;
  official: string;
  native: Record<Lang , {
     official : string;
     common : string;
   }
   >
 }
 export type LatLong = [number, number];
 export interface InternationalDirectDialing{
   root :  string;
   suffixes : string[];
 };

 export interface Country{
  name: Name;
  tld : string[];
  cca2 :  CCA2;
  ccn3 :  CCN3;
  cca3 :  CCA3;
  cioc :  CIOC;
  independent : boolean;
  status :  CountryStatus;
  unMember : boolean;
  currencies : Record<CurrencyCode , Currency>;
  idd : InternationalDirectDialing;
  capital : Capital[];
  altSpellings : string[];
  region :  Region;
  subregion :  SubRegion;
  languages : Record<Lang,LanguageName>,
  translations : Record<Lang, { official :  string;  common : string; }>,
  latlng : LatLong;
  demonyms : Record<Lang, {
    f : string;
    m : string;
  }>;
  landlocked : boolean;
  borders : CCA3[];
  area : number,
  callingCodes : string[]
  flag :  string;
}`;

    countriesString = readFileSync(path_to_dependency + "/dist/countries-unescaped.json", 'utf8');
    const countriesObject = JSON.parse(countriesString);

    let lists = {
        cca2: [],
        tld: [],
        ccn3: [],
        cca3: [],
        cioc: [],
        countryStatus: [],
        commonName: [],
        officialName: [],
        currencyCode: [],
        currencyName: [],
        currencySymbol: [],
        region: [],
        subRegion: [],
        capital: [],
        lang: [],
        languageName: []
    }

    let maps = {
        name: {},
        tld: {},
        ccn3: {},
        cca3: {},
        cioc: {},
        independent: {},
        idd: {},
        countryStatus: {},
        currencies: {},
        region: {},
        subRegion: {},
        capitals: {},
        languages: {},
        translations: {},
        latLng: {},
        landlocked: {},
        borders: {},
        area: {},
        flag: {},
        demonyms: {},
        callingCodes: {}
    }

    let fatList = {
        name: [],
        tld: [],
        ccn3: [],
        cca3: [],
        cioc: [],
        independent: [],
        idd: [],
        countryStatus: [],
        currencies: [],
        region: [],
        subRegion: [],
        capitals: [],
        languages: [],
        translations: [],
        latLng: [],
        landlocked: [],
        borders: [],
        area: [],
        flag: [],
        demonyms: [],
        callingCodes: []
    }

    for (const c of countriesObject) {
        lists.commonName.push(c.name.common);
        lists.officialName.push(c.name.official);
        lists.tld.push(...c.tld);
        lists.cca2.push(c.cca2);
        lists.ccn3.push(c.ccn3);
        lists.cca3.push(c.cca3);
        lists.cioc.push(c.cioc);
        lists.countryStatus.push(c.status);
        lists.region.push(c.region);
        lists.subRegion.push(c.subregion);
        lists.capital.push(...c.capital);
        for (const [i, v] of Object.entries(c.currencies)) {
            lists.currencyCode.push(i);
            lists.currencyName.push(v.name);
            lists.currencySymbol.push(v.symbol)
        }

        for (const [i, v] of Object.entries(c.languages)) {
            lists.lang.push(i);
            lists.languageName.push(v);
        }

        maps.name[c.cca2] = c.name;
        maps.tld[c.cca2] = c.tld;
        maps.ccn3[c.cca2] = c.ccn3;
        maps.cca3[c.cca2] = c.cca3;
        maps.cioc[c.cca2] = c.cioc;
        maps.independent[c.cca2] = c.independent;
        maps.idd[c.cca2] = c.idd;
        maps.countryStatus[c.cca2] = c.status;
        maps.currencies[c.cca2] = c.currencies;
        maps.region[c.cca2] = c.region;
        maps.subRegion[c.cca2] = c.subregion;
        maps.capitals[c.cca2] = c.capital;
        maps.languages[c.cca2] = c.languages;
        maps.translations[c.cca2] = c.translations;
        maps.latLng[c.cca2] = c.latlng;
        maps.landlocked[c.cca2] = c.landlocked;
        maps.borders[c.cca2] = c.borders;
        maps.area[c.cca2] = c.area;
        maps.demonyms[c.cca2] = c.demonyms;
        maps.callingCodes[c.cca2] = c.callingCodes;

        fatList.name.push({name: c.name, cca2: c.cca2});
        fatList.tld.push({tld: c.tld, cca2: c.cca2});
        fatList.ccn3.push({ccn3: c.ccn3, cca2: c.cca2});
        fatList.cca3.push({ cca3:c.cca3, cca2: c.cca2});
        fatList.cioc.push({cioc: c.cioc, cca2: c.cca2});
        fatList.independent.push({independent: c.independent, cca2: c.cca2});
        fatList.idd.push({idd: c.idd, cca2: c.cca2});
        fatList.countryStatus.push({countryStatus: c.status, cca2: c.cca2});
        fatList.currencies.push({currencies: c.currencies, cca2: c.cca2});
        fatList.region.push({region: c.region, cca2: c.cca2});
        fatList.subRegion.push({subRegion: c.subregion, cca2: c.cca2});
        fatList.capitals.push({capitals: c.capital, cca2: c.cca2});
        fatList.languages.push({languages: c.languages, cca2: c.cca2});
        fatList.translations.push({translations: c.translations, cca2: c.cca2});
        fatList.latLng.push({latLng: c.latlng, cca2: c.cca2});
        fatList.landlocked.push({landlocked: c.landlocked, cca2: c.cca2});
        fatList.borders.push({borders: c.borders, cca2: c.cca2});
        fatList.area.push({area: c.area, cca2: c.cca2});
        fatList.demonyms.push({demonyms: c.demonyms, cca2: c.cca2});
        fatList.callingCodes.push({callingCodes: c.callingCodes, cca2: c.cca2});
    }

    function removeDups(ar) {
        return [...new Set(ar)];
    }

    let listArraysAnInterface = "\n";

    for (const listsKey in lists) {
        lists[listsKey] = removeDups(lists[listsKey]);
        const arrayName = (snakeCase(listsKey) + "_ARRAY").toUpperCase();
        const typeName = ['cca2', 'tld', 'ccn3', 'cca3', 'cioc', 'idd'].includes(listsKey) ? listsKey.toUpperCase() : pascalCase(listsKey);

        listArraysAnInterface += `\n export const ${arrayName} = ${JSON.stringify(lists[listsKey])} as const;`
        listArraysAnInterface += `\n export type ${typeName} = typeof ${arrayName}[number];`;
    }
    listArraysAnInterface +=`
 export type NamesMap =Record<CCA2,Name>;
 export type NamesFatList =[CCA2,Name][];
 export type TLDMap =  Record<CCA2,TLD>;
 export type TLDFatList = [CCA2, TLD][];
 export type CCN3Map =  Record<CCA2,CCN3>;
 export type CCN3FatList = [CCA2, CCN3][];
 export type CCA3Map =  Record<CCA2,CCA3>;
 export type CCA3FatList = [CCA2, CCA3][];
 export type CIOCMap =  Record<CCA2,CIOC>;
 export type CIOCFatList = [CCA2, CIOC][];
 export type IndependentMap =  Record<CCA2,boolean>;
 export type IndependentFatList = [CCA2, boolean][];
 export type IDDMap =  Record<CCA2,InternationalDirectDialing>;
 export type IDDFatList = [CCA2, InternationalDirectDialing][];
 export type CountryStatusMap =  Record<CCA2,CountryStatus>;
 export type CountryStatusFatList = [CCA2, CountryStatus][];
 export type CURRENCIESMap =  Record<CCA2,Record<CurrencyCode , Currency>>;
 export type CURRENCIESFatList = [CCA2, Record<CurrencyCode , Currency>][];
 export type REGIONMap =  Record<CCA2,Region>;
 export type REGIONFatList = [CCA2, Region][];
 export type SubRegionMap =  Record<CCA2,SubRegion>;
 export type SubRegionFatList = [CCA2, SubRegion][];
 export type CAPITALSMap =  Record<CCA2,Capital>;
 export type CAPITALSFatList = [CCA2, Capital][];
 export type LANGUAGESMap =  Record<CCA2,Record<Lang,LanguageName>>;
 export type LANGUAGESFatList = [CCA2, Record<Lang,LanguageName>][];
 export type TRANSLATIONSMap =  Record<CCA2, Record<Lang, { official :  string;  common : string; }>>;
 export type TRANSLATIONSFatList = [CCA2,  Record<Lang, { official :  string;  common : string; }>][];
 export type LatLngMap =  Record<CCA2,LatLong>;
 export type LatLngFatList = [CCA2, LatLong][];
 export type LandlockedMap =  Record<CCA2,boolean>;
 export type LandlockedFatList = [CCA2, boolean][];
 export type BordersMap =  Record<CCA2,CCA3[]>;
 export type BordersFatList = [CCA2, CCA3[]][];
 export type AreaMap =  Record<CCA2,number>;
 export type AreaFatList = [CCA2, number][];
 export type DemonymsMap =  Record<CCA2, Record<Lang, { f : string; m : string; }>>;
 export type DemonymsFatList = [CCA2,  Record<Lang, { f : string; m : string; }>][];
 export type CallingCodesMap =  Record<CCA2,string[]>;
 export type CallingCodesFatList = [CCA2, string[]][];
    `;
    for (const mapsKey in maps) {

    }

    appendFileSync(countries_file,
        listArraysAnInterface +
        interfaceCountry +
        "\n export const countries: Array<Country>=" + countriesString + ";"
    );
    printSuccess('Country Data file was created successfully.');
} catch
    (e) {
    // console.error(e)
    printError('Could not fill countries file.');
    exit(1);
}


printLog("Done.");

console.log(chalk.bgCyan.black.bold(' </FruitsBytes> '));
