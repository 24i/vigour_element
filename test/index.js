'use strict'
var e = require('../e')
var fakeDom = {}
var test = require('tape')
var toHTML = require('vdom-to-html')

test('children and text', function (t) {
  t.plan(1)
  var app = e({
    child: {
      child: {
        text: 'text'
      }
    },
    DOM: fakeDom
  })
  t.equal(
    toHTML(app.renderTree),
    '<div><div class="child"><div class="child">text</div></div></div>'
  )
})

test('attributes, types and data', function (t) {
  t.plan(1)
  var Observable = require('vigour-observable')
  var Data = new Observable({
    inject: require('vigour-observable/lib/data')
  }).Constructor
  var app = e({
    components: {
      checkbox: {
        type: 'input',
        attributes: {
          type: { $: 'node-type' },
          checked: {
            $transform () {
              return true
            }
          }
        }
      }
    },
    child: { type: 'checkbox' },
    val: new Data({ 'node-type': 'checkbox' }),
    DOM: fakeDom
  })

  process.nextTick(function () {
    var output = toHTML(app.renderTree)
    t.equal(
      output,
      '<div><input type="checkbox" checked class="child type-checkbox"></div>'
    )
  })
})

test('css compare functionality with complex types', function (t) {
  t.plan(1)
  var app = e({
    components: {
      a1: {
        text: 'hello!',
        css: { s: 'i-a1' }
      },
      b1: {
        css: { inherits: 'i-b1' },
        a1: { type: 'a1' }
      },
      b2: {
        type: 'b1',
        css: { inherits: 'i-b2' },
      },
      p1: { s: { type: 'b1' } },
      p2: { s: { type: 'b2' } }
    },
    posts: { type: 'p1' },
    DOM: fakeDom
  })
  app.set({ posts: { type: 'p2' }})
  process.nextTick(function () {
    var output = toHTML(app.renderTree)
    t.equal(
      output,
      '<div><div class="posts type-p2"><div class="type-b2 s i-b2"><div class="type-a1 a1 i-a1">hello!</div></div></div></div>'
    )
  })
})

test('creating references to cases before init of an element', function (t) {
  t.plan(1)
  var app = e({
    cases: { $test: true },
    a: { type: 'a1' },
    bla: {
      text: [ '$', 'cases', '$test' ]
    },
    DOM: fakeDom
  })
  var output = toHTML(app.renderTree)
  console.log(output)
})
