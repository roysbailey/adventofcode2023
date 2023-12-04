import { dayOne } from "./test-data";
import { PuzzleOne } from "../src/days/day1";

const testData = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
const expected = 142;

const testData2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
eightwo`
const expected2 = 363

describe('Day one', () => {
test('Day one part one sample', () => {
  const puzzle = new PuzzleOne(testData);
  let actual : number = puzzle.partOne();
  expect(actual).toEqual(expected);
})

test('Day one part one final', () => {
  const puzzle = new PuzzleOne(dayOne)
  expect(puzzle.partOne()).toBe(54081)
})

test('Day one part two sample', () => {
  const puzzle = new PuzzleOne(testData2)
  expect(puzzle.partTwo()).toEqual(expected2)
})

test('Day one part two final', () => {
  const puzzle = new PuzzleOne(dayOne)
  expect(puzzle.partTwo()).toEqual(54649)
})
});