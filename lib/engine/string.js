'use strict'
var Observable = require('vigour-js/lib/observable')
var Prop = require('../property')
// string renderer
// **** TODO ****
// * call it html
          var Event = require('vigour-js/lib/event')

module.exports = new Observable({
  properties: {
    prerendered: true
  },
  ChildConstructor: require('../element'),
  define: {
    serialize () {
      if (this.___cache) {
        return this.___cache
      }
      var obj = {}
      var str = ''
      var Element = this.ChildConstructor
      walk(this, obj, 0)
      // hash the stamp!
      // combine with the datax
      this.___cache = str // CLEAR IT!
      return str
      function walk (obs, obj, level) {
        // console.log('lets walk it!', level, obj, obs.path)
        obs.each(function (prop, key) {
          if (key === 'text') {
            str += (indent(level) + '  ' + prop.val)
          }
        }, function (prop) { return (prop instanceof Prop) })
        obs.each(function (prop, key) {

          var type = prop.type || 'div'
          obj[key] = {}
          str += (indent(level) + '<' + type + ' class="' + (prop.css ? key + ' ' + prop.css.val : key) + '"') +
          ' data-hash="' + prop.getHashedPath() + '"'
          // ' debug-path="' + prop.path.join('.') + '"'
          if (prop.src) {
            str += ' src="' + prop.src.val + '"'
          }
          // if (prop.image) {
          //   str += ' style="background-image: url(' + prop.image.val + ')"'
          // }
          str += '>'
          if (prop.next && prop.next.execute) {
            var ev = new Event('data')
            prop.next.execute(ev)
            ev.trigger()
          }

          walk(prop, obj[key], (level + 1))
          str += (indent(level) + '</' + type + '>')
        }, function (prop) {
          return (prop instanceof Element)
        })
      }
    }
  },
  inject: require('vigour-js/lib/operator/transform'),
  $transform () {
    return this.serialize()
  }
}).Constructor

function indent (level) {
  var str = '\n  '
  for (var i = 0; i < level; i++) {
    str += '  '
  }
  return str
}