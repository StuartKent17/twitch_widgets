var path = require('path')
var argv = require('minimist')(process.argv.slice(2))

module.exports = {
  APP_NAME: 'Electron Multiple Windows Demo',
  INDEX: 'file://' + path.resolve(__dirname, '..', 'renderer', 'index.html'),
  COUNT: 'file://' + path.resolve(__dirname, '..', 'renderer', 'count.html'),
  PHASES: 'file://' + path.resolve(__dirname, '..', 'renderer', 'phases.html'),
  PLAYERS: 'file://' + path.resolve(__dirname, '..', 'renderer', 'players.html'),
  DEBUG: argv.debug
}
