const {nanoid} = require('nanoid');
const books = require('./books');
const allBooks = require('./books');

const addBookHandler = (request, h) =>{
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished, 
        reading
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updateAt = insertedAt;

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
        if(!name){
            return h.response({
                "status" : "fail",
                "message" : "Gagal menambahkan buku. Mohon isi nama buku"
            }).code(400)
        }
        if(readPage > pageCount){
            return h.response({
                "status" : "fail",
                "message" : "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400)
        }
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

const getAllBooks = (request, h) => {
    const hasilMap = allBooks.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    const response = h.response({
        status: 'success',
        data: {
            books: hasilMap,
        },
    });
    response.code(200);
    return response;
}

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
        finished
    } = request.payload;
    const updateAt = new Date().toISOString();
    const insertedAt = updateAt;

    const findBookId = books.filter((n) => n.id === id)[0];
    if (findBookId === undefined){
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        }).code(404);
    }

    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
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
    return response;
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