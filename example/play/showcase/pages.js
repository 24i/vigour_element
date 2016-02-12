require('./style.less')
var e = require('../../../e')
require('vigour-scratch')

// for dev only
var merge = require('lodash/object/merge')

var components = {
  carousel: require('../../../lib/carousel'),
  switcher: require('../../../lib/switcher'),
  // player: require('../../../lib/player')
}

merge(components, require('../components/progress'))
merge(components, require('../components/icon'))
merge(components, require('../components/text'))
merge(components, require('../components/img'))
merge(components, require('../components/item'))

// default on element components are swithcer carousel and player
merge(components, require('../components/list'))

merge(components, require('../components/player'))

merge(components, require('../components/pages'))

// need to refactor plauer to just object
// components.player = require('../../../lib/player')
// console.log(components.player)
// this is of course not the way have to clean up later
// ------

var data = require('./data')
var app = global.app = e({
  key: 'app',
  components: components,
  pages: {
    discover: {
      type: 'discover',
      $: 'discover'
    },
    shows: {
      type: 'shows',
      $: 'shows'
    },
    movies: {
      type: 'movies',
      $: 'movies'
    },
    channels: {
      type: 'channels',
      $: 'channels'
    },
    mixed: { type: 'mixed' },
    video: { type: 'page-video' },
    show: { type: 'show' },
    publisher: { type: 'publisher' }
  },
  DOM: document.body
})

// console.error(data)
app.pages.video.val = data.movies.g()
app.pages.show.val = data.shows.items[2071]
console.error(data)
app.pages.publisher.val = data.publishers.g()

app.val = data
