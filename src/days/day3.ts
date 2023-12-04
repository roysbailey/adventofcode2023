export class PuzzleThree {
  private lines: string[];
  private gears: Record<string, number[]> = {};

  constructor(input: string) {
    this.lines = input.split('\n');
    this.lines = this.padStringArray(this.lines);
  }

  public partOne(): number {
    let sum = 0;
    let currentSequence = '';
    let row = 0;
  
    this.lines.forEach((line) => {
      for (let i = 0; i < line.length; i++) {
        const currentChar = line[i];
    
        if (!isNaN(Number(currentChar))) {
          // If the current character is a numeric value and not a symbol
          currentSequence += currentChar;
        } else {
          // If the current character is not a numeric value or is a symbol, add the sequence to the sum
          if (currentSequence.length > 0) {
            if (this.isValidPartNumber(currentSequence, row, i-currentSequence.length, currentSequence.length)) {
              sum += Number(currentSequence);
            }
            currentSequence = ''; // Reset the current sequence
          }
        }
      }
    
      row += 1;
    });
  
    return sum;
  }

  public partTwo(): number {
    let sum = 0;
    let currentSequence = '';
    let row = 0;
  
    this.lines.forEach((line) => {
      for (let i = 0; i < line.length; i++) {
        const currentChar = line[i];
    
        if (!isNaN(Number(currentChar))) {
          // If the current character is a numeric value and not a symbol
          currentSequence += currentChar;
        } else {
          // If the current character is not a numeric value or is a symbol, add the sequence to the sum
          if (currentSequence.length > 0) {
            this.trackGears(Number(currentSequence), row, i-currentSequence.length, currentSequence.length);
            currentSequence = ''; // Reset the current sequence
          }
        }
      }
      row += 1;
    });

    for (const key in this.gears) {
      if (this.gears.hasOwnProperty(key)) {
        if (this.gears[key].length === 2) {
          sum += this.gears[key].reduce((acc, value) => acc * value, 1);
        }
      }
    }
  
    return sum;
  }
  
  private trackGears(value: number, row: number, col: number, length: number) {
    const CheckGear = (row: number, col: number) => {
      if(this.lines[row][col] === '*') {
        let gearLocationKey: string = `${row}:${col}`;
        if (this.gears.hasOwnProperty(gearLocationKey)) {
          this.gears[gearLocationKey].push(value);
        } else {
          this.gears[gearLocationKey] = [value];
        }
      }
    };

    CheckGear(row,col-1);
    CheckGear(row, col+length);
    for(let i=col-1; i<col+length+1; i++) {
      CheckGear(row-1, i);
      CheckGear(row+1, i);
    }
  }

  private isValidPartNumber(currentSequence: string, row: number, col: number, length: number) : boolean {
    const isSymbol = (char: string): boolean => {
      return char !== '.' && isNaN(Number(char));
    };

    if (isSymbol(this.lines[row][col-1]) || isSymbol(this.lines[row][col+length])) {
      return true;
    }
    for(let i=col-1; i<col+length+1; i++) {
      if (isSymbol(this.lines[row-1][i]) || isSymbol(this.lines[row+1][i])) {
        return true;
      }
    }
    return false;
  }

  private padStringArray(inputArray: string[]): string[] {
    const maxLength = inputArray[0].length+2;
    const paddedArray: string[] = [];
    
    paddedArray.push('.'.repeat(maxLength));
  
    for (const str of inputArray) {
      const paddedStr = `.${str}.`;
      paddedArray.push(paddedStr);
    }
  
    paddedArray.push('.'.repeat(maxLength));
  
    return paddedArray;
  }
}