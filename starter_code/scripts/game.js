class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');
    this.width = $canvas.width;
    this.height = $canvas.height;
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

  drawEverything() {
    //this.clear ();
    this.background.paintMap();
    for (let i = 0; i < this.bats.length; i++) {
      this.bats[i].draw();
    }

    this.mageTower.draw();
    this.cannonTower.draw();
    //make width for attack
    /*       this.context.fillStyle = 'red';
      this.context.fillRect(140, 130, 120, 10);
      this.context.fillRect(140, 130, 10, 100);
      this.context.fillRect(260, 130, 10, 100); */
    //console.log(this.bat.health)
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
