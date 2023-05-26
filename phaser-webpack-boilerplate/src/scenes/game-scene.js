import Bird from "../features/bird";
import PipeSystem from "../features/pipes";
import Score from "../features/score";
import FlappyBirdScene from "./flappy-bird-scene";

export default class GameScene extends FlappyBirdScene {

    constructor(config) {
        super("GameScene", config);
      
        this.bird = null;
        this.pipeSystem = null;
        this.score = null;
        this.isGameOver = false;
        this.isPaused = false;
        this.birdCollision = null;
       


        console.log("this is a game scene");
    }

    preload() {
        
        this.load.spritesheet("bird", "assets/birdSprite.png", {frameWidth: 16, frameHeight: 16});
        this.load.image("pipe", "assets/pipe.png");
        this.load.image("pause_button", "assets/pause.png");
        
        }

        create() {

            super.create();

            this.bird = new Bird(this, 100,  this.config.height / 2, "bird" );

            this.layers.game.add(this.bird);

            this.pipeSystem = new PipeSystem(this,this.layers.game);
           
            this.birdCollision = this.physics.add.collider(this.bird, this.pipeSystem.group, this.gameOver, null, this);

            this.score = new Score(this, 16, 16, this.layers.ui);
            this.pauseButton = this.add.image(this.config.width - 10, 10, "pause_button") //Se ancla en la parte derecha del boton
            .setOrigin(1,0)
            .setScale(2)
            .setInteractive();

            this.pauseButton.on("pointerup", this.pause, this); //Evento pointerup 
        

            this.pipeSystem.onPipeExited = ()=> {
                this.score.addScore(1);
            }

            
            this.isGameOver = false;
            this.isPaused = false;

            this.pipeSystem.start();          

          } 
          
           update(time, delta) {
            if(this.isGameOver || this.isPaused) return;

            this.pipeSystem.update();
            this.bird.checkOffbounds(() => {
                this.gameOver();
            });
           }
          
            gameOver() {
                this.pipeSystem.stop();
                this.birdCollision.destroy();
                this.isGameOver = true;
                this.pauseButton.setVisible(false);
                this.layers.game.bringToTop(this.bird);
                this.bird.triggerLoseAnimation(()=> {
                    this.score.checkHighScore();
                    this.scene.restart();
                })
                
          }

          pause() {
            this.physics.pause();
            this.pipeSystem.pause();
            this.isPaused = true;
            this.pauseButton.setVisible(false);

            const continueButtonCallbacks = {
                onClick: this.resume,
                onMouseEnter: text => text.setFill("#0F0"),
                onMouseExit: text => text.setFill("#FFF"),
                }

            const quitButtonCallbacks = {
                onClick: this.quitGame,
                onMouseEnter: text => text.setFill("#F00"),
                onMouseExit: text => text.setFill("#FFF"),
                }

                

        const pauseMenu = {
            items: [
                {label: "Continue", style: {sontSize: "32px", fill: "#FFF"}, ...continueButtonCallbacks},
                {label: "Quit", style: {sontSize: "32px", fill: "#FFF"}, ...quitButtonCallbacks},
            ],


            fisrtItemPosition: {x: this.config.width / 2, y: this.config.height / 2},
            origin: {x: 0.5, y: 0.5},
            spacing: 45
            }

            this.showMenu(pauseMenu);
          }

          resume() {
            this.physics.resume();
            this.pipeSystem.resume();
            this.isPaused = false;
            this.pauseButton.setVisible(true);
            this.hideMenu();
          }

          quitGame() {
            this.scene.start("MenuScene")
          }
        }      