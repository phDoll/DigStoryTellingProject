export default class Ground {
  constructor(object , times, x, y) {
    for(var i = 0; i <= times; i++) {
      this.platform = object.platforms.create(x + i*16, y, 'ground')
    }
  }
}