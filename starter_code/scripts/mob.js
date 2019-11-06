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
}

class Bat extends Mob {
  constructor(game) {
    super(game);
    this.value = 5;
    this.health = 100;
    this.dead = false;
    this.speed;
    this.y = this.getRandom(128, 224);
    this.bat = new Image();
    this.bat.src = './images/mobs/bat_right.png';
    this.count = -1;
    this.batmovArray = [[0, 0], [44, 0], [88, 0], [132, 0]];
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  draw() {
    if (this.count < 4) {
      this.context.drawImage(
        this.bat,
        this.batmovArray[this.count][0],
        this.batmovArray[this.count][1],
        44,
        44,
        this.x,
        this.y,
        this.size,
        this.size
      );
    } else if (this.dead) {
      this.context.drawImage(this.bat, 176, 0, 44, 44, this.x, this.y, 44, 44);
    } else {
      this.count = -1;
    }
  }

  damageTaken(x, health, damage) {
    //setInterval(function() {
    this.health -= damage;
    if (this.health <= 0) {
      this.drawDeath();
      //} else if (x > 260) {
      //   clearInterval();
    }
    //}, 500);
  }

  drawDeath() {
    //this.context.drawImage(this.bat, 176, 0, 44, 44, this.x, this.y, 100, 100);
    this.vx *= 0;
  }

  die() {
    this.dead = true;
    this.game.player.getScore(this.value);
    setTimeout(() => {
      const batArray = this.game.bats;
      const bat = this;
      const index = batArray.indexOf(bat);
      batArray.splice(index, 1);
    }, 500);
  }

  update() {
    this.count += 1;
    this.x += this.vx;
  }
}

class Ghost extends Mob {
  constructor(game) {
    super(game);
    this.value = 10;
    this.health = 250;
    this.dead = false;
    this.speed;
    this.y = this.getRandom(128, 224);
    this.ghost = new Image();
    this.ghost.src = './images/mobs/ghost.png';
    this.count = -1;
    this.ghostmovArray = [
      [0, 0],
      [37, 0],
      [74, 0],
      [111, 0],
      [148, 0],
      [185, 0],
      [222, 0],
      [259, 0],
      [296, 0],
      [333, 0],
      [370, 0],
      [407, 0]
    ];
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //37x45
  draw() {
    if (this.count < 12) {
      this.context.drawImage(
        this.ghost,
        this.ghostmovArray[this.count][0],
        this.ghostmovArray[this.count][1],
        37,
        45,
        this.x,
        this.y,
        29.6,
        36
      );
    } else if (this.dead) {
      this.context.drawImage(
        this.ghost,
        0,
        0,
        37,
        45,
        this.x,
        this.y,
        29.6,
        36
      );
    } else {
      this.count = -1;
    }
  }

  die() {
    this.dead = true;
    this.game.player.getScore(this.value);
    setTimeout(() => {
      const ghostArray = this.game.ghosts;
      const ghost = this;
      const index = ghostArray.indexOf(ghost);
      ghostArray.splice(index, 1);
    }, 500);
  }

  update() {
    this.count++;
    this.x += this.vx;
  }
}

class Knight extends Mob {
  constructor(game) {
    super(game);
    this.value = 10;
    this.health = 250;
    this.dead = false;
    this.speed;
    this.y = this.getRandom(128, 224);
    this.knight = new Image();
    this.knight.src = './images/mobs/knight_run.png';
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  draw() {
    this.context.drawImage(
      this.knight,
      0,
      0,
      96,
      64,
      this.x,
      this.y,
      115.2,
      76.8
    );
  }

  die() {
    this.dead = true;
    this.game.player.getScore(this.value);
    setTimeout(() => {
      const knightArray = this.game.knights;
      const knight = this;
      const index = knightArray.indexOf(knight);
      knightArray.splice(index, 1);
    }, 500);
  }

  update() {
    this.x += this.vx;
  }
}
