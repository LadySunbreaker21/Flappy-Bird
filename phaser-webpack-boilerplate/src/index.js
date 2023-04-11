
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {y: 300} 
    }
  },
  scene:{
    preload,
    create,
    update,
  }
}

var bird = null;
var flapVelocity = 200;
var pipeSpawnTime = 3000;
var elapsed = 0;
var pipes = null;

function preload() {
this.load.image("sky" , "assets/sky.png");
this.load.image("bird", "assets/bird.png");
this.load.image("pipe", "assets/pipe.png");

}

function create() {
  console.log("this");
  // this.add.image(config.width / 2, config.height / 2, "sky");

  //BIRD
  this.add.image(0, 0, "sky").setOrigin(0,0);
  bird = this.add.sprite(200,  config.height / 2, "bird" );
  this.physics.add.existing(bird)
  this.input.keyboard.on("keydown-SPACE", flap);

  pipes = this.physics.add.group ( {
    allowGravity: false,
    immovable: true
  });
 
  this.physics.add.collider(bird, pipes, gameOver, null, this);
  bird.body.setCollideWorldBounds(true);

} 


function update(time, delta) {
  elapsed += delta;
  if(elapsed >= pipeSpawnTime) {
    spawnPipe();
    elapsed = 0;
  }
}

  
function flap(){
  bird.body.velocity.y = -flapVelocity;

} 

function spawnPipe() {
  var yPos = Phaser.Math.Between(50, 350);
  var gap = Phaser.Math.Between(100, 200);
  var upper = pipes.create(config.width, yPos, "pipe").setOrigin(0, 1);
  var lower = pipes.create(config.width, yPos + gap, "pipe").setOrigin(0);

  upper.body.velocity.x= -150;
  lower.body.velocity.x= -150;

}

function gameOver() {
  alert("You lose");
  this.scene.restart();
}

 
new Phaser.Game(config);

