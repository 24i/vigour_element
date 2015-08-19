require( './style.less' )

var app = require( '../../lib/app' )
var Element = require( '../../lib/element' )

Element.prototype.inject(
  require( '../../lib/property/css' ),
  require( '../../lib/property/transform' ),
  require( '../../lib/property/opacity' ),
  require( '../../lib/property/transition' ),
  require( '../../lib/property/animate' ),
  require( '../../lib/property/draggable' ),
  require( '../../lib/property/backgroundColor' )
)

var thing = window.thing = new Element( {
  $css : "test",
  $draggable: true,
  $x: {
    $val: 100,
    $animation: {
      $duration: 6
    }
  },
  $y: {
    $val: 200,
    $animation: {
      $duration: 16
    }
  },
  // $opacity: {
  //   $val: 0.1,
  //   $animation: {
  //     $duration: 24
  //   }
  // },
  $on:{
    $dragend:function(){
      console.log('DRAGEND')
      this.set({
        $x:0,
        $y:0
      })
    $transitionEnd:function( event ){
      console.log('transitionEnd',event)
    }
  }
})

app.set({
  hello: thing,
  $on: {
    $click: function(event, e){
      // this.hello.set({
      //   $x: e.x,
      //   $y: e.y
      //   // $opacity: Math.random()
      // })
    }
  }
})