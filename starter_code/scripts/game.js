class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');
    this.width = $canvas.width;
    this.height = $canvas.height;
    this.towerbuilder = new TowerBuilder(this);
    this.background = new Background(this);
    this.mob = new Mob(this);
    //this.bat = new Bat(this);
    this.bats = [];
    this.tower = new Towers(this);
    this.mageTower = new MageTower(this);
    this.cannonTower = new CannonTower(this);
    this.speed = 1500;
    this.mobTimer = 0;
    this.isitDead;
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

  /*   waveStarted() {
    for (let i = 0; i < this.bats.length; i++) {
      this.bats[i].draw();
    }
  } */

  drawEverything() {
    //this.clear ();
    this.background.paintMap();
    for (let i = 0; i < this.bats.length; i++) {
      this.bats[i].draw();
    }
    console.log(this.mageTower.built, 'game');
    if (this.mageTower.built) {
      this.mageTower.draw();
    } else {
      this.towerbuilder.draw();
    }
    //this.mageTower.draw();
    //this.cannonTower.draw();
  }

  //tower will attack if the mob is between the x coords of 140 and 260
  attack() {
    for (let i = 0; i < this.bats.length; i++) {
      if (this.bats[i].x >= 140 && this.bats[i].x <= 260) {
        this.bats[i].damageTaken(
          this.bats[i].x,
          this.bats[i].health,
          this.mageTower.damage
        );
      }
    }
  }

  updateEverything(timestamp) {
    this.attack();
    if (this.mobTimer < timestamp - this.speed) {
      this.bats.push(new Bat(this));
      this.mobTimer = timestamp;
    }

    for (let i = 0; i < this.bats.length; i++) {
      this.bats[i].update();
    }

    for (let i = this.bats.length - 1; i >= 0; i--) {
      const bat = this.bats[i];
      if (bat.health <= 0 && !bat.dead) {
        bat.die();
      }
    }
  }
}
