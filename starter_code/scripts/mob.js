class Mob {
  constructor(game) {
    this.game = game;
    this.height = game.height;
    this.width = game.width;
    this.context = game.context;
    this.x = 0;
    this.vx = 1;
    this.size = 44;
    this.countDead = 0;
  }

  damageTaken(x, health, damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.drawDeath();
    }
  }

  die() {
    this.dead = true;
    this.game.player.getScore(this.value);
    setTimeout(() => {
      const enemyArray = this.game.enemies;
      const enemy = this;
      const index = enemyArray.indexOf(enemy);
      enemyArray.splice(index, 1);
    }, 500);
  }

  update() {
    if (this.dead) {
      this.countDead++;
    }
    this.count++;
    this.x += this.vx;
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    this.bat.src = './images/mobs/bat_big.png';
    this.count = -1;
    this.batmovArray = [[0, 0], [44, 0], [88, 0], [132, 0], [176, 0], [220, 0], [264, 0], [308, 0], [352, 0], [396, 0], [440, 0], [484, 0]];
  }

  draw() {
    if (this.count < 12) {
      this.context.drawImage(this.bat, this.batmovArray[this.count][0], this.batmovArray[this.count][1], 44, 44, this.x, this.y, this.size, this.size);
    } else if (this.dead) {
      this.drawDeath();
      //this.context.drawImage(this.bat, 528, 0, 44, 44, this.x, this.y, 44, 44);
    } else {
      this.count = -1;
    }
  }

  drawDeath() {
    this.context.drawImage(this.bat, 528, 0, 44, 44, this.x, this.y, 44, 44);
    this.vx *= 0;
  }
}

class Ghost extends Mob {
  constructor(game) {
    super(game);
    this.value = 10;
    this.health = 50;
    this.dead = false;
    this.speed;
    this.y = this.getRandom(128, 224);
    this.ghost = new Image();
    this.ghost.src = './images/mobs/ghost.png';
    this.ghostDead = new Image();
    this.ghostDead.src = './images/mobs/ghost_dead.png';
    this.count = -1;
    this.ghostmovArray = [[0, 0], [37, 0], [74, 0], [111, 0], [148, 0], [185, 0], [222, 0], [259, 0], [296, 0], [333, 0], [370, 0], [407, 0]];
    this.ghostDeadArray = [[0, 0], [37, 0], [74, 0], [111, 0], [148, 0], [185, 0], [222, 0], [259, 0], [296, 0], [333, 0], [370, 0], [407, 0], [444, 0]];
  }

  //37x45
  draw() {
    if (this.count < 12) {
      this.context.drawImage(this.ghost, this.ghostmovArray[this.count][0], this.ghostmovArray[this.count][1], 37, 45, this.x, this.y, 29.6, 36);
    } else if (this.dead) {
      this.drawDeath();
    } else {
      this.count = -1;
    }
  }

  drawDeath() {
    if (this.countDead < 13) {
      this.context.drawImage(this.ghostDead, this.ghostDeadArray[this.countDead][0], this.ghostDeadArray[this.countDead][1], 37, 45, this.x, this.y, 29.6, 36);
      this.vx *= 0;
    }
  }
}

class Knight extends Mob {
  constructor(game) {
    super(game);
    this.value = 10;
    this.health = 30;
    this.dead = false;
    this.speed;
    this.y = this.getRandom(128, 224);
    this.knight = new Image();
    this.knight.src = './images/mobs/knight_run.png';
  }

  draw() {
    this.context.drawImage(this.knight, 0, 0, 96, 64, this.x, this.y, 115.2, 76.8);
  }

  drawDeath() {
    this.vx *= 0;
  }
}

class Skel extends Mob {
  constructor(game) {
    super(game);
    this.value = 30;
    this.health = 500;
    this.dead = false;
    this.speed;
    this.y = 140;
    this.skel = new Image();
    this.skel.src = './images/mobs/skel_walk.png';
    // this.ghostDead = new Image();
    //this.ghostDead.src = './images/mobs/ghost_dead.png';
    this.count = -1;
    //this.countDead = 0;
    this.skelMovArray = [[0, 0], [22, 0], [44, 0], [66, 0], [88, 0], [110, 0], [132, 0], [154, 0], [176, 0], [198, 0], [220, 0], [242, 0], [264, 0]];
    //this.ghostDeadArray = [[0, 0], [37, 0], [74, 0], [111, 0], [148, 0], [185, 0], [222, 0], [259, 0], [296, 0], [333, 0], [370, 0], [407, 0], [444, 0]];
  }
  //22x33
  draw() {
    if (this.count < 13) {
      this.context.drawImage(this.skel, this.skelMovArray[this.count][0], this.skelMovArray[this.count][1], 22, 33, this.x, this.y, 61.6, 100.8);
    } else if (this.dead) {
      this.drawDeath();
    } else {
      this.count = -1;
    }
  }

  drawDeath() {
    //if (this.countDead < 13) {
    //this.context.drawImage(this.ghostDead, this.ghostDeadArray[this.countDead][0], this.ghostDeadArray[this.countDead][1], 37, 45, this.x, this.y, 29.6, 36);
    this.vx *= 0;
  }
}
