// Book Class (will instantiate book objects)

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class (Handle all UI events)

class UI {
  static displayBooks() {
    // set books object to Store class' getBooks method
    const books = Store.getBooks();

    // call method on each book
    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    // get the booklist from the DOM
    const list = document.querySelector("#book-list");

    // create the row to go into the tbody
    const row = document.createElement("tr");

    // add columns
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    // append row to the list
    list.appendChild(row);
  }

  // create function to delete a book
  static deleteBook(el) {
    // check the object clicked contains the delete class
    if (el.classList.contains("delete")) {
      // target the element to be deleted
      el.parentElement.parentElement.remove();
    }
  }

  // create function to show validation alerts
  static showAlert(message, className) {
    // create a div
    const div = document.createElement("div");
    // add classes
    div.className = `alert alert-${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // grab elements to insert into
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    // insert the div before the form
    container.insertBefore(div, form);
    // disappear after 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  // create function to clear form fields
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Store Class (Handles storage)
class Store {
  // create static functions so they can be called directly without having to instantiate the store class

  // get books func
  static getBooks() {
    // initialise a variable for books
    let books;
    // check if a current book item exists in local storage
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      // set books var to array from local storage
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  // add book func
  static addBook(book) {
    // get books from local storage
    const books = Store.getBooks();
    // push the new book into it
    books.push(book);
    // stringify books object & set it back to local storage
    localStorage.setItem("books", JSON.stringify(books));
  }

  // remove book func
  static removeBook(isbn) {
    // get books from local storage
    const books = Store.getBooks();
    // loop through them
    books.forEach((book, index) => {
      // check if isbn being pased in matches
      if (book.isbn === isbn) {
        // slice it out
        books.splice(index, 1);
      }
    });
    // reset local storage
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: Display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a book
document.querySelector("#book-form").addEventListener("submit", e => {
  // Prevent actual submit
  e.preventDefault();

  // get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validation
  if (title === "" || author === "" || isbn === "") {
    // call alert function, pass in message & classname
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instantiate book & pass in values from the form fields
    const book = new Book(title, author, isbn);

    // Add book to UI
    UI.addBookToList(book);

    // Add book to Store
    Store.addBook(book);

    // Display success message
    UI.showAlert("Book Added", "success");

    // Clear form fields after submit
    UI.clearFields();
  }
});

// Event: Remove a book
document.querySelector("#book-list").addEventListener("click", e => {
  // Remove from the UI
  UI.deleteBook(e.target);

  // Remove from the Store (must pass in isbn)
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Display success message
  UI.showAlert("Book Removed", "success");
});
