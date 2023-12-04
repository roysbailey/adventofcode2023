export class PuzzleTwo {
  private lines: string[];

  constructor(input: string) {
    this.lines = input.split('\n')
  }

  public partOne(possibleCheck: Record<string, number>): number {
    let idSumOfPossibleGames : number = 0;
    let maxColourCubesByGame = this.getMaxColourCubesByGame();

    for (const gameIdValue in maxColourCubesByGame) {
      if (maxColourCubesByGame.hasOwnProperty(gameIdValue)) {
        let gameIdNumber: number = parseInt(gameIdValue, 10);
        const gameColourCubes = maxColourCubesByGame[gameIdNumber];
    
        if (this.checkCounts(possibleCheck, gameColourCubes)) {
          idSumOfPossibleGames += gameIdNumber;
        }
      }
    }
    return idSumOfPossibleGames;
  }

  public partTwo(): number {
    let sumOfGameProducts: number = 0;
    let maxColourCubesByGame = this.getMaxColourCubesByGame();

    for (const gameIdValue in maxColourCubesByGame) {
      if (maxColourCubesByGame.hasOwnProperty(gameIdValue)) {
        let gameIdNumber: number = parseInt(gameIdValue, 10);
        const gameColourCubes = maxColourCubesByGame[gameIdNumber];

        sumOfGameProducts += this.calculateProduct(gameColourCubes);
      }
    }
    return sumOfGameProducts;
  }

  public getMaxColourCubesByGame(): Record<number,Record<string, number>> {

    let maxColourCubesByGame : Record<number,Record<string, number>> = {};
    
    this.lines.forEach((line) => {
      const colourCounts: Record<string, number> = {};
      const match = line.match(/Game (\d+):/);
      let gameId = parseInt(match[1], 10);

      // remove the game
      line = line.split(': ')[1];

      // Split the line into groups
      const groups = line.split(';');
    
      // Process each group
      groups.forEach(group => {
        const items = group.trim().split(',');
    
        // Process each item in the group
        items.forEach(item => {
          const [countStr, color] = item.trim().split(' ');
    
          // Parse the count as a number
          const count = parseInt(countStr, 10);
    
          // Update the dictionary with the maximum count for each color
          if (!colourCounts[color] || count > colourCounts[color]) {
            colourCounts[color] = count;
          }
        });
      });
    
      maxColourCubesByGame[gameId] = colourCounts;
    });

    return maxColourCubesByGame;
 }

  private checkCounts(input: Record<string, number>, calculated: Record<string, number>): boolean {
    for (const color in calculated) {
      if (calculated.hasOwnProperty(color)) {
        const calculatedCount = calculated[color];
        const inputCount = input[color] || 0; // If the color is not present in the input, consider its count as 0.
  
        if (inputCount < calculatedCount) {
          return false;
        }
      }
    }
  
    return true;
  }  

  private calculateProduct(input: Record<string, number>): number {
    let product = 1;
  
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        const value = input[key];
        product *= value;
      }
    }
  
    return product;
  }
}