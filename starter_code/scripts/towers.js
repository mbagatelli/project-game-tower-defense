class Towers {
    constructor(game) {
      this.height = game.height;
      this.width = game.width;
      this.context = game.context;
      this.x = 0;
      this.size = 32;
    }

/*     update() {
      this.x += this.vx;
    } */
}

class MageTower extends Towers {
  constructor(game) {
    super (game);
    this.damage = 3;
    this.mageTower = new Image();
    this.mageTower.src = './images/towers/towers.png';
  }

  draw() {
    this.context.drawImage(this.mageTower, 0, 0, 41, 70, 180, 55, 41, 70);
  }
  
  towerDamage() {
      this.game.bat.health -= this.damage
  }
}

class CannonTower extends Towers {
    constructor (game) {
        super (game);
            this.damage = 10
            this.cannonTower = new Image();
            this.cannonTower.src = './images/towers/towers.png'
        }

    draw() {
        this.context.drawImage(this.cannonTower, 164, 70, 41, 70, 370, 210, 41, 70);
    }
}
