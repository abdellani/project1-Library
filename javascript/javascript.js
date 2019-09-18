let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) !== null ? JSON.parse(localStorage.getItem('myLibrary')) : [];

function Book(title, author, numOfPages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = numOfPages;
  this.read = readStatus;
}

function updateLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// show form
const newBookForm = document.getElementById('newBookForm');
document.getElementById('formToggle').addEventListener('click', () => {
  newBookForm.style.display = newBookForm.style.display === 'block' ? 'none' : 'block';
});


function render() {
  const bookList = document.getElementById('books-list');
  bookList.innerHTML = '';
  myLibrary.forEach(
    (element) => {
      const book = element;
      const node = document.createElement('ul');

      const nodeTitle = document.createElement('li');
      const textnodeTitle = document.createTextNode(`Book Title: ${element.title}`);
      nodeTitle.appendChild(textnodeTitle);
      node.appendChild(nodeTitle);

      const nodeAuthor = document.createElement('li');
      const textnodeAuthor = document.createTextNode(`Book Author: ${element.author}`);
      nodeAuthor.appendChild(textnodeAuthor);
      node.appendChild(nodeAuthor);

      const nodePages = document.createElement('li');
      const textnodePages = document.createTextNode(`Number of pages: ${element.pages}`);
      nodePages.appendChild(textnodePages);
      node.appendChild(nodePages);

      const nodeStatus = document.createElement('li');
      const textnodeStatus = document.createTextNode(`Read: ${element.read}`);
      nodeStatus.appendChild(textnodeStatus);
      node.appendChild(nodeStatus);

      const nodeDelete = document.createElement('button');
      const textnodeDelete = document.createTextNode('Delete');
      nodeDelete.addEventListener('click', () => {
        myLibrary = myLibrary.filter(ele => ele !== element);
        updateLocalStorage();
        render();
      });
      nodeDelete.appendChild(textnodeDelete);
      node.appendChild(nodeDelete);

      if (!element.read) {
        const nodeRead = document.createElement('button');
        const textnodeRead = document.createTextNode('Read');
        nodeRead.addEventListener('click', () => {
          book.read = !(book.read);
          nodeRead.style.display = 'none';
          updateLocalStorage();
          render();
        });
        nodeRead.appendChild(textnodeRead);
        node.appendChild(nodeRead);
      }

      bookList.appendChild(node);
    },
  );
}

function addBookToLibrary() {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const pages = document.getElementById('book-pages').value;
  const read = document.getElementById('readToogle').checked;
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  updateLocalStorage();
  document.getElementById('newBookForm').reset();
  render();
}
// add a book
document.getElementById('submit').addEventListener('click', (event) => {
  event.preventDefault();
  if (document.getElementById('book-title').value !== ''
    && document.getElementById('book-author').value !== ''
    && document.getElementById('book-pages').value !== '') {
    addBookToLibrary();
  }
});
render();
