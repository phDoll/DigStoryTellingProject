export default class Spikes {
  constructor(object , timesX, timesY, x, y, sprite) {
    // for(var i = 0; i < times; i++) {
    //   this.spikes = object.spikes.create(x + i*10, y, sprite)
    // }

    for(var i = 0; i <= timesX; i++) {
      var new_x = x + i * 10
      this.platform = object.spikes.create(new_x, y + 600, sprite)
      var j = 0
      for (j; j <= timesY; j++) {
        this.platform = object.spikes.create(new_x, y - j * 10 + 600, sprite)
      }
    }
  }
}