class Game {
    constructor($canvas) {
      this.$canvas = $canvas;
      this.context = this.$canvas.getContext('2d');
      this.width = $canvas.width;
      this.height = $canvas.height
      this.background = new Background(this);
      this.mob = new Mob(this);
      this.bat = new Bat(this);
      this.tower = new Towers(this);
      this.mageTower = new MageTower(this);
      this.cannonTower = new CannonTower(this);
      this.speed = 10;
      this.mobTimer = 0;
    }
  
    clear () {
      this.context.clearRect(0, 0, 640, 384)
    }

    start() {
      this.animation();
    }

    animation(timestamp) {
      this.drawEverything()
      this.updateEverything(timestamp)
      window.requestAnimationFrame((timestamp) => this.animation(timestamp));
    }

    drawEverything() {
      //this.clear ();
      this.background.paintMap();
      this.bat.draw();  
      this.mageTower.draw();
      this.cannonTower.draw();
      //make width for attack
      this.context.fillStyle = 'red';
      this.context.fillRect(140, 130, 120, 10);
      this.context.fillRect(140, 130, 10, 100);
      this.context.fillRect(260, 130, 10, 100);
      console.log(this.bat.health)
      this.attack()
    }
    //tower will attack if the mob is between the x coords of 140 and 260
    attack() {
      if (this.bat.x >= 140 && this.bat.x <= 260) {
        this.bat.damageTaken(this.mageTower.damage)
      }
    }

    updateEverything(timestamp) {
      if(this.mobTimer < timestamp - this.speed){
        this.bat.update();
        this.mobTimer = timestamp
      }
    }
  }