const { addBookHandler, getAllBooks, detailsBook, updatedBook } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: detailsBook,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updatedBook,
    }
];
module.exports = routes;