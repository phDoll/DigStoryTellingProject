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
    this.spikes = this.physics.add.staticGroup();



    new Platform(this, 12, 1, 0, 600)
    new Platform(this, 12, 1, 200, 550)
    new Platform(this, 12, 1, 300, 350)
    new Platform(this, 24, 1, 400, 100)
    new Platform(this, 1, 30, 630, 400)
    new Platform(this, 12, 1, 630, 600)
    new Platform(this, 20, 1, 880, 600)
    new Platform(this, 6, 1, 1120, 370)
    new Platform(this, 1, 20, 1180, 370)
    new Platform(this, 24, 1, 1180, 160)
    new Platform(this, 24, 1, 1180, 10)
    new Platform(this, 2, 1, 1240, 140)
    new Platform(this, 2, 1, 1360, 140)
    new Platform(this, 6, 1, 1800, 20)
    new Platform(this, 12, 1, 1200, 550)
    new Platform(this, 1, 1, 1400, 400)
    new Platform(this, 1, 1, 1550, 400)
    new Platform(this, 1, 1, 1700, 400)
    new Platform(this, 1, 1, 1900, 600)
    new Platform(this, 12, 1, 2200, 380)

    // Cage
    new Platform(this, 12, 1, 1900, 150)
    new Platform(this, 12, 1, 1900, 290)
    new Platform(this, 1, 12, 1900, 270)
    new Platform(this, 1, 12, 2010, 270)
    new Spikes(this, 6, 1910, 120)
    this.portal = this.physics.add.sprite(1980, 250, 'teleporter')
    this.physics.add.collider(this.portal, this.platforms)


    // Pipe Section
    new Platform(this, 2, 42, 2550, 600)
    new Platform(this, 2, 42, 2550, 80)
    new Spikes(this, 1, 2530, 200)
    new Spikes(this, 1, 2530, 220)

    new Platform(this, 2, 18, 2750, 600)
    new Platform(this, 2, 64, 2750, 300)
    new Spikes(this, 1, 2730, 240)
    new Spikes(this, 1, 2730, 260)

    new Platform(this, 32, 18, 2950, 600)
    new Platform(this, 2, 64, 2950, 340)
    new Spikes(this, 1, 2940, 310)

    new Spikes(this, 1, 400, 320)
    new Spikes(this, 2, 890, 570)
    new Spikes(this, 2, 1050, 570)
    new Spikes(this, 12, 1200, 30)

    // add player
    this.player = new Player(this, 'dude', 50, 350).getPlayer()
    // create an animation for the player
    this.cursor = new Cursor(this, this.player, -200, true, false, false)
    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();

    this.finish = this.physics.add.sprite(3150, 300, 'finish')
    this.physics.add.collider(this.finish, this.platforms)

    this.orb = this.physics.add.sprite(1850, -20, 'blue_ball')
    this.physics.add.overlap(this.player, this.portal, this.teleport, null, this);
    this.physics.add.overlap(this.player, this.orb, this.collectOrb, null, this);
    this.physics.add.overlap(this.player, this.finish, this.endGame, null, this);
    this.physics.add.collider(this.orb, this.platforms)




    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);
    this.npc = new NPC(this, 'dude', 250, 500).getNPC()
    this.physics.add.collider(this.npc, this.platforms);

    // this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);

    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, -600, 800 * 4, 600 * 2);

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
    this.player.y = 250
  }

  endGame() {
    this.changeLevel()
  }

  changeLevel() {
    this.scene.start('Level3');
  }

  checkGameOver() {
    if (this.player.y > 620 || this.gameOver) {
      this.gameOver = this.add.tileSprite( Math.floor(this.myCam.scrollX), 0, 800, 600, "noon");
      this.gameOver.setOrigin(0, 0);
      this.physics.pause();
      this.cursor.addRestart();
    }
  }


  update() {
    this.cursor.setUpMoves()
    let cursor = this.cursor.getCursor()

    if(this.player.x >= 230) {
      this.text = new Text(this, 50, 180, 250, 250, "Ah da ist ja das arme Ding gefangen in der Zeitschleife. Laufe zum Ende dieser Zeitlinie und du schaffst diesen Teil der Zeitschleife zu entkommen. Ach ja ich hab da etwas gehört, um die Zeitschleife endgültig zu verlassen, musst du den Raum-Zeitkrümmer finden. Der ist glaub ich auf dem Mars ca. 600 Jahre in der Zukunft, ich glaub nicht, dass du so lange warten willst.", 150)
    }

    if(this.hasOrb === true && cursor.shift.isDown) {

      this.player.x = this.player.x - 100
      this.hasOrb = false
    }
    this.checkGameOver()

    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.mountain.tilePositionX = this.myCam.scrollX * .3;
    this.mountain.tilePositionY = this.myCam.scrollY * .3;


  }
}