let myLibrary = [];
myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
render();

function Book(title, author, numOfPages) {
  this.title = title,
  this.author = author,
  this.pages = numOfPages,
  this.read = false;
}

function update_local_storage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// show form
const newBookForm = document.getElementById('newBookForm');
document.getElementById('formToggle').addEventListener('click', (event) => {
  if (newBookForm.style.display === 'block') {
    newBookForm.style.display = 'none';
  } else {
    newBookForm.style.display = 'block';
  }
});

// add a book
document.getElementById('submit').addEventListener('click', (event) => {
  event.preventDefault();
  if (document.getElementById('book-title').value !== ''
    && document.getElementById('book-author').value !== ''
    && document.getElementById('book-pages').value !== '') {
    addBookToLibrary();
  }
});

function addBookToLibrary() {
  title = document.getElementById('book-title').value;
  author = document.getElementById('book-author').value;
  pages = document.getElementById('book-pages').value;
  newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
  update_local_storage();
  document.getElementById('newBookForm').reset();
  render();
}

function render() {
  const bookList = document.getElementById('books-list');
  bookList.innerHTML = '';
  myLibrary.forEach(
    (element) => {
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
      nodeDelete.addEventListener('click', (event) => {
        myLibrary = myLibrary.filter((ele) => ele != element);
        update_local_storage();
        render();
      });
      nodeDelete.appendChild(textnodeDelete);
      node.appendChild(nodeDelete);

      if (!element.read) {
        const nodeRead = document.createElement('button');
        const textnodeRead = document.createTextNode('Read');
        nodeRead.addEventListener('click', (event) => {
          element.read ? element.read = false : element.read = true;
          nodeRead.style.display = 'none';
          update_local_storage();
          render();
        });
        nodeRead.appendChild(textnodeRead);
        node.appendChild(nodeRead);
      }

      bookList.appendChild(node);
    },
  );
}