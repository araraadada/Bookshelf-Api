const {nanoid} = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) =>{
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

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
        updatedAt
    };
    if (!name) {
        return h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. Mohon isi nama buku'
        }).code(400);
    }
    if (readPage > pageCount) {
        return h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        }).code(400);
    }

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length>0;
    if(isSuccess){
        return h.response({
            status : 'success',
            message : 'Buku berhasil ditambahkan',
            data:{
                bookId : id,
            },
        }).code(201);
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku'
    });
    response.code(400);
    return response;
}

const getAllBooks = (request, h)=>{
    const {
        name,
        reading,
        finished
    } = request.query;

    let filteredBooks = books;

    if (name) {
        filteredBooks = books.filter((bn) => bn.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (reading) {
        filteredBooks = books.filter((book) => Number(book.reading) === Number(reading));
    }

    if (finished) {
        filteredBooks = books.filter((book) => Number(book.finished) === Number(finished));
    }

    const hasilMap = filteredBooks.map((book) => ({
        id : book.id,
        name : book.name,
        publisher: book.publisher
    }));

    return h.response({
        status: 'success',
        data: {
            books : hasilMap,
        },
    }).code(200);
}

const detailsBook = (request, h) => {
    const {id} = request.params;
    const book = books.filter((n) => n.id === id)[0];

    if (book !== undefined){
        return h.response({
            status: 'success',
            data:{
                book
            },
        }).code(200);
    }
    return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    }).code(404);
};

const updatedBook = (request, h) => {
    const {id} = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage, 
        reading,
    } = request.payload;
    const updatedAt = new Date().toISOString();
    const insertedAt = updatedAt;

    const findBookId = books.filter((n) => n.id === id)[0];
    if (findBookId === undefined){
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        }).code(404);
    }
    if(!name){
        return h.response({
            "status" : "fail",
            "message" : "Gagal memperbarui buku. Mohon isi nama buku"
        }).code(400);
    }
    if(readPage > pageCount){
        return h.response({
            "status" : "fail",
            "message" : "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        }).code(400);
    }

    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        const finished = pageCount === readPage;

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
            insertedAt,
            updatedAt
        };
        return h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        }).code(200);
    }
    return h.response({
        status:'fail',
        message:'Gagal memperbarui buku'
    }).code(400);
}

const deleteBooks = (request, h) => {
    const {id} = request.params;

    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status:'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
}
module.exports = {addBookHandler, getAllBooks, detailsBook, updatedBook, deleteBooks};