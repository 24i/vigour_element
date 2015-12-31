'use strict'
var Element = require('../../lib/element')
var Event = require('vigour-js/lib/event')
var Observable = require('vigour-js/lib/observable')
var App = require('../../lib/engine/dom')
var debug = require('vigour-js/lib/util/debug')
require('./style.less')
// ******************** CONFIG ********************
var n = 1e3
// ************************************************
var app = new App()

var Title = new Element({
  type: 'h3',
  text: 'yo'
}).Constructor

var Thing = new Element({
  css: 'thing',
  img: {
    type: 'img',
    src: 'http://vignette1.wikia.nocookie.net/scarface/images/4/44/Tony_Montana.jpg/revision/latest/scale-to-width-down/300?cb=20120604034628&path-prefix=en'
  },
  on: {
    click (data, event) {
      // debug.context(app).log('after my parent click!!!!')
      this.getNode().style.border = (Math.random() * 3 + 1) + 'px solid blue'
    }
  },
  theText: {
    text: 'MURDER KAPOT!',
    on: {
      click (ev, event) {
        this.node.style.border = '1px solid red'
        this.text.set(Math.random() * 999)
        // debug.context(app).log('after click-set')
      }
    }
  },
  title: new Title({
    text: function () {
      return this.parent.val
    },
    on: {
      click (data, event) {
        this.getNode().style.border = (Math.random() * 3 + 1) + 'px solid purple'
      },
      flabber (data, event) {
        console.log('FLABBER', this.path, data, event)
      }
    }
  })
}).Constructor

// Thing.prototype.set({
//   yuz: {
//     type: 'img',
//     src: 'http://vignette1.wikia.nocookie.net/scarface/images/4/44/Tony_Montana.jpg/revision/latest/scale-to-width-down/300?cb=20120604034628&path-prefix=en'
//   }
// })

Thing.prototype.title.on('data', function () {
  var node = this.getNode()
  // console.log('yes here')
  if (node) {
    // console.log('yes here go render')
    this.text.render(node)
    this.text.clearContext()
  }
})

// ****************** RENDER PART **********************
console.time('creation')

var holder = new Element({
  css: 'holder',
  '0': {
    type: 'h1',
    text: n
  }
})

global.obs = new Observable({
  define: {
    updateAll () {
      console.time('update')
      var ev = new Event()
      this.each(function (p) {
        p.set(Math.random() * 99, ev)
      })
      ev.trigger()
      console.timeEnd('update')
      // debug.context(app).log('after updateAll')
    }
  }
})
// var event = new Event(holder, 'data')
for (let i = 1; i < n + 1; i++) {
  global.obs.setKey(i, i)
  let a = global.obs[i]
  holder.setKey(i, new Thing({
    title: a
  }, false), false)
}

app.set({
  holder1: new holder.Constructor(),
  holder2: new holder.Constructor()
})

console.timeEnd('creation')


// ****************** DEBUG **********************
console.log('----------- DEBUG --------------')
// console.clear()
// var globals = require('../../lib/engine/dom/globals')
global.app = app
global.nodes = app.nodes
debug.context(app).log('before resolve!')

console.log('START')
// var target = app.holder1[1].theText.text
// app.holder1[1].theText.text.val = 'YO!'
// target.clearContextUp()
debug.context(app).log('after resolve')
// holder[1].title.clearContext()
// app.holder1[1]
console.error('now its happening updace!')
global.obs.updateAll()
// this screws up updates

// console.clear()

// var Base = require('vigour-js/lib/base')
// var d = new Base({
//   // properties: {
//   //   x: new Observable({
//   //     on: {
//   //       data: function () {

//   //       }
//   //     }
//   //   })
//   // },
//   x: {},
//   useVal: true
// })

// var a = new Base({
//   // trackInstances: true,
//   key: 'a',
//   b: {
//     // trackInstances: true,
//     c: {
//       // trackInstances: true,
//       d: new d.Constructor()
//     }
//   }
// })

// var a1 = new a.Constructor({
//   key: 'a1'
// })

// console.clear()

// console.log('????')
// a1.b.c.d.x.val = 'xxx'

// // console.clear()
