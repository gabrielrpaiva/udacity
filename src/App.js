import React from 'react'
import './App.css'
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



  render() {
    const myShelfs = {currentlyReading: "Currently Reading",wantToRead:"Want To Read", read:"Read"}

   // console.log(Object.keys(myShelfs).map(function(key){return myShelfs[]}))
//console.log(myShelfs.currentlyReading)
    return (

     


      <div className="app">

        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
            <div className="search-books-input-wrapper">
              {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
              <input type="text" placeholder="Search by title or author" />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <ListBooks books={this.state.books} shelf="currentlyReading" 
                      title="Currently Reading" allShelfs = {myShelfs} />

          <ListBooks books={this.state.books} shelf="wantToRead" 
                     title="Want To Read"  allShelfs = {myShelfs} />

          <ListBooks books={this.state.books} shelf="read" 
                     title="Read" allShelfs = {myShelfs}  />

        </div>
      </div >
    )
  }
}

export default BooksApp
