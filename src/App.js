import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './common/components/ListBooks'
import * as BooksAPI from './util/BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }



  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })

    })

  }

  updateShelf = (book, bookShelf) => {
    console.log(book.id + "prateleiras:" + bookShelf)

    BooksAPI.update(book, bookShelf).then((books) => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })

  }

  render() {

    const allShelfs = { currentlyReading: "Currently Reading", wantToRead: "Want To Read", read: "Read" }



    let shelfOptions = {};

    let myState = this.state.books;

    let mySetUpdate = this.updateShelf;

    shelfOptions = Object.keys(allShelfs).map(function (key) {
      return <div key={key} className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{allShelfs[key]}</h2>
            <div className="bookshelf-books">
              <ListBooks books={myState} shelf={key}
                title={allShelfs[key]} setUpdate={mySetUpdate} />
            </div>
          </div>
        </div>
      </div>
    });




    return (

      <div>
        <Route exact path='/' render={() => (
          <div className="app">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              {shelfOptions}
              <Link
                to='/search'
                className='open-search'>
                <a>Add a book</a>
              </Link>
            </div>
          </div >
        )} />


        <Route exact path='/search' render={({ history }) => (
          <SearchBooks />
        )} />

      </div>





    )
  }
}

export default BooksApp
