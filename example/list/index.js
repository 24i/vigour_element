require('vigour-scratch/lib/mixins.less')
require('./style.less')

var Observable = require('vigour-js/lib/observable')
var Element = require('../../lib/element')
var data = require('../content.json')
var App = require('../../lib/app')

Observable.prototype.inject(
  require('vigour-js/lib/operator/subscribe'),
  require('vigour-js/lib/operator/transform')
)

Element.prototype.inject(
  require('../../lib/property/text'),
  require('../../lib/property/css'),
  require('../../lib/property/size'),
  require('../../lib/property/scroll/top'),
  require('../../lib/property/scroll/left'),
  require('../../lib/property/transform'),
  require('../../lib/events/click')
)

var Item = new Element({
  titlefield: {
    text: {
      $: '../../title'
    }
  },
  descriptionfield: {
    text: {
      $: '../../description'
    }
  },
  on: {
    click () {
      this.lookUp('navigation').val = this.origin
    }
  }
})

var app = new App({
  node: document.body,
  properties:{
    navigation: new Observable()
  },
  navigation: new Observable({
    title: 'Home'
  }),
  topbar: {
    text: {
      $: '../../navigation.title'
    }
  },
  list: {
    scrollTop: 180,
    ChildConstructor: Item,
    $transform: data.shows
  }
})
