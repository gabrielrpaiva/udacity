import React from 'react'
import './App.css'
import ListBooks from './common/components/ListBooks'
import * as BooksAPI from './util/BooksAPI'
import App from './App'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'



class SearchBooks extends React.Component {

    state = {
        books: [],
        query: ''
    }

    searckBook = (query) => {
        this.setState({ query })


        BooksAPI.search(query, 20).then(books => {
            this.setState(state => ({
                books
            }))
        })

    }

    render() {
    
        const { books, query } = this.state

        const { setUpdate, objShelfs, bookIdUpdate } = this.props
       
        if (typeof (books) !== "undefined" && books.length > 0) {
            books.sort(sortBy('title'))

            window.localStorage.setItem('searchedBooks', JSON.stringify(books));

        }




        return (

            <div className="app">

                <div className="search-books">
                    <div className="search-books-bar">
                    <Link
                        to='/'
                        className='close-search'>
                         </Link> 
                        <div className="search-books-input-wrapper">
                        
                            <input type="text"
                                placeholder="Search by title or author"
                                value={query}
                                onChange={(event) => this.searckBook(event.target.value)} />

                        </div>
                    </div>
                    <div className="search-books-results">
                        <ListBooks books={books} shelf="none" 
                        setUpdate={setUpdate} 
                        allShelfs={objShelfs} 
                        bookIdUpdate={bookIdUpdate}/>
                    </div>
                </div>


            </div >

        )

    }

}

export default SearchBooks;