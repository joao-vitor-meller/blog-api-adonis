'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments() // irá criar a coluna 'id' (PK) em 'posts'
      table // FK para 'users'
        .integer('user_id') // nome da coluna a ser criada na tbl 'posts'
        .unsigned()
        .references('id') // nome da PK em 'users'
        .inTable('users')
        .onUpdate('CASCADE') 
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('body').notNullable()
      table.timestamps() 
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
