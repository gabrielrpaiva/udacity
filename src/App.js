import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import SearchBooks from './SearchBooks'
import ShelfsBooks from './Shelfs'
import ListBooks from './common/components/ListBooks'
import * as BooksAPI from './util/BooksAPI'

class BooksApp extends React.Component {



  state = {
    books: [],
    allShelfs: {
      moveto: "Move to..",
      currentlyReading: "Currently Reading",
      wantToRead: "Want To Read",
      read: "Read",
      none: "None"
    }
  }


  componentDidMount() {

    BooksAPI.getAll().then((books) => {

      this.setState({ books })

      window.localStorage.setItem('booksInShelfs', JSON.stringify(books));

    })

  }

  updateShelf = (allbooks, book, bookShelf) => {

    BooksAPI.update(book, bookShelf).then(() => {

      let newBookList = {}

      if (allbooks.filter(b => b.id === book.id).length === 0) {

        let searchedBooks = window.localStorage.getItem('searchedBooks') || '{}';

        searchedBooks = JSON.parse(searchedBooks)

        let currentBook = searchedBooks.filter(b => b.id == book.id)

        allbooks = allbooks.concat(currentBook)

      }

      newBookList = allbooks.map(obj => {
        // clone the current object
        const newObj = Object.assign({}, obj);

        if (newObj.id === book.id) {
          
          newObj.shelf = bookShelf;

        }

        return newObj;

      });
 
      // console.log(newBookList);
      this.setState({ books: newBookList })

      window.localStorage.setItem('booksInShelfs', JSON.stringify(newBookList));

    })

  }

  render() {

    return (

      <div>

        <Route exact path='/' render={() => (
          <ShelfsBooks books={this.state.books} setUpdate={this.updateShelf} objShelfs={this.state.allShelfs} />
        )} />

        <Route exact path='/search' render={({ history }) => (
          <SearchBooks setUpdate={this.updateShelf} objShelfs={this.state.allShelfs} />
        )} />

      </div>

    )
  }
}

export default BooksApp
