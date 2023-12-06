import { dayFour } from "./test-data";
import { PuzzleFour } from "../src/days/day4";

const testData: string = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const expected: number = 13;
const expected2: number = 30;

describe('Day four', () => {
  test('part one sample', () => {
    const puzzle = new PuzzleFour(testData);
    let actual : number = puzzle.partOne();
    expect(actual).toEqual(expected);
  })

  test('part one final', () => {
    const puzzle = new PuzzleFour(dayFour);
    let actual : number = puzzle.partOne();
    expect(actual).toEqual(26914);
  })  

  test('part two sample', () => {
    const puzzle = new PuzzleFour(testData);
    let actual : number = puzzle.partTwo();
    expect(actual).toEqual(expected2);
  })

  test('part two final', () => {
    const puzzle = new PuzzleFour(dayFour);
    let actual : number = puzzle.partTwo();
    expect(actual).toEqual(13080971);
  })   
});

