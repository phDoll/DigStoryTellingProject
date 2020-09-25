import Platform from './platform.js'
import NPC from './npc.js'
import Text from './text.js'
export default class storyScreen extends Phaser.Scene {
  constructor() {
    super("storyScreen");
  }
  create() {
    this.gameOver = false
    // create an tiled sprite with the size of our game screen
    this.background = this.add.tileSprite(0, 0, 800, 600, "jupiter");
    // Set its pivot to the top left corner
    this.background.setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this.background.setScrollFactor(0);
    this.platforms = this.physics.add.staticGroup();
    new Platform(this, 80, 2, 0, 0, 'platform_level_1', true)

    this.npc = new NPC(this, 'beaver_standing', 50, 570).getNPC()
    this.npc.body.allowGravity = false


    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, 800, 600);
    this.startButton = this.add.text(500, 500, '- Continue -', { fontFamily: 'DogicaRegular', fontSize: 22, fill: '#ffffff', align: 'center', border: "1px solid red"});
    this.startButton.setInteractive();
    this.startButton.on('pointerdown', () => this.changeScene() );
    this.startButton.on('pointerover', () => this.enterHoverState() );
    this.startButton.on('pointerout', () => this.enterRestState() );
  }

  changeScene() {
    this.scene.start('Level5');
  }

  enterHoverState() {
    this.startButton.setStyle({fill: "#289900"})
  }

  enterRestState() {
    this.startButton.setStyle({fill: "#ffffff"})
  }


  update() {
    this.text = new Text(this, 50, 50, 600, 400, "Die Menschen haben sich auf die Planeten im Sonnensystem ausgebreitet. Bei einem Kampf um die Vorherrschaft in dem Sonnensystem wurde so viel Energie freigesetzt, das die Raumzeit verändert wurde. Ein Blitz traf Stellar und sie wurde Ohnmächtig. Nun ist sie gefangen in einer Raum-Zeitschleife. Um aus der Raum-Zeitschleife zu entkommen, muss sie den Raum-Zeitkrümmer finden. Dieser wird im Jahr 3400 auf dem Planeten Merkur gebaut. Mit Hilfe dieses Raum-Zeitkrümmers kann sie aus der Raum-Zeitschleife entfliehen.", 0, 16)
  }
}