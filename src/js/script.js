{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: 'ul.books-list',
      filters: '.filters form',
    },
    bookAttribute: 'data-id',
  }

  const classNames = {
    favouriteBooks: 'favorite',
    hideBooks: 'hidden',
    imageBooks: 'book__image',
  }

  const templates = Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML);

  class BookList {
    constructor(data) {
      const thisBook = this;
      thisBook.data = data;
      thisBook.render();
      thisBook.getElements();
      thisBook.initActions();
    }

    render() {
      const thisBook = this;
      const templateInner = document.querySelector(select.containerOf.bookList);
      const bookDetails = thisBook.data;
      for (const singlBookDetails of bookDetails) {
        singlBookDetails.ratingBgc = thisBook.bgcRatingDetermine(singlBookDetails.rating);
        singlBookDetails.ratingWidth = thisBook.widthDetermine(singlBookDetails.rating);
        const generateHtml = templates(singlBookDetails);
        thisBook.DOMobject = utils.createDOMFromHTML(generateHtml);
        templateInner.appendChild(thisBook.DOMobject);
      }
    }

    getElements() {
      const thisBook = this;
      thisBook.dom = {};
      thisBook.dom.bookList = document.querySelector(select.containerOf.bookList);
      thisBook.bookForm = document.querySelector(select.containerOf.filters);
    }

    initActions() {
      const thisBook = this;
      thisBook.filters = [];
      const favoriteBooks = [];
      thisBook.dom.bookList.addEventListener('dblclick', function (arg) {
        arg.preventDefault();
        if (arg.target.offsetParent.classList.contains(classNames.imageBooks)) {
          const bookId = arg.target.offsetParent.getAttribute(select.bookAttribute);
          if (!favoriteBooks.includes(bookId)) favoriteBooks.push(bookId);
          else favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
          arg.target.offsetParent.classList.toggle(classNames.favouriteBooks);
        }
      });
      thisBook.bookForm.addEventListener('click', function (arg) {
        if (arg.target.getAttribute('type') == 'checkbox' && arg.target.getAttribute('name') == 'filter') {
          if (arg.target.checked == true) {
            const inputValue = arg.target.getAttribute('value');
            if (!thisBook.filters.includes(inputValue)) thisBook.filters.push(arg.target.getAttribute('value'));
            else thisBook.filters.splice(thisBook.filters.indexOf(inputValue), 1);
          }
          if (arg.target.checked == false) {
            const inputValue = arg.target.getAttribute('value');
            thisBook.filters.splice(thisBook.filters.indexOf(inputValue), 1);
          }
        }
        thisBook.filter();
      });
    }

    filter() {
      const thisBook = this;
      const allBooks = thisBook.data;
      for (const singleBook of allBooks) {
        let shouldBeHidden = false;
        const bookToHide = document.querySelector(`.book__image[data-id="${singleBook.id}"]`);
        for (const singlFilter of thisBook.filters) {
          if (!singleBook.details[singlFilter] == true) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden == true) {
          bookToHide.classList.add(classNames.hideBooks);
        }
        else bookToHide.classList.remove(classNames.hideBooks);
      }
    }

    bgcRatingDetermine(rating) {
      const thisBook = this;
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

    widthDetermine(rating) {
      const thisBook = this;
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
  const app = new BookList(dataSource.books);
}
