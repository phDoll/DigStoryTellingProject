export default class NPC {
  constructor(object, sprite, x, y) {
    this.npc = object.physics.add.sprite(x, y, sprite);
  }

  getNPC() {
    return this.npc
  }
}