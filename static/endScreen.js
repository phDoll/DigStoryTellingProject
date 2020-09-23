
export default class endScreen extends Phaser.Scene {
  constructor() {
    super("endScreen");
  }
  create() {
    this.background = this.add.tileSprite(0, 0, 800, 600, "menu_background");
    // Set its pivot to the top left corner
    this.background.setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this.background.setScrollFactor(0);

    this.headline = this.add.text(100, 100, 'Stellars Time Quest', { fontFamily: 'DogicaRegular', fontSize: 32, fill: '#289900', align: 'center', border: "1px solid red"});
    this.person1 = this.add.text(80, 250, 'Miriam Jost', { fontFamily: 'DogicaRegular', fontSize: 22, fill: '#ffffff', align: 'center'});
    this.person1info = this.add.text(80, 300, 'Story, Sprite Design, Screen Design', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center'});
    this.person2 = this.add.text(80, 400, 'Philipp Doll', { fontFamily: 'DogicaRegular', fontSize: 22, fill: '#ffffff', align: 'center'});
    this.person2info = this.add.text(80, 450, 'Story, Level Design, Game Development', { fontFamily: 'DogicaRegular', fontSize: 18, fill: '#ffffff', align: 'center'});
  }

  update() {
  }
}