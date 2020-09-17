export default class Enemy {
  constructor(object, sprite, x, y) {
    this.enemy = object.physics.add.sprite(x, y, sprite);
  }

  getEnemy() {
    return this.enemy
  }

  patroling(start, end, speed) {
    if (this.enemy.body !== undefined) {
      if (this.enemy.x < end && this.enemy.body.velocity.x >= 0) {
        this.enemy.body.velocity.x = speed
      } else {
        this.enemy.body.velocity.x = -speed
      }

      if (this.enemy.x > start && this.enemy.body.velocity.x < 0) {
        this.enemy.body.velocity.x = -speed
      } else {
        this.enemy.body.velocity.x = speed
      }
    }
  }
}