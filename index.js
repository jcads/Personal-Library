const addBookButton = document.querySelector("button");
// form fields
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

let bookList = [
  new Book("Book1", "Author One", 123, true),
  new Book("Book2", "Author Two", 1234, true),
  new Book("Book3", "Author Three", 1235)
];

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${(this.read ? "already read" : "not read yet")}`
}

function addBookToList(book) {
  bookList.push(book);
}

function render(book) {
  const tableBody = document.querySelector('tbody');

  // creates a row for every book, then is added into the DOM
  const row = document.createElement('tr');
  tableBody.appendChild(row);

  const th = document.createElement('th');
  th.setAttribute('scope', 'row');
  th.textContent = 'holder';
  row.appendChild(th);

  // iterates through every property of book
  for (const data in book) {
    if (book.hasOwnProperty(data)) {
      const td = document.createElement('td');
      td.textContent = book[data];
      row.appendChild(td);
    }
  }

}

let form = document.getElementById("form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const book = new Book(title.value, author.value, pages.value, read.checked);
  addBookToList(book);
  render(book);
  resetFields();
});

function resetFields() {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}

addBookButton.addEventListener("click", () => {

});




// render();




