const skelAttack = new Audio('./sounds/skels.mp3');
const mainSound = new Audio('./sounds/main.mp3');

class Game {
  constructor($canvas) {
    this.waveStarted = false;
    this.blockButton = false;
    this.blockButton2 = false;
    this.blockButton3 = false;
    this.blockButton4 = false;
    this.batsPush = 4500;
    this.knightsPush = 8500;
    this.ghostsPush = 1500;
    this.skelsPush = 15000;
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
    this.mobTimerSkels = 0;
    this.mobTimerBats = 0;
    this.mobTimerKnights = 0;
    this.mobTimerGhosts = 0;
    this.over = new Image();
    this.over.src = './images/gameover.png';

    //this.isitDead;
  }

  clear() {
    this.context.clearRect(0, 0, 640, 384);
  }

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
    this.frame = window.requestAnimationFrame(timestamp => this.animation(timestamp));
    if (this.player.life === 0) {
      this.gameOver();
    }
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
    } else if (!this.mageTower.built && !this.cannonTower.built) {
      this.towerbuilder.drawSpot1();
    }

    if (this.cannonTower.built) {
      this.cannonTower.draw();
    } else if (!this.mageTower.built && this.cannonTower.builtUpgrade2) {
      this.towerbuilder.drawSpot1();
    }

    if (this.mageTower.built2) {
      this.mageTower.drawPos2();
    } else if (!this.cannonTower.built2 && !this.cannonTower.builtUpgrade2) {
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
      //this.mageTower.built2 = false;
      this.mageTower.drawUpgrade2();
    }
    if (this.cannonTower.builtUpgrade) {
      //this.cannonTower.builtUpgrade = false;
      this.cannonTower.drawUpgrade();
    }
    if (this.cannonTower.builtUpgrade2) {
      this.cannonTower.built2 = false;
      this.cannonTower.drawUpgrade2();
    }
    this.life();
    this.score();
  }

  updateEverything(timestamp) {
    console.log(this.frame);
    this.tower.unlockTower2();

    if (this.waveStarted) {
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
    this.higherLevel();
    this.loopSound();
  }

  gameOver() {
    window.cancelAnimationFrame(this.frame);
    delete this.frame;
    this.context.drawImage(this.over, 100, 50, 448, 268.8);
  }

  reset() {
    window.cancelAnimationFrame(this.frame);
    delete this.frame;
    this.waveStarted = false;
    this.player.score = 0;
    this.context.clearRect(0, 0, 640, 384);
    this.enemies = [];
    this.blockButton = false;
    this.blockButton2 = false;
    this.blockButton3 = false;
    this.blockButton4 = false;
    this.batsPush = 0;
    this.knightsPush = 0;
    this.ghostsPush = 0;
    this.skelsPush = 0;
    this.mobTimerSkels = 0;
    this.mobTimerBats = 0;
    this.mobTimerKnights = 0;
    this.mobTimerGhosts = 0;
    this.player.life = 10;
    this.player.score = 0;
    this.tower.isInsideRadius = [];
    this.tower.isInsideRadius2 = [];
    this.tower.isItBuilt = false;
    this.tower.isItBuiltPos2 = false;
    this.tower.upgraded = false;
    this.mageTower.built = false;
    this.mageTower.buil2 = false;
    this.mageTower.builtUpgrade = false;
    this.mageTower.builtUpgrade2 = false;
    this.cannonTower.built = false;
    this.cannonTower.built2 = false;
    this.cannonTower.builtUpgrade = false;
    this.cannonTower.builtUpgrade2 = false;
    document.getElementById('start-wave').classList.remove('hide');
    document.getElementById('mage1').disabled = false;
    document.getElementById('cannon1').disabled = false;
    document.getElementById('mage2').disabled = false;
    document.getElementById('cannon2').disabled = false;
    //document.querySelector('main').classList.replace('game-playing', 'game-paused');
    //document.querySelector('button').classList.replace('canvas-time', 'start-game');
    this.animation();

    //reset everything and then call for the animation loop
  }

  loopSound() {
    if (!this.skelAttack) {
      mainSound.loop = true;
      mainSound.play();
    } else {
      mainSound.pause();
    }
  }

  higherLevel() {
    if (this.frame >= 800 && this.frame < 1500) {
      this.skelsPush = 5000;
      this.batsPush = 2500;
      this.knightsPush = 3500;
      this.ghostsPush = 1000;
    } else if (this.frame >= 1500) {
      this.skelAttack = true;
      mainSound.pause();
      skelAttack.play();
      this.skelsPush = 500;
    }
  }
}
