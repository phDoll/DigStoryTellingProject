import Player from "./player.js"
import Cursor from './cursor.JS'

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var platforms;
var player;
var cursor;
var stars;
var score = 0;
var scoreText;
var bombs;
var gameOver = false;


var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('sky', 'static/assets/sky.png');
  this.load.image('ground', 'static/assets/platform.png');
  this.load.image('star', 'static/assets/star.png');
  this.load.image('bomb', 'static/assets/bomb.png');
  this.load.spritesheet('dude', 'static/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
  this.add.image(400, 300, 'sky');
  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  player = new Player(this, 'dude').getPlayer()
  cursor = new Cursor(this, player)
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  stars.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });

  bombs = this.physics.add.group();

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(stars, platforms);

  this.physics.add.overlap(player, stars, collectStar, null, this);
  this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function collectStar(player, star) {
  star.disableBody(true, true)
  score += 10;
  scoreText.setText('Score: ' + score);
  console.log(stars.countActive(true))
  if (stars.countActive(true) === 0)
  {
      stars.children.iterate(function (child) {

          child.enableBody(true, child.x, 0, true, true);

      });

      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

  }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}

function update ()
{
  if (gameOver)
  {
      return;
  }

  cursor.setUpMoves()
}