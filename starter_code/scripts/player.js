class Player {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.score = 0;
    this.money = 200;
    this.life = 10;
    this.heart = new Image();
    this.heart.src = './images/heart.png';
  }

  loseLife() {
    this.life -= 1;
  }

  getScore(value) {
    this.score += value;
    //this.game.tower.unlockTower2();
  }

  youDead() {
    if (this.life == 0) {
      this.game.reset();
    }
  }
}
