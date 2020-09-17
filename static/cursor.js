export default class Cursor {
  constructor(object, player, velocity, doubleJump, sprint) {
    this.object = object
    this.cursor = object.input.keyboard.createCursorKeys();
    this.player = player
    this.jumpVelocity = velocity
    this.doubleJump = doubleJump
    this.sprint = sprint
  }

  getCursor() {
    return this.cursor
  }

  setUpMoves() {
    if (this.cursor.right.isDown)
    {
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
    // } else if (this.cursor.left.isDown) {
    //   this.player.setVelocityX(-160);

    //   this.player.anims.play('left', true);
    } else if (this.cursor.space.isDown) {
      this.player.setVelocityX(460);

      this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }


    // Double jump
    if (this.doubleJump) {
      const didPressJump = Phaser.Input.Keyboard.JustDown(this.cursor.up);

      if (didPressJump) {
        if (this.player.body.onFloor()) {
          // player can only double jump if it is on the floor
          this.canDoubleJump = true;
          this.player.body.setVelocityY(this.jumpVelocity);
        } else if (this.canDoubleJump) {
          // player can only jump 2x (double jump)
          this.canDoubleJump = false;
          this.player.body.setVelocityY(this.jumpVelocity * 2);
        }
      }
    }

    // Speed Boost


    // if (this.cursor.shift.isDown) {
    //   this.player.setVelocityY(-100);
    // }

    // Normal Jump
    if (this.cursor.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(this.jumpVelocity);
    }
  }

  addRestart() {
    if (this.cursor.space.isDown)
    {
      this.object.scene.restart()
    }
  }

  // handleOrb() {
  //   if (this.cursor.left.isDown) {
  //     this.player.x = this.player.x - 10

  //   }
  // }

}