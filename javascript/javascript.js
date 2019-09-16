let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  myLibrary.push(document.getElementById("book-title").value)
  render()
}

function render() {
  let bookList = document.getElementById("books-list")
  bookList.innerHTML = '';
  myLibrary.forEach(
    (element) => {
      let node = document.createElement("li");
      let textnode = document.createTextNode(element);
      node.appendChild(textnode)
      bookList.appendChild(node)
    }
  )
}