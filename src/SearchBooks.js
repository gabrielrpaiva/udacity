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
        query: '',
        shelfFilter: 'allShelfs'
    }

    searckBook = (query) => {
        this.setState({ query })


        BooksAPI.search(query, 20).then(books => {
            this.setState(state => ({
                books
            }))
        })

    }

    filterList = (shelfFilter) => {

        this.setState({ shelfFilter })

    }

    render() {

        const { books, query, shelfFilter } = this.state
       

        const { setUpdate, objShelfs, bookIdUpdate } = this.props
        let shelfBooks
        if (typeof (books) !== "undefined" && books.length > 0) {

            window.localStorage.setItem('searchedBooks', JSON.stringify(books));

            let booksInShelfs = window.localStorage.getItem('booksInShelfs') || '{}';

            booksInShelfs = JSON.parse(booksInShelfs)

            shelfBooks = books.map(obj => {

                const newObj = Object.assign({}, obj);
                let bookShelf = booksInShelfs.filter(bs => bs.id === obj.id)

                if (bookShelf.length > 0) {

                    newObj.shelf = bookShelf[0].shelf

                }

                return newObj;

            });

            shelfBooks.sort(sortBy('title'))
        }


        return (

            <div className="app">
                <div>

                </div>
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
                        <div className="book-shelf-filter">
                            <span onClick={(event) => this.filterList("read")}>Filter by:</span>
                            <select value={shelfFilter} onChange={(event) => this.filterList(event.target.value)} >
                                <option value="allShelfs">All Shelfs</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>

                    <div className="search-books-results">
                        <ListBooks books={shelfBooks}
                            shelf={shelfFilter}
                            setUpdate={setUpdate}
                            allShelfs={objShelfs}
                            bookIdUpdate={bookIdUpdate} />
                    </div>
                </div>


            </div >

        )

    }

}

export default SearchBooks;