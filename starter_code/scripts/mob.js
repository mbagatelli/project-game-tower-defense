class Mob {
  constructor(game) {
    this.game = game;
    this.height = game.height;
    this.width = game.width;
    this.context = game.context;
    this.x = 0;
    this.vx = 1;
    this.size = 44;
  }

  /*     update() {
        this.x += this.vx;
      } */
}

class Bat extends Mob {
  constructor(game) {
    super(game);
    this.health = 100;
    this.dead = false;
    this.speed;
    this.y = this.getRandom(128, 224);
    this.bat = new Image();
    this.bat.src = './images/bat/bat_right.png';
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  draw() {
    this.context.drawImage(
      this.bat,
      0,
      0,
      44,
      44,
      this.x,
      this.y,
      this.size,
      this.size
    );
  }

  damageTaken(x, health, damage) {
    //setInterval(function() {
    // console.log(x, health, damage)
    this.health -= damage;
    if (this.health <= 0) {
      this.drawDeath();
      //} else if (x > 260) {
      //   clearInterval();
    }
    //}, 500);
  }

  drawDeath() {
    this.context.drawImage(
      this.bat,
      176,
      0,
      44,
      44,
      this.x,
      this.y,
      this.size,
      this.size
    );
    this.vx *= 0;
  }

  die() {
    this.dead = true;

    setTimeout(() => {
      const batArray = this.game.bats;
      const bat = this;
      const index = batArray.indexOf(bat);
      batArray.splice(index, 1);
    }, 500);
  }

  update() {
    this.x += this.vx;
  }
}
