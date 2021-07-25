require('dotenv').config();

var DBCon = require('../config/database');

function timestamps(table) {
  table
    .timestamp('updatedAt')
    .defaultTo(DBCon.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  table.timestamp('createdAt').defaultTo(DBCon.fn.now());
  table.index('createdAt');
  table.index('updatedAt');
}

function newBook() {
  console.log('new Books');
  DBCon.schema.dropTableIfExists('Books').then(() => {
    DBCon.schema
      .createTable('Books', function (table) {
        table.increments('id').primary();
        table.string('bookName');
        timestamps(table);
      })
      .then(() => {
        console.log('Books created');
      });
  });
}

createDatabase();

function createDatabase() {
  newBook();
}

module.exports = {
  createDatabase
}
