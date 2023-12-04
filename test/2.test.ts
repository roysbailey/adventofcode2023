import { dayTwo } from "./test-data";
import { PuzzleTwo } from "../src/days/day2";

const testData: string = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
const expected: number = 8;
const expected2: number = 2286;
const controlSet = {red: 12, green: 13, blue: 14};

describe('Day two', () => {
  test('part one sample', () => {
    const puzzle = new PuzzleTwo(testData);
    let actual : number = puzzle.partOne(controlSet);
    expect(actual).toEqual(expected);
  })

  test('part one final', () => {
    const puzzle = new PuzzleTwo(dayTwo);
    let actual : number = puzzle.partOne(controlSet);
    expect(actual).toEqual(2593);
  })

  test('part two sample', () => {
    const puzzle = new PuzzleTwo(testData);
    let actual : number = puzzle.partTwo();
    expect(actual).toEqual(expected2);
  })

  test('part two sample', () => {
    const puzzle = new PuzzleTwo(dayTwo);
    let actual : number = puzzle.partTwo();
    expect(actual).toEqual(54699);
  })
});