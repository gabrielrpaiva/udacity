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
    }
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

  updateShelf = (allbooks, book, bookShelf, event) => {

    // Set the bookId of the book in the state 
    // (for chnage the the class of the 'book-shelf-changer' to book-shelf-on-changer)
    this.setState({ bookIdUpdate: book.id })

    //Call the api to update the book
    BooksAPI.update(book, bookShelf).then(() => {

      // Crate a an empity list
      let newBookList = {}

      // Verify if the updated book, is in the current list of books of the shelf
      if (allbooks.filter(b => b.id === book.id).length === 0) {

        // Get all the books searcheds that was set in the localStorage
        let searchedBooks = window.localStorage.getItem('searchedBooks') || '{}';

        // Make the parse json of the books searcheds
        searchedBooks = JSON.parse(searchedBooks)

        // Find the updated book on the list
        let currentBook = searchedBooks.filter(b => b.id == book.id)

        // Concatenate the updated book to the current list of books of the shelf
        allbooks = allbooks.concat(currentBook)

      }

      //Go through the list of books of the shelf, and update the updated book to the new shelf 
      newBookList = allbooks.map(obj => {

        const newObj = Object.assign({}, obj);

        if (newObj.id === book.id) {

          newObj.shelf = bookShelf;

        }

        return newObj;

      });

      // Set the list of books of the shelf in the localStorage
      // (for control the current shelf on the search page)  
      window.localStorage.setItem('booksInShelfs', JSON.stringify(newBookList));

      // Clean the state of the id updated book 
      // (for chnage the the class of the 'book-shelf-on-changer' to book-shelf-changer)
      this.setState({ bookIdUpdate: "" })
       
      // Set the list of books of the shelf in the state
      this.setState({ books: newBookList })

    })

  }

  render() {

    return (

      <div>

        <Route exact path='/' render={() => (

          <ShelfsBooks books={this.state.books}
            setUpdate={this.updateShelf}
            objShelfs={this.state.allShelfs}
            bookIdUpdate={this.state.bookIdUpdate} />
        )} />

        <Route exact path='/search' render={({ history }) => (
          <SearchBooks setUpdate={this.updateShelf} objShelfs={this.state.allShelfs}  bookIdUpdate={this.state.bookIdUpdate}/>
        )} />

      </div>

    )
  }
}

export default BooksApp
