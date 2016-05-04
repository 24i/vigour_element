'use strict'
const props = require('../render/static').property

exports.components = {
  group: {
    type: 'property',
    define: {
      tempVal (type, stamp, subs, tree) {
        const val = this.compute()
        const store = []
        props(this, type, stamp, subs, tree, store)
        return join(store, val)
      },
      storeVal (state, type, stamp, subs, tree, uid) {
        const val = state ? this.compute(state.val) : this.compute()
        const store = tree._[uid] || (tree._[uid] = [])
        if (!store._passed) {
          props(this, type, stamp, subs, tree, store)
          store._passed = true
        }
        return join(store, val)
      }
    },
    Child: {
      define: {
        getStore (tree) {
          const ptree = tree._p
          const _ = ptree._ || (ptree._ = {})
          // totally wrong UID!
          const uid = this.parent._uid
          return _[uid] || (_[uid] = [])
        }
      }
    },
    defaultSubscription: 'done'
  }
}

function join (store, val) {
  if (typeof val === 'string') {
    store[0] = val
  }
  return store.join(' ')
}