const response = require('../../../middleware/response');
const BookService = require('../services/booksService');

const getAllBooks = async (req, res) => {
  const { query } = req;

  const bookList = await BookService.findAll(query);

  response.success(res, bookList, bookList.length);
};

const getBookById = async (req, res) => {
  const { id } = req.params;

  const book = await BookService.findById(id);

  response.success(res, book);
};

module.exports = {
  getAllBooks,
  getBookById,
};
