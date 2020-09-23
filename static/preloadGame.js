export default class preloadGame extends Phaser.Scene{
  constructor(){
    super("PreloadGame");
  }
  preload(){
    this.load.image('jupiter', 'static/assets/jupiter.png');
    this.load.image('star', 'static/assets/star.png');
    this.load.image('bomb', 'static/assets/bomb.png');
    this.load.image('blue_ball', 'static/assets/blue_ball.png');
    this.load.image('mountain', 'static/assets/Mountain.png');
    this.load.image('noon', 'static/assets/noon.jpg');
    this.load.image('black', 'static/assets/black.png');
    this.load.image("ground", "static/assets/ground.png");
    this.load.image("platform_level_1", "static/assets/grass.png");
    this.load.image("platform_level_2", "static/assets/stonewall.png");
    this.load.image("block", "static/assets/block.png");
    this.load.image("spike", "static/assets/grass_spikes.png");
    this.load.image("spike_flipped", "static/assets/grass_spikes_flipped.png");
    this.load.image("spike_turned", "static/assets/grass_spikes_turned.png");
    this.load.image("teleporter", "static/assets/portal.png");
    this.load.image("enemy", "static/assets/clown.png");
    this.load.image("finish", "static/assets/portal.png");
    this.load.image('shoot', 'static/assets/blue_ball.png');
    this.load.spritesheet('dude', 'static/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('beaver', 'static/assets/beaver.png', { frameWidth: 48, frameHeight: 48 });
  }
  create(){
    this.scene.start("PlayGame");
  }
}
