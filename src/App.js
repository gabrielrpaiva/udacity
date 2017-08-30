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
    console.log("antes de colocar true");
    window.localStorage.setItem('bookChange', book.id);
    this.setState({ loadShelf: true })
   console.log("apos de colocar true");
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
      window.localStorage.setItem('booksInShelfs', JSON.stringify(newBookList));
       console.log("antes de voltar");
     // this.setState({ loadShelf: false })
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
               />
        )} />

        <Route exact path='/search' render={({ history }) => (
          <SearchBooks setUpdate={this.updateShelf} objShelfs={this.state.allShelfs} />
        )} />

      </div>

    )
  }
}

export default BooksApp
