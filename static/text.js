export default class Text {
  constructor(object , x, y, width, height, quote, offset, fontSize) {
    var bubbleWidth = width;
    var bubbleHeight = height;
    var bubblePadding = 10;
    var arrowHeight = bubbleHeight / 4;

    this.bubble = object.add.graphics({ x: x, y: y });

    //  this.bubble shadow
    this.bubble.fillStyle(0x222222, 0.5);
    this.bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  this.bubble color
    this.bubble.fillStyle(0xffffff, 1);

    //  this.bubble outline line style
    this.bubble.lineStyle(4, 0x565656, 1);

    //  this.bubble shape and outline
    this.bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    this.bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    var point1X = Math.floor(bubbleWidth / 7);
    var point1Y = bubbleHeight;
    var point2X = Math.floor((bubbleWidth / 7) * 2);
    var point2Y = bubbleHeight;
    var point3X = Math.floor(bubbleWidth / 7);
    var point3Y = Math.floor(bubbleHeight + arrowHeight);

    //  this.bubble arrow shadow
    this.bubble.lineStyle(4, 0x222222, 0.5);
    this.bubble.lineBetween(point2X + offset - 1, point2Y + 6, point3X  + offset + 2, point3Y);

    //  this.bubble arrow fill
    this.bubble.fillTriangle(point1X + offset, point1Y, point2X + offset, point2Y, point3X + offset, point3Y);
    this.bubble.lineStyle(2, 0x565656, 1);
    this.bubble.lineBetween(point2X + offset, point2Y, point3X + offset, point3Y);
    this.bubble.lineBetween(point1X + offset, point1Y, point3X + offset, point3Y);

    var content = object.add.text(0, 0, quote, { fontFamily: 'DogicaRegular', fontSize: fontSize, lineSpacing: 5, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });

    var b = content.getBounds();

    content.setPosition(this.bubble.x + (bubbleWidth / 2) - (b.width / 2), this.bubble.y + (bubbleHeight / 2) - (b.height / 2));
  }

  getText() {
    return this.bubble
  }
}