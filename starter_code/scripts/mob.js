class Mob {
    constructor(game) {
      this.height = game.height;
      this.width = game.width;
      this.context = game.context;
      this.x = 0;
      this.vx = 1;
      this.size = 32;
    }

/*     update() {
      this.x += this.vx;
    } */
}

class Bat extends Mob {
  constructor(game) {
    super (game);
    this.health = 100;
    this.speed;
    this.img = new Image();
    this.img.src = './images/bat/bat_right.png';
  }

  draw() {
    this.context.drawImage(this.img, 0, 0, 44, 44, this.x, 150, this.size, this.size);
  }

/*   life() {
    this.health = 100;
  } */

  damageTaken(damage) {
    if (this.health > 0) {
      this.health -= damage
    } else if (this.health <= 0) {
      this.death();
    }
  }

  death() {
    console.log('dead')
      //animation of death
    }
  
  update() {
    //console.log(this.x)
    this.x += this.vx
  }
}
      
