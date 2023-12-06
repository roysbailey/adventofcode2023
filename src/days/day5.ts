export class PuzzleFive {
  private lines: string[];

  constructor(input: string) {
    this.lines = input.split('\n');
  }

  public partOne(): number {
    let data = this.parseInput();
    let closestLocation = this.findClosestLocation(data.seeds, data.maps);
    return closestLocation;
  }

  public partTwo(): number {
    let data = this.parseInput();

    const allSeeds: number[] = [];

    // DONT DO THIS VIA THE ARRAY.  NEED TO LOOP THROUGH THE SEEDS A SET AT A TIME, AND THE CALL THE MAPPER FROM THERE for each entry
    for (let i = 0; i < data.seeds.length; i += 2) {
      const lowerRange = data.seeds[i];
      const upperRange = lowerRange + data.seeds[i + 1]-1;
  
      if (lowerRange <= upperRange) {
        for (let value = lowerRange; value <= upperRange; value++) {
          allSeeds.push(value);
        }
      }
    }

    let closestLocation = this.findClosestLocation(allSeeds, data.maps);
    return closestLocation;
  }

  private findClosestLocation(seeds: number[], maps: Record<string, number[][]>): number {
    let closestLocation: number = Number.MAX_SAFE_INTEGER;

    // move mapper to an instance variable, and pass in ONE seed at a time
    let mapper = new FluentMapper(maps);
    seeds.forEach(seed => {
      let location : number = 
        mapper.setValue(seed)
              .applyMap('seed-to-soil')
              .applyMap('soil-to-fertilizer')
              .applyMap('fertilizer-to-water')
              .applyMap('water-to-light')
              .applyMap('light-to-temperature')
              .applyMap('temperature-to-humidity')
              .applyMap('humidity-to-location')
              .getValue();
        closestLocation = Math.min(closestLocation, location);
    });

    return closestLocation;
  }


  private parseInput(): { seeds: number[]; maps: Record<string, number[][]> } | null {
    let seedsRowSegments = this.lines[0].split(":");
    const seeds = seedsRowSegments[1].trim().split(/\s+/).map(Number);
    const maps: Record<string, number[][]> = {};
  
    let currentMapName = '';
  
    for (let i = 1; i < this.lines.length; i++) {
      const line = this.lines[i].trim();
  
      if (line.length > 0) {
        if (line.endsWith('map:')) {
          currentMapName = line.replace(' map:', '');
          maps[currentMapName] = [];
        } else {
          const mapValues = line.split(/\s+/).map(val => Number(val));
          maps[currentMapName].push(mapValues);
        }
      }
    }
  
    return { seeds, maps };
  }
}

class FluentMapper {
  private value: number;
  private mappers: Mapper[] = [];

  constructor(mapperData: Record<string, number[][]>) {
    Object.keys(mapperData).forEach(key => {
      let mapper = new Mapper(key, mapperData[key]);
      this.mappers.push(mapper);
    });
  }  
  
  public setValue(value: number) {
    this.value = value;
    return this;
  }

  public applyMap(mapName: string) {
    let mapper = this.mappers.find(mapper => mapper.name === mapName);
    if (mapper) {
      this.value = mapper.mapInput(this.value);
    }
    return this;
  }

  public getValue(): number {
    return this.value;
  }
}

class Mapper {
  constructor(name: string, maps: number[][]) {
    this.name = name;
    this.entries = maps.map((row) => {
      return new MapperEntry(row[0], row[1], row[2]);
    });
  }
  public name: string;
  private entries: MapperEntry[];

  public mapInput(input: number) {
    var matchingMapEntry = this.entries.find((entry) => {
      return input >= entry.rangeLower && input <= entry.rangeUpper;
    });
    if (matchingMapEntry) {
      input += matchingMapEntry.adjuster;
    }
    return input;
  }
}

class MapperEntry {
  constructor(desintationStart: number, sourceStart: number, rangeLength: number) {
    this.adjuster = desintationStart - sourceStart;
    this.rangeLower = sourceStart;
    this.rangeUpper = sourceStart + rangeLength;
  }
  public adjuster: number;
  public rangeLower: number;
  public rangeUpper: number;
}


[79, 14, 55, 13]