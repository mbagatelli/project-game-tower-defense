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
    this.health = 30;
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
    this.health = 50;
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
    this.health = 300;
    this.dead = false;
    this.speed;
    this.y = 140;
    this.skel = new Image();
    this.skel.src = './images/mobs/skel_walk.png';
    this.skelDead = new Image();
    this.skelDead.src = './images/mobs/skel_dead.png';
    this.count = -1;
    this.countDead = 0;
    this.skelMovArray = [[0, 0], [23, 0], [45, 0], [67, 0], [89, 0], [111, 0], [133, 0], [155, 0], [177, 0], [199, 0], [221, 0], [243, 0], [265, 0]];
    this.skelDeadArray = [[0, 0], [33, 0], [66, 0], [99, 0], [132, 0], [165, 0], [198, 0], [231, 0], [264, 0], [297, 0], [330, 0], [363, 0], [396, 0], [429, 0], [462, 0]];
  }
  //22x33
  draw() {
    if (this.count < 13) {
      this.context.drawImage(this.skel, this.skelMovArray[this.count][0], this.skelMovArray[this.count][1], 21, 33, this.x, this.y, 52.5, 82.5);
    } else if (this.dead) {
      this.drawDeath();
    } else {
      this.count = -1;
    }
  }

  drawDeath() {
    if (this.countDead < 15) {
      this.context.drawImage(this.skelDead, this.skelDeadArray[this.countDead][0], this.skelDeadArray[this.countDead][1], 33, 31, this.x, this.y, 52.5, 85.5);
      this.vx *= 0;
    }
  }
}

class Worm extends Mob {
  constructor(game) {
    super(game);
    this.value = 30;
    this.y = 340;
    this.x = -400;
    this.worm = new Image();
    this.worm.src = './images/mobs/worm.png';
    this.count = -1;
    this.sprite = 16;
    this.wormMovArray = [
      [0, 0],
      [0, 0],
      [0, 0],
      [16, 0],
      [16, 0],
      [16, 0],
      [32, 0],
      [32, 0],
      [32, 0],
      [48, 0],
      [48, 0],
      [48, 0],
      [64, 0],
      [64, 0],
      [64, 0],
      [80, 0],
      [80, 0],
      [80, 0],
      [96, 0],
      [96, 0],
      [96, 0],
      [112, 0],
      [112, 0],
      [112, 0],
      [this.sprite * 30, 0],
      [this.sprite * 30, 0],
      [this.sprite * 30, 0]
      /*       [this.sprite * 31, 0],
      [this.sprite * 31, 0],
      [this.sprite * 31, 0] */
    ];
  }
  //22x33
  draw() {
    if (this.count < 27) {
      this.context.drawImage(this.worm, this.wormMovArray[this.count][0], this.wormMovArray[this.count][1], 16, 24, this.x, this.y, 16, 24);
    } else if (this.dead) {
      this.drawDeath();
    } else {
      this.count = 0;
    }
  }

  drawDeath() {
    if (this.countDead < 15) {
      this.context.drawImage(this.skelDead, this.skelDeadArray[this.countDead][0], this.skelDeadArray[this.countDead][1], 33, 31, this.x, this.y, 52.5, 85.5);
      this.vx *= 0;
    }
  }
}

class Fox extends Mob {
  constructor(game) {
    super(game);
    this.speed;
    this.x = -10;
    this.y = 77;
    this.count = -1;
    this.fox = new Image();
    this.fox.src = './images/mobs/fox.png';
    this.foxmovArray = [[0, 0], [0, 0], [0, 0], [24, 0], [24, 0], [24, 0], [48, 0], [48, 0], [48, 0], [72, 0], [72, 0], [72, 0], [96, 0], [96, 0], [96, 0], [120, 0], [120, 0], [120, 0]];
  }

  //37x45
  draw() {
    if (this.count < 18) {
      this.context.drawImage(this.fox, this.foxmovArray[this.count][0], this.foxmovArray[this.count][1], 24, 24, this.x, this.y, 24, 24);
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

class Sensei extends Mob {
  constructor(game) {
    super(game);
    this.speed;
    this.x = -50;
    this.y = 70;
    this.sensei = new Image();
    this.sensei.src = './images/mobs/sensei.png';
  }

  //37x45
  draw() {
    this.context.drawImage(this.sensei, this.x, 70, 16, 23);
  }

  drawDeath() {
    this.vx *= 0;
  }
}
