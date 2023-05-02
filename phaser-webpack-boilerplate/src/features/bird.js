const FLAP_VELOCITY = 300;
const OFFNOUNDS_THRESHOLD = 15; 

export default class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene,x ,y, texture);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.immovable = true;
        scene.input.keyboard.on("keydown-SPACE", this.flap, this);
        this.blocked = false;
    }


       
    flap(){
        this.body.velocity.y = -FLAP_VELOCITY;
      
      } 

      checkOffbounds (callback) {
        if(this.getBounds().top < 0 - OFFNOUNDS_THRESHOLD || this.getBounds().bottom > this.scene.config.height + OFFNOUNDS_THRESHOLD ) {
            callback();
        }
      }

      triggerLoseAnimation(endCallback) {
        this.setTint(0xFF0000)
        this.flap();
        this.blocked = true;
        //TIMER
        //const loseTimer = añadir como variable
        const loseTimer =this.scene.time.addEvent({
            delay: 2,
             callback: ()=> {
                this.checkLoseAnimation(loseTimer, endCallback);
        },
        loop: true
        
      });
        

        }

      checkLoseAnimation(timer, endCallback) {
        if(this.getBounds().top > this.scene.config.height) {
            timer.remove();
            endCallback();
        }

      }

    }