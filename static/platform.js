export default class Platform {
  constructor(object , timesX, timesY, x, y) {
    for(var i = 0; i <= timesX; i++) {
      var new_x = x + i * 10
      this.platform = object.platforms.create(new_x, y, 'platform')
      var j = 0
      for (j; j <= timesY; j++) {
        this.platform = object.platforms.create(new_x, y - j * 10, 'platform')
      }
    }
  }
}