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


    new Platform(this, 24, 1, 0, 600)
    new Platform(this, 12, 1, 200, 400)
    new Platform(this, 24, 1, 400, 100)
    new Platform(this, 1, 40, 640, 100)
    new Platform(this, 24, 1, 640, -300)
    new Platform(this, 1, 90, 870, 600)
    new Platform(this, 1, 120, 1050, 350)
    new Platform(this, 24, 1, 100, -200)
    new Platform(this, 4, 1, 1000, -450)
    new Platform(this, 4, 1, 880, -280)
    new Platform(this, 10, 1, 880, 120)
    new Platform(this, 7, 1, 990, -150)
    new Platform(this, 100, 1, 880, 600)


    // Labyrinth
    new Platform(this, 1, 12, 1050, 600)
    new Platform(this, 73, 1, 1050, 350)
    new Platform(this, 1, 80, 1880, 600)
    new Platform(this, 68, 1, 1200, 100)
    new Platform(this, 69, 1, 1200, -200)
    new Platform(this, 1, 30, 1200, 100)
    new Platform(this, 4, 1, 1160, 60)
    new Platform(this, 73, 1, 1050, -400)



    // Spikes
    new Spikes(this, 1, 640, -330)
    new Spikes(this, 1, 900, -300)
    new Spikes(this, 2, 1000, -180)
    new Spikes(this, 3, 920, 100)
    new Spikes(this, 2, 1000, 580)
    new Spikes(this, 2, 1000, 580)
    new Spikes(this, 8, 1250, -220)
    new Spikes(this, 8, 1450, -380)
    new Spikes(this, 4, 1650, -380)
    new Spikes(this, 4, 1550, -220)
    new Spikes(this, 4, 1700, -220)

    // Final
    new Platform(this, 6, 1, 1900, -100)
    new Platform(this, 24, 1, 2100, 200)
    new Platform(this, 24, 1, 2400, 400)
    new Platform(this, 12, 1, 2600, 150)
    new Platform(this, 12, 1, 2100, 600)






    // add player
    this.player = new Player(this, 'dude', 1100, 500).getPlayer()
    // create an animation for the player
    this.cursor = new Cursor(this, this.player, -250, true, true, true)
    // allow key inputs to control the player
    this.cursors = this.input.keyboard.createCursorKeys();

    this.ammoText = this.add.text(16, 16, 'Munition: ' + this.ammo, { fontSize: '32px', fill: '#000' });
    this.shildText = this.add.text(16, 60, 'Schild verfügbar', { fontSize: '32px', fill: '#000' });
    this.finish = this.physics.add.sprite(3150, 300, 'finish')
    this.physics.add.collider(this.finish, this.platforms)

    this.portal = this.physics.add.sprite(-20, 400, 'teleporter')
    this.physics.add.overlap(this.player, this.portal, this.teleport, null, this);
    this.physics.add.collider(this.portal, this.platforms);
    this.physics.add.overlap(this.player, this.finish, this.endGame, null, this);


    // Bombs
    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms);

    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);


    // enemy
    // this.enemy = new Enemy(this, 'enemy', 400, 100)
    this.enemy1 = new Enemy(this, 'enemy', 400, 50)
    this.enemy2 = new Enemy(this, 'enemy', 100, -250)
    this.enemy3 = new Enemy(this, 'enemy', 1100, 310)
    this.enemy4 = new Enemy(this, 'enemy', 1100, 310)
    this.enemy5 = new Enemy(this, 'enemy', 1100, 310)
    // this.enemy3 = new Enemy(this, 'enemy', 100, 500)
    // this.physics.add.collider(this.player, this.enemy.getEnemy(), this.hitEnemy, null, this);
    // this.physics.add.collider(this.enemy.getEnemy(), this.platforms);
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
    this.enemy6 = new Enemy(this, 'enemy', 3200, 550)
    this.enemy7 = new Enemy(this, 'enemy', 3200, 100)
    this.enemy8 = new Enemy(this, 'enemy', 3200, 300)
    this.enemy9 = new Enemy(this, 'enemy', 3200, 200)
    this.enemy10 = new Enemy(this, 'enemy', 3200, 450)

    this.enemy6.getEnemy().body.allowGravity = false
    this.enemy7.getEnemy().body.allowGravity = false
    this.enemy8.getEnemy().body.allowGravity = false
    this.enemy9.getEnemy().body.allowGravity = false
    this.enemy10.getEnemy().body.allowGravity = false

    this.physics.add.collider(this.player, this.enemy6.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy7.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy8.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy9.getEnemy(), this.hitEnemy, null, this);
    this.physics.add.collider(this.player, this.enemy10.getEnemy(), this.hitEnemy, null, this);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);
    this.npc = new NPC(this, 'dude', 250, 300).getNPC()
    this.physics.add.collider(this.npc, this.platforms);

    // this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);

    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, -600, 800 * 4, 600 * 2);

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
    }
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
      this.count = 0;
      this.activeBombs = 0;
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
    }
  }

  checkGameOver() {
    if (this.player.y > 620 || this.gameOver) {
      this.hasOrb = false
      this.canFire = true
      this.ammo = 5
      this.shild = true
      this.activeShild = false;
      this.count = 0;
      this.activeBombs = 0;
      this.gameOver = this.add.tileSprite( Math.floor(this.myCam.scrollX), 0, 800, 600, "noon");
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
      this.physics.add.collider(this.shoot, this.enemy9.getEnemy(), this.shootEnemy9, null, this);
      this.physics.add.collider(this.shoot, this.enemy10.getEnemy(), this.shootEnemy10, null, this);

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

  shootEnemy9() {
    this.enemy9.getEnemy().destroy()
    this.shoot.destroy()
    this.count++
  }

  shootEnemy10() {
    this.enemy10.getEnemy().destroy()
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
    this.checkGameOver()
    if (this.canFire === false ) {
      this.canFire = true
    }


    if(this.player.x >= 230) {
      this.text = new Text(this, 60, 160, 250, "Ah da ist ja das arme Ding gefangen in der Zeitschleife. Laufe zum Ende dieser Zeitlinie und du schaffst diesen Teil der Zeitschleife zu entkommen. Ach ja ich hab da etwas gehört, um die Zeitschleife endgültig zu verlassen, musst du den Raum-Zeitkrümmer finden. Der ist glaub ich auf dem Mars ca. 600 Jahre in der Zukunft, ich glaub nicht, dass du so lange warten willst.")
    }

    if (this.player.x >= 2500) {
      this.myCam.stopFollow(this.player)
      this.ammoText.setScrollFactor(0)
      this.shildText.setScrollFactor(0)
      this.ammo = 1000
      this.enemy6.patroling(1800, 3200, 350)
      this.enemy7.patroling(1800, 3200, 150)
      this.enemy8.patroling(1800, 3200, 500)
      this.enemy9.patroling(1800, 3200, 300)
      this.enemy10.patroling(1800, 3200, 200)
    }


    if(this.hasOrb === true && cursor.shift.isDown) {

      this.player.x = this.player.x - 100
      this.hasOrb = false
    }
    if (this.player.x >= 1080) {
      new Platform(this, 1, 12, 1050, 480)
    }

    if (this.player.x >= 1750 && this.player.y <= 330) {
      new Platform(this, 10, 1, 1780, 350)
      this.enemy3.patroling(1100, 1800, 350)
      this.enemy4.patroling(1100, 1800, 250)
      this.enemy5.patroling(1100, 1800, 150)
    }

    // scroll the texture of the tilesprites proportionally to the camera scroll
    this.mountain.tilePositionX = this.myCam.scrollX * .3;
    this.mountain.tilePositionY = this.myCam.scrollY * .3;
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
      console.log("test")
      this.activeBombs = 1
      let x = 1100;
      let step = 120;
      for(let i = 0; i <= 5; i++) {
        let yVelocity = Math.floor(Math.random() * 401)
        x = x + step
        var bomb = this.bombs.create(x, 400, 'bomb');
        bomb.setBounce(1);
        if (i % 2 === 0) {
          yVelocity = -Math.abs(yVelocity)
        }
        bomb.setVelocity(yVelocity, 100);
      }
    }

    if (this.count === 5) {
      console.log("Gewonnen")
    }

  }
}