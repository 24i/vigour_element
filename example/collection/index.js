'use strict'
console.clear()
console.time('START')
// for some perf comparisons --> https://github.com/Matt-Esch/virtual-dom/issues/371
const State = require('vigour-state')
const Element = require('../../lib/element')
const render = require('../../lib/render')
// -------------------------
const raf = window.requestAnimationFrame
const isNumber = require('vigour-util/is/number')
// -------------------------
const state = global.state = new State({ name: 'trees' })
const obj = {}
const amount = 2500
for (let i = 0; i < amount; i++) { obj[i] = { title: i } }
state.set({
  collection: obj,
  ms: {} // state compute is very very slow
})
// -------------------------
const app = new Element({
  key: 'app',
  holder: {
    init: {
      text: { $: 'first', $add: ' ms initial render' }
    },
    ms: {
      text: {
        $: 'ms',
        $transform (val) {
          return isNumber(val) ? Math.round(val) : 'not measured'
        },
        $add: ' ms periodic updates'
      }
    },
    elems: {
      text: { $: 'elems', $add: ' dom-nodes' }
    }
  },
  main: {
    holder3: {
      $: 'collection',
      $any: true,
      Child: {
        node: 'span',
        class: 'weirdChild',
        // text: 'haha', // wrong need to see this multiple times (cloneNode(true))
        text: { $: 'title' },
        props: {
          bla: 'hello!'
          // blurf: { $: 'title' }
        },
        style: {
          border: '1px solid white'
          // width: 10
        }
      }
    }//,
    // holder: {
    //   $: 'collection',
    //   $any: true,
    //   Child: {
    //     class: 'nestchild',
    //     on: {
    //       remove (val, stamp, node) {
    //         console.log('FIRE REMOVE:', val, stamp, node)
    //       }
    //     },
    //     star: {},
    //     something: {
    //       a: {
    //         b: {
    //           c: {
    //             text: 'haha'
    //           }
    //         }
    //       }
    //     },
    //     title: {
    //       text: { $: 'title' }
    //     },
    //     header: {
    //       a: {
    //         bla: {
    //           x: {
    //             text: { $: 'x', $prepend: 'x:' }
    //           },
    //           lastname: {
    //             text: {
    //               $: 'title.lastname',
    //               $prepend: 'lname: '
    //             }
    //           }
    //         },
    //         text: {
    //           $: 'title',
    //           $prepend: 'h:',
    //           $transform (val) {
    //             return val
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }
}, false)

console.timeEnd('START')

setTimeout(function () {
  var ms = Date.now()
  document.body.appendChild(render(app, state))
  state.set({ first: Date.now() - ms })
  var cnt = 0
  var total = 0
  function loop () {
    cnt++
    var ms = Date.now()
    var obj = {}
    for (var i = 0; i < amount; i++) {
      obj[i] = {
        title: i + cnt
      }
      // obj[i] = {
      //   title: {
      //     val: i + cnt,
      //     lastname: i + cnt
      //   },
      //   x: i + cnt
      // }
    }
    state.collection.set(obj)
    if (!state.first) {
      state.set({ first: Date.now() - ms })
    } else {
      total += (Date.now() - ms)
      state.ms.set(total / cnt)
    }
    raf(loop)
  }
  state.collection[0].remove()
  loop()
  state.set({ elems: document.getElementsByTagName('*').length })
})