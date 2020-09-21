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
    scene: [preloadGame, titleScreen, Level1, Level2, Level3, Level4, Level5]
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
    this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, "noon");
    // Set its pivot to the top left corner
    this.sky.setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this.sky.setScrollFactor(0);
    this.text = new Text(this, 150, 200, 400, "Die Menschen haben sich auf die Planeten im Sonnensystem ausgebreitet. Bei einem Kampf um die Vorherrschaft in dem Sonnensystem wurde so viel Energie freigesetzt, das die Raumzeit verändert wurde. Ein Blitz traf Stellar und sie wurde Ohnmächtig. Nun ist sie gefangen in einer Raum-Zeitschleife. Um aus der Raum-Zeitschleife zu entkommen muss sie den Raum-Zeitkrümmer finden. Dieser wird im Jahr 3400 auf dem Planeten Merkur gebaut. Mit Hilfe dieses Raum-Zeitkrümmers kann sie aus der Raum-Zeitschleife entfliehen.")
    const startButton = this.add.text(300, 500, 'Start Game', { fill: '#0f0' });
    startButton.setInteractive();
    startButton.on('pointerdown', () => this.changeScene() );
  }

  changeScene() {
    this.scene.start('Level5');
  }


  update() {
  }
}


