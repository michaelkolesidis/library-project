const myLibrary = JSON.parse(localStorage.getItem("library") || "[]");

function Book(title, author, genre, description, read) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.description = description;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = this.read === "Unread" ? "Read" : "Unread";
};

function render(arr) {
  const container = document.getElementById("container");
  container.innerHTML = "";
  arr.forEach((book, i) => {
    container.innerHTML += `<div data-index="${i}" class="card">
      <div class="card-header">
        <img src="https://source.unsplash.com/600x400/?book" alt="book image" />
      </div>
      <div class="card-body">
        <span class="genre-tag">${book.genre}</span>
        <span class="read-tag ${book.read === "Read" ? "read" : "unread"}">${
      book.read
    }</span>
        <h4>${book.title}</h4>
        <h5>${book.author}</h5>

        <p>${book.description}</p>
      </div>

      <div class="card-footer">
        <button class="btn btn-read">Read</button>
        <button class="btn btn-remove">Remove</button>
      </div>
    </div>`;
  });
}

const modal = document.querySelector(".modal");

const addBtn = document.querySelector(".add");
addBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

function addBook() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let genre = document.getElementById("genre").value;
  let description = document.getElementById("description").value;

  let read = document.querySelector('input[name="readStatus"]:checked');

  //   console.log(title, author, genre, description, read.value);
  if ((title, author, genre, description, read)) {
    let newBook = new Book(title, author, genre, description, read.value);
    myLibrary.push(newBook);
    localStorage.setItem("library", JSON.stringify(myLibrary));

    render(myLibrary);
  } else {
    alert("Sounds like a boring book");
  }
}

const submitBtn = document.querySelector(".btn-submit");

submitBtn.addEventListener("click", addBook);

render(myLibrary);

const cardContainer = document.getElementById("container");

function readBook(e) {
  let book = e.target.parentElement.parentElement;
  let index = parseInt(book.attributes[0].value);
  myLibrary[index].prototype = Object.create(Book.prototype);

  console.dir(myLibrary[index]);
  myLibrary[index].prototype.toggleRead.call(myLibrary[index]);
  render(myLibrary);

  localStorage.setItem("library", JSON.stringify(myLibrary));
}

function removeBook(e) {
  let book = e.target.parentElement.parentElement;
  let index = parseInt(book.attributes[0].value);
  myLibrary.splice(index, 1);
  localStorage.setItem("library", JSON.stringify(myLibrary));
  render(myLibrary);
}

cardContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-remove")) {
    removeBook(e);
  }
  if (e.target.classList.contains("btn-read")) {
    readBook(e);
  }
});
