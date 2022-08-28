/**
 * [
 *    {
 *      id: <int>
 *      title: <string>
 *      author: <string>
 *      year : <int>
 *      isComplete: <boolean>
 *    }
 * ]
 */

const books = [];
let filteredBooks = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const SEARCH_EVENT = 'search-book';
const STORAGE_KEY = 'BOOK_APPS';

// Generate id for books
function generateId() {
  return +new Date();
}

// generate book object
function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete
  };
}

// find book item by id
function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

// find book index by id
function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}


/**
 * Fungsi ini digunakan untuk memeriksa apakah localStorage didukung oleh browser atau tidak
 *
 * @returns boolean
 */
function isStorageExist()  {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
}

/**
 * Fungsi ini digunakan untuk menyimpan data ke localStorage
 * berdasarkan KEY yang sudah ditetapkan sebelumnya.
 */
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

/**
 * Fungsi ini digunakan untuk memuat data dari localStorage
 * Dan memasukkan data hasil parsing ke variabel {@see books}
 */
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

// make html element for book item
function makeBook(bookObject) {

  const {id, title, author, year, isComplete} = bookObject;

  const textTitle = document.createElement('h3');
  textTitle.innerText = title;

  const textAuthor = document.createElement('p');
  textAuthor.innerText = 'Author: ' + author;

  const textYear = document.createElement('p');
  textYear.innerText = 'Year: ' + year;

  const container = document.createElement('article');
  container.classList.add('book_item');
  container.setAttribute('id', `book-${id}`);
  
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('action');
  container.append(textTitle, textAuthor, textYear, buttonContainer);
  if (isComplete) {

    const unfinishedButton = document.createElement('button');
    unfinishedButton.classList.add('green-btn', 'fa', 'fa-close');
    unfinishedButton.addEventListener('click', function () {
      undoBookFromCompleted(id);
    });

    buttonContainer.append(unfinishedButton);
  } else {
    const finishedButton = document.createElement('button');
    finishedButton.classList.add('green-btn', 'fa', 'fa-check');
    finishedButton.addEventListener('click', function () {
      addBookToCompleted(id);
    });

    buttonContainer.append(finishedButton);
  }

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('red-btn', 'fa', 'fa-trash-o');
  deleteButton.addEventListener('click', function () {
    removeBook(id);
  });

  const editButton = document.createElement('button');
  editButton.classList.add('yellow-btn', 'edit-btn', 'fa', 'fa-edit');
  editButton.addEventListener('click', function () {
    editBook(id);
    const otherEditButton = document.querySelectorAll('.edit-btn');
    for (const button of otherEditButton) {
      button.setAttribute('disabled', 'true');
      button.classList.remove('yellow-btn');
      button.classList.add('grey-btn');
    }
  });

  buttonContainer.append(deleteButton, editButton);

  return container;
}

// add new book object
function addBook() {
  const title = document.getElementById('inputBookTitle');
  const author = document.getElementById('inputBookAuthor');
  const year = document.getElementById('inputBookYear');
  const isComplete = document.getElementById('inputBookIsComplete').checked;

  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, title.value, author.value, parseInt(year.value), isComplete);
  books.push(bookObject);

  saveData();
  alert('New books added!');
  title.value = '';
  author.value = '';
  year.value = '';
  document.dispatchEvent(new Event(RENDER_EVENT));
}

// change book status to completed
function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// remove book from shelf
function removeBook(bookId) {
  let text = "Are you sure want to delete this book?";
  if (confirm(text) == true) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;
  
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
  
    saveData();
  }
}

// change book status to uncompleted
function undoBookFromCompleted(bookId) {

  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;

  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// edit book item
function editBook(bookId) {
  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;

  const containerTarget = document.getElementById(`book-${bookId}`);
  containerTarget.classList.add('input_section');
  containerTarget.innerHTML = '';

  const formEdit = document.createElement('form');
  formEdit.classList.add('form');
  formEdit.setAttribute('id', 'formEdit');
  formEdit.setAttribute('action', '#');

  const containerTitle = document.createElement('div');
  containerTitle.classList.add('input');
  const containerAuthor = document.createElement('div');
  containerAuthor.classList.add('input');
  const containerYear = document.createElement('div');
  containerYear.classList.add('input');
  
  const labelTitle = document.createElement('label');
  labelTitle.setAttribute('for', 'inputEditTitle');
  labelTitle.innerText = 'Title';
  const inputTitle = document.createElement('input');
  inputTitle.setAttribute('type', 'text');
  inputTitle.setAttribute('id', 'inputEditTitle');
  inputTitle.setAttribute('value', bookTarget.title);
  inputTitle.setAttribute('required', 'true');
  containerTitle.append(labelTitle, inputTitle);
  
  const labelAuthor = document.createElement('label');
  labelAuthor.setAttribute('for', 'inputEditAuthor'); 
  labelAuthor.innerText = 'Author';
  const inputAuthor = document.createElement('input');
  inputAuthor.setAttribute('type', 'text');
  inputAuthor.setAttribute('id', 'inputEditAuthor');
  inputAuthor.setAttribute('value', bookTarget.author);
  inputAuthor.setAttribute('required', 'true');
  containerAuthor.append(labelAuthor, inputAuthor);

  const labelYear = document.createElement('label');
  labelYear.setAttribute('for', 'inputEditYear');
  labelYear.innerText = 'Year';
  const inputYear = document.createElement('input');
  inputYear.setAttribute('type', 'number');
  inputYear.setAttribute('id', 'inputEditYear');
  inputYear.setAttribute('value', bookTarget.year);
  inputYear.setAttribute('required', 'true');
  containerYear.append(labelYear, inputYear);

  const inputSubmit = document.createElement('input');
  inputSubmit.setAttribute('type', 'submit');
  inputSubmit.setAttribute('value', 'Save');
  inputSubmit.setAttribute('name', 'Submit');
  inputSubmit.classList.add('green-btn');
  inputSubmit.addEventListener('click', function () {
    let text = "Are you sure want to edit this book?";
    if (confirm(text) == true) {
      const title = document.getElementById('inputEditTitle').value;
      const author = document.getElementById('inputEditAuthor').value;
      const year = parseInt(document.getElementById('inputEditYear').value);
      const isComplete = bookTarget.isComplete;
      const generatedID = bookTarget.id;
      const bookObject = generateBookObject(generatedID, title, author, year, isComplete);
      const bookTargetIndex = findBookIndex(bookId);
      books[bookTargetIndex] = bookObject;
      console.log(bookObject);
      console.log(books);
      event.preventDefault();
      saveData();
      document.dispatchEvent(new Event(RENDER_EVENT));
    }
  });
  
  const cancelSubmit = document.createElement('input');
  cancelSubmit.setAttribute('type', 'submit');
  cancelSubmit.setAttribute('value', 'Cancel');
  cancelSubmit.setAttribute('name', 'Submit');
  cancelSubmit.classList.add('red-btn');
  cancelSubmit.addEventListener('click', function () {
    event.preventDefault();
    document.dispatchEvent(new Event(RENDER_EVENT));
  });
  
  
  formEdit.append(containerTitle, containerAuthor, containerYear, inputSubmit, cancelSubmit);
  
  containerTarget.append(formEdit);
}


document.addEventListener('DOMContentLoaded', function () {

  const submitForm = document.getElementById('inputBook');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(SAVED_EVENT, () => {
  console.log('Data saved successfully.');
});

document.addEventListener(RENDER_EVENT, function () {
  const uncompletedBookList = document.getElementById('incompleteBookshelfList');
  const completedBookList = document.getElementById('completeBookshelfList');

  // clearing list item
  uncompletedBookList.innerHTML = '';
  completedBookList.innerHTML = '';

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (bookItem.isComplete) {
      completedBookList.append(bookElement);
    } else {
      uncompletedBookList.append(bookElement);
    }
  }
});

document.addEventListener(SEARCH_EVENT, function () {
  const uncompletedBookList = document.getElementById('incompleteBookshelfList');
  const completedBookList = document.getElementById('completeBookshelfList');

  // clearing list item
  uncompletedBookList.innerHTML = '';
  completedBookList.innerHTML = '';

  for (const bookItem of filteredBooks) {
    const bookElement = makeBook(bookItem);
    if (bookItem.isComplete) {
      completedBookList.append(bookElement);
    } else {
      uncompletedBookList.append(bookElement);
    }
  }
});


const checkCompletedBox = document.getElementById('inputBookIsComplete');
checkCompletedBox.addEventListener('change', function () {
  // const bookStatus = document.getElementById('bookStatus');
  const bookStatus = document.querySelector('input[name="Submit"]')
  bookStatus.value = 'Add book to ';
  if (checkCompletedBox.checked) {
    // bookStatus.innerText = 'Completed';
    bookStatus.value += 'Completed';
  } else {
    // bookStatus.innerText = 'Not Completed';
    bookStatus.value += 'Not Completed';
  }
  bookStatus.value += ' book-shelf';
});

// filter books by title
function filterBooks(title) {
  filteredBooks = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  document.dispatchEvent(new Event(SEARCH_EVENT));
}

// filter books event
const searchSubmit = document.getElementById('searchSubmit');
searchSubmit.addEventListener('click', function (event) {
  const searchBookTitle = document.getElementById('searchBookTitle').value;
  event.preventDefault();
  filterBooks(searchBookTitle);
});
