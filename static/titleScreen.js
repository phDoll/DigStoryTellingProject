import preloadGame from './preloadGame.js'
import Platform from './platform.js'
import Block from './block.js'
import Spikes from './spikes.js'
import Text from './text.js'
import Player from "./player.js"
import Cursor from './cursor.js'
import NPC from './npc.js'
import Level2 from './level2.js'
import Level1 from './level1.js'
import Level3 from './level3.js'
import Level4 from './level4.js'
import Level5 from './level5.js'
import storyScreen from './storyScreen.js'
var game;
window.onload = function(){
  let gameConfig = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
          gravity: {
            y: 400
          }
      }
    },
    scene: [preloadGame, titleScreen, storyScreen, Level1, Level2, Level3, Level4, Level5]
  }
  game = new Phaser.Game(gameConfig);
}

export default class titleScreen extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }
  create() {
    this.gameOver = false
    // create an tiled sprite with the size of our game screen
    this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, "menu_background");
    // Set its pivot to the top left corner
    this.background.setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this.background.setScrollFactor(0);

    this.headline = this.add.text(100, 100, 'Stellars Time Quest', { fontFamily: 'DogicaRegular', fontSize: 32, fill: '#289900', align: 'center', border: "1px solid red"});
    this.walkRight = this.add.text(80, 250, 'Walk Right: >', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center', border: "1px solid red"});
    this.walkLeft = this.add.text(80, 300, 'Walk Left: <', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center', border: "1px solid red"});
    this.jump = this.add.text(80, 350, 'Jump: ^', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center', border: "1px solid red"});
    this.doubleJump = this.add.text(80, 400, 'Double Jump: ^ ^', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center', border: "1px solid red"});
    this.useOrb = this.add.text(450, 250, 'Use Orb: Shift', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center', border: "1px solid red"});
    this.sprint = this.add.text(450, 300, 'Sprint: Space', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center', border: "1px solid red"});
    this.shield = this.add.text(450, 350, 'Shild: X', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center', border: "1px solid red"});
    this.Weapon = this.add.text(450, 400, 'Weapon: Z', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center', border: "1px solid red"});

    // this.text = new Text(this, 150, 200, 400, 250, "Die Menschen haben sich auf die Planeten im Sonnensystem ausgebreitet. Bei einem Kampf um die Vorherrschaft in dem Sonnensystem wurde so viel Energie freigesetzt, das die Raumzeit verändert wurde. Ein Blitz traf Stellar und sie wurde Ohnmächtig. Nun ist sie gefangen in einer Raum-Zeitschleife. Um aus der Raum-Zeitschleife zu entkommen muss sie den Raum-Zeitkrümmer finden. Dieser wird im Jahr 3400 auf dem Planeten Merkur gebaut. Mit Hilfe dieses Raum-Zeitkrümmers kann sie aus der Raum-Zeitschleife entfliehen.", 0, 10)
    this.startButton = this.add.text(200, 500, '- Start Game -', { fontFamily: 'DogicaRegular', fontSize: 26, fill: '#ed3621', align: 'center', border: "1px solid red"});
    this.startButton.setInteractive();
    this.startButton.on('pointerdown', () => this.changeScene() );
    this.startButton.on('pointerover', () => this.enterHoverState() );
    this.startButton.on('pointerout', () => this.enterRestState() );
  }

  changeScene() {
    this.scene.start('storyScreen');
  }

  enterHoverState() {
    this.startButton.setStyle({fill: "#289900"})
  }

  enterRestState() {
    this.startButton.setStyle({fill: "#ed3621"})
  }


  update() {
  }
}


