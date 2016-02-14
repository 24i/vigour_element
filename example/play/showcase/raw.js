module.exports = {
  discover: {
    title: 'Discovery',
    icon: 'discover',
    items: {
      carousel: {
        order: -1,
        items: [
          [ '$', 'movies', 'items', 'lobster' ],
          [ '$', 'shows', 'items', 'got' ]
        ]
      },
      channels: {
        // link: [ '$', 'channels' ],
        title: 'Now on TV',
        items: [
          [ '$', 'channels', 'items', 'adb' ],
          [ '$', 'channels', 'items', 'adb' ],
          [ '$', 'channels', 'items', 'adb' ],
          [ '$', 'channels', 'items', 'adb' ],
          [ '$', 'channels', 'items', 'adb' ]
        ]
      },
      continue: {
        title: 'Continue Watching',
        items: [
          [ '$', 'movies', 'items', 'lobster' ],
          [ '$', 'shows', 'items', 'got' ],
          [ '$', 'shows', 'items', 'lilyhammer' ],
          [ '$', 'shows', 'items', 'lilyhammer' ],
          [ '$', 'shows', 'items', 'got' ]
        ]
      },
      subscriptions: {
        title: 'My Subscriptions',
        items: [
          [ '$', 'movies', 'items', 'lobster' ]
        ]
      },
      'recommended:posters': {
        'title': 'Recommended for you',
        'items': [
          [ '$', 'movies', 'items', 'lobster' ],
          [ '$', 'shows', 'items', 'got' ],
          [ '$', 'movies', 'items', 'sw' ],
          [ '$', 'movies', 'items', 'h8' ],
          [ '$', 'shows', 'items', 'lilyhammer' ],
          [ '$', 'movies', 'items', 'lobster' ]
        ]
      }
    }
  },
  channels: {
    title: 'Channels',
    icon: 'channels',
    items: {
      adb: {
        title: 'Abu Dahbi HD',
        current: {
          title: 'Riksons show',
          time: 0.5,
          subtitle: '18:30 - 19:00'
        },
        img: {
          thumb: 'http://www.dubaichronicle.com/wp-content/uploads/2009/07/AD-HD-Logo.jpg'
        }
      }
    }
  },
  movies: {
    title: 'Movies',
    icon: 'film',
    items: {
      lobster: {
        title: 'The Lobster',
        subtitle: '(2009) 201 min',
        time: 0.5, // default s 0
        img: {
          val: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg',  // 2:1
          thumb: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg', // 4:3
          poster: 'http://t3.gstatic.com/images?q=tbn:ANd9GcSaKfl0Zhblzcs8L1MTgdnhKqKuO8UlsM8gH8d2msIMczbX3hX1' // 2:3
        }
      },
      sw: {
        title: 'Star Wars: The Force Awakens',
        subtitle: '(2009) 201 min',
        time: 0.5, // default s 0
        img: {
          val: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg',  // 2:1
          thumb: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg', // 4:3
          poster: 'http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2015/10/star-wars-force-awakens-official-poster.jpg' // 2:3
        }
      },
      h8: {
        title: 'The Lobster',
        subtitle: '(2009) 201 min',
        time: 0.5, // default s 0
        img: {
          val: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg',  // 2:1
          thumb: 'http://www.theshiznit.co.uk/media/2015/October/Lobster1.jpg', // 4:3
          poster: 'https://upload.wikimedia.org/wikipedia/en/d/d4/The_Hateful_Eight.jpg' // 2:3
        }
      }
    }
  },
  shows: {
    title: 'Shows',
    icon: 'shows',
    items: {
      got: {
        title: 'Game of Thrones',
        subtitle: '2 Seasons - 12 Episodes',
        time: 0.5,
        img: {
          val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
          thumb: 'http://static4.businessinsider.com/image/4f74d5f569bedd863a000012/stark-family-game-of-thrones.jpg',
          poster: 'http://www.hollywoodreporter.com/sites/default/files/2011/03/got_-_official_poster.jpg' // 2:3
        }
      },
      lilyhammer: {
        title: 'Lilyhammer',
        subtitle: '2 Seasons - 12 Episodes',
        time: 0.5,
        img: {
          val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
          thumb: 'http://www.spin1038.com/content/000/images/000031/33064_54_news_hub_28045_630x480.jpg',
          poster: 'https://s-media-cache-ak0.pinimg.com/736x/b9/73/e4/b973e435b10fed3b698cbde17979f22c.jpg' // 2:3
        }
      },
      mf: {
        title: 'Game of Thrones',
        subtitle: '2 Seasons - 12 Episodes',
        time: 0.5,
        img: {
          val: 'http://static1.squarespace.com/static/528b0a4be4b0d32bd54a0862/t/53a7386be4b04854556bc822/1403467898455/Game-of-Thrones-poster.jpg',
          thumb: 'http://static4.businessinsider.com/image/4f74d5f569bedd863a000012/stark-family-game-of-thrones.jpg',
          poster: 'http://www.hollywoodreporter.com/sites/default/files/2011/03/got_-_official_poster.jpg' // 2:3
        }
      }
    }
  }
}
