/** integration tests for books route */

process.env.NODE_ENV = "test"

const request = require("supertest");

const app = require("../app");
const db = require("../db");

// isbn of sample book
let book_isbn;

beforeEach(async()=>{
    let result = await db.query(`
    INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
    VALUES(
        '964592340'
        'https://amazon.com/taco',
        'Elie',
        'English',
        100,
        'Not publishers',
        'first book', 2008)
        RETURNING isbn`);
        book_isbn = result.rows[0].isbn
    });

    describe("POST / boks", function() {
        test("Creates a new book", async function (){
            const response = await request(app)
            .post(`/books`)
            .send({
                isbn: '24584547',
                amazon_url: "https://taco.com",
                author: "mtest",
                language: "english",
                pages: 1000,
                pulisher: "not a publisher",
                title: "some title",
                year: 2000
            });
            expect(response.statusCode).toBe(201);
            expect(response.body.book).toHaveProperty("isbn");
        });
        test("Prevents creating book with out required title", async function(){
            const response = await request(app)
            .post(`/book`)
            .send({year:2000});
            expect(response.statusCode).toBe(400);
        });
    });

    describe("GET / books", function (){
        test("gets a list of 1 book", async function (){
            const response = awaitrequest(app).get(`/books`);
            const books = response.body.books;
            expect(books).toHaveLength(1);
            expect(books[0]).toHaveProperty("isbn");
            expect(books[0]).toHaveProperty("amazon_url");
        });
    });

    describe("GET / books/:isbn", function(){
        test("Gets single book", async function(){
            const response = await request(app)
            .get(`/books/${book_isbn}`)
            expect(response.body.book).toHaveProperty("isbn");
            expect(response.body.book.isbn).toBe(book_isbn);
        });

        test("Responds with 404 if cant find book", async function(){
            const response = await request(app)
            .get(`/books/999`)
            expect(response.statusCode).toBe(404);
        });
    });

    describe("PUT /books/:id", function (){
        test("Updates a singgle book", async function(){
            const response = await request(app)
            .put(`/books/${book_isbn}`)
            .send({
                amazon_url: "https://taco.com",
                author: "mtest",
                language: "english",
                pages: 1000,
                pulisher: "not a publisher",
                title: "some title",
                year: 2000
            });
            expect(response.body.book).toHaveProperty("isbn");
            expect(resposne.body.book.title).toBe("UPDATED BOOK");
        });
        test("Prevents a bad book update", async function(){
            const resposne = await request(app)
            .put(`/books/${book_isbn}`)
            .send({
            isbn: '24584547',
            badField: "Dont add",
            amazon_url: "https://taco.com",
            author: "mtest",
            language: "english",
            pages: 1000,
            pulisher: "not a publisher",
            title: "some title",
            year: 2000
        });
        expect(response.statusCode).toBe(400);
    })

    test("Responds 404 if cant find book", async function(){
        //delete book first
        await request(app)
        .delete(`/books/${book_isbn}`)
        const response = await request(app).delete(`/books/${book_isdn}`);
        expect(response.statusCode).toBe(404);
    });
});

describe("DELETE /books/:id", function (){
    test ("Deletes a book", async function () {
        const response = await request(app)
        .delete(`/books/${book_isbn}`)
        expect(response.body).toEqual({message: "BookDEleted"});
    });
});

afterEach(async function(){
    await db.query("DELETE FROM BOOKS");
});

afterAll(async function(){
    await db.end()
});