class Player {
  constructor(game) {
    this.game = game;
    this.score = 0;
    this.money = 200;
  }
  getScore(value) {
    this.score += value;
    this.game.tower.unlockTower2();
    this.game.context.fillStyle = 'black';
    this.game.context.fillText(`Score: ${this.score}`, 600, 20);
    console.log(this.score);
  }
}
