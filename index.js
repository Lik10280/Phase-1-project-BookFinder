// JavaScript
// Constants
const searchForm = document.querySelector('#search-form');
const searchTermInput = document.querySelector('#search-term');
const booksContainer = document.querySelector('#books-container');
const bookModal = document.querySelector('#book-modal');
const ratingModal = document.querySelector('#rating-modal');
const ratingForm = document.querySelector('#rating-form');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('#modal-body');

// Display books on landing page
fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=10')
  .then(response => response.json())
  .then(data => {
    // Create HTML for each book
    const bookElements = data.items.map(book => {
      return `
        <div class="col-sm-6 col-md-4 col-lg-3">
          <div class="card">
            <img src="${book.volumeInfo.imageLinks.thumbnail}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${book.volumeInfo.title}</h5>
              
              <button class="btn btn-primary read" data-book-id="${book.id}">Read</button>
            </div>
          </div>
        </div>
      `;
    });
    // Add books to page
    booksContainer.innerHTML = bookElements.join('');
  });