export default class preloadGame extends Phaser.Scene{
  constructor(){
    super("PreloadGame");
  }
  preload(){
    this.load.image('sky', 'static/assets/sky.png');
    this.load.image('star', 'static/assets/star.png');
    this.load.image('bomb', 'static/assets/bomb.png');
    this.load.image('blue_ball', 'static/assets/blue_ball.png');
    this.load.image('mountain', 'static/assets/Mountain.png');
    this.load.image('noon', 'static/assets/noon.jpg');
    this.load.image("ground", "static/assets/ground.png");
    this.load.image("platform", "static/assets/platform.png");
    this.load.image("block", "static/assets/block.png");
    this.load.image("spikes", "static/assets/spikes.png");
    this.load.image("teleporter", "static/assets/clown.png");
    this.load.image("finish", "static/assets/flectrum2.png");
    this.load.spritesheet('dude', 'static/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }
  create(){
    this.scene.start("PlayGame");
  }
}
