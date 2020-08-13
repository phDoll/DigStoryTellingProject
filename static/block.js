export default class Block {
  constructor(object , timesX, timesY, x, y) {
    for(var i = 0; i <= timesX; i++) {
      var new_x = x + i * 60
      this.platform = object.platforms.create(new_x, y, 'block')
      var j = 0
      for (j; j <= timesY; j++) {
        this.platform = object.platforms.create(new_x, y - j * 60, 'block')
      }
    }
  }
}