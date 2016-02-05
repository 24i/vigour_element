'use strict'
require('./todo.less')
var Element = require('../../lib')
var Observable = require('vigour-js/lib/observable')
Observable.prototype.inject(require('../../lib/subscription/stamp'))

// ----- data ----
var Syncable = require('vigour-hub/lib/syncable')
Syncable.prototype.inject(require('../../lib/subscription/stamp'))
var Hub = require('vigour-hub')
var hub = global.hub = new Hub({
  adapter: {
    inject: require('vigour-hub/lib/protocol/websocket'),
    websocket: 'ws://localhost:3033',
    scope: {
      val: 'james',
      inject: require('vigour-js/lib/observable/storage')
    }
  }
})
var todos = hub.get('shows', {})

// ----- ui -----
var app = global.app = new Element({
  DOM: document.body
})

// ----- todo -----
var Todo = new Element({
  type: 'li',
  view: {
    toggle: {
      type: 'input',
      attributes: {
        type: 'checkbox',
        checked: {
          $: 'done',
          $type: 'boolean'
        }
      },
      on: {
        change () {
          var data = this.state.data.get('done', {})
          data.val = !data.val
        }
      }
    },
    css: {
      $: 'done',
      $transform (val) {
        return val ? 'haha' : 'no'
      }
    },
    title: {
      type: 'label',
      text: {
        $: 'title'
      }
    },
    destroy: {
      type: 'button',
      on: {
        down () {
          this.state.data.remove()
        }
      }
    }
  },
  edit: {
    type: 'input'
  }
}).Constructor

app.set({
  time: {
    text: {}
  },
  todoapp: {
    header: {
      type: 'header',
      title: {
        type: 'h1',
        text: 'todo-app'
      },
      user: {
        type: 'input',
        css: 'new-todo',
        value: hub.adapter.scope,
        on: {
          keyup (e, event) {
            hub.adapter.scope.set(e.currentTarget.value, event)
          }
        }
      },
      ['new-todo']: {
        type: 'input',
        attributes: {
          placeholder: {
            val: hub.adapter.scope,
            $add: ', what needs to be done?'
          }
        },
        on: {
          keydown (e, event) {
            if (e.keyCode === 13) {
              todos.set({ [todos._speshkeys.length]: {
                title: e.currentTarget.value || 'new todo' }
              }, event)
              e.currentTarget.value = ''
            }
          }
        }
      },
      main: {
        type: 'section',
        ['toggle-all']: {
          type: 'input',
          attributes: {
            type: 'checkbox',
            checked: true
          }
        },
        ['todo-list']: {
          type: 'ul',
          $collection: true,
          Child: Todo,
          val: todos
        },
        buttons: {
          removeall: {
            type: 'button',
            text: 'remove all',
            on: {
              click () {
                todos.clear()
              }
            }
          }
        }
      }
    }
  }
})
