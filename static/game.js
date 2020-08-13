// import Player from "./player.js"
// import Cursor from './cursor.JS'

import preloadGame from './preloadGame.js'
import playGame from './playGame.js'

// var config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   physics: {
//       default: 'arcade',
//       arcade: {
//           gravity: { y: 300 },
//           debug: false
//       }
//   },
//   scene: {
//       preload: preload,
//       create: create,
//       update: update
//   }
// };

// var platforms;
// var player;
// var cursor;
// var stars;
// var score = 0;
// var scoreText;
// var bombs;
// var gameOver = false;
// var orb;
// var mountainsBack;
// var camera;

// var game = new Phaser.Game(config);

// function preload ()
// {
//   this.load.image('sky', 'static/assets/sky.png');
//   this.load.image('ground', 'static/assets/platform.png');
//   this.load.image('star', 'static/assets/star.png');
//   this.load.image('bomb', 'static/assets/bomb.png');
//   this.load.image('blue_ball', 'static/assets/blue_ball.png');
//   this.load.image('mountain', 'static/assets/Mountain.png');
//   this.load.image('noon', 'static/assets/noon.png');
//   this.load.image('hill', 'static/assets/hill.png');
//   this.load.spritesheet('dude', 'static/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
// }

// function create ()
// {
//   mountainsBack = this.add.tileSprite(0, 0, 800, 600, "mountain")
//   mountainsBack.setOrigin(0,0)
//   mountainsBack.setScrollFactor(0)
//   scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
//   console.log(this.scene.scene.cameras.main)
//   camera = this.scene.scene.cameras.main
//   player = new Player(this, 'dude').getPlayer()
//   camera.x = 0
//   camera.y = 0
//   camera.startFollow(player)
//   camera.setFollowOffset(-300, 250)
//   cursor = new Cursor(this, player)
//   platforms = this.physics.add.staticGroup();

//   platforms.create(400, 568, 'ground').setScale(2).refreshBody();

//   platforms.create(600, 400, 'ground');
//   platforms.create(50, 250, 'ground');
//   platforms.create(750, 220, 'ground');
//   stars = this.physics.add.group({
//     key: 'star',
//     repeat: 11,
//     setXY: { x: 12, y: 0, stepX: 70 }
//   });

//   orb = this.physics.add.sprite(100,100, 'blue_ball')

//   stars.children.iterate(function (child) {

//       child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

//   });

//   bombs = this.physics.add.group();

//   this.physics.add.collider(player, platforms);
//   this.physics.add.collider(bombs, platforms);
//   this.physics.add.collider(stars, platforms);
//   this.physics.add.collider(orb, platforms)


//   this.physics.add.overlap(player, stars, collectStar, null, this);
//   this.physics.add.collider(player, bombs, hitBomb, null, this);
//   this.physics.add.overlap(player, orb, collectOrb, null, this);


// }

// function collectOrb(player, orb) {
//   orb.disableBody(true, true)
//   player.x = 300
//   player.y = 300
// }

// function collectStar(player, star) {
//   star.disableBody(true, true)
//   score += 10;
//   scoreText.setText('Score: ' + score);
//   if (stars.countActive(true) === 0)
//   {
//       stars.children.iterate(function (child) {

//           child.enableBody(true, child.x, 0, true, true);

//       });

//       var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
//       var bomb = bombs.create(x, 16, 'bomb');
//       bomb.setBounce(1);
//       bomb.setCollideWorldBounds(true);
//       bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

//   }
// }

// function hitBomb (player, bomb)
// {
//     this.physics.pause();

//     player.setTint(0xff0000);

//     player.anims.play('turn');

//     gameOver = true;
// }

// function update ()
// {
//   mountainsBack -
//   if (gameOver)
//   {
//       return;
//   }

//   cursor.setUpMoves()
// }


