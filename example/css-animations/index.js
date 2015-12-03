require('./style.less')

var Element = require('../../lib/element')
var app = new Element({
  node: document.body
})

Element.prototype.inject(
  require('../../lib/property/css'),
  require('../../lib/property/text'),
  require('../../lib/property/draggable')
)

app.set({
  hello: {
    text: 'Hello',
    dragable: true
  }
})