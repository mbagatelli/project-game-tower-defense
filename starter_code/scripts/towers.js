class Towers {
  constructor(game) {
    /*     this.builtMage = false;
    this.builtCannon = false; */
    this.game = game;
    this.height = game.height;
    this.width = game.width;
    this.context = game.context;
    this.spot1x = 180;
    this.spot1y = 55;
    this.spot2x = 370;
    this.spot2y = 210;
    this.radius = 40;
    this.x = 0;
    this.size = 32;
    this.isInsideRadius = [];
    this.isInsideRadius2 = [];
    this.builtUpgrade = false;
    this.builtUpgrade2 = false;

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
          this.isInsideRadius.push(enemy);
          if (this.isInsideRadius.length && this.isInsideRadius[0].health >= 0) {
            this.isInsideRadius[0].damageTaken(this.isInsideRadius[0].x, this.isInsideRadius[0].health, damage);
          }
        } else if (!intersects && this.isInsideRadius.length) {
          this.isInsideRadius.splice(0, 1);
        }
      }
    }
  }

  attackSecond() {
    const tower = this;
    const damage = this.upgraded ? this.damageUpgrade : this.damage;
    if (tower.built2 || tower.builtUpgrade2) {
      for (let enemy of this.game.enemies) {
        const intersects = this.checkIntersection2(enemy);
        if (intersects) {
          this.isInsideRadius2.push(enemy);
          if (this.isInsideRadius2.length && this.isInsideRadius2[0].health >= 0) {
            this.isInsideRadius2[0].damageTaken(this.isInsideRadius2[0].x, this.isInsideRadius2[0].health, damage);
          }
        } else if (!intersects && this.isInsideRadius2.length) {
          this.isInsideRadius2.splice(0, 1);
        }
      }
    }
  }

  checkIntersection(enemy) {
    if (enemy.x >= this.spot1x - this.radius && enemy.x <= this.spot1x + this.radius) {
      return true;
    } else {
      return false;
    }
  }

  checkIntersection2(enemy) {
    if (enemy.x >= this.spot2x - this.radius && enemy.x <= this.spot2x + this.radius) {
      return true;
    } else {
      return false;
    }
  }

  unlockTower2() {
    if (this.game.player.score >= this.game.mageTower.upgradeCost) {
      document.getElementById('mage-upgrade1').disabled = false;
      document.getElementById('cannon-upgrade1').disabled = false;
      document.getElementById('mage-upgrade2').disabled = false;
      document.getElementById('cannon-upgrade2').disabled = false;
    }
  }
}

class MageTower extends Towers {
  constructor(game) {
    super(game);
    this.built = false;
    this.buil2 = false;
    this.upgradeCost = 10;
    this.damage = 1.5;
    this.damageUpgrade = 2;
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
    this.upgraded = true;
    this.context.drawImage(this.mageTower, 164, 0, 41, 70, this.spot1x, this.spot1y, 41, 70);
  }
  drawUpgrade2() {
    this.built = false;
    this.builtUpgrade2 = true;
    this.upgraded = true;
    this.context.drawImage(this.mageTower, 164, 0, 41, 70, this.spot2x, this.spot2y, 41, 70);
  }
}

class CannonTower extends Towers {
  constructor(game) {
    super(game);
    this.built = false;
    this.built2 = false;
    this.damage = 1;
    this.damageUpgrade = 3;
    this.upgradeCost = 30;
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

  drawUpgrade() {
    this.built = false;
    this.builtUpgrade = true;
    this.upgraded = true;
    this.context.drawImage(this.cannonTower, 208, 70, 41, 70, this.spot1x, this.spot1y, 41, 70);
  }

  drawUpgrade2() {
    this.built2 = false;
    this.builtUpgrade2 = true;
    this.upgraded = true;
    this.context.drawImage(this.cannonTower, 208, 70, 41, 70, this.spot2x, this.spot2y, 41, 70);
  }
}
