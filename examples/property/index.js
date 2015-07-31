require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/text' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/size' )
)

window.thing = thing = new Element({
  $on: {
    $click: function(){
      var x = ~~(Math.random() * 200)
      var y = ~~(Math.random() * 200)

      this.$x.$val = x
      this.$y.$val = y
    }
  },
  $x: 1,
  $y: 1,
  span: {
    $node: 'span',
    $text: 'Click me to move!'
  }
})

app.set( {
  a: new thing.$Constructor({
  })
} )