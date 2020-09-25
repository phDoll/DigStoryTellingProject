export default class Player {
  constructor(object, sprite, x, y) {
    this.player = object.physics.add.sprite(x, y, sprite);

    this.player.setBounce(0.2);

    // object.anims.create({
    //   key: 'left',
    //   frames: object.anims.generateFrameNumbers(sprite, { start: 0, end: 3 }),
    //   frameRate: 10,
    //   repeat: -1
    // });

    object.anims.create({
        key: 'turn',
        frames: [ { key: sprite, frame: "stellar_run 3.aseprite" } ],
        frameRate: 20
    });

    // object.anims.create({
    //     key: 'right',
    //     frames: [{
    //       // key: sprite, frame: "stellar_run 0.aseprite",
    //       // key: sprite, frame: "stellar_run 1.aseprite",
    //       // key: sprite, frame: "stellar_run 2.aseprite",
    //     }],
    //     frameRate: 10,
    //     repeat: -1
    // });
  }

  getPlayer() {
    return this.player
  }
}