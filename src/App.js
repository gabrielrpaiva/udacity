import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import SearchBooks from './SearchBooks'
import ShelfsBooks from './Shelfs'
import ListBooks from './common/components/ListBooks'
import TodoList from './TesteLoad'
import * as BooksAPI from './util/BooksAPI'

class BooksApp extends React.Component {


  //Create the states of the component
  state = {
    // State of the books in the shelfs
    books: [],
    bookIdUpdate: '',
    // State of all the allowed shelfs
    allShelfs: {
      moveto: "Move to..",
      currentlyReading: "Currently Reading",
      wantToRead: "Want To Read",
      read: "Read",
      none: "None"
    },
    // State for controling popup visibity
    classPopUp: "",
    // State of list of related books
    relatedBooks: [],
    //State of the book id that are going to show the  relateded books
    relatedBookId: ''
  }



  componentDidMount() {

    // Call the api to retrun all books of the shelfs
    BooksAPI.getAll().then((books) => {

      // Set the books of the shelfs in the state
      this.setState({ books })

      // Set the books of the shelfs in the localStorage 
      // (for control the current shelf on the search page)
      window.localStorage.setItem('booksInShelfs', JSON.stringify(books));

    })

  }

  updateShelf = (book, bookShelf) => {

    // Set the bookId of the book in the state 
    // (for chnage the the class of the 'book-shelf-changer' to book-shelf-on-changer)

    this.setState({ bookIdUpdate: book.id })

    //Call the api to update the book
    BooksAPI.update(book, bookShelf).then(() => {

      // Crate a an empity list
      let newBookList = {}
      let books = window.localStorage.getItem('booksInShelfs') || '{}';
      books = JSON.parse(books)

      // Verify if the updated book, is in the current list of books of the shelf
      if (books.filter(b => b.id === book.id).length === 0) {

        // Get all the books searcheds that was set in the localStorage
        let searchedBooks = window.localStorage.getItem('searchedBooks') || '{}';

        // Make the parse json of the books searcheds
        searchedBooks = JSON.parse(searchedBooks)

        if (this.state.relatedBooks.length > 0) {
 
          let newRelatedBookList = this.state.relatedBooks.filter(rb => rb.id !== book.id)

          if (newRelatedBookList.length < this.state.relatedBooks.length) {
            
            this.setState({ relatedBooks: newRelatedBookList });

          }

        }

        // Find the updated book on the list
        let currentBook = searchedBooks.filter(b => b.id == book.id)
 
        // Concatenate the updated book to the current list of books of the shelf
        books = books.concat(currentBook)
       
      }

      //Go through the list of books of the shelf, and update the updated book to the new shelf 
      newBookList = books.map(obj => {

        const newObj = Object.assign({}, obj);

        if (newObj.id === book.id) {

          newObj.shelf = bookShelf;

        }

        return newObj;

      });


      // Set the list of books of the shelf in the localStorage
      // (for control the current shelf on the search page)  
      window.localStorage.setItem('booksInShelfs', JSON.stringify(newBookList));

      this.setState({
        // Clean the state of the id updated book 
        // (for chnage the the class of the 'book-shelf-on-changer' to book-shelf-changer)
        bookIdUpdate: "",
        // Set the new list of books of the shelf in the state 
        books: newBookList
      })
    })

  }


  /* Function to change the classPopUp State  */
  closePopUp = () => {

    /*  Change the classPopUp state, so the pop can hide */
    this.setState({ classPopUp: "" });

  }

  /* Searche for the related books */
  filterRelatedBooks = (bookToRelated) => {

    /* Set the state of the id related book, so then teh class of button can change */
    this.setState({ relatedBookId: bookToRelated.id });

    /* Clean the ctrlRelatedBooks local storage */
    window.localStorage.setItem('ctrlRelatedBooks', [])

    /* Split every word of the book title  */
    let arrayTitle = bookToRelated.title.split(' ')

    /* Create a let for store all the promisses */
    let allPromisses = []

    /* Create a let for store the curent book  on the search */
    let currentBook = []

    /* Get from local storege the current lis of books in the shelfs */
    let booksInShelfs = window.localStorage.getItem('booksInShelfs') || '{}';
    booksInShelfs = JSON.parse(booksInShelfs)

    /* Go through all the words of the book title */
    arrayTitle.map((desc) => {

      /* Verify if the word have at least 3 letters */
      if (desc.length > 3) {

        /* Set the Promisse of search related book on the let  allPromisses*/
        allPromisses.push(BooksAPI.search(desc, 20));

      }
    })

   


    Promise.all(allPromisses).then(booksReturn => {

      currentBook = []
   
      booksReturn.map((bk) => {

        if (typeof (bk) !== "undefined" && bk.length > 0) {

          bk.map((b) => {
         
            /* Verify if the currentBook has less then 3 books */
            if (currentBook.length < 3) {

              /* Verify if the searched book is alredy in a shelf */
              let bookShelf = booksInShelfs.filter(bs => bs.id === b.id)

              /* If is not in a shelf, set in the new list */
              if (bookShelf.length === 0) {

                /* Add on the current list book */
                currentBook.push(b)

              }

            }

          })
        }

      })

      window.localStorage.setItem('searchedBooks', JSON.stringify(currentBook));
      this.setState({ classPopUp: " show", relatedBooks: currentBook, relatedBookId: '' });
 
    })

  }

  render() {
    const { books, bookIdUpdate, allShelfs, classPopUp, relatedBooks, relatedBookId } = this.state
    console.log(".length: " + books.length)

    return (

      <div>

        <Route exact path='/' render={() => (

          <ShelfsBooks books={books}
            setUpdate={this.updateShelf}
            objShelfs={allShelfs}
            bookIdUpdate={bookIdUpdate}
            filterRelatedBooks={this.filterRelatedBooks}
            classPopUp={classPopUp}
            relatedBooks={relatedBooks}
            closePopUp={this.closePopUp}
            relatedBookId={relatedBookId} />
        )} />

        <Route exact path='/search' render={({ history }) => (
          <SearchBooks setUpdate={this.updateShelf}
            objShelfs={allShelfs}
            bookIdUpdate={bookIdUpdate}
            filterRelatedBooks={this.filterRelatedBooks}
            classPopUp={classPopUp}
            relatedBooks={relatedBooks}
            closePopUp={this.closePopUp}
            relatedBookId={relatedBookId} />
        )} />

      </div>

    )
  }
}

export default BooksApp
