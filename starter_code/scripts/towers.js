class Towers {
  constructor(game) {
    this.game = game;
    this.height = game.height;
    this.width = game.width;
    this.context = game.context;
    this.radius = 60;
    this.x = 0;
    this.size = 32;
  }

  checkIfInLineOfSight(mob) {
    // Compare position between this tower and mob
    if (mob.x >= -this.radius || mob.x <= this.radius) {
    }
    s;
  }
}

class MageTower extends Towers {
  constructor(game) {
    super(game);
    this.damage = 1.3;
    this.mageTower = new Image();
    this.mageTower.src = './images/towers/towers.png';
  }

  draw() {
    this.context.drawImage(this.mageTower, 0, 0, 41, 70, 180, 55, 41, 70);
  }

  towerDamage() {
    this.game.bat.health -= this.damage;
  }
}

class CannonTower extends Towers {
  constructor(game) {
    super(game);
    this.damage = 1.3;
    this.cannonTower = new Image();
    this.cannonTower.src = './images/towers/towers.png';
  }

  draw() {
    this.context.drawImage(this.cannonTower, 164, 70, 41, 70, 370, 210, 41, 70);
  }

  towerDamage() {
    this.game.bat.health -= this.damage;
  }
}
