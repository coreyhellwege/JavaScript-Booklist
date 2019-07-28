# JavaScript Booklist

This is a simple app built with plain vanilla JavaScript using ES6 syntax arrow-functions, classes, DOM manipulation and more in somewhat of an MVC style structure.

This app doesn't use a library or framework and is not connected to a database. Instead it utilises `local storage` in the browser to store book entries.

Considering `local storage` only accepts key-value pairs in the form of strings, our <b>book</b> objects have to first be stringified using `JSON.stringify()` before they can be saved. As a result we have a <b>books</b> key containing an array of all book entries.

When the array of books is extracted from local storage it has to then be parsed from a string back into a JavaScript object using `JSON.parse()`.

## How to run

Open `index.html` in your browser

## Dependencies

- [Bootswatch](https://bootswatch.com) - Stylesheet used for the UI, using theme: [Lux](https://bootswatch.com/lux/)
- [Font Awesome](https://fontawesome.com) - Just used for the book icon

## Acknowledgements

[Tutorial](https://www.youtube.com/watch?v=JaMCxVWtW58&list=WL&index=6&t=98s) by [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)
