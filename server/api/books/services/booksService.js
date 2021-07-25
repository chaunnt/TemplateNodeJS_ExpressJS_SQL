const DBCon = require('../../../config/database').DB;

const tableName = 'Books';
async function findAll(){
  let books = await DBCon(tableName).select().limit(20);
  return books;
}

async function findById(id) {
  let books = await DBCon(tableName).select().where({id: id});
  if (books && books.length > 0) {
    return books[0];
  } else {
    return undefined;
  }
}

module.exports = {
  findAll,
  findById
};