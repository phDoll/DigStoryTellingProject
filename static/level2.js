import preloadGame from './preloadGame.js'
import Platform from './platform.js'
import Block from './block.js'
import Ground from './ground.js'
import Spikes from './spikes.js'
import Text from './text.js'
import Player from "./player.js"
import Cursor from './cursor.js'
import NPC from './npc.js'
export default class Level2 extends Phaser.Scene {
  constructor() {
    super("Level2");
    this.hasOrb = false
  }
  create() {
    this.gameOver = false
    // create an tiled sprite with the size of our game screen
    this.mountain = this.add.tileSprite(0, 0, 800, 600, "sky");
    // Set its pivot to the top left corner
    this.mountain.setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this.mountain.setScrollFactor(0);

    this.platforms = this.physics.add.staticGroup();

    new Ground(this, 8, 0, 600)

    // add player
    this.player = new Player(this, 'dude', 50, 300).getPlayer()
    // create an animation for the player
    this.cursor = new Cursor(this, this.player)
    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();


    this.physics.add.collider(this.player, this.platforms);
    // this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);

    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, -600, 800 * 10, 600 * 2);

    // making the camera follow the player
    this.myCam.startFollow(this.player);

  }

  hitSpike() {
    this.gameOver = true
  }

  collectOrb() {
    this.orb.disableBody(true, true)
    this.hasOrb = true
  }

  teleport() {
    this.player.x = 3100
    this.player.y = 550
  }

  endGame() {
    // console.log("test")
    this.changeLevel()
    // this.scene.scene.stop()
  }

  changeLevel() {

  }

  checkGameOver() {
    if (this.player.y > 620 || this.gameOver) {
      this.gameOver = this.add.tileSprite( Math.floor(this.myCam.scrollX), 0, game.config.width, game.config.height, "noon");
      this.gameOver.setOrigin(0, 0);
      this.physics.pause();
      this.cursor.addRestart();
    }
  }


  update() {
    this.cursor.setUpMoves()
    let cursor = this.cursor.getCursor()

    if(this.hasOrb === true && cursor.left.isDown) {

      this.player.x = this.player.x - 100
      this.hasOrb = false
    }
    this.checkGameOver()

    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.mountain.tilePositionX = this.myCam.scrollX * .3;
    this.mountain.tilePositionY = this.myCam.scrollY * .3;


  }
}