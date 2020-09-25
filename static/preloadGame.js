export default class preloadGame extends Phaser.Scene{
  constructor(){
    super("PreloadGame");
  }
  preload(){
    this.load.image('jupiter', 'static/assets/jupiter.png');
    this.load.image('erde1', 'static/assets/forest.png');
    this.load.image('erde2', 'static/assets/earth.png');
    this.load.image('mars1', 'static/assets/moon.png');
    this.load.image('mars2', 'static/assets/moon2.png');
    this.load.image('star', 'static/assets/star.png');
    this.load.image('bomb', 'static/assets/bomb.png');
    this.load.image('blue_ball', 'static/assets/blue_ball.png');
    this.load.image('mountain', 'static/assets/Mountain.png');
    this.load.image('noon', 'static/assets/noon.jpg');
    this.load.image('black', 'static/assets/black.png');
    this.load.image('menu_background', 'static/assets/starfield.png');
    this.load.image("ground", "static/assets/ground.png");
    this.load.image("platform_level_1", "static/assets/wood.png");
    this.load.image("platform_level_1_left", "static/assets/wood_end_left.png");
    this.load.image("platform_level_1_right", "static/assets/wood_end_right.png");
    this.load.image("platform_level_2", "static/assets/moonstone.png");
    this.load.image("platform_level_4", "static/assets/grass.png");
    this.load.image("platform_level_3", "static/assets/moonstone-middle.png");
    this.load.image("platform_level_3_left", "static/assets/moonstone.png");
    this.load.image("platform_level_3_right", "static/assets/moonstone.png");
    this.load.image("platform_level_5", "static/assets/cloud.png");
    this.load.image("platform_level_5_left", "static/assets/cloud_left.png");
    this.load.image("platform_level_5_right", "static/assets/cloud_right.png");
    this.load.image("block", "static/assets/block.png");
    this.load.image("spike", "static/assets/grass_spikes.png");
    this.load.image("spike_flipped", "static/assets/grass_spikes_flipped.png");
    this.load.image("spike_turned", "static/assets/grass_spikes_turned.png");
    this.load.image("teleporter", "static/assets/portal_orange.png");
    this.load.image("enemy", "static/assets/ufo.png");
    this.load.image("finish", "static/assets/portal.png");
    this.load.image("start", "static/assets/portal_orange_turned.png");
    this.load.image('shoot', 'static/assets/bullet76.png');
    this.load.image('shoot_left', 'static/assets/bullet76_left.png');
    this.load.image('space-time-curvature', 'static/assets/raum-zeit-krümmer.png');
    // this.load.atlas("stellar", "static/assets/movement.png", "static/assets/movement.json");
    this.load.spritesheet('stellar', 'static/assets/stellar_standing.png', { frameWidth: 32, frameHeight: 68 })
    this.load.spritesheet('stellar_right_01', 'static/assets/stellar_running_right_01.png', { frameWidth: 46, frameHeight: 68 })
    this.load.spritesheet('stellar_right_02', 'static/assets/stellar_running_right_02.png', { frameWidth: 50, frameHeight: 68 })
    this.load.spritesheet('stellar_right_03', 'static/assets/stellar_running_right_03.png', { frameWidth: 46, frameHeight: 68 })
    this.load.spritesheet('stellar_right_04', 'static/assets/stellar_running_right_04.png', { frameWidth: 46, frameHeight: 68 })
    this.load.spritesheet('stellar_right_05', 'static/assets/stellar_running_right_05.png', { frameWidth: 46, frameHeight: 68 })
    this.load.spritesheet('stellar_right_06', 'static/assets/stellar_running_right_06.png', { frameWidth: 50, frameHeight: 68 })
    this.load.spritesheet('stellar_right_07', 'static/assets/stellar_running_right_07.png', { frameWidth: 46, frameHeight: 68 })
    this.load.spritesheet('stellar_right_08', 'static/assets/stellar_running_right_08.png', { frameWidth: 46, frameHeight: 68 })

    this.load.spritesheet('stellar_left_01', 'static/assets/stellar_running_left_01.png', { frameWidth: 46, frameHeight: 68 })
    this.load.spritesheet('stellar_left_02', 'static/assets/stellar_running_left_02.png', { frameWidth: 50, frameHeight: 68 })
    this.load.spritesheet('stellar_left_03', 'static/assets/stellar_running_left_03.png', { frameWidth: 46, frameHeight: 68 })
    this.load.spritesheet('stellar_left_04', 'static/assets/stellar_running_left_04.png', { frameWidth: 46, frameHeight: 68 })
    this.load.spritesheet('stellar_left_05', 'static/assets/stellar_running_left_05.png', { frameWidth: 46, frameHeight: 68 })
    this.load.spritesheet('stellar_left_06', 'static/assets/stellar_running_left_06.png', { frameWidth: 50, frameHeight: 68 })
    this.load.spritesheet('stellar_left_07', 'static/assets/stellar_running_left_07.png', { frameWidth: 46, frameHeight: 68 })
    this.load.spritesheet('stellar_left_08', 'static/assets/stellar_running_left_08.png', { frameWidth: 46, frameHeight: 68 })

    this.load.spritesheet('stellar_fire_right', 'static/assets/stellar_running_right_gun_02.png', { frameWidth: 68, frameHeight: 68 })
    this.load.spritesheet('stellar_fire_left', 'static/assets/stellar_running_left_gun_02.png', { frameWidth: 68, frameHeight: 68 })

    this.load.spritesheet('beaver', 'static/assets/beaver.png', { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('beaver_standing', 'static/assets/beaver_standing.png', { frameWidth: 61, frameHeight: 43 });
    this.load.audio('background_music', ["static/assets/space_theme_song.mp3", "static/assets/space_theme_song.ogg"]);
  }
  create(){
    this.scene.start("PlayGame");
  }
}
