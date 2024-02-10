window.addEventListener("load", () => {
  getAllBooks();
});

const getAllBooks = () => {
  const url = "http://localhost:3000/api/v1/users/books";
  fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      jwt: sessionStorage.getItem("token"),
      email: sessionStorage.getItem("email")
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let books = data.books.books;

      cons
      ole.log(books);
      books.map((book) => {
        const bookElement = document.createElement("h1");
        bookElement.innerHTML = book.title;
        document.body.appendChild(bookElement);
      });
    });
};
