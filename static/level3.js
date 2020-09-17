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
    this.mountain = this.add.tileSprite(0, 0, 800, 600, "sky");
    // Set its pivot to the top left corner
    this.mountain.setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this.mountain.setScrollFactor(0);

    this.platforms = this.physics.add.staticGroup();
    this.spikes = this.physics.add.staticGroup();


    // World Bounds

    new Platform(this, 320, 1, 0, 600)
    new Platform(this, 2, 80, -20, 600)
    new Platform(this, 1, 80, 3200, 600)
    new Platform(this, 320, 1, 0, 0)


    // Spikes

    // First Room
    new Platform(this, 2, 80, 500, 520)
    new Platform(this, 2, 80, 1000, 520)

    // Second Room
    new Platform(this, 2, 80, 2000, 520)
    new Platform(this, 1, 1, 1100, 400)
    new Platform(this, 1, 1, 1400, 400)
    new Platform(this, 1, 1, 1600, 550)
    new Platform(this, 1, 1, 1700, 200)
    new Platform(this, 12, 1, 1750, 300)
    new Platform(this, 1, 8, 1800, 100)
    new Spikes(this, 50, 1100, 580)
    new Spikes(this, 6, 1760, 280)
    new Spikes(this, 6, 1760, 280)
    new Spikes(this, 1, 1980, 450)

    // Thrid Room
    new Platform(this, 2, 80, 3000, 520)
    new Platform(this, 1, 8, 2200, 600)
    new Platform(this, 20, 1, 2400, 300)
    new Platform(this, 1, 8, 2600, 600)
    new Spikes(this, 3, 2550, 580)

    new Spikes(this, 200, 0, 20)

    // add player
    this.player = new Player(this, 'dude', 50, 450).getPlayer()
    // create an animation for the player
    this.cursor = new Cursor(this, this.player, -250, true, true)
    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();

    this.finish = this.physics.add.sprite(3150, 300, 'finish')
    this.physics.add.collider(this.finish, this.platforms)

    this.physics.add.overlap(this.player, this.portal, this.teleport, null, this);
    this.physics.add.overlap(this.player, this.finish, this.endGame, null, this);


    // Bombs
    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);




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
    this.hasOrb = true
  }

  teleport() {
    this.player.x = 3100
    this.player.y = 550
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
      this.text = new Text(this, 60, 360, 250, "Ah da ist ja das arme Ding gefangen in der Zeitschleife. Laufe zum Ende dieser Zeitlinie und du schaffst diesen Teil der Zeitschleife zu entkommen. Ach ja ich hab da etwas gehört, um die Zeitschleife endgültig zu verlassen, musst du den Raum-Zeitkrümmer finden. Der ist glaub ich auf dem Mars ca. 600 Jahre in der Zukunft, ich glaub nicht, dass du so lange warten willst.")
    }

    if(this.hasOrb === true && cursor.shift.isDown) {

      this.player.x = this.player.x - 100
      this.hasOrb = false
    }
    this.checkGameOver()

    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.mountain.tilePositionX = this.myCam.scrollX * .3;
    this.mountain.tilePositionY = this.myCam.scrollY * .3;



    if (this.player.x > 500 && this.player.x < 900 && this.firstStage === 0) {
      this.firstStage = 1
      let x = 510;
      let step = 40;
      for(let i = 0; i <= 10; i++) {
        x = x + step
        var bomb = this.bombs.create(x, 50, 'bomb');
        bomb.setBounce(1);
        bomb.setVelocity(0, 200);
      }
    }

    if (this.player.x > 2000 && this.player.x < 3000 && this.thirdStage === 0) {
      this.thirdStage = 1
      let x = 2010;
      let step = 100;
      for(let i = 0; i <= 10; i++) {
        let yVelocity = Math.floor(Math.random() * 401)
        x = x + step
        var bomb = this.bombs.create(x, 50, 'bomb');
        bomb.setBounce(1);
        if (i % 2 === 0) {
          yVelocity = -Math.abs(yVelocity)
        }
        bomb.setVelocity(yVelocity, 100);
      }
    }
  }
}