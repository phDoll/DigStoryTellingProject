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

export default class Level5 extends Phaser.Scene {
  constructor() {
    super("Level5");
    this.hasOrb = false
    this.canFire = true
    this.ammo = 5
    this.shild = true
    this.activeShild = false;
    this.count = 0;
    this.activeBombs = 0;
    this.setPatroling = false;
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


    new Platform(this, 24, 1, 0, 600, 'platform_level_2')
    new Platform(this, 12, 1, 200, 400, 'platform_level_2')
    new Platform(this, 24, 1, 400, 100, 'platform_level_2')
    new Platform(this, 0, 40, 640, 100, 'platform_level_2')
    new Platform(this, 24, 1, 640, -300, 'platform_level_2')
    new Platform(this, 0, 90, 870, 600, 'platform_level_2')
    new Platform(this, 0, 120, 1050, 350, 'platform_level_2')
    new Platform(this, 24, 1, 100, -200, 'platform_level_2')
    new Platform(this, 4, 1, 1000, -450, 'platform_level_2')
    new Platform(this, 4, 1, 880, -280, 'platform_level_2')
    new Platform(this, 10, 1, 880, 120, 'platform_level_2')
    new Platform(this, 7, 1, 990, -150, 'platform_level_2')
    new Platform(this, 100, 1, 880, 600, 'platform_level_2')


    // Labyrinth
    new Platform(this, 0, 12, 1050, 600, 'platform_level_2')
    new Platform(this, 73, 1, 1050, 350, 'platform_level_2')
    new Platform(this, 0, 80, 1880, 600, 'platform_level_2')
    new Platform(this, 68, 1, 1200, 100, 'platform_level_2')
    new Platform(this, 69, 1, 1200, -200, 'platform_level_2')
    new Platform(this, 0, 30, 1200, 100, 'platform_level_2')
    new Platform(this, 4, 1, 1160, 60, 'platform_level_2')
    new Platform(this, 73, 1, 1050, -350, 'platform_level_2')



    // Spikes
    new Spikes(this, 1, 0, 640, -303, 'spike')
    new Spikes(this, 2, 0, 890, -283, 'spike')
    new Spikes(this, 4, 0, 990, -153, 'spike')
    new Spikes(this, 7, 0, 890, 117, 'spike')
    new Spikes(this, 2, 0, 1000, 597, 'spike')
    new Spikes(this, 8, 0, 1250, -203, 'spike')
    new Spikes(this, 8, 0, 1450, -347, 'spike_turned')
    new Spikes(this, 4, 0, 1650, -347, 'spike_turned')
    new Spikes(this, 4, 0, 1550, -203, 'spike')
    new Spikes(this, 4, 0, 1700, -203, 'spike')

    // Final
    new Platform(this, 6, 1, 2000, -100, 'platform_level_2')
    new Platform(this, 24, 1, 2100, 200, 'platform_level_2')
    new Platform(this, 24, 1, 2400, 400, 'platform_level_2')
    new Platform(this, 12, 1, 2600, 150, 'platform_level_2')
    new Platform(this, 12, 1, 2100, 600, 'platform_level_2')

    this.start = this.physics.add.sprite(50, 980, 'start')
    this.start.body.allowGravity = false

    // add player
    this.player = new Player(this, 'dude', 50, 1000).getPlayer()
    // create an animation for the player
    this.cursor = new Cursor(this, this.player, -250, true, true, true)
    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();

    this.ammoText = this.add.text(16, 16, 'Munition: ' + this.ammo, { fontSize: '22px', fill: '#000' });
    this.shildText = this.add.text(16, 60, 'Schild verfügbar', { fontSize: '22px', fill: '#000' });

    this.portal = this.physics.add.sprite(-20, 1100, 'teleporter')
    this.physics.add.overlap(this.player, this.portal, this.teleport, null, this);
    this.physics.add.collider(this.portal, this.platforms);



    // Bombs
    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);


    // enemy
    this.enemy1 = new Enemy(this, 'enemy', 400, 650)
    this.enemy2 = new Enemy(this, 'enemy', 100, 350)
    this.enemy3 = new Enemy(this, 'enemy', 1100, 910)
    this.enemy4 = new Enemy(this, 'enemy', 1100, 910)
    this.enemy5 = new Enemy(this, 'enemy', 1100, 910)
    this.physics.add.collider(this.player, this.enemy1.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.enemy1.getEnemy(), this.platforms);
    this.physics.add.collider(this.player, this.enemy2.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.enemy2.getEnemy(), this.platforms);
    this.physics.add.collider(this.player, this.enemy3.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.enemy3.getEnemy(), this.platforms);
    this.physics.add.collider(this.player, this.enemy4.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.enemy4.getEnemy(), this.platforms);
    this.physics.add.collider(this.player, this.enemy5.getEnemy(), this.hitEnemy, null, this)
    this.physics.add.collider(this.enemy5.getEnemy(), this.platforms);

    // final enemys
    this.enemy6 = new Enemy(this, 'enemy', 3200, 1150)
    this.enemy7 = new Enemy(this, 'enemy', 3200, 700)
    this.enemy8 = new Enemy(this, 'enemy', 3200, 900)

    this.enemy6.getEnemy().body.allowGravity = false
    this.enemy7.getEnemy().body.allowGravity = false
    this.enemy8.getEnemy().body.allowGravity = false

    this.physics.add.collider(this.player, this.enemy6.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy7.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy8.getEnemy(), this.hitEnemy, null, this);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);
    this.npc = new NPC(this, 'beaver', 250, 980).getNPC()
    this.npc.body.allowGravity = false

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
      this.count = 0;
      this.activeBombs = 0;
      this.setPatroling = false;
    }
  }

  collectOrb() {
    this.orb.disableBody(true, true)
    this.hasOrb = true
  }

  teleport() {
    this.player.x = 2400
    this.player.y = 950
  }

  endGame() {
    this.changeLevel()
  }

  changeLevel() {
    this.scene.start('endScreen');
  }

  hitBomb() {
    if (this.activeShild === false) {
      this.gameOver = true
      this.hasOrb = false
      this.canFire = true
      this.ammo = 5
      this.shild = true
      this.activeShild = false;
      this.count = 0;
      this.activeBombs = 0;
      this.setPatroling = false;
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
      this.count = 0;
      this.activeBombs = 0;
      this.setPatroling = false;
    }
  }

  checkGameOver() {
    if (this.player.y > 1220 || this.gameOver) {
      this.hasOrb = false
      this.canFire = true
      this.ammo = 5
      this.shild = true
      this.activeShild = false;
      this.count = 0;
      this.activeBombs = 0;
      this.setPatroling = false;
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

  fireWeapon() {
    if (this.canFire && this.ammo > 0) {
      this.canFire = false
      this.ammo = this.ammo - 1;
      this.shoot = this.physics.add.sprite(this.player.x, this.player.y, 'shoot');
      if (this.cursor.getCursor().left.isDown) {
        this.shoot.body.velocity.x = -500
      } else {
        this.shoot.body.velocity.x = 500
      }
      this.shoot.body.allowGravity = false
      this.physics.add.collider(this.shoot, this.enemy1.getEnemy(), this.shootEnemy1, null, this);
      this.physics.add.collider(this.shoot, this.enemy2.getEnemy(), this.shootEnemy2, null, this);
      this.physics.add.collider(this.shoot, this.enemy3.getEnemy(), this.shootEnemy3, null, this);
      this.physics.add.collider(this.shoot, this.enemy4.getEnemy(), this.shootEnemy4, null, this);
      this.physics.add.collider(this.shoot, this.enemy5.getEnemy(), this.shootEnemy5, null, this);
      this.physics.add.collider(this.shoot, this.enemy6.getEnemy(), this.shootEnemy6, null, this);
      this.physics.add.collider(this.shoot, this.enemy7.getEnemy(), this.shootEnemy7, null, this);
      this.physics.add.collider(this.shoot, this.enemy8.getEnemy(), this.shootEnemy8, null, this);
    }
    this.ammoText.setText('Munition: ' + this.ammo)
  }


  shootEnemy3() {
    this.enemy3.getEnemy().destroy()
    this.shoot.destroy()
  }

  shootEnemy4() {
    this.enemy4.getEnemy().destroy()
    this.shoot.destroy()
  }

  shootEnemy5() {
    this.enemy5.getEnemy().destroy()
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

  shootEnemy3() {
    this.enemy3.getEnemy().destroy()
    this.shoot.destroy()
  }

  shootEnemy6() {
    this.enemy6.getEnemy().destroy()
    this.shoot.destroy()
    this.count++
  }

  shootEnemy7() {
    this.enemy7.getEnemy().destroy()
    this.shoot.destroy()
    this.count++
  }

  shootEnemy8() {
    this.enemy8.getEnemy().destroy()
    this.shoot.destroy()
    this.count++
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
    this.enemy1.patroling(400, 600, 300)
    this.enemy2.patroling(100, 340, 350)
    if (this.canFire === false ) {
      this.canFire = true
    }

    if(this.player.x >= 230) {
      this.text = new Text(this, 50, 600, 300, 300, "Ah da ist ja das arme Ding gefangen in der Zeitschleife. Laufe zum Ende dieser Zeitlinie und du schaffst diesen Teil der Zeitschleife zu entkommen. Ach ja ich hab da etwas gehört, um die Zeitschleife endgültig zu verlassen, musst du den Raum-Zeitkrümmer finden. Der ist glaub ich auf dem Mars ca. 600 Jahre in der Zukunft, ich glaub nicht, dass du so lange warten willst.", 130, 10)
    }

    if(this.player.y >= 1150) {
      this.start.destroy()
    }

    if (this.player.x >= 2500) {
      this.myCam.stopFollow(this.player)
      this.ammoText.setScrollFactor(0)
      this.shildText.setScrollFactor(0)
      this.ammo = 1000
      this.setPatroling = true
    }

    if (this.setPatroling) {
      this.enemy6.patroling(2100, 2900, 350)
      this.enemy7.patroling(2100, 2900, 150)
      this.enemy8.patroling(2100, 2900, 500)
    }

    if(this.hasOrb === true && cursor.shift.isDown) {

      this.player.x = this.player.x - 100
      this.hasOrb = false
    }
    if (this.player.x >= 1080) {
      new Platform(this, 0, 14, 1050, 480, 'platform_level_2')
    }

    if (this.player.x >= 1750 && this.player.y <= 930) {
      new Platform(this, 10, 1, 1780, 350, 'platform_level_2')
      this.enemy3.patroling(1100, 1800, 350)
      this.enemy4.patroling(1100, 1800, 250)
      this.enemy5.patroling(1100, 1800, 150)
    }

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

    if (this.player.x > 1100 && this.player.x < 1500 && this.activeBombs === 0) {
      this.activeBombs = 1
      let x = 1100;
      let step = 120;
      for(let i = 0; i <= 5; i++) {
        let yVelocity = Math.floor(Math.random() * 401)
        x = x + step
        var bomb = this.bombs.create(x, 1000, 'bomb');
        bomb.setBounce(1);
        if (i % 2 === 0) {
          yVelocity = -Math.abs(yVelocity)
        }
        bomb.setVelocity(yVelocity, 100);
      }
    }

    if (this.count === 3) {
      this.finish = this.physics.add.sprite(2500, 970, 'finish')
      this.finish.body.allowGravity = false
      this.physics.add.overlap(this.player, this.finish, this.endGame, null, this);
    }
    this.checkGameOver()
  }
}