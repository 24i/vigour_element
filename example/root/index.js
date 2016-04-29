'use strict'
console.clear()
require('../style.css')
const State = require('vigour-state')
const Element = require('../../lib/element')
const render = require('../../lib/render')
const s = new State({
  key: 'STATE',
  // a: {
  //   b: 'its a.b'
  // },
  c: {
    val: 'bla',
    d: {
      e: 'e'
    }
  }
  // b: 'its root.b'
})

const app = new Element({
  key: 'app',
  text: 'hello',
  a: {
    $: 'a',
    b: {
      text: { $: '$root.b' }, // fucker fires WRONG!
      c: {
        text: { $: '$root.c' }
      }
    }
  }
  // holder: {
  //   // $: '$any.collection'
  //   $any: true, // unify and make easier
  //   $: 'collection',
  //   Child: {
  //     text: { $: '$root.c' }
  //   }
  // }
})

// const app = new Element({ text: 'hello' })
document.body.appendChild(render(app, s, 'dom', function (state, type, stamp, subs, tree, ptree, fromTree) {
  console.error('FIRE:', state.path(), type, stamp, tree, fromTree)
}))

console.log('\n\nCREATE ROOT:')
s.set({ b: 'hello its root b!' })

// s.c.d.e.set('hello its e!')
console.log('\n\nUPDATE ROOT:')
s.set({ b: 'hello its root b!xxxxxxxxxxxxx' })

console.log('\n\nUPDATE ROOTxxx:')

// s.set({ b: 'yuzi!' })

s.set({ c: 'james' })
s.set({ a: {} })

s.set({
  collection: [1, 2, 3, 4]
})

console.log('\n\n\nupdate YUZ')
// shit shit shit <--- root in colleciton wrong!!!!
s.c.set('yuz')
