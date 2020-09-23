import preloadGame from './preloadGame.js'
import Platform from './platform.js'
import Block from './block.js'
import Ground from './ground.js'
import Spikes from './spikes.js'
import Text from './text.js'
import Player from "./player.js"
import Cursor from './cursor.js'
import NPC from './npc.js'
export default class Level3 extends Phaser.Scene {
  constructor() {
    super("Level3");
    this.hasOrb = false
    this.firstStage = 0
    this.thirdStage = 0
  }
  create() {
    this.gameOver = false
    // create an tiled sprite with the size of our game screen
    this.background = this.add.tileSprite(0, 0, 3200, 1200, "jupiter");
    // Set its pivot to the top left corner
    this.background.setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this.background.setScrollFactor(0);

    this.platforms = this.physics.add.staticGroup();
    this.spikes = this.physics.add.staticGroup();

    // World Bounds
    new Platform(this, 320, 1, 0, 600, 'platform_level_2')
    new Platform(this, 2, 80, -20, 600, 'platform_level_2')
    new Platform(this, 1, 80, 3200, 600, 'platform_level_2')
    new Platform(this, 320, 1, 0, 0, 'platform_level_2')

    // First Room
    new Platform(this, 2, 80, 500, 520, 'platform_level_2')
    new Platform(this, 2, 80, 1000, 520, 'platform_level_2')

    // Second Room
    new Platform(this, 2, 80, 2000, 520, 'platform_level_2')
    new Platform(this, 1, 1, 1100, 400, 'platform_level_2')
    new Platform(this, 1, 1, 1400, 400, 'platform_level_2')
    new Platform(this, 1, 1, 1600, 550, 'platform_level_2')
    new Platform(this, 1, 1, 1700, 200, 'platform_level_2')
    new Platform(this, 12, 1, 1750, 300, 'platform_level_2')
    new Platform(this, 1, 8, 1800, 100, 'platform_level_2')
    new Spikes(this, 80, 0, 1100, 597, 'spike')
    new Spikes(this, 6, 0, 1760, 297, 'spike')
    new Spikes(this, 1, 8, 1997, 500, 'spike_flipped')

    // Thrid Room
    new Platform(this, 2, 80, 3000, 520, 'platform_level_2')
    new Platform(this, 1, 8, 2200, 600, 'platform_level_2')
    new Platform(this, 20, 1, 2400, 300, 'platform_level_2')
    new Platform(this, 1, 8, 2600, 600, 'platform_level_2')
    new Spikes(this, 3, 0, 2550, 597, 'spike')

    new Spikes(this, 200, 0, 0, 3, 'spike_turned')

    // add player
    this.player = new Player(this, 'dude', 50, 1150).getPlayer()
    // create an animation for the player
    this.cursor = new Cursor(this, this.player, -250, true, true, false)
    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();

    this.finish = this.physics.add.sprite(3150, 900, 'finish')
    this.physics.add.collider(this.finish, this.platforms)

    this.physics.add.overlap(this.player, this.portal, this.teleport, null, this);
    this.physics.add.overlap(this.player, this.finish, this.endGame, null, this);


    // Bombs
    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);
    this.npc = new NPC(this, 'beaver', 250, 1180).getNPC()
    this.npc.body.allowGravity = false


    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, 800 * 4, 600 * 2);

    // making the camera follow the player
    this.myCam.startFollow(this.player);

  }

  hitSpike() {
    this.firstStage = 0
    this.thirdStage = 0
    this.gameOver = true
  }

  collectOrb() {
    this.hasOrb = true
  }

  teleport() {
    this.player.x = 3100
    this.player.y = 1150
  }

  endGame() {
    this.changeLevel()
  }

  changeLevel() {
    this.scene.start('Level4');
  }

  hitBomb() {
    this.firstStage = 0
    this.thirdStage = 0
    this.gameOver = true
  }

  checkGameOver() {
    if (this.player.y > 1220 || this.gameOver) {
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
      this.text = new Text(this, 200, 850, 250, 250, "Ah da ist ja das arme Ding gefangen in der Zeitschleife. Laufe zum Ende dieser Zeitlinie und du schaffst diesen Teil der Zeitschleife zu entkommen. Ach ja ich hab da etwas gehört, um die Zeitschleife endgültig zu verlassen, musst du den Raum-Zeitkrümmer finden. Der ist glaub ich auf dem Mars ca. 600 Jahre in der Zukunft, ich glaub nicht, dass du so lange warten willst.", 0)
    }

    if(this.hasOrb === true && cursor.shift.isDown) {

      this.player.x = this.player.x - 100
      this.hasOrb = false
    }
    this.checkGameOver()

    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.background.tilePositionX = this.myCam.scrollX * .3;
    this.background.tilePositionY = this.myCam.scrollY;


    if (this.player.x > 500 && this.player.x < 900 && this.firstStage === 0) {
      this.firstStage = 1
      let x = 510;
      let step = 40;
      for(let i = 0; i <= 10; i++) {
        x = x + step
        var bomb = this.bombs.create(x, 650, 'bomb');
        bomb.setBounce(1);
        bomb.setVelocity(0, 200);
      }
    }

    if (this.player.x > 2000 && this.player.x < 3000 && this.thirdStage === 0) {
      this.thirdStage = 1
      let x = 2010;
      let step = 100;
      for(let i = 0; i < 3; i++) {
        let yVelocity = Math.floor(Math.random() * 401)
        x = x + step
        var bomb = this.bombs.create(x, 650, 'bomb');
        bomb.setBounce(1);
        if (i % 2 === 0) {
          yVelocity = -Math.abs(yVelocity)
        }
        bomb.setVelocity(yVelocity, 50);
      }
    }
  }
}