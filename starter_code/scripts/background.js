//640x384
class Background {
    constructor(game) {
        this.height = game.height
        this.width = game.width
        this.context = game.context
        this.size = 32;
        this.grass = new Image();
        this.grass.src = './images/background/grass.png';
        this.dirt = new Image();
        this.dirt.src = './images/background/dirt.png';
  }
    paintMap() {
        for (let x=0; x < 20; x++) {
          for (let y=0; y < 12; y++) {
            this.context.drawImage(this.grass, 0, 128, 32, 32, x*32, y*32, 32, 32)         
          }
        }
        for (let x=0; x < 20; x++) {
          for (let y=4; y < 8; y++) {
            this.context.drawImage(this.dirt, 0, /*(Math.floor(Math.random() * 2) + 3) *this.size*/ 128, this.size, this.size, x*this.size, y*this.size, this.size, this.size) 
          } 
        }
    }
  }
