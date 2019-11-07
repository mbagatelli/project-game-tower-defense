class Towers {
  constructor(game) {
    /*     this.builtMage = false;
    this.builtCannon = false; */
    this.game = game;
    this.height = game.height;
    this.width = game.width;
    this.context = game.context;
    this.targets = [];
    this.spot1x = 180;
    this.spot1y = 55;
    this.spot2x = 370;
    this.spot2y = 210;
    this.radius = 40;
    this.x = 0;
    this.size = 32;

    this.damage = 0;
    this.damageUpgrade = 0;

    this.upgraded = false;
  }

  //tower will attack if the mob is between the x coords of 140 and 260
  attackFirst() {
    const tower = this;
    const damage = this.upgraded ? this.damageUpgrade : this.damage;
    if (tower.built || tower.builtUpgrade) {
      for (let enemy of this.game.enemies) {
        const intersects = this.checkIntersection(enemy);
        if (intersects) {
          enemy.damageTaken(enemy.x, enemy.health, damage);
        }
      }
    }
  }

  checkIntersection(enemy) {
    if (enemy.x >= this.spot1x && enemy.x <= this.spot2x) {
      return true;
    } else {
      return false;
    }
  }

  unlockTower2() {
    if (this.game.player.score >= 30) {
      document.getElementById('test').disabled = false;
    }
  }

  checkIfInLOS(mob) {
    // Compare position between this tower and mob
    if (mob.x >= this.spot1x - this.radius && mob.x <= this.spot1x - this.radius) {
      console.log('testing');
    }
  }
}

class MageTower extends Towers {
  constructor(game) {
    super(game);
    this.built = false;
    this.buil2 = false;
    this.builtUpgrade = false;
    this.damage = 1.3;
    this.damageUpgrade = 5;
    this.mageTower = new Image();
    this.mageTower.src = './images/towers/towers.png';
  }

  draw() {
    this.built = true;
    this.game.cannonTower.built = false;
    this.context.drawImage(this.mageTower, 0, 0, 41, 70, this.spot1x, this.spot1y, 41, 70);
  }

  drawPos2() {
    this.built2 = true;
    this.game.cannonTower.built2 = false;
    this.context.drawImage(this.mageTower, 0, 0, 41, 70, this.spot2x, this.spot2y, 41, 70);
  }

  drawUpgrade() {
    this.built = false;
    this.builtUpgrade = true;
    this.context.drawImage(this.mageTower, 164, 0, 41, 70, this.spot1x, this.spot1y, 41, 70);
  }

  towerDamage(damage) {
    this.game.bat.health -= damage;
    //this.game.bats[0].health -= this.damage;
  }
}

class CannonTower extends Towers {
  constructor(game) {
    super(game);
    this.built = false;
    this.built2 = false;
    this.damage = 0.7;
    this.cannonTower = new Image();
    this.cannonTower.src = './images/towers/towers.png';
  }

  draw() {
    this.built = true;
    this.game.mageTower.built = false;
    this.context.drawImage(this.cannonTower, 164, 70, 41, 70, this.spot1x, this.spot1y, 41, 70);
  }

  drawPos2() {
    this.built2 = true;
    this.game.mageTower.built2 = false;
    this.context.drawImage(this.cannonTower, 164, 70, 41, 70, this.spot2x, this.spot2y, 41, 70);
  }

  towerDamage() {
    this.game.bat.health -= this.damage;
  }
}
