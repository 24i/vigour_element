'use strict'

var BitdashPlayer = {
  define: {
    getTime () {
      return this.ready.val ? (this.bitdashInstance.getCurrentTime() / this.duration.val) : 0
    },
    getBuffer () {
      if (!this.ready.val) {
        return 0
      }
      return (this.bitdashInstance.getCurrentTime() + this.bitdashInstance.getVideoBufferLength()) / this.duration.val
    }
  },
  inject: [
    require('../../../lib/events/render'),
    require('./ad')
  ],
  properties: {
    bitdashInstance: true
  },
  ready: {
    $type: 'boolean',
    inject: require('vigour-js/lib/observable/is')
  },
  on: {
    render: {
      bitdash () {
        loadDependencies.call(this)
      }
    },
    load: {
      bitdash (data, event) {
        this.source.emit('data', null, event)
        this.volume.emit('data', null, event)
      }
    },
    videoReady: {
      bitdash (data, event) {
        this.duration.val = this.bitdashInstance.getDuration()
        this.volume.emit('data', null, event)
        this.play.emit('data', null, event)
        this.ready.val = true
      }
    },
    finished: {
      bitdash (data, event) {
        this.play.val = false
      }
    }
  },
  source: {
    inject: [
      require('vigour-js/lib/methods/plain'),
      require('vigour-js/lib/observable/is')
    ],
    dash: {
      $type: 'string',
      on: { data: { handle: handleSource } }
    },
    hls: {
      $type: 'string',
      on: { data: { handle: handleSource } }
    },
    progressive: {
      $type: 'string',
      on: { data: { handle: handleSource } }
    },
    poster: {
      $type: 'string',
      on: { data: { handle: handleSource } }
    },
    on: {
      data: {
        handle: handleSource
      }
    }
  },
  play: {
    on: {
      data: {
        handle (data, event) {
          if (!this.parent.rendered || !hasSource.call(this)) {
            return
          }
          this.parent.ready.is(true, () => {
            if (this.val) {
              this.parent.bitdashInstance.play()
            } else {
              this.parent.bitdashInstance.pause()
            }
          }, event)
        }
      }
    }
  },
  volume: {
    on: {
      data: {
        handle () {
          if (!this.parent.rendered || !hasSource.call(this)) {
            return
          }
          this.parent.bitdashInstance.setVolume(this.val * 100)
        }
      }
    }
  },
  time: {
    on: {
      data: {
        handle (data, event) {
          var player = this.parent.bitdashInstance
          if (!this.parent.rendered || !hasSource.call(this) || this.parent.isProgress(event)) {
            return
          }
          player.seek(this.parent.duration.val * this.val)
        }
      }
    }
  }
}

module.exports = function (element) {
  element.set(BitdashPlayer)
}

function hasSource () {
  return this.parent.source && (
    this.parent.source.dash ||
    this.parent.source.progressive ||
    this.parent.source.hls
  )
}

function handleSource () {
  var obj, parent
  var newObj = {}
  if (typeof this.val === 'string') {
    obj = this.parent
    parent = this.parent.parent
  } else {
    obj = this.val
    parent = this.parent
  }
  if (!parent.rendered) {
    return
  }
  if (typeof obj.plain === 'function') {
    obj = obj.plain()
  }
  Object.keys(obj).forEach((k) => {
    var val = obj[k]
    if (val && typeof val === 'string') {
      newObj[k] = val
    }
  })
  parent.ready.val = false
  parent.bitdashInstance.load(newObj)
}

function loadDependencies () {
  var opts = this.options
  var bitdashScript = document.createElement('script')
  bitdashScript.type = 'text/javascript'
  bitdashScript.src = opts && opts.bitdashScriptUrl
  bitdashScript.id = 'bitdash-script'
  bitdashScript.onload = () => {
    /* global bitdash */
    this.bitdashInstance = bitdash(this.node.id).setup({
      key: opts.key,
      style: {
        ux: false,
        width: opts.width || '100%'
      },
      events: {
        onReady: () => {
          this.emit('videoReady')
        },
        onPlaybackFinished: () => {
          this.emit('finished')
        },
        onError: () => {
          console.error(arguments)
        }
      }
    })
    this.emit('load')
  }

  document.getElementsByTagName('head')[0].appendChild(bitdashScript)
}