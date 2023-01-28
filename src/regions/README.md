# @actnowcoalition/regions

> A package containing classes and datasets to represent geographic areas and administrative divisions with a uniform interface.

## Usage

The `Region` class defines the main elements that represent an administrative division.

```tsx
const washingtonState = new Region(
  "53", // regionId
  "Washington", // fullName
  "Washington", // shorName
  "WA", // abbreviation
  "washington-wa", // urlFragment
  null, // parent
  7614893 // population
);
```

Using the `parent` property we can represent hierarchy between regions and use it to check if one contains the other, or to obtain properties of the parent region

```tsx
const kingCountyWA = new Region(
  "53033",
  "King County"
  // ...
  washingtonState,
  2252782
);

console.log(kingCountyWA.parent)                     // washingtonState
console.log(washingtonState.contains(kingCountyWA))  // true
```

### Datasets

Datasets contain pre-constructed lists of regions such as U.S. states, counties or metropolitan areas. The datasets are exported as instances of [`RegionDB`](src/RegionDB.ts), which
contain the full list of regions and utility methods to find regions by ID, among others. Note that the `regionId` must be unique for each `RegionDB`.

#### Unites States

This dataset contains states, counties and [metropolitan areas](https://www.census.gov/topics/housing/housing-patterns/about/core-based-statistical-areas.html) in the U.S. We use [FIPS Codes](https://www.census.gov/library/reference/code-lists/ansi.html) as `regionId` for states, and we concatenate state and county FIPS codes to generate a unique 5-digit `regionId` for each county. We use 5-digit [core based statistical area (CBSA) codes](https://www.census.gov/geographies/reference-files/time-series/demo/metro-micro/delineation-files.html) as `regionId` for metro areas.

See [`src/datasets/us/states.json`](src/datasets/us/states.json), [`src/datasets/us/counties.json`](src/datasets/us/counties.json) and [`src/datasets/us/metros.json`](src/datasets/us/metros.json) for a full list of states, counties and metros.

##### Using states, counties, and metropolitan areas

```tsx
import { counties, metros, states } from "@actnowcoalition/regions";

const ny = states.findByRegionId("36");
console.log(ny.fullName); // New York
console.log(ny.abbreviation); // NY

const kingCountyWA = counties.findRegionById("53033");
console.log(kingCountyWA.population); // 2252782

const bostonMetro = metros.findRegionById("14460");
console.log(bostonMetro.shortName); // Boston-Cambridge-Newton metro
```

#### Countries

This dataset contains countries and territories that the WHO uses. We use [ISO3 country codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) as region IDs.

##### Using nations

```tsx
import { nations } from "@actnowcoalition/regions";

const irl = nations.findByRegionId("IRL");
console.log(irl.fullName); // Ireland
```

## Installing

```sh
yarn add @actnowcoalition/regions
```

## License

[MIT](./LICENSE)
