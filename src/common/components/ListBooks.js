import React, { Component } from 'react';


class ListBooks extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {

    }


    render() {
        const { books, shelf, setUpdate, allShelfs } = this.props
        let showingBooks = {}

        let currentShelf = shelf;

        let booksInShelfs = {}

        if (shelf === "") {
            booksInShelfs = window.localStorage.getItem('booksInShelfs') || '{}';

            showingBooks = books

        } else {

            showingBooks = books.filter((book) => book.shelf === shelf)

        }



        //console.log("na shelfOptions:" + shelfOptions) 
        let shelfOptions = Object.keys(allShelfs).map(function (key) {

            if (key === "moveto") {

                return <option key={key} value={key} disabled>{allShelfs[key]}</option>

            } else {

                return <option key={key} value={key}>{allShelfs[key]}</option>
            }

        });


        let shelfBooks = showingBooks.map(function (book) {

            if (booksInShelfs.length > 0) {

                booksInShelfs = JSON.parse(booksInShelfs).filter(sb => sb.id === "1wy49i-gQjIC")
                console.log(booksInShelfs.length)
                console.log(booksInShelfs)

                if (booksInShelfs.length > 0) {
                    console.log("aki: " + book.id)
                    console.log(booksInShelfs.shelf)
                }
              
            }

            return <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                        <div className="book-shelf-changer">
                            <select value={currentShelf} onChange={(event) => setUpdate(book, event.target.value)}>
                                {shelfOptions}
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                    <div className="book-authors">{book.shelf}</div>
                </div>
            </li>
        });


        return (
            <ol className="books-grid">
                {showingBooks.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                                <div className="book-shelf-changer">
                                    <select value={currentShelf} onChange={(event) => setUpdate(book, event.target.value)}>
                                        {shelfOptions}
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                            <div className="book-authors">{book.shelf}</div>
                        </div>
                    </li>
                ))}


            </ol>
        )
    }


}

export default ListBooks