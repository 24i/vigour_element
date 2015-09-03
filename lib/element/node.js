"use strict";

exports.$define = {
  /**
   * This returns the node element of the Element.
   * @memberOf Element
   * @type {Element}
   *
   * @example
   *
   *var elem = new Element({
   *  element:{
   *    $css:"style"
   *  }
   *})
   *
   * //This element will be a <div></div> by default.
   *
   * console.log(element.$node) // <div class="style"></div>
   */
  $node: {
    get: function() {
      var node = this._$node
      var context
      var parent
      var nextNode
      var key
      var path
      var length
      var childNodes

      if( !node ) {
        node = document.createElement( 'div' )
        node.$base = this

        if( key = this.$key ) {
          this.$setNodeKey( node, key )
        }

        this._$node = node

      } else if( context = this._$context ) {
        path = this.$path
        length = path.length
        node = context._$node
        childNodes = node.childNodes

        for( var i = length - this._$contextLevel - 1; i < length; i++ ) {
          for( var j = childNodes.length - 1; j >= 0; j-- ) {
            node = childNodes[ j ]

            if( node.nodeType !== 3 ) {
              if( this.$getNodeKey( node ) === path[ i ] ) {
                childNodes = node.childNodes
                break
              }
            }
          }
        }
      }

      return node
    }
  },
  /**
   * This internal function checks if there's a property called $css in the element, if not, it will create
   * a data-key attibute on the tag with the node $key. Otherwise it will create a class attribute with this value
   * @memberOf Element
   * @function $setNodeKey
   *
   * @example
   *
   *var elem = new Element({
   *
   *})
   *
   * app.set({
   *  userBox :new elem.$Constructor
   * })
   *
   * //This element will be a <div class="userBox"></div> by default.
   *
   */
  $setNodeKey: function( node, key ) {
    if( this.$css ) {
      node.setAttribute( 'data-key', key )
    } else {
      node.className = key
    }
  },
  $getNodeKey: function( node ) {
    if( this.$css ) {
      return node.getAttribute( 'data-key' )
    } else {
      return node.className
    }
  }
}

exports.$flags = {
  /**
   * This is a $node flag, and it allows you to specify the node type that you want to create.
   * The default element will be a <div></div>
   * @memberOf Element
   * @function $node
   *
   * @example
   *
   *var elem = new Element({
   *  $node:'section'
   *})
   *
   * //This element will be a <section></section> by default.
   *
   */
  $node: function( node ) {
    var originalNode
    var attributes
    var attribute

    //TODO remove the old node
    if( typeof node === 'string' ) { //maybe move this to the getter
      node = document.createElement( node )
        //if there are attributes, copy these to new node
      if( originalNode = this._$node ) {
        attributes = originalNode.attributes
        for( var i = attributes.length - 1; i >= 0; i-- ) {
          attribute = attributes[ i ]
          node.setAttribute( attribute.nodeName, attribute.value )
        }
      }
    }

    node.$base = this
    this._$node = node
  }
}