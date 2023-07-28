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
    if (isSuccess) {
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

const detailsBook = (request, h) => {
    const {id} = request.params;
    const book = books.filter((n) => n.id === id)[0];

    if (book !== undefined){
        return{
            status: 'success',
            data:{
                book,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
};

const updatedBook = (request, h) => {
    const {id} = request.params;

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
    const updateAt = new Date().toISOString();
    let finished = false;

    const index = books.findIndex((book) => book.id === id);
    if (index !== 1) {
        books[index] = {
            ...books[index],
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
            updateAt
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status:'fail',
        message:'Gagal memperbarui buku'
    });
    response.code(400);
}
module.exports = {addBookHandler, getAllBooks, detailsBook, updatedBook};