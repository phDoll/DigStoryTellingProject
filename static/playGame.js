import preloadGame from './preloadGame.js'
import Platform from './platform.js'
import Block from './block.js'
import Ground from './ground.js'
import Spikes from './spikes.js'
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
    scene: [preloadGame, playGame, playGame2]
  }
  game = new Phaser.Game(gameConfig);
}

import Player from "./player.js"
import Cursor from './cursor.js'
export default class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
    this.hasOrb = false
  }
  create() {

    this.gameOver = false
    // create an tiled sprite with the size of our game screen
    this.sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, "sky");
    // Set its pivot to the top left corner
    this.sky.setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this.sky.setScrollFactor(0);

    this.platforms = this.physics.add.staticGroup();

    new Ground(this, 8, 0, 600)

    new Platform(this, 12, 1, 600, 360)
    new Platform(this, 12, 1, 800, 250)
    new Platform(this, 12, 1, 1200, 500)


    new Block(this, 2, 1, 300, 600)
    new Block(this, 9, 2, 450, 600)

    this.spikes = this.physics.add.staticGroup();
    new Spikes(this, 2, 1400, 580)
    new Ground(this, 8, 1400, 600)


    new Platform(this, 4, 1, 1600, 500)
    new Platform(this, 4, 1, 1900, 500)
    new Platform(this, 4, 1, 2200, 500)
    new Platform(this, 4, 1, 2400, 400)
    new Spikes(this, 2, 2698, 590)
    new Platform(this, 6, 1, 2750, 600)
    new Spikes(this, 1, 2820, 590)

    new Ground(this, 16, 3000, 600)

    // Alternative Route

    new Platform(this, 8, 1,1450, 390)
    new Platform(this, 1, 8, 1430, 390)
    new Platform(this, 8, 1, 1600, 300)
    new Platform(this, 8, 1, 1850, 250)
    new Platform(this, 1, 8, 1930, 250)

    this.finish = this.physics.add.sprite(3200, 500, 'finish')
    this.physics.add.collider(this.finish, this.platforms)


    this.portal = this.physics.add.sprite(1900, 200, 'teleporter')
    this.physics.add.collider(this.portal, this.platforms)

    this.orb = this.physics.add.sprite(900, 100, 'blue_ball')
    this.physics.add.collider(this.orb, this.platforms)



    // add player
    this.player = new Player(this, 'dude', 3100, 300).getPlayer()
    // create an animation for the player
    this.cursor = new Cursor(this, this.player)

    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();



    this.physics.add.overlap(this.player, this.orb, this.collectOrb, null, this);
    this.physics.add.overlap(this.player, this.portal, this.teleport, null, this);
    this.physics.add.overlap(this.player, this.finish, this.endGame, null, this);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);


    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, -600, game.config.width * 10, game.config.height * 2);

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
    // this.physics.pause()
    // this.scene.remove()
    this.changeLevel()
    // this.scene.scene.stop()
  }

  changeLevel() {
    this.scene.start('PlayGame2');
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
    this.sky.tilePositionX = this.myCam.scrollX * .3;
    this.sky.tilePositionY = this.myCam.scrollY * .3;
  }
}


class playGame2 extends Phaser.Scene {
  constructor() {
    super("PlayGame2");
    this.hasOrb = false
  }
  create() {
    this.gameOver = false
    // create an tiled sprite with the size of our game screen
    this.mountain = this.add.tileSprite(0, 0, game.config.width, game.config.height, "sky");
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
    this.myCam.setBounds(0, -600, game.config.width * 10, game.config.height * 2);

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