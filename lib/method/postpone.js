'use strict'
exports.on = {
  remove: {
    postpone () {
      this.clearPostponed()
    }
  }
}

exports.define = {
  postpone (id, fn, time) {
    var props = this.state.props
    if (!props) {
      props = this.state.props = {}
    }
    if (typeof id === 'function') {
      time = fn
      fn = id
      id = 'val'
    }
    if (!props._postponed) {
      if (props._postponed === null) {
        return
      }
      props._postponed = {}
    } else if (props._postponed[id]) {
      clearTimeout(props._postponed[id])
      props._postponed[id] = null
    }
    let store = this.storeContext()
    let _this = this
    props._postponed[id] = setTimeout(() => {
      props._postponed[id] = null
      _this.applyContext(store)
      fn.call(_this)
    }, time)
  },
  clearPostponed (id) {
    var props = this.state.props
    var postponed = props._postponed
    if (postponed) {
      if (id === void 0) {
        for (var i in postponed) {
          clearTimeout(postponed[i])
          postponed[i] = null
        }
      } else {
        clearTimeout(postponed[id])
        postponed[id] = null
      }
    }
  }
}