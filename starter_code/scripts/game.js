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
    //this.bat = new Bat(this);
    this.bats = [];
    this.knights = [];
    this.ghosts = [];
    this.tower = new Towers(this);
    this.mageTower = new MageTower(this);
    this.cannonTower = new CannonTower(this);
    this.batsPush = 1500;
    this.knightsPush = 2500;
    this.ghostsPush = 5000;
    this.mobTimerBats = 0;
    this.mobTimerKnights = 0;
    this.mobTimerGhosts = 0;
    //this.isitDead;
  }

  clear() {
    this.context.clearRect(0, 0, 640, 384);
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

  drawEverything() {
    //this.clear ();
    this.background.paintMap();

    if (this.waveStarted) {
      for (let i = 0; i < this.bats.length; i++) {
        this.bats[i].draw();
      }
      for (let i = 0; i < this.knights.length; i++) {
        this.knights[i].draw();
      }
      for (let i = 0; i < this.ghosts.length; i++) {
        this.ghosts[i].draw();
      }
    }

    if (this.mageTower.built && !this.cannonTower.built) {
      this.mageTower.draw();
      this.attack(this.mageTower);
      this.towerbuilder.drawSpot2();
    } else if (!this.cannonTower.built) {
      this.towerbuilder.drawSpot1();
      this.towerbuilder.drawSpot2();
    }

    if (this.cannonTower.built && !this.mageTower.built) {
      this.cannonTower.draw();
      this.attack(this.cannonTower);
      this.towerbuilder.drawSpot2();
    } else if (!this.mageTower.built) {
      this.towerbuilder.drawSpot1();
      this.towerbuilder.drawSpot2();
    }
    //this.mageTower.draw();
    //this.cannonTower.draw();
  }

  //tower will attack if the mob is between the x coords of 140 and 260
  attack(tower) {
    if (tower.built && !this.cannonTower.built) {
      for (let i = 0; i < this.bats.length; i++) {
        if (this.bats[i].x >= 140 && this.bats[i].x <= 260) {
          this.bats[i].damageTaken(
            this.bats[i].x,
            this.bats[i].health,
            tower.damage
          );
        }
      }
    }
  }

  updateEverything(timestamp) {
    //this.attack();

    if (this.waveStarted) {
      if (this.mobTimerBats < timestamp - this.batsPush) {
        this.bats.push(new Bat(this));
        this.mobTimerBats = timestamp;
      }

      for (let i = 0; i < this.bats.length; i++) {
        this.bats[i].update();
      }

      if (this.mobTimerKnights < timestamp - this.knightsPush) {
        this.knights.push(new Knight(this));
        this.mobTimerKnights = timestamp;
      }

      for (let i = 0; i < this.knights.length; i++) {
        this.knights[i].update();
      }
      if (this.mobTimerGhosts < timestamp - this.ghostsPush) {
        this.ghosts.push(new Ghost(this));
        this.mobTimerGhosts = timestamp;
      }

      for (let i = 0; i < this.ghosts.length; i++) {
        this.ghosts[i].update();
      }
    }
    for (let i = this.bats.length - 1; i >= 0; i--) {
      const bat = this.bats[i];
      if (bat.health <= 0 && !bat.dead) {
        bat.die();
      }
    }
    for (let i = this.knights.length - 1; i >= 0; i--) {
      const knight = this.knights[i];
      if (knight.health <= 0 && !knight.dead) {
        knight.die();
      }
    }
    for (let i = this.ghosts.length - 1; i >= 0; i--) {
      const ghost = this.ghosts[i];
      if (ghost.health <= 0 && !ghost.dead) {
        ghost.die();
      }
    }
  }
}
