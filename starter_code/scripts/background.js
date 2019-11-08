//640x384
class Background {
  constructor(game) {
    this.height = game.height;
    this.width = game.width;
    this.context = game.context;
    this.size = 32;
    this.grass = new Image();
    this.grass.src = './images/background/grass.png';
    this.dirt = new Image();
    this.dirt.src = './images/background/dirt.png';
    this.house = new Image();
    this.house.src = './images/background/house.png';
    this.lake = new Image();
    this.lake.src = './images/background/lake.png';
    this.treasure = new Image();
    this.treasure.src = './images/background/treasure.png';
    this.tree = new Image();
    this.tree.src = './images/background/tree.png';
    this.rock = new Image();
    this.rock.src = './images/background/rock.png';
    this.rod = new Image();
    this.rod.src = './images/background/rod.png';
  }
  paintMap() {
    for (let x = 0; x < 20; x++) {
      for (let y = 0; y < 12; y++) {
        this.context.drawImage(this.grass, 0, 128, 32, 32, x * 32, y * 32, 32, 32);
      }
    }
    for (let x = 0; x < 20; x++) {
      for (let y = 4; y < 8; y++) {
        this.context.drawImage(this.dirt, 0, /*(Math.floor(Math.random() * 2) + 3) *this.size*/ 128, this.size, this.size, x * this.size, y * this.size, this.size, this.size);
      }
    }
    this.context.drawImage(this.house, 30, 30, 42, 52.8);
    this.context.drawImage(this.lake, 400, 320, 55, 39);
    this.context.drawImage(this.treasure, 100, 320, 25, 21);
    this.context.drawImage(this.treasure, 200, 20, 25, 21);
    this.context.drawImage(this.tree, 90, 20, 53, 74);
    this.context.drawImage(this.tree, 470, 20, 53, 74);
    //this.context.drawImage(this.tree, 490, 310, 53, 74);
    this.context.drawImage(this.rock, 40, 295, 26, 15);
    this.context.drawImage(this.rock, 590, 320, 26, 15);
    this.context.drawImage(this.rod, 460, 320, 14, 33);
  }
}
