import FlappyBirdScene from "./flappy-bird-scene";

export default class MenuScene extends FlappyBirdScene {
    constructor(config) {
        super("MenuScene", config);
    }

    preload() {
        this.load.image("sky", "assets/sky.png");
    }

    create() {
        super.create();

        const playButtonCallbacks = {
            onClick: this.playButton_OnClick,
            onMouseEnter: this.anyButton_OnMouseEnter,
            onMouseExit: this.anyButton_OnMouseExit,
        }

        const scoreButtonCallbacks = {
            onClick: this.scoreButton_OnClick,
            onMouseEnter: this.anyButton_OnMouseEnter,
            onMouseExit: this.anyButton_OnMouseExit,
        }

        const mainMenu = {
            items: [
                {label: "Play", style: {sontSize: "32px", fill: "#FFF"}, ...playButtonCallbacks},
                {label: "Score", style: {sontSize: "32px", fill: "#FFF"}, ...scoreButtonCallbacks},
            ],


            fisrtItemPosition: {x: this.config.width / 2, y: this.config.height / 2},
            origin: {x: 0.5, y: 0.5},
            spacing: 45
        }
        this.showMenu(mainMenu);
    }

    playButton_OnClick() {
        this.scene.start("GameScene");
    }

    scoreButton_OnClick() {

    }

    anyButton_OnMouseExit(text) {
        text.setFill("#FFF");
    }

    anyButton_OnMouseEnter(text) {
        text.setFill("#FFF");
    }
}