const { addBookHandler, getAllBooks, detailsBook, updatedBook, deleteBooks } = require("./handler");

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
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBooks,
    }
];
module.exports = routes;