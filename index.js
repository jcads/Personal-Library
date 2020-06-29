const addBookButton = document.querySelector("button");
const formBackgroundDiv = document.querySelector("div");
const formContainer = document.querySelector(".form-container");
// form fields
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

let bookList = [];

function Book(title, author, pages, read = false) {
  this.id = Book.id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read; 
}

Book.prototype.getId = function() {
  return this.id;
}

Book.prototype.setRead = function(val) {
  this.read = val;
};

Book.id = 1;


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
  th.textContent = book.getId();
  row.appendChild(th);

  // iterates through every property of book
  for (const data in book) {
    if (book.hasOwnProperty(data) && data != "id") {
      console.log(data);
      console.log(typeof data);
      
      const td = document.createElement('td');
      td.setAttribute("class", `b${Book.id} ${data}`);
      td.textContent = book[data];
      row.appendChild(td);
    }
  }
  
  createReadButton(Book.id, row);  
  createDeleteButton(Book.id, row);

  Book.id++;
}


function createDeleteButton(id, rowNode) {
  const tableCell = document.createElement("td");
  const delBtn = document.createElement("button");
  const trashIcon = document.createElement("i");

  trashIcon.setAttribute("class", "fas fa-trash");
  delBtn.appendChild(trashIcon);
  delBtn.setAttribute("class", "btn btn-outline-danger del-btn");
  delBtn.setAttribute("id", id);
  tableCell.setAttribute("class", "delBtn-cell");

  tableCell.appendChild(delBtn);
  rowNode.appendChild(tableCell);
  
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    // deletes the book from the array
    bookList.splice(id - 1, 1);

    // remove from the DOM
    const tr = delBtn.parentNode.parentNode;
    const tbody = document.querySelector("tbody");
    tbody.removeChild(tr);
  });
}


function createReadButton(id, rowNode) {
  // create the button for the read toggle
  const readButton = document.createElement("button");
  // get the <td> element containing the read data, and remove
  const readCell = document.querySelector(`.b${id}.read`);
  const textNode = readCell.textContent;
  rowNode.removeChild(readCell);
  // set button classes
  const btnColor = textNode == "true" ? "btn-success" : "btn-warning";
  readButton.setAttribute("class", `btn btn-sm ${btnColor} read-btn b${id}`);
  // append the button as child of the <tr> node
  readButton.textContent = textNode === "true" ? "Done" : "Still reading";
  rowNode.appendChild(readButton);

  // if the button is clicked, toggle between true/false
  readButton.addEventListener("click", readBtnClick);
}


function readBtnClick(e) {
  let newValue = !(e.target.textContent === 'Done');
  const id = parseInt(e.target.parentNode.childNodes[0].textContent);
  e.target.textContent = newValue ? "Done" : "Still reading";
  bookList[id - 1].setRead(newValue);

  // change the button appearance
  e.target.classList.remove(`${!newValue ? "btn-success" : "btn-warning"}`);
  e.target.classList.add(`${newValue ? "btn-success" : "btn-warning"}`);
  console.log(bookList);
  
}


let form = document.getElementById("form");
form.addEventListener("submit", e => {
  e.preventDefault();

  const book = new Book(title.value, author.value, pages.value, read.checked);
  addBookToList(book);
  render(book);
  this.resetFields();

  // hides the form
  formBackgroundDiv.classList.toggle("form-bg");
  formContainer.style.visibility = "hidden";
});


function resetFields() {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}


addBookButton.addEventListener("click", () => {
  formBackgroundDiv.classList.toggle("form-bg");
  formContainer.style.visibility = "visible";
});