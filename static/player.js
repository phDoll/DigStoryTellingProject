export default class Player {
  constructor(object, sprite, x, y) {
    this.player = object.physics.add.sprite(x, y, sprite);

    this.player.setBounce(0.2);

    object.anims.create({
      key: 'left',
      frames: object.anims.generateFrameNumbers(sprite, { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    object.anims.create({
        key: 'turn',
        frames: [ { key: sprite, frame: 4 } ],
        frameRate: 20
    });

    object.anims.create({
        key: 'right',
        frames: object.anims.generateFrameNumbers(sprite, { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
  }

  getPlayer() {
    return this.player
  }
}