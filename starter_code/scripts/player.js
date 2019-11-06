class Player {
  constructor(game) {
    this.game = game;
    this.score = 0;
    this.money = 200;
  }
  getScore(value) {
    this.score += value;
    console.log(this.score);
  }
}
