/* eslint-disable no-undef */
const systemName = process.argv[2] || 'linux'

const Service = require('node-' + systemName).Service
const { log } = require('console')

// Create a new service object
const svc = new Service({
  name:'Chevron',
  description: 'Backend server of the Chevron startpage',
  script: require('path').join(__dirname, 'server.cjs'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
})

if (systemName === 'linux' ? svc.exists() : svc.exists) {
  log('Unregistering the service')
  svc.uninstall()
} else {
  log('Registering the service')
  svc.install()
}

svc.on('install', () => svc.start())