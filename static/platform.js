export default class Platform {
  constructor(object , timesX, timesY, x, y, sprite, with_ends) {
    for(var i = 0; i <= timesX; i++) {
      var new_x = x + i * 10
      if (timesX >= 2 && with_ends) {
        if (i == 0) {
          this.platform = object.platforms.create(new_x, y + 600, sprite + '_left')
        } else if (i == timesX) {
          this.platform = object.platforms.create(new_x, y + 600, sprite + '_right')
        } else {
          this.platform = object.platforms.create(new_x, y + 600, sprite)
        }
      } else {
        this.platform = object.platforms.create(new_x, y + 600, sprite)
      }
      var j = 0
      for (j; j < timesY; j++) {
        this.platform = object.platforms.create(new_x, y - j * 10 + 600, sprite)
      }
    }
  }
}