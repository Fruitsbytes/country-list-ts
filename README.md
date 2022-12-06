<p align="center">
 <img src="./wiki/banner.png" alt="" width="800">
</p>

# Country List TS




## Installation
```shell
npm i 
```

### Compatibility table
| Version | JS target |  JS lib   |
|:-------:|:---------:|:---------:|
|  1.0.0  |    ES5    |  ES2017   |

## Usage

### List

Get list of country record member.
- name
- region
- capital
- continent
- dialing_code
- code
- currency
- provinces

example:

```typescript
import {ls} from "country-list-ts";

const countryNames: string[] = ls('name');
const capitals: string[] = ls('capital');
const continents: string[] = ls('continent');
```

Or using their alias:

```typescript
import {names, capitals, continents} from "country-list-ts";

var countryNames: string[] = names();
var capitals: string[] = capitals();
var continents: string[] = continents();
```

### Search


### Dependencies
Data Source [mledoze/countries](https://github.com/mledoze/countries).

## Licence

MIT

