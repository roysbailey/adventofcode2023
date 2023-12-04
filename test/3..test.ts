import { dayThree } from "./test-data";
import { PuzzleThree } from "../src/days/day3";

const testData: string = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const expected: number = 4361;
const expected2: number = 467835;

describe('Day three', () => {
  test('part one sample', () => {
    const puzzle = new PuzzleThree(testData);
    let actual : number = puzzle.partOne();
    expect(actual).toEqual(expected);
  })

  test('part one final', () => {
    const puzzle = new PuzzleThree(dayThree);
    let actual : number = puzzle.partOne();
    expect(actual).toEqual(527369);
  })

  test('part two sample', () => {
    const puzzle = new PuzzleThree(testData);
    let actual : number = puzzle.partTwo();
    expect(actual).toEqual(expected2);
  })

  test('part two final', () => {
    const puzzle = new PuzzleThree(dayThree);
    let actual : number = puzzle.partTwo();
    expect(actual).toEqual(73074886);
  })  

});
