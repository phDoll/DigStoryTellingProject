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
import endScreen from './endScreen.js'
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
          },
          fps: 20

      }
    },
    scene: [preloadGame, titleScreen, storyScreen, Level1, Level2, Level3, Level4, Level5, endScreen],
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

    this.headline = this.add.text(100, 100, 'Stellars Time Quest', { fontFamily: 'DogicaRegular', fontSize: 32, fill: '#289900', align: 'center'});
    this.walkRight = this.add.text(80, 250, 'Walk Right: >', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center'});
    this.walkLeft = this.add.text(80, 300, 'Walk Left: <', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center'});
    this.jump = this.add.text(80, 350, 'Jump: ^', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center'});
    this.doubleJump = this.add.text(80, 400, 'Double Jump: ^ ^', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center'});
    this.useOrb = this.add.text(450, 250, 'Use Orb: Shift', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center'});
    this.sprint = this.add.text(450, 300, 'Sprint: Space', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center'});
    this.shield = this.add.text(450, 350, 'Shild: X', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center'});
    this.Weapon = this.add.text(450, 400, 'Weapon: Z', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center'});

    this.level1Button = this.add.text(50, 460, ' Level 1 ', { fontFamily: 'DogicaRegular', fontSize: 14, fill: '#ed3621', align: 'center'});
    this.level1Button.setInteractive();
    this.level1Button.on('pointerdown', () => this.changeScene('Level1') );
    this.level1Button.on('pointerover', () => this.enterHoverState(this.level1Button) );
    this.level1Button.on('pointerout', () => this.enterRestState(this.level1Button) );

    this.level2Button = this.add.text(190, 460, ' Level 2 ', { fontFamily: 'DogicaRegular', fontSize: 14, fill: '#ed3621', align: 'center'});
    this.level2Button.setInteractive();
    this.level2Button.on('pointerdown', () => this.changeScene('Level2') );
    this.level2Button.on('pointerover', () => this.enterHoverState(this.level2Button) );
    this.level2Button.on('pointerout', () => this.enterRestState(this.level2Button) );


    this.level3Button = this.add.text(330, 460, ' Level 3 ', { fontFamily: 'DogicaRegular', fontSize: 14, fill: '#ed3621', align: 'center'});
    this.level3Button.setInteractive();
    this.level3Button.on('pointerdown', () => this.changeScene('Level3') );
    this.level3Button.on('pointerover', () => this.enterHoverState(this.level3Button) );
    this.level3Button.on('pointerout', () => this.enterRestState(this.level3Button) );


    this.level4Button = this.add.text(470, 460, ' Level 4 ', { fontFamily: 'DogicaRegular', fontSize: 14, fill: '#ed3621', align: 'center'});
    this.level4Button.setInteractive();
    this.level4Button.on('pointerdown', () => this.changeScene('Level4') );
    this.level4Button.on('pointerover', () => this.enterHoverState(this.level4Button) );
    this.level4Button.on('pointerout', () => this.enterRestState(this.level4Button) );


    this.level5Button = this.add.text(610, 460, ' Level 5 ', { fontFamily: 'DogicaRegular', fontSize: 14, fill: '#ed3621', align: 'center'});
    this.level5Button.setInteractive();
    this.level5Button.on('pointerdown', () => this.changeScene('Level5') );
    this.level5Button.on('pointerover', () => this.enterHoverState(this.level5Button) );
    this.level5Button.on('pointerout', () => this.enterRestState(this.level5Button) );

    // this.text = new Text(this, 150, 200, 400, 250, "Die Menschen haben sich auf die Planeten im Sonnensystem ausgebreitet. Bei einem Kampf um die Vorherrschaft in dem Sonnensystem wurde so viel Energie freigesetzt, das die Raumzeit verändert wurde. Ein Blitz traf Stellar und sie wurde Ohnmächtig. Nun ist sie gefangen in einer Raum-Zeitschleife. Um aus der Raum-Zeitschleife zu entkommen muss sie den Raum-Zeitkrümmer finden. Dieser wird im Jahr 3400 auf dem Planeten Merkur gebaut. Mit Hilfe dieses Raum-Zeitkrümmers kann sie aus der Raum-Zeitschleife entfliehen.", 0, 10)
    this.startButton = this.add.text(200, 520, '- Play Story -', { fontFamily: 'DogicaRegular', fontSize: 26, fill: '#ed3621', align: 'center'});
    this.startButton.setInteractive();
    this.startButton.on('pointerdown', () => this.changeScene("storyScreen") );
    this.startButton.on('pointerover', () => this.enterHoverState(this.startButton) );
    this.startButton.on('pointerout', () => this.enterRestState(this.startButton) );

    var frameNames = this.textures.get('stellar2').getFrameNames();
    console.log(frameNames);
  }

  changeScene(scene) {
    var audio = new Audio('static/assets/space_theme_song.wav');
    audio.play();
    audio.volume = 0.1
    audio.loop = true
    this.scene.start(scene);
  }

  enterHoverState(button) {
    button.setStyle({fill: "#289900"})
  }

  enterRestState(button) {
    button.setStyle({fill: "#ed3621"})
  }


  update() {
  }
}


