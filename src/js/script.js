{
  const template = Handlebars.compile(document.getElementById('template-book').innerHTML);
  const templateInner = document.querySelector('.books-list');
  const bookDetails = dataSource.books;
  function render() {
    for (const singlBookDetails of bookDetails) {
      singlBookDetails.ratingBgc = bgcRatingDetermine(singlBookDetails.rating);
      singlBookDetails.ratingWidth = widthDetermine(singlBookDetails.rating);
      const generateHtml = template(singlBookDetails);
      const DOMobject = utils.createDOMFromHTML(generateHtml);
      templateInner.appendChild(DOMobject);
    }
  }
  render();

  const filters = [];
  const bookList = document.querySelector('ul.books-list');
  const bookForm = document.querySelector('.filters form')
  function initActions() {
    const favoriteBooks = [];
    bookList.addEventListener('dblclick', function (arg) {
      arg.preventDefault();
      if (arg.target.offsetParent.classList.contains('book__image')) {
        const bookId = arg.target.offsetParent.getAttribute('data-id');
        if (!favoriteBooks.includes(bookId)) favoriteBooks.push(bookId);
        else favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
        console.log(favoriteBooks, 'favoriteBooks');
        arg.target.offsetParent.classList.toggle('favorite');
      }
    });
    bookForm.addEventListener('click', function (arg) {
      if (arg.target.getAttribute('type') == 'checkbox' && arg.target.getAttribute('name') == 'filter') {
        if (arg.target.checked == true) {
          const inputValue = arg.target.getAttribute('value');
          if (!filters.includes(inputValue)) filters.push(arg.target.getAttribute('value'));
          else filters.splice(filters.indexOf(inputValue), 1);
        }
        if (arg.target.checked == false) {
          const inputValue = arg.target.getAttribute('value');
          filters.splice(filters.indexOf(inputValue), 1);
        }
      }
      // console.log(filters);
      filter();
    });
  }
  initActions();

  function filter() {
    const allBooks = dataSource.books;
    for (const singleBook of allBooks) {
      let shouldBeHidden = false;
      const bookToHide = document.querySelector(`.book__image[data-id="${singleBook.id}"]`);
      for (const singlFilter of filters) {
        if (!singleBook.details[singlFilter] == true) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden == true) {
        bookToHide.classList.add('hidden');
      }
      else bookToHide.classList.remove('hidden');
    }
  }

  function bgcRatingDetermine(rating) {
    let ratingBgc;
    if (rating < 6) {
      ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }
    if (rating > 6 && rating <= 8) {
      ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }
    if (rating > 8 && rating <= 9) {
      ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    if (rating > 9) {
      ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return ratingBgc;
  }
  bgcRatingDetermine();

  function widthDetermine(rating) {
    let width;
    if (rating >= 1) width = 10;
    if (rating > 2) width = 20;
    if (rating > 3) width = 30;
    if (rating > 4) width = 40;
    if (rating > 5) width = 50;
    if (rating > 6) width = 60;
    if (rating > 7) width = 70;
    if (rating > 8) width = 80;
    if (rating > 9) width = 90;
    if (rating == 10) width = 100;
    return width;
  }

}



