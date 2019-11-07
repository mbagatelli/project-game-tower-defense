class Game {
  constructor($canvas) {
    this.waveStarted = false;
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');
    this.width = $canvas.width;
    this.height = $canvas.height;
    this.player = new Player(this);
    this.towerbuilder = new TowerBuilder(this);
    this.background = new Background(this);
    this.mob = new Mob(this);
    this.enemies = [];
    this.tower = new Towers(this);
    this.mageTower = new MageTower(this);
    this.cannonTower = new CannonTower(this);
    this.batsPush = 0;
    this.knightsPush = 0;
    this.ghostsPush = 0;
    this.skelsPush = 0;
    this.mobTimerSkels = 0;
    this.mobTimerBats = 0;
    this.mobTimerKnights = 0;
    this.mobTimerGhosts = 0;
    //this.isitDead;
  }

  clear() {
    this.context.clearRect(0, 0, 640, 384);
  }

  reset() {}

  score() {
    this.context.font = '20px Georgia';
    this.context.fillStyle = 'black';
    this.context.fillText(`Score: ${this.player.score}`, 520, 25);
  }

  start() {
    this.animation();
  }

  animation(timestamp) {
    this.updateEverything(timestamp);
    this.drawEverything();
    window.requestAnimationFrame(timestamp => this.animation(timestamp));
  }

  waveStart() {
    this.waveStarted = true;
  }

  life() {
    this.context.fillStyle = 'black';
    this.context.drawImage(this.player.heart, 5, 5, 25, 25);
    this.context.fillText(`${this.player.life}/10`, 35, 25);
  }

  drawEverything() {
    this.background.paintMap();

    if (this.waveStarted) {
      for (let enemy of this.enemies) {
        enemy.draw();
      }
    }

    if (this.mageTower.built) {
      this.mageTower.draw();
    } else {
      this.towerbuilder.drawSpot1();
      //this.towerbuilder.drawSpot2();
    }

    if (this.cannonTower.built) {
      this.cannonTower.draw();
      //this.towerbuilder.drawSpot2();
    } else if (!this.mageTower.built) {
      this.towerbuilder.drawSpot1();
      //this.towerbuilder.drawSpot2();
    }

    if (this.mageTower.built2) {
      this.mageTower.drawPos2();
    } else if (!this.cannonTower.built2) {
      this.towerbuilder.drawSpot2();
    }

    if (this.cannonTower.built2) {
      this.cannonTower.drawPos2();
    }

    if (this.mageTower.builtUpgrade) {
      this.mageTower.built = false;
      this.mageTower.drawUpgrade();
    }
    if (this.mageTower.builtUpgrade2) {
      this.mageTower.built2 = false;
      this.mageTower.drawUpgrade2();
    }
    if (this.cannonTower.builtUpgrade) {
      this.cannonTower.builtUpgrade = false;
      this.cannonTower.drawUpgrade();
    }
    if (this.cannonTower.builtUpgrade2) {
      this.cannonTower.builtUpgrade2 = false;
      this.cannonTower.drawUpgrade2();
    }
    this.life();
    this.score();
  }

  updateEverything(timestamp) {
    //this.attack();
    this.tower.unlockTower2();

    if (this.waveStarted) {
      this.batsPush = 4500;
      this.knightsPush = 8500;
      this.ghostsPush = 1500;
      this.skelsPush = 10000;
      if (this.mobTimerBats < timestamp - this.batsPush) {
        this.enemies.push(new Bat(this));
        this.mobTimerBats = timestamp;
      }

      if (this.mobTimerKnights < timestamp - this.knightsPush) {
        this.enemies.push(new Knight(this));
        this.mobTimerKnights = timestamp;
      }

      if (this.mobTimerGhosts < timestamp - this.ghostsPush) {
        this.enemies.push(new Ghost(this));
        this.mobTimerGhosts = timestamp;
      }

      if (this.mobTimerSkels < timestamp - this.skelsPush) {
        this.enemies.push(new Skel(this));
        this.mobTimerSkels = timestamp;
      }

      for (let enemy of this.enemies) {
        enemy.update();
      }
    }

    for (let enemy of this.enemies) {
      if (enemy.health <= 0 && !enemy.dead) {
        enemy.die();
      }
    }

    if (this.mageTower.built) {
      this.mageTower.attackFirst(this.mageTower, this.mageTower.damage);
    }

    if (this.cannonTower.built) {
      this.cannonTower.attackFirst(this.cannonTower, this.cannonTower.damage);
    }

    if (this.mageTower.built2) {
      this.mageTower.attackSecond(this.mageTower, this.mageTower.damage);
    }

    if (this.cannonTower.built2) {
      this.cannonTower.attackSecond(this.cannonTower, this.cannonTower.damage);
    }

    if (this.mageTower.builtUpgrade) {
      this.mageTower.built = false;
      this.mageTower.attackFirst(this.mageTower, this.mageTower.damageUpgrade);
    }
    if (this.cannonTower.builtUpgrade) {
      this.cannonTower.built = false;
      this.cannonTower.attackFirst(this.cannonTower, this.cannonTower.damageUpgrade);
    }

    //check if enemy passes the end of the road
    for (let enemy of this.enemies) {
      if (enemy.x >= this.width) {
        this.enemies.splice(0, 1);
        this.player.loseLife();
      }
    }
  }
}
