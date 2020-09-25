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
    this.spawnPoint = {
      x: 50,
      y: 1000
    }
  }
  create() {
    this.gameOver = false
    // create an tiled sprite with the size of our game screen
    this.background = this.add.tileSprite(0, 0, 3200, 1200, "mars1");
    // Set its pivot to the top left corner
    this.background.setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this.background.setScrollFactor(0);

    this.platforms = this.physics.add.staticGroup();
    this.spikes = this.physics.add.staticGroup();
    new Spikes(this, 80, 0, 1100, 597, 'spike')
    new Spikes(this, 6, 0, 1760, 297, 'spike')
    new Spikes(this, 1, 8, 1997, 500, 'spike_flipped')
    new Spikes(this, 3, 0, 2550, 597, 'spike')
    new Spikes(this, 200, 0, 0, 3, 'spike_turned')


    // World Bounds
    new Platform(this, 320, 1, 0, 600, 'platform_level_3', true)
    new Platform(this, 2, 80, -20, 600, 'platform_level_3', true)
    new Platform(this, 1, 80, 3200, 600, 'platform_level_3', true)
    new Platform(this, 320, 1, 0, 0, 'platform_level_3', true)

    // First Room
    new Platform(this, 2, 80, 500, 500, 'platform_level_3', true)
    new Platform(this, 2, 80, 1000, 500, 'platform_level_3', true)

    // Second Room
    new Platform(this, 2, 80, 2000, 500, 'platform_level_3', true)
    new Platform(this, 1, 1, 1100, 400, 'platform_level_3', true)
    new Platform(this, 1, 1, 1400, 400, 'platform_level_3', true)
    new Platform(this, 1, 1, 1600, 550, 'platform_level_3', true)
    new Platform(this, 1, 1, 1700, 200, 'platform_level_3', true)
    new Platform(this, 12, 1, 1750, 300, 'platform_level_3', true)
    new Platform(this, 1, 8, 1800, 100, 'platform_level_3', true)

    // Thrid Room
    new Platform(this, 2, 80, 3000, 500, 'platform_level_3', true)
    new Platform(this, 1, 8, 2200, 600, 'platform_level_3', true)
    new Platform(this, 20, 1, 2400, 300, 'platform_level_3', true)
    new Platform(this, 1, 8, 2600, 600, 'platform_level_3', true)

    // add player
    this.player = new Player(this, 'dude', this.spawnPoint.x, this.spawnPoint.y).getPlayer()
    // create an animation for the player
    this.cursor = new Cursor(this, this.player, -250, true, true, false)
    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();

    this.finish = this.physics.add.sprite(3150, 900, 'finish')
    this.physics.add.collider(this.finish, this.platforms)

    this.npc2 = new NPC(this, 'beaver', 3070, 1180).getNPC()
    this.npc2.body.allowGravity = false

    this.start = this.physics.add.sprite(this.spawnPoint.x, this.spawnPoint.y - 20, 'start')
    this.start.body.allowGravity = false


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

    this.checkpoint = this.add.text(250, 100, '', { fontFamily: 'DogicaRegular', fontSize: 22, fill: '#ffffff', align: 'center'});
    this.checkpoint.setScrollFactor(0)

    this.levelText = this.add.text(240, 20, '- Mars: Jahr 2800 -', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center'});
    this.levelText.setScrollFactor(0)
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
      this.gameOver = this.add.tileSprite(0, 0, 3200, 1200, "black");
      this.gameOver.tilePositionX = this.myCam.scrollX * .3;
      this.gameOver.tilePositionY = this.myCam.scrollY;
      this.gameOverText = this.add.text(100, 150, '- GAME OVER -', { fontSize: '48px', fill: '#ed3621', fontFamily: 'DogicaRegular', align: 'center' });
      this.gameOverContinueText = this.add.text(120, 350, '- PRESS SPACE TO RESTART -', { fontSize: '22px', fill: '#299900', fontFamily: 'DogicaRegular', align: 'center' });
      this.gameOverText.setScrollFactor(0)
      this.gameOverContinueText.setScrollFactor(0)
      this.gameOver.setOrigin(0, 0);
      this.physics.pause();
      this.cursor.addRestart();
    }
  }


  update() {
    this.cursor.setUpMoves()
    let cursor = this.cursor.getCursor()

    if(this.player.x >= 230) {
      this.text = new Text(this, 200, 870, 300, 220, "Ah da ist ja das arme Ding gefangen in der Zeitschleife. Laufe zum Ende dieser Zeitlinie und du schaffst diesen Teil der Zeitschleife zu entkommen. Schon mal der richtige Planet nur leider die Falsche Zeit.", 0, 10)
    }

    if(this.player.x >= 3070) {
      this.text = new Text(this, 2800,890, 300, 200, "Du hast es bis ans Ende dieser Zeitlinie geschafft. In der nächsten Zeitlinie wirst deinen Schild benutzen müssen. Benutze dein Schild mit der X Taste.", 200, 10)
    }

    if(this.player.y >= this.spawnPoint.y + 50) {
      this.start.destroy()
    }

    if (this.player.x >= 1050 && this.player.x <= 1150) {
      this.checkpoint.setText("- Checkpoint -")
      this.spawnPoint = {
        x: 1050,
        y: 1100
      }
    } else if (this.player.x >= 2050 && this.player.x <= 2150) {
      this.checkpoint.setText("- Checkpoint -")
      this.spawnPoint = {
        x: 2050,
        y: 1100
      }
    }else {
      this.checkpoint.setText('')
    }

    if(this.hasOrb === true && cursor.shift.isDown) {

      this.player.x = this.player.x - 100
      this.hasOrb = false
    }
    this.checkGameOver()

    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.background.tilePositionX = this.myCam.scrollX * .3;
    this.background.tilePositionY = this.myCam.scrollY * .5;


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

    if (this.player.x > 2070 && this.player.x < 3000 && this.thirdStage === 0) {
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