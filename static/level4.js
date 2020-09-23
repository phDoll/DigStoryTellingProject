import preloadGame from './preloadGame.js'
import Platform from './platform.js'
import Block from './block.js'
import Ground from './ground.js'
import Spikes from './spikes.js'
import Text from './text.js'
import Player from "./player.js"
import Cursor from './cursor.js'
import NPC from './npc.js'
import Enemy from './enemy.js'

export default class Level4 extends Phaser.Scene {
  constructor() {
    super("Level4");
    this.hasOrb = false
    this.canFire = true
    this.ammo = 5
    this.shild = true
    this.activeShild = false;
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

    this.ammoText = this.add.text(16, 16, 'Munition: ' + this.ammo, { fontSize: '22px', fill: '#000' });
    this.shildText = this.add.text(16, 60, 'Schild verfügbar', { fontSize: '22px', fill: '#000' });
    this.platforms = this.physics.add.staticGroup();
    this.spikes = this.physics.add.staticGroup();


    new Platform(this, 24, 0, 0, 600, 'platform_level_2')
    new Platform(this, 12, 0, 200, 400, 'platform_level_2')
    new Platform(this, 30, 0, 400, 180, 'platform_level_2')
    new Platform(this, 6, 0, 600, 550, 'platform_level_2')
    new Platform(this, 6, 0, 900, 350, 'platform_level_2')
    new Platform(this, 200, 0, 1400, 600, 'platform_level_2')

    // Spike
    new Spikes(this, 3, 0, 600, 547, 'spike')

    // Enemy Chase
    new Platform(this, 0, 64, 1500, 500, 'platform_level_2')
    new Spikes(this, 10, 0, 1600, 597, 'spike')
    new Platform(this, 0, 0, 1650, 500, 'platform_level_2')
    new Platform(this, 0, 0, 1750, 450, 'platform_level_2')
    new Platform(this, 0, 20, 2900, 600, 'platform_level_2')
    new Platform(this, 30, 0, 1900, 350, 'platform_level_2')
    new Platform(this, 50, 0, 2200, 500, 'platform_level_2')
    new Platform(this, 0, 15, 2200, 500, 'platform_level_2')
    new Platform(this, 0, 11, 1900, 350, 'platform_level_2')
    new Platform(this, 24, 0, 1900, 250, 'platform_level_2')
    new Platform(this, 0, 32, 1900, 120, 'platform_level_2')
    new Platform(this, 24, 0, 1900, 120, 'platform_level_2')
    new Platform(this, 0, 14, 2140, 250, 'platform_level_2')
    new Spikes(this, 5, 0, 2820, 597, 'spike')
    new Spikes(this, 3, 0, 1900, 247, 'spike')

    this.start = this.physics.add.sprite(this.spawnPoint.x, this.spawnPoint.y -20, 'start')
    this.start.body.allowGravity = false

    // add player
    this.player = new Player(this, 'dude', this.spawnPoint.x, this.spawnPoint.y).getPlayer()
    // create an animation for the player
    this.cursor = new Cursor(this, this.player, -200, true, true, false)
    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();

    this.finish = this.physics.add.sprite(3150, 300, 'finish')
    this.physics.add.collider(this.finish, this.platforms)


    this.portal = this.physics.add.sprite(2100, 800, 'teleporter')
    this.physics.add.overlap(this.player, this.portal, this.teleport, null, this);
    this.physics.add.collider(this.portal, this.platforms);
    this.physics.add.overlap(this.player, this.finish, this.endGame, null, this);


    // Bombs
    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);


    // enemy
    this.enemy = new Enemy(this, 'enemy', 400, 750)
    this.enemy1 = new Enemy(this, 'enemy', 700, 750)
    this.enemy2 = new Enemy(this, 'enemy', 1800, 1100)
    // this.enemy3 = new Enemy(this, 'enemy', 100, 500)
    this.physics.add.collider(this.player, this.enemy.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.enemy.getEnemy(), this.platforms);
    this.physics.add.collider(this.player, this.enemy1.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.enemy1.getEnemy(), this.platforms);
    this.physics.add.collider(this.player, this.enemy2.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.enemy2.getEnemy(), this.platforms);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);
    this.npc = new NPC(this, 'beaver', 250, 980).getNPC()
    this.npc.body.allowGravity = false

    // this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);

    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, 800 * 4, 600 * 2);

    // making the camera follow the player
    this.myCam.startFollow(this.player);
  }

  hitSpike() {
    if (this.activeShild === false) {
      this.gameOver = true
      this.hasOrb = false
      this.canFire = true
      this.ammo = 5
      this.shild = true
      this.activeShild = false;
    }
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
    this.scene.start('Level5');
  }

  hitBomb() {
    if (this.activeShild === false) {
      this.gameOver = true
      this.hasOrb = false
      this.canFire = true
      this.ammo = 5
      this.shild = true
      this.activeShild = false;
    }
  }

  hitEnemy() {
    if (this.activeShild === false) {
      this.gameOver = true
      this.hasOrb = false
      this.canFire = true
      this.ammo = 5
      this.shild = true
      this.activeShild = false;
    }
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
      this.hasOrb = false
      this.canFire = true
      this.ammo = 5
      this.shild = true
      this.activeShild = false;
    }
  }

  fireWeapon() {
    if (this.canFire && this.ammo > 0) {
      this.canFire = false
      this.ammo--;
      this.shoot = this.physics.add.sprite(this.player.x, this.player.y, 'shoot');
      this.shoot.body.velocity.x = 500
      this.shoot.body.allowGravity = false
      this.physics.add.collider(this.shoot, this.enemy.getEnemy(), this.shootEnemy, null, this);
      this.physics.add.collider(this.shoot, this.enemy1.getEnemy(), this.shootEnemy1, null, this);
      this.physics.add.collider(this.shoot, this.enemy2.getEnemy(), this.shootEnemy2, null, this);
    }
    this.ammoText.setText('Munition: ' + this.ammo)
  }


  shootEnemy() {
    this.enemy.getEnemy().destroy()
    this.shoot.destroy()
  }

  shootEnemy1() {
    this.enemy1.getEnemy().destroy()
    this.shoot.destroy()
  }

  shootEnemy2() {
    this.enemy2.getEnemy().destroy()
    this.shoot.destroy()
  }

  activateShild() {
    if (this.shild) {
      this.shild = false
      this.activeShild = true
      this.shildText.setText("Schild: Aktiv")
      let gameObject = this
      setInterval(function(){ gameObject.activeShild = false;
      gameObject.shildText.setText("Kein Schild verfügbar"); }, 3000);
    }
  }

  update() {
    this.cursor.setUpMoves()
    let cursor = this.cursor.getCursor()
    this.enemy.patroling(400, 700, 100)
    this.enemy1.patroling(400, 700, 100)
    if (this.canFire === false ) {
      this.canFire = true
    }

    if(this.player.x >= 230) {
      this.text = new Text(this, 50, 620, 300, 260, "Ah da ist ja das arme Ding gefangen in der Zeitschleife. Laufe zum Ende dieser Zeitlinie und du schaffst diesen Teil der Zeitschleife zu entkommen. Schon wieder die Erde. Aber zu dieser Zeit wurde der Zeitmanipulator auf der Erde entwickelt. Du musst ihn bekommen, damit du zu dem Raum/Zeit Krümmer gelangen kannst.", 130, 10)
    }

    if(this.player.y >= this.spawnPoint.y + 50) {
      this.start.destroy()
    }

    if (this.player.x >= 1450) {
      this.spawnPoint = {
        x: 1450,
        y: 1100
      }
    }

    if(this.hasOrb === true && cursor.shift.isDown) {

      this.player.x = this.player.x - 100
      this.hasOrb = false
    }
    this.checkGameOver()

    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.background.tilePositionX = this.myCam.scrollX * .3;
    this.background.tilePositionY = this.myCam.scrollY;
    this.ammoText.setScrollFactor(0)
    this.shildText.setScrollFactor(0)

    let gameObject = this
    this.input.keyboard.on('keydown_Z', function(e) {
      gameObject.fireWeapon()
    })
    this.input.keyboard.on('keydown_X', function(e) {
      gameObject.activateShild()
    })

    if (this.player.x > 1870) {
      this.enemy2.patroling(1800, 2800, 400)
    }

  }
}