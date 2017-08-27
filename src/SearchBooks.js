import React from 'react'
import './App.css'
import ListBooks from './common/components/ListBooks'
import * as BooksAPI from './util/BooksAPI'
import App from './App'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'



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

        const { setUpdate, objShelfs } = this.props
      

        books.sort(sortBy('title'))

        let shelfOptions = Object.keys(books).map(function (key) {
           
            return <ListBooks key={key} books={books} shelf="" setUpdate={setUpdate} allShelfs={objShelfs} />

        });


        return (

            <div className="app">

                <div className="search-books">
                    <div className="search-books-bar">
                        <a className="close-search">Close</a>
                        <div className="search-books-input-wrapper">
                            {/* 
                              NOTES: The search from BooksAPI is limited to a particular set of search terms.
                              You can find these search terms here:
                              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                              
                              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                              you don't find a specific author or title. Every search is limited by search terms.
                            */}
                            <input type="text"
                                placeholder="Search by title or author"
                                value={query}
                                onChange={(event) => this.searckBook(event.target.value)} />

                        </div>
                    </div>
                    <div className="search-books-results">
                       {shelfOptions}
                    </div>
                </div>


            </div >

        )

    }

}

export default SearchBooks;