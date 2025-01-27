import {connectionSetting, connectionPool} from './constant'

module.exports = require('knex')({
  client: 'mysql',
  version: '8.0',
  connection: connectionSetting,
  pool:connectionPool,
  migrations: {
    tableName: 'knex_migrations'
  },
  acquireConnectionTimeout: 3000
})