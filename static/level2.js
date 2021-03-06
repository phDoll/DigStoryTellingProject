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
    this.spawnPoint = {
      x: 50,
      y: 1000
    }
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
    new Spikes(this, 4, 0, 390, 347, 'spike')
    new Spikes(this, 2, 0, 890, 597, 'spike')
    new Spikes(this, 2, 0, 1050, 597, 'spike')
    new Spikes(this, 12, 0, 1200, 13, 'spike_turned')
    new Spikes(this, 6, 0, 1910, 147, 'spike')
    new Spikes(this, 1, 4, 2547, 230, 'spike_flipped')
    new Spikes(this, 1, 4, 2747, 280, 'spike_flipped')
    new Spikes(this, 1, 5, 2947, 290, 'spike_flipped')

    new Platform(this, 12, 0, 0, 600, 'platform_level_2', false)
    new Platform(this, 12, 0, 200, 550, 'platform_level_2', false)
    new Platform(this, 12, 0, 300, 350, 'platform_level_2', false)
    new Platform(this, 24, 0, 400, 100, 'platform_level_2', false)
    new Platform(this, 0, 30, 640, 400, 'platform_level_2', false)
    new Platform(this, 12, 0, 640, 600, 'platform_level_2', false)
    new Platform(this, 20, 0, 880, 600, 'platform_level_2', false)
    new Platform(this, 6, 0, 1120, 370, 'platform_level_2', false)
    new Platform(this, 0, 21, 1180, 370, 'platform_level_2', false)
    new Platform(this, 24, 0, 1180, 160, 'platform_level_2', false)
    new Platform(this, 24, 0, 1180, 10, 'platform_level_2', false)
    new Platform(this, 2, 3, 1240, 160, 'platform_level_2', false)
    new Platform(this, 2, 3, 1360, 160, 'platform_level_2', false)
    new Platform(this, 6, 0, 1800, 20, 'platform_level_2', false)
    new Platform(this, 12, 0, 1200, 550, 'platform_level_2', false)
    new Platform(this, 0, 0, 1400, 400, 'platform_level_2', false)
    new Platform(this, 0, 0, 1550, 400, 'platform_level_2', false)
    new Platform(this, 0, 0, 1700, 400, 'platform_level_2', false)
    new Platform(this, 0, 0, 1900, 600, 'platform_level_2', false)
    new Platform(this, 12, 0, 2200, 380, 'platform_level_2', false)

    // Cage
    new Platform(this, 12, 0, 1900, 150, 'platform_level_2', false)
    new Platform(this, 12, 0, 1900, 290, 'platform_level_2', false)
    new Platform(this, 0, 14, 1900, 290, 'platform_level_2', false)
    new Platform(this, 0, 14, 2020, 290, 'platform_level_2', false)
    this.portal = this.physics.add.sprite(1980, 850, 'teleporter')
    this.physics.add.collider(this.portal, this.platforms)


    // Pipe Section
    new Platform(this, 2, 42, 2550, 600, 'platform_level_2', false)
    new Platform(this, 2, 42, 2550, 40, 'platform_level_2', false)

    new Platform(this, 2, 18, 2750, 600, 'platform_level_2', false)
    new Platform(this, 2, 64, 2750, 280, 'platform_level_2', false)

    new Platform(this, 32, 2, 2950, 440, 'platform_level_2', false)
    new Platform(this, 2, 64, 2950, 300, 'platform_level_2', false)


    // add player
    this.player = new Player(this, 'stellar', this.spawnPoint.x, this.spawnPoint.y).getPlayer()
    // create an animation for the player
    this.cursor = new Cursor(this, this.player, -210, true, false, false)
    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();

    this.finish = this.physics.add.sprite(3150, 900, 'finish')
    this.physics.add.collider(this.finish, this.platforms)

    this.npc2 = new NPC(this, 'beaver', 3070, 1010).getNPC()
    this.npc2.body.allowGravity = false

    this.start = this.physics.add.sprite(this.spawnPoint.x, this.spawnPoint.y - 20, 'start')
    this.start.body.allowGravity = false

    this.orb = this.physics.add.sprite(1850, -20, 'blue_ball')
    this.physics.add.overlap(this.player, this.portal, this.teleport, null, this);
    this.physics.add.overlap(this.player, this.orb, this.collectOrb, null, this);
    this.physics.add.overlap(this.player, this.finish, this.endGame, null, this);
    this.physics.add.collider(this.orb, this.platforms)

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);
    this.npc = new NPC(this, 'beaver', 250, 1130).getNPC()
    this.npc.body.allowGravity = false

    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, 800 * 4, 600 * 2);

    // making the camera follow the player
    this.myCam.startFollow(this.player);

    this.checkpoint = this.add.text(250, 100, '', { fontFamily: 'DogicaRegular', fontSize: 22, fill: '#ffffff', align: 'center'});
    this.checkpoint.setScrollFactor(0)

    this.levelText = this.add.text(220, 20, '- Jupiter: Jahr 2800 -', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center'});
    this.levelText.setScrollFactor(0)
  }

  hitSpike() {
    this.gameOver = true
  }

  collectOrb() {
    this.orb.disableBody(true, true)
    this.hasOrb = true
  }

  teleport() {
    this.player.x = 3050
    this.player.y = 850
  }

  endGame() {
    this.changeLevel()
  }

  changeLevel() {
    this.scene.start('Level3');
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
      this.text = new Text(this, 10, 740, 300, 300, "Ah da ist ja das arme Ding gefangen in der Zeitschleife. Laufe zum Ende dieser Zeitlinie und du schaffst diesen Teil der Zeitschleife zu entkommen. Ach ja ich hab da etwas gehört, um die Zeitschleife endgültig zu verlassen, musst du den Raum-Zeitkrümmer finden. Der ist glaub ich auf dem Mars ca. 600 Jahre in der Zukunft, ich glaub nicht, dass du so lange warten willst.", 170, 10)
    }

    if(this.player.x >= 3070) {
      this.text = new Text(this, 2800, 700, 300, 220, "Du hast es bis ans Ende dieser Zeitlinie geschafft. In der nächsten Zeitlinie wirst deinen Sprint benutzen müssen. Drücke die Leertaste für einen Sprint.", 200, 10)
    }

    if(this.player.y >= this.spawnPoint.y + 50) {
      this.start.destroy()
    }

    if (this.player.x >= 980 && this.player.x <= 1080) {
      this.checkpoint.setText("- Checkpoint -")
      this.spawnPoint = {
        x: 980,
        y: 1100
      }
    } else if (this.player.x >= 2250 && this.player.y >= 900 && this.player.x <= 2350){
      this.checkpoint.setText("- Checkpoint -")
      this.spawnPoint = {
        x: 2250,
        y: 880
      }
    } else {
      this.checkpoint.setText('')
    }

    if(this.hasOrb === true && cursor.shift.isDown) {

      this.player.x = this.player.x - 100
      this.hasOrb = false
    }
    this.checkGameOver()

    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.background.tilePositionX = this.myCam.scrollX * .3;
    this.background.tilePositionY = this.myCam.scrollY;


  }
}