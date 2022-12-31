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
const ratingButton = document.querySelector('#rating-button');
const rating = document.querySelector('#rating');
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
              <button class="btn btn-primary rate" id = "rating-button" data-book-id="${book.id}">Rate</button>
            </div>
          </div>
        </div>
        <div id="rating" >
    <div class="card-body">
      <button class="btn btn-outline-secondary star text-warning" data-rating="1">★</button>
      <button class="btn btn-outline-secondary star text-warning" data-rating="2">★</button>
      <button class="btn btn-outline-secondary star text-warning" data-rating="3">★</button>
      <button class="btn btn-outline-secondary star text-warning" data-rating="4">★</button>
      <button class="btn btn-outline-secondary star text-warning" data-rating="5">★</button>
    </div>
  </div>
      `;
    });
    // Add books to page
    booksContainer.innerHTML = bookElements.join('');
  });
// Search for a book
searchForm.addEventListener('submit', e => {
  // Prevent form submission
  e.preventDefault();
  // Get search term
  const searchTerm = searchTermInput.value;
  // Fetch book from API
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=1`)
    .then(response => response.json())
    .then(data => {
      // Create HTML for book
      const bookElement = `
        <div class="col-12">
          <div class="card">
            <img src="${data.items[0].volumeInfo.imageLinks.thumbnail}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${data.items[0].volumeInfo.title}</h5>
              <p class="card-text">${data.items[0].volumeInfo.description}</p>
              <button class="btn btn-primary read" data-book-id="${data.items[0].id}">Read</button>
            </div>
          </div>
        </div>
      `;
      // Clear books container and add searched book
      booksContainer.innerHTML = '';
      booksContainer.innerHTML = bookElement;
    });
});
//read a book
booksContainer.addEventListener('click', e => {
  // Check if read button was clicked
  if (e.target.classList.contains('read')) {
    // Get book ID
    const bookId = e.target.getAttribute('data-book-id');
    // Fetch book from API
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then(response => response.json())
      .then(data => {
        // Set title
        modalTitle.innerHTML = data.volumeInfo.title;
        // Set body
        modalBody.innerHTML = data.volumeInfo.description;
        // Show modal
        bookModal.style.display = 'block';
      });
  }
}
);
// Close modal
bookModal.addEventListener('mouseover', e => {
  if (e.target.classList.contains('close')) {
    bookModal.style.display = 'none';
  }
});
let selectedButton = null;
const selectButton = button => {
  if (selectedButton) {
    selectedButton.classList.remove('active');
  }
  button.classList.add('active');
  selectedButton = button;
};
const buttons = document.querySelectorAll('.star');
buttons.forEach(button => {
  button.addEventListener('click', event => {
    const rating = event.target.getAttribute('data-rating');
    console.log(`Rating selected: ${rating}`);
  });
});
// Display rating form on clicking the rate button
ratingButton.addEventListener('click', () => {
  rating.classList.toggle('d-none');
});
// Close rating form
// Submit rating form
ratingForm.addEventListener('submit', e => {
  // Prevent form submission
  e.preventDefault();
  // Get rating and comment
  const rating = ratingInput.value;
  const comment = commentInput.value;
  // Validate rating
  if (rating >= 1 && rating <= 5) {
    // Submit rating
    console.log(`Rating: ${rating} / 5`);
    console.log(`Comment: ${comment}`);
  } else {
    // Display error message
    alert('Please enter a rating between 1 and 5.');
  }
  // Clear form
  ratingInput.value = '';
  commentInput.value = '';
  // Close modal
  ratingModal.style.display = 'none';
});
