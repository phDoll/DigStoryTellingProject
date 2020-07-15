export default class Cursor {
  constructor(object, player) {
    this.cursor = object.input.keyboard.createCursorKeys();
    this.player = player
  }

  getCursor() {
    return this.cursor
  }

  setUpMoves() {
    if (this.cursor.left.isDown)
    {
        this.player.setVelocityX(-160);

        this.player.anims.play('left', true);
    }
    else if (this.cursor.right.isDown)
    {
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }

    if (this.cursor.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }
  }
}