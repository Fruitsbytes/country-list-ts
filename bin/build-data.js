#! /usr/bin/env node
import chalk from "chalk";
import {existsSync, mkdirSync, statSync, truncateSync, writeFileSync, appendFileSync, readFileSync} from "fs";
import shelljs from "shelljs";
import {parse} from "path";
import cliSpinners from "cli-spinners";
import ora from 'ora';
import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";
import startCase from "lodash.startcase";

const {exec, exit, cp, rm, ls} = shelljs;

function pascalCase(str) {
    return startCase(camelCase(str)).replace(/ /g, '');
}

console.log(chalk.blackBright('' +
    '                                   &&&&&&&&##    \n' +
    '           &&#BBGGGBB#&&       &B55Y555555YJ5     \n' +
    '       &#P5YYYYYYYYYYYYY5G#&  PJ5GBGGPP55YJP      \n' +
    '     #PYJJJJ??????JJJYY555YYYP55#BY?7777??JG       \n' +
    '   #5JJ?7777777????????JY5YYYYY5Y77??????J??5B&    \n' +
    '  GJ?77:   ..  ~7???????77.  .YJ??777777?YYJ?77?Y# \n' +
    ' GJ??:   :7!~.   ~??!!!!      J?777777777!!!7JP#   \n' +
    '#J???:   ^J.     ~??. ..      YYJ?77?77?JYP#&      \n' +
    '5????:   ^J^.    ~???????7    Y555YP               \n' +
    'Y????:   .^!J.   ~???????7    Y5YYYP               \n' +
    '5????:     ^J.   ~???????7    J5PGBB&              \n' +
    '&????:   .^!J.   ~???????7    P#&###BB#&           \n' +
    ' B7??!^.  ...  :^7???????7   7#J?Y5!5G775          \n' +
    '  B?7??!~~~~~~~7??????????!77BP.:~P.YP ::&         \n' +
    '   &5?7??????????????????J5555B5YPGJPGJJG          \n' +
    '     &GJ?77???????????JYYYYYPB  &##BBB&            \n' +
    '        &BPYJJ??JJJYY55PG#&                       \n' +
    '          &&&&&###&&&                            \n'));

const OK = "✅ ";
const ERROR = "❌ ";

function printError(message) {
    console.log(ERROR + chalk.redBright(` ${message}`));
}

function printSuccess(message) {
    console.log(OK + chalk.green(` ${message}`));
}

function printStatic(message) {
    process.stdout.write(chalk.grey('- ' + message + '\r'));
}

function printLog(message) {
    console.log(chalk.grey('- ' + message));
}

console.log(chalk.bgCyan.black.bold(' <FruitsBytes> '));

console.log("Country list - Building data and assets");

const countries_file = './src/data/countries.ts';
const path_to_dependency = "./node_modules/world-countries";

if (!existsSync(path_to_dependency)) {

    const spinner = ora({
        color: "blue",
        spinner: cliSpinners.dots,
        text: "Installing dependency " + chalk.bold("world-countries") + "...."
    });

    spinner.start();

    if (exec('npm i -D mledoze/countries').code !== 0) {
        printError("Could not install dependency: " + chalk.bold("world-countries") + ".");
        spinner.stop();
        exit(1);
    }
    spinner.stop();
}

function prepareFile(path) {
    const parts = parse(path);

    try {
        statSync(path);
        printLog(`Found ${path}...`);
        truncateSync(path, 0);
        printLog(`Cleared ${path}...`)
    } catch (e) {
        const dir = parts.dir;
        if (!existsSync(dir)) {
            mkdirSync(dir, '0744');
        }
    }

    try {
        writeFileSync(path, `// ${parts.name} file`);
    } catch (e) {
        printError(`Could not create ${parts.name} file.`);
        exit(1);
    }

}


try {
    prepareFile(countries_file);


    const interfaceCountry = `
 export type Mapped< K extends string, V> = Partial<{ [k in K] : V }>   
 export interface Currency{ name :  CurrencyName;  symbol :  CurrencySymbol; }
 export interface  Name {
  common: string;
  official: string;
  native: Mapped<Lang , {official : string;common : string;}>;
 }
 export type LatLong = [number, number];
 export interface InternationalDirectDialing{
   root :  string;
   suffixes : string[];
 }
 
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
  currencies : Mapped<CurrencyCode , Currency> | [];
  idd : InternationalDirectDialing;
  capital : Capital[];
  altSpellings : string[];
  region :  Region;
  subregion :  SubRegion;
  languages : Mapped<Lang,LanguageName>;
  translations : Mapped<Lang, { official :  string;  common : string; }>;
  latlng : LatLong;
  demonyms : Mapped<Lang, {
    f : string;
    m : string;
  }>;
  landlocked : boolean;
  borders : CCA3[];
  area : number,
  callingCodes : string[]
  flag :  string;
}`;

    const dataSourcePath = "./src/data/countries-unescaped.json";

    cp(path_to_dependency + "/dist/countries-unescaped.json", dataSourcePath);

    let countriesString = readFileSync(dataSourcePath, 'utf8');
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

    let listArraysAnInterface = "\n";


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
        for (const [i] of Object.entries(c.translations)) {
            lists.lang.push(i);
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
        maps.flag[c.cca2] = c.flag;
        maps.demonyms[c.cca2] = c.demonyms;
        maps.callingCodes[c.cca2] = c.callingCodes;

        fatList.name.push({name: c.name, cca2: c.cca2});
        fatList.tld.push({tld: c.tld, cca2: c.cca2});
        fatList.ccn3.push({ccn3: c.ccn3, cca2: c.cca2});
        fatList.cca3.push({cca3: c.cca3, cca2: c.cca2});
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
        fatList.flag.push({flag: c.flag, cca2: c.cca2});
        fatList.demonyms.push({demonyms: c.demonyms, cca2: c.cca2});
        fatList.callingCodes.push({callingCodes: c.callingCodes, cca2: c.cca2});
    }

    listArraysAnInterface += `
 export const NamesMap= ${JSON.stringify(maps.name)};
 export const NamesFatList= ${JSON.stringify(fatList.name)};
 export const TLDMap= ${JSON.stringify(maps.tld)};
 export const TLDFatList= ${JSON.stringify(fatList.tld)};
 export const CCN3Map= ${JSON.stringify(maps.ccn3)};
 export const CCN3FatList= ${JSON.stringify(fatList.ccn3)};
 export const CCA3Map= ${JSON.stringify(maps.cca3)};
 export const CCA3FatList= ${JSON.stringify(fatList.cca3)};
 export const CIOCMap= ${JSON.stringify(maps.cioc)};
 export const CIOCFatList= ${JSON.stringify(fatList.cioc)};
 export const IndependentMap= ${JSON.stringify(maps.independent)};
 export const IndependentFatList= ${JSON.stringify(fatList.independent)};
 export const IDDMap= ${JSON.stringify(maps.idd)};
 export const IDDFatList= ${JSON.stringify(fatList.idd)};
 export const CountryStatusMap= ${JSON.stringify(maps.countryStatus)};
 export const CountryStatusFatList= ${JSON.stringify(fatList.countryStatus)};
 export const CurrenciesMap= ${JSON.stringify(maps.currencies)};
 export const CurrenciesFatList= ${JSON.stringify(fatList.currencies)};
 export const RegionMap= ${JSON.stringify(maps.region)};
 export const RegionFatList= ${JSON.stringify(fatList.region)};
 export const SubRegionMap= ${JSON.stringify(maps.subRegion)};
 export const SubRegionFatList= ${JSON.stringify(fatList.subRegion)};
 export const CapitalsMap= ${JSON.stringify(maps.capitals)};
 export const CapitalsFatList= ${JSON.stringify(fatList.capitals)};
 export const LanguagesMap= ${JSON.stringify(maps.languages)};
 export const LanguagesFatList= ${JSON.stringify(fatList.languages)};
 export const TranslationsMap= ${JSON.stringify(maps.translations)};
 export const TranslationsFatList= ${JSON.stringify(fatList.translations)};
 export const LatLngMap= ${JSON.stringify(maps.latLng)};
 export const LatLngFatList= ${JSON.stringify(fatList.latLng)};
 export const LandlockedMap= ${JSON.stringify(maps.landlocked)};
 export const LandlockedFatList= ${JSON.stringify(fatList.landlocked)};
 export const BordersMap= ${JSON.stringify(maps.borders)};
 export const BordersFatList= ${JSON.stringify(fatList.borders)};
 export const AreaMap= ${JSON.stringify(maps.area)};
 export const AreaFatList= ${JSON.stringify(fatList.area)};
 export const DemonymsMap= ${JSON.stringify(maps.demonyms)};
 export const DemonymsFatList= ${JSON.stringify(fatList.demonyms)};
 export const FlagsMap= ${JSON.stringify(maps.flag)};
 export const FlagsFatList= ${JSON.stringify(fatList.flag)};
 export const CallingCodesMap= ${JSON.stringify(maps.callingCodes)};
 export const CallingCodesFatList= ${JSON.stringify(fatList.callingCodes)};
 `;

    function removeDups(ar) {
        return [...new Set(ar)];
    }

    let listable = "\n\n export type Listable = 'default'";
    let list_types = "\n\n export type List = [] ";
    let mappable = "\n\n export type Mappable = 'default'";

    for (const listsKey in lists) {
        listable += ` | '${listsKey}'`;
        lists[listsKey] = removeDups(lists[listsKey]);
        const arrayName = (snakeCase(listsKey) + "_ARRAY").toUpperCase();
        const typeName = ['cca2', 'tld', 'ccn3', 'cca3', 'cioc', 'idd'].includes(listsKey) ? listsKey.toUpperCase() : pascalCase(listsKey);

        listArraysAnInterface += `\n export const ${arrayName} = ${JSON.stringify(lists[listsKey])};`
        listArraysAnInterface += `\n export type ${typeName} = typeof ${arrayName}[number];`;

        list_types += ` | Array<${typeName}>`;
    }

    listable += ";"
    list_types += ";"

    for (const mapsKey in maps) {
        mappable += ` | '${mapsKey}'`;
    }

    mappable += ";";

    rm('-rf', dataSourcePath);

    appendFileSync(countries_file,
        listArraysAnInterface +
        interfaceCountry +
        listable +
        list_types +
        mappable +
        "\n\n export const countries: Array<Country>=" + countriesString + ";"
    );
    printSuccess('Country Data file was created successfully.');

} catch
    (e) {
    // console.error(e)
    printError('Could not fill countries file.');
    exit(1);
}

try {
    const flagsIndex = './src/data/flags/index.ts';
    const topoIndex = './src/data/topo-json/index.ts';
    const geoIndex = './src/data/geo-json/index.ts';

    printLog("Indexing flags...");
    prepareFile(flagsIndex);
    cp(path_to_dependency + '/data/*.svg', "./src/data/flags");
    ls('./src/data/flags/*.svg').forEach((file) => {
        const {base, name} = parse(file);
        appendFileSync(
            flagsIndex,
            `
import ${name} from "./${base}";
export const ${name}_flag = ${name};`
        );
    });
    printSuccess(chalk.bold("flag") + " indexed.");

    printLog("Indexing geo-json...");
    prepareFile(geoIndex);
    cp(path_to_dependency + '/data/*.geo.json', "./src/data/geo-json");
    ls('./src/data/geo-json/*.geo.json').forEach((file) => {
        const {base, name} = parse(file);
        appendFileSync(
            geoIndex,
            `
import ${name} from "./${base}";
export const ${name}_geo_json = ${name};`
        );
    });
    printSuccess(chalk.bold("geo-json") + " indexed.");

    printLog("Indexing flags...");
    prepareFile(topoIndex);
    cp(path_to_dependency + '/data/*.topo.json', "./src/data/topo-json");
    ls('./src/data/topo-json/*.topo.json').forEach((file) => {
        const {base, name} = parse(file);
        appendFileSync(
            topoIndex,
            `
import ${name} from "./${base}";
export const ${name}_topo_json = ${name};`
        );
    });
    prepareFile(topoIndex);
    printSuccess(chalk.bold("topo-json") + " indexed.");

} catch (e) {
    console.error(e)
    printError('Could not fill index flags.');
    exit(1);
}

console.log(chalk.bold.greenBright("\n✨ Done."));

console.log(chalk.bgCyan.black.bold(' </FruitsBytes> '));
