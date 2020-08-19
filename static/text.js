export default class Text {
  constructor(object , x, y, width, text) {
    this.text = object.make.text({
      x: x,
      y: y,
      padding: {
          left: 16,
          right: 16,
          top: 20,
          bottom: 20
          //x: 32,    // 32px padding on the left/right
          //y: 16     // 16px padding on the top/bottom
      },
      text: text,
      style: {
          fontSize: '12px',
          fontFamily: 'Arial',
          color: '#333333',
          align: 'left',  // 'left'|'center'|'right'|'justify'
          backgroundColor: '#ffffff',
          wordWrap: { width: width }
      },
      add: true
  })
  }

  getText() {
    return this.text
  }
}