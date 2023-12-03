import * as fs from 'fs';

async function readCsvFileToArray(csvFilePath: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const dataArray: string[] = [];

    const readStream = fs.createReadStream(csvFilePath, 'utf8');

    readStream
      .on('data', (chunk: string) => {
        const lines = chunk.split('\n');

        lines.forEach((line) => {
          dataArray.push(line.replace(/\r/g, ''));
        });
      })
      .on('end', () => {
        resolve(dataArray);
      })
      .on('error', (error) => {
        reject(error);
      });

    readStream.on('error', (error) => {
      reject(error);
    });
  });
}

// Example usage:
const filename = './inputs/day1.txt';

readCsvFileToArray(filename)
  .then((data) => {
    let sumDigitsP1 = partOne(data);
    let sumDigitsP2 = partTwo(data);
   console.log(`Sum of digits - part 1: ${sumDigitsP1}, part 2: ${sumDigitsP2}`);
  })
  .catch((error) => {
    console.error('Error reading CSV file:', error);
  });

function partOne(lines: string[]) : number {
  let sumDigitsP1 : number = 0;
  lines.forEach((line) => {
    const digitArray: number[] = line
    .split('')
    .map((char) => (/\d/.test(char) ? parseInt(char, 10) : null))

    const firstDigit = digitArray.find((digit) => digit !== null);
    const lastDigit = digitArray.reverse().find((digit) => digit !== null);

    sumDigitsP1 = sumDigitsP1 + (firstDigit && firstDigit * 10) + lastDigit;
   });  
   return sumDigitsP1;
}

function partTwo(lines: string[]) : number {
  //const lines = input.split('\n')
  return lines.reduce((sum, line) => {
    // Regex matcher to find integer and their string representations
    const matcher = /[0-9]|(?=(one))|(?=(two))|(?=(three))|(?=(four))|(?=(five))|(?=(six))|(?=(seven))|(?=(eight))|(?=(nine))/g
    const matches = line.matchAll(matcher)
    const matcharray = Array.from(matches)
    // Get the first and last matches from the regex results
    const firstMatch = matcharray[0]
    const lastMatch = matcharray[matcharray.length - 1]
    // Get the value of the first and last matches
    const firstNumber = getMatchValue(firstMatch)
    const lastNumber = getMatchValue(lastMatch)
    const value = `${numberMaker(firstNumber)}${numberMaker(lastNumber)}`
    return sum + parseInt(value)
  }, 0)
}

// Gets the matched value from the regex matcher array
function getMatchValue(matchItem){
  if(matchItem[0] != ''){
    return matchItem[0]
  } else {
    for (const item of matchItem) {
      if(item){
        return item
      }
    }
  }
}

// Converts the string number to an integer
function numberMaker(input) : number {
  switch(input){
    case 'one':
      return 1
    case 'two':
      return 2
    case 'three':
      return 3
    case 'four':
      return 4
    case 'five':
      return 5
    case 'six':
      return 6
    case 'seven':
      return 7
    case 'eight':
      return 8
    case 'nine':
      return 9
    default:
      return input
  }
}
