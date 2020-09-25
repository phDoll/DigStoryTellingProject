export default class Player {
  constructor(object, sprite, x, y) {
    this.player = object.physics.add.sprite(x, y, sprite);

    this.player.setBounce(0.2);

    object.anims.create({
      key: 'left',
      frames: [
        { key: "stellar_left_01" , frame: 1 },
        { key: "stellar_left_02" , frame: 1 },
        { key: "stellar_left_03" , frame: 1 },
        { key: "stellar_left_04" , frame: 1 },
        { key: "stellar_left_05" , frame: 1 },
        { key: "stellar_left_06" , frame: 1 },
        { key: "stellar_left_07" , frame: 1 },
        { key: "stellar_left_08" , frame: 1 },
     ],
      frameRate: 15,
      repeat: -1
  });

    object.anims.create({
        key: 'turn',
        frames: [ { key: sprite , frame: 4 } ],
        frameRate: 20
    });

    object.anims.create({
      key: 'fire_right',
      frames: [ { key: "stellar_fire_right" , frame: 5 } ],
      frameRate: 10
    });

    object.anims.create({
      key: 'right',
      frames: [
        { key: "stellar_right_01" , frame: 1 },
        { key: "stellar_right_02" , frame: 1 },
        { key: "stellar_right_03" , frame: 1 },
        { key: "stellar_right_04" , frame: 1 },
        { key: "stellar_right_05" , frame: 1 },
        { key: "stellar_right_06" , frame: 1 },
        { key: "stellar_right_07" , frame: 1 },
        { key: "stellar_right_08" , frame: 1 },
     ],
      frameRate: 15,
      repeat: -1
  });



  //   object.anims.create({
  //     key: 'right',
  //     frames: object.anims.generateFrameNames(sprite, {
  //         start: 0,
  //         end: 8,
  //         zeroPad: 2,
  //         prefix: 'stellar_running_right_',
  //         suffix: '.png'
  //     }),
  //     frameRate: 8,
  //     repeat: -1
  // });

  }

  getPlayer() {
    return this.player
  }
}