'use strict'
var Observable = require('vigour-js/lib/observable')
var app = require('../../lib/app')
var Element = app.ChildConstructor

// require('./style.less')

var Hub = require('vigour-hub')

var hub = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: {
      val: 'ws://jim.local:3031'
    },
    scope: 'james' // 'scope_' + Math.round(Math.random() * 9999)
  }
})

var Input = new Element({
  type: 'input',
  value: {},
  on: {
    keyup () {
      this.value.origin.val = this.node.value
    }
  }
}).Constructor

var Shows = new Element({
  $collection: 'shows',
  Child: new Input({
    value: { $: 'title' }
  })
}).Constructor

var Show = new Element({
  $: true,
  title: new Input({ value: { $: 'title' } }),
  switch: {
    type: 'button',
    text: 'currentEpisode swtich btn',
    on: {
      click () {
        var data = this.parent.origin
        var nr = Math.round(Math.random() * 10)
        console.log(nr)
        data.currentEpisode.val = data.get('seasons.0.episodes.' + nr, {})
      }
    }
  }
  // episode: {
  //   $: 'currentEpisode',
  //   title: {
  //     text: { $: 'title' }
  //   },
  //   time: new Input({
  //     value: { $: 'time' }
  //   })
  // }
  // holder: {
  //   $: 'currentSeason',
  //   switch: {
  //     type: 'button',
  //     text: 'currentSeason swtich btn',
  //     on: {
  //       click () {
  //         var data = this.parent.parent.origin
  //         var nr = Math.round(Math.random() * 7)
  //         console.log(nr)
  //         data.currentSeason.val = data.get('seasons.' + nr, {})
  //       }
  //     }
  //   },
  //   text: { $: 'number' },
  //   episodes: {
  //     type: 'ul',
  //     $collection: 'episodes',
  //     Child: {
  //       type: 'li',
  //       text: { $: 'title' },
  //       time: new Input({
  //         value: { $: 'time' }
  //       }),
  //       on: {
  //         click () {
  //           var data = this.lookUp('_input.currentEpisode')
  //           data.val = this.origin
  //         }
  //       }
  //     }
  //   }
  // }
}).Constructor

app.set({
  // dc: {
  //   type: 'button',
  //   text: {
  //     val: hub.adapter.websocket.connected,
  //     $transform (val) {
  //       return val === true ? 'lets dc' : 'lezzzz connect it!'
  //     }
  //   },
  //   on: {
  //     click (data, event) {
  //       if (hub.adapter.websocket.connected.val) {
  //         hub.adapter.websocket.val = 'ws://blurf.local'
  //         console.log(hub.shows)
  //         hub.shows.each(function (p, key) {
  //           console.log('?????', key)
  //           p.remove(event)
  //         })
  //       } else {
  //         hub.adapter.websocket.val = 'ws://jim.local:3031'
  //       }
  //     }
  //   }
  // },
  // codes: {
  //   $: true,
  //   holder: {
  //     $collection: true,
  //     Child: new Input({
  //       value: {
  //         $: true
  //         // inject: require('vigour-js/lib/operator/type'),
  //         // $type: 'string'
  //       },
  //       on: {
  //         keyup () {
  //           this._input.val = this.node.value
  //         }
  //       }
  //     })
  //   }
  // },
  address: new Input({ value: hub.adapter.websocket }),
  scope: new Input({ value: hub.adapter.scope }),
  shows: new Shows(hub),
  show: new Show(hub.get('shows.2', { title: '......' }))
})

// hub.get('codes', {}).$({
//   '*': {
//     val: true
//   }
// })

// it the codes ofcourse

hub.get('user', {}).$({
  'yo': {
    val: true
  }
})

// app.codes.val = hub.codes

// only have to sub on my own code -- but now we can refresh it
// hub.get('codes', {}).on('property', function (data) {
//   console.log('yoyoyoyoyo', data, data.added)
// })

// setTimeout(function () {
//   hub.set({
//     codes: { [Math.round(Math.random() * 9999)]: '?????' }
//   })
// }, 100)
// setTimeout(function () {
//   hub.set({
//     adapter: {
//       websocket: 'ws://bla.local'
//     }
//   })
// }, 1000)

// get path resolver in add property -- allways add on on orginal and make
