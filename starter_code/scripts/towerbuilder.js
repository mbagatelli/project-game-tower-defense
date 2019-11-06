class TowerBuilder {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.base = new Image();
    this.base.src = './images/background/tower_base.png';
  }

  drawSpot1() {
    this.context.drawImage(this.base, 0, 0, 32, 32, 180, 95, 32, 32);
  }

  drawSpot2() {
    this.context.drawImage(this.base, 0, 0, 32, 32, 370, 260, 32, 32);
  }
}
