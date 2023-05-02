
import Phaser from "phaser";
import GameScene from "./scenes/game-scene";
import MenuScene from "./scenes/menu-scene";

const GLOBAL_CONFIG = {
  width: 800,
  height: 600,
}

const config = {
  type: Phaser.AUTO,
  ...GLOBAL_CONFIG,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {y: 300} 
    }
  },
  scene:[
    new MenuScene(GLOBAL_CONFIG),
    new GameScene(GLOBAL_CONFIG)
  ]
}

 
new Phaser.Game(config);

