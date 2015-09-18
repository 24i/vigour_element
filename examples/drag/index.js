 require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/events/down' )
)

var thing = window.thing = new Element({
  // $draggable: true,
  $css : "teste",
  $on: {

    $down:{
      setX:{
        $x:100
      }
    },

    // $up:function(){
    //   console.log('up')
    // },

    // $dragstart: function (event, e) {
    //   this.set ({
    //     $css: {
    //       $removeClass: 'move'
    //     }
    //   })
    // },

    // $click: function (event, e) {
    //   this.set({
    //     $css: {
    //       $toggleClass: 'blue'
    //     }
    //   })
    // },

    // $dragend: function (event, e){
    //   this.set({
    //     $x: event.startX,
    //     $y: event.startY,
    //     $css: {
    //       $addClass: 'move'
    //     }
    //   })
    // }
  }
})

app.set({
  hello: new thing.$Constructor()
})
