export default class Spikes {
  constructor(object , times, x, y, player) {
    for(var i = 0; i <= times; i++) {
      this.spikes = object.spikes.create(x + i*16, y, 'spikes')
    }
  }


}