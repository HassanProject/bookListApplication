
// Book Constructor ES5  Way
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor ES5 Way
function UI() {};

// Prototype

document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value;
        author = document.getElementById('author').value;
        isbn = document.getElementById('isbn').value;

// Instantiate Book Object 
const book = new Book(title,author,isbn);

//Instantiate UI Object
const ui = new UI();

ui.addBookToList()



e.preventDefault(book);
})




