export default class Player {
  constructor(object, sprite) {
    this.player = object.physics.add.sprite(100, 450, sprite);

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

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