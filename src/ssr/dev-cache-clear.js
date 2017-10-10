import chokidar from 'chokidar'

const watcher = chokidar.watch('./src')

// thanks to https://medium.com/@kevinsimper/dont-use-nodemon-there-are-better-ways-fc016b50b45e
watcher.on('ready', () => {
  watcher.on('all', () => {
    console.log('Clearing /server/ module cache...')
    Object.keys(require.cache).forEach(id => {
      if (!/node_modules/.test(id)) {
        delete require.cache[id]
      }
    })
  })
})
