const {nanoid} = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) =>{
    const {
        name,
        year,
        author,
        summary,
        publisher = 0,
        pageCount = 0,
        readPage = 0, 
        reading = false
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date();
    const updateAt = insertedAt;
    let finished = false;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updateAt
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length>0;
    const noBookName = books.filter((book) => book.name !== undefined);
    if (isSuccess && noBookName) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data:{
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    
    if (noBookName){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    const noMoreRP = books.filter((book) => book.readPage > pageCount);
    if (noMoreRP){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku'
    });
    response.code(400);
    return response;
}

const getAllBooks = () => ({
    status: 'success',
    data: {
        books,
    },
});

//const

module.exports = {addBookHandler, getAllBooks};