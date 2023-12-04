export class PuzzleOne {
  private lines: string[];

  constructor(input: string) {
    this.lines = input.split('\n')
  }

  public partOne() : number {
    let sumDigitsP1 : number = 0;
    this.lines.forEach((line) => {
      const digitArray: number[] = line
      .split('')
      .map((char) => (/\d/.test(char) ? parseInt(char, 10) : null))

      const firstDigit = digitArray.find((digit) => digit !== null);
      const lastDigit = digitArray.reverse().find((digit) => digit !== null);

      sumDigitsP1 = sumDigitsP1 + (firstDigit && firstDigit * 10) + lastDigit;
    });  
    return sumDigitsP1;
  }

  public partTwo() : number {
    return this.lines.reduce((sum, line) => {
      // Regex matcher to find integer and their string representations
      const matcher = /[0-9]|(?=(one))|(?=(two))|(?=(three))|(?=(four))|(?=(five))|(?=(six))|(?=(seven))|(?=(eight))|(?=(nine))/g
      const matches = line.matchAll(matcher)
      const matcharray = Array.from(matches)
      // Get the first and last matches from the regex results
      const firstMatch = matcharray[0]
      const lastMatch = matcharray[matcharray.length - 1]
      // Get the value of the first and last matches
      const firstNumber = this.getMatchValue(firstMatch)
      const lastNumber = this.getMatchValue(lastMatch)
      const value = `${this.numberMaker(firstNumber)}${this.numberMaker(lastNumber)}`
      return sum + parseInt(value)
    }, 0)
  }

  // Gets the matched value from the regex matcher array
  private getMatchValue(matchItem){
    if(matchItem[0] != '') {    // If this is != '' then the match is a digit, otherwise it is a number string
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
  private numberMaker(input) : number {
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
}