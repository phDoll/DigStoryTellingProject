import preloadGame from './preloadGame.js'
import Platform from './platform.js'
import Block from './block.js'
import Ground from './ground.js'
import Spikes from './spikes.js'
import Text from './text.js'
import Player from "./player.js"
import Cursor from './cursor.js'
import NPC from './npc.js'
import Level2 from './level2.js'
export default class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
    this.hasOrb = false
  }
  create() {
    this.gameOver = false
    // create an tiled sprite with the size of our game screen
    this.sky = this.add.tileSprite(0, 0, 3200, 1200, "jupiter");
    // Set its pivot to the top left corner
    this.sky.setOrigin(0,0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this.sky.setScrollFactor(0);



    this.platforms = this.physics.add.staticGroup();

    new Platform(this, 12, 0, 0, 600, 'platform_level_1')
    new Platform(this, 12, 0, 600, 360, 'platform_level_1')
    new Platform(this, 12, 0, 800, 250, 'platform_level_1')
    new Platform(this, 12, 0, 1200, 500, 'platform_level_1')


    new Platform(this, 12, 0, 250, 500, 'platform_level_1')
    new Platform(this, 64, 0, 400, 450, 'platform_level_1')

    this.spikes = this.physics.add.staticGroup();
    new Spikes(this, 3, 0, 1400, 590, 'spike')
    new Platform(this, 8, 0, 1400, 600, 'platform_level_1')



    new Platform(this, 20, 0, 3000, 600, 'platform_level_1')

    // Alternative Route

    new Platform(this, 8, 0,1450, 390, 'platform_level_1')
    new Platform(this, 0, 10, 1450, 390, 'platform_level_1')
    new Platform(this, 8, 0, 1600, 300, 'platform_level_1')
    new Platform(this, 8, 0, 1850, 250, 'platform_level_1')
    new Platform(this, 0, 8, 1930, 250, 'platform_level_1')

    new Platform(this, 4, 0, 1600, 500, 'platform_level_1')
    new Platform(this, 4, 0, 1800, 450, 'platform_level_1')
    new Platform(this, 4, 0, 2000, 380, 'platform_level_1')
    new Platform(this, 4, 0, 2100, 280, 'platform_level_1')
    new Platform(this, 4, 0, 2200, 170, 'platform_level_1')
    new Spikes(this, 2, 0, 2300, 97, 'spike')
    new Platform(this, 2, 0, 2320, 100, 'platform_level_1')
    new Platform(this, 1, 0, 2420, -10, 'platform_level_1')
    new Spikes(this, 0, 7, 2500, -20, 'spike_flipped')
    new Platform(this, 1, 0, 2550, -70, 'platform_level_1')
    new Platform(this, 1, 0, 2650, -170, 'platform_level_1')
    new Platform(this, 30, 0, 2750, -270, 'platform_level_1')

    this.finish = this.physics.add.sprite(3150, 1100, 'finish')
    this.physics.add.collider(this.finish, this.platforms)

    this.portal = this.physics.add.sprite(1900, 820, 'teleporter')
    this.portal.body.allowGravity = false

    this.orb = this.physics.add.sprite(900, 800, 'blue_ball')
    this.physics.add.collider(this.orb, this.platforms)

    // add player
    this.player = new Player(this, 'dude', 50, 1150).getPlayer()
    this.npc = new NPC(this, 'beaver', 450, 1030).getNPC()
    this.npc.body.allowGravity = false
    // create an animation for the player
    this.cursor = new Cursor(this, this.player, -300, false, false, false)

    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.overlap(this.player, this.orb, this.collectOrb, null, this);
    this.physics.add.overlap(this.player, this.portal, this.teleport, null, this);
    this.physics.add.overlap(this.player, this.finish, this.endGame, null, this);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.npc, this.platforms);
    this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);


    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, 800 * 4, 600 * 2);

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
    this.player.y = 1150
  }

  endGame() {
    this.changeLevel()
  }

  changeLevel() {
    this.scene.start('Level2');
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

    if(this.player.x >= 430) {
      this.text = new Text(this, 400, 700, 250, 250, "Ah da ist ja das arme Ding gefangen in der Zeitschleife. Laufe zum Ende dieser Zeitlinie und du schaffst diesen Teil der Zeitschleife zu entkommen. Ach ja ich hab da etwas gehört, um die Zeitschleife endgültig zu verlassen, musst du den Raum-Zeitkrümmer finden. Der ist glaub ich auf dem Mars ca. 600 Jahre in der Zukunft, ich glaub nicht, dass du so lange warten willst.", 0)
    }


    if(this.hasOrb === true && cursor.shift.isDown) {
      this.player.x = this.player.x - 100
      this.hasOrb = false
    }
    this.checkGameOver()

    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.sky.tilePositionX = this.myCam.scrollX * .3;
    this.sky.tilePositionY = this.myCam.scrollY;
  }
}