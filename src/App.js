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
    })

  }

  updateShelf = (book, bookShelf) => {

    BooksAPI.update(book, bookShelf).then((books) => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
       
        window.localStorage.setItem('booksInShelfs', JSON.stringify(books) );
       
      })
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
