type CustomFunction = (value: number[]) => number;

class Card {
  id: number;
  value: number;
  constructor(id: number, value: number) {
    this.id = id;
    this.value = value;
  }
}

export class PuzzleFour {
  private lines: string[];
  private static lengthIsScore: CustomFunction = (x) => x.length;
  private static lengthDoubleUpScore: CustomFunction = (x) => 1 << x.length-1;
  private allCards: Card[] = [];

  constructor(input: string) {
    this.lines = input.split('\n');
  }

  public partOne(): number {
    let sum = 0;
  
    this.lines.forEach((line) => {
      const { score } = this.parseCardString(line, PuzzleFour.lengthDoubleUpScore);
      sum += score;
    });
  
    return sum;
  }

  public partTwo(): number {
    
  
    this.lines.forEach((line) => {
      const { cardNumber, score } = this.parseCardString(line, PuzzleFour.lengthIsScore);
      this.allCards.push(new Card(cardNumber, score));
    });

    let sum = this.totalScratchCards(this.allCards);
  
    return sum;
  }

  private totalScratchCards(cardsToProcess: Card[], runningTotal: number = 0) : number {

    //runntingToal += cardsToProcess.length;
    cardsToProcess.forEach((card, index) => {
      if (card.value > 0) {
        const childCards = this.allCards.slice(card.id, card.id + card.value);
        runningTotal = this.totalScratchCards(childCards, runningTotal);
      }
    });
    return runningTotal + cardsToProcess.length;
  }

  private parseCardString(cardString: string, scoringFunction: CustomFunction): { cardNumber: number; score: number; } {
    const regex = /Card\s+(\d{1,8}):? *(\d+(?:  *\d+)*) *\| *(\d+(?:  *\d+)*)/;
    const match = cardString.match(regex);
  
    if (match) {
      const cardNumber = match[1] ? parseInt(match[1], 10) : null;
      const winningNumbers = match[2].split(/\s+/).map(Number);
      const yourNumbers = match[3].split(/\s+/).map(Number);
      const matchingNumbers = yourNumbers.filter(element => winningNumbers.includes(element));

      let score: number = 0;
      if (matchingNumbers.length > 0) {
        score = scoringFunction(matchingNumbers);
      }
  
      return { cardNumber, score };
    }
  
    return null;
  }

}