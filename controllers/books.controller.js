const { allBooks, bookById, newBook, modifyBook, removeBook } = require('../services/book.service');
const {validateNewBook, validateUpdateBook} = require('../validation/book.validator');

const books = [
    {
        id: 1,
        title: "JS",
        author: "JS Auth",
        publish: 2019
    },
    {
        id: 2,
        title: "CSS",
        author: "CSS Auth",
        publish: 2001
    },
    {
        id: 3,
        title: "HTML",
        author: "HTML Auth",
        publish: 2022
    },
    {
        id: 4,
        title: "JS",
        author: "Node Auth",
        publish: 2005
    },
];

const rootMsg = (req, res) => {
    res.send("Hello From Express JS");
}

const getAllBooks = async (req, res) => {
    res.send(await allBooks());
}

const getBooksById = async (req, res) => {
    const book = await bookById(req.params.id);

    if (!book) {
        res.status(404).send("The book with id: " + req.params.id + " not exists")
    } else {
        res.send(book);
    }
}

const createBook = async (req, res) => {
    const {error, value} = validateNewBook(req.body);

    if(error) {
        res.status(400).send({message: "Error happened while creating new book"});
        console.log(error)
        return;
    }

    res.send(await newBook(value));
}

const updateBook = async (req, res) => {
    const book = await bookById(req.params.id);

    if (!book) {
        res.status(404).send("The book with id: " + req.params.id + " not exists");
        return;
    }

    const {error, value} = validateUpdateBook(req.body);

    if(error) {
        res.status(400).send({message: "Error happened while updating"});
        return;
    }

    await modifyBook(req.params.id, req.body);
 
    res.send(await bookById(req.params.id));
}

const deleteBook = async (req, res) => {
    const book = await bookById(req.params.id);

    if (!book) {
        res.status(404).send("The book with id: " + req.params.id + " not exists");
        return;
    }

    await removeBook(req.params.id);

    res.send(book);
}

module.exports = {
    books,
    rootMsg,
    getAllBooks,
    getBooksById,
    createBook,
    updateBook,
    deleteBook
}