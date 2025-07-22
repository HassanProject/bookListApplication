class Book{
    constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    }
   
}


class UI {
    addBookToList(book){
        const bookList = document.getElementById('book-list');
        // Create Table Row
        const row = document.createElement('tr');
        // Create Table Element to insert value
        row.innerHTML = `
            <td>${book.title}</td> 
            <td>${book.author}</td> 
            <td>${book.isbn}</td>
            <td><a href="#" class='delete'>x<a></td> `;
        // Append row to bookList
        bookList.appendChild(row);
    }

    clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    deleteBook(target){
        if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
    }

    setMessage(message, className){
         // Creat a div
        const div = document.createElement('div');
        // Add a class
        div.className = `alert ${className}`;
        // Append Messasge
        div.appendChild(document.createTextNode(message));
        // Set parent div(container)
        const parentDiv = document.querySelector('.container');
        // Get form id
        const bookForm = document.querySelector('#book-form');
        // Insert div above parent div
        parentDiv.insertBefore(div, bookForm)
        // Remove message after 3 sec
        setTimeout(function () {
            div.remove();
        }, 3000);
    }

}
// ADD TO LOCAL STORAGE
class Storage{
    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;

    }
    static addBook(book){
        const books = Storage.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static displayBook(){
        const books = Storage.getBook();

        books.forEach(function(book) {
             const ui = new UI;

             ui.addBookToList(book);
        });

    }
    static removeBook(isbn){
         const books = Storage.getBook();
         books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1)
            } 
         })
        //  Set Local Storage
         localStorage.setItem('books',JSON.stringify(books));
    }
}
document.addEventListener('DOMContentLoaded', Storage.displayBook);


document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get form values
    const title = document.getElementById('title').value;
    author = document.getElementById('author').value;
    isbn = document.getElementById('isbn').value;

    // Instantiate Book Object 
    const book = new Book(title, author, isbn);

    //Instantiate UI Object
    const ui = new UI();

    // Validate input
    if (title === '' || author === '' || isbn === '') {
        ui.setMessage('Please Fill in All Fields', 'error')
    } else {
        // Add Book
        ui.addBookToList(book);
        // Add to Local Storage
        Storage.addBook(book);
        // Set message
        ui.setMessage('Book Added', 'success');
        // Clear fields
        ui.clearFields();
    }
    e.preventDefault();
})

document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI();
    // Delete from UI
    ui.deleteBook(e.target);
    // Delete form LS
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent)
    // Delete Message
    ui.setMessage('Book Deleted', 'success');

   
});