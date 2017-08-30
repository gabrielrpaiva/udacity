import React, { Component } from 'react';


class ListBooks extends Component {
    state = {
        query: ''
    }

    updateQuery = (query) => {

    }


    render() {
        const { books, shelf, setUpdate, allShelfs, bookIdUpdate } = this.props

        let showingBooks = {}

        let currentShelf = shelf;

        let booksInShelfs = {}

        if (shelf === "none") {

            booksInShelfs = window.localStorage.getItem('booksInShelfs') || '{}';

            booksInShelfs = JSON.parse(booksInShelfs)

            showingBooks = books

        } else {

            if (typeof (books) !== "undefined") {
                // console.log(books);
                showingBooks = books.filter((book) => book.shelf === shelf)

            }

            booksInShelfs = books

        }

        //console.log("na shelfOptions:" + shelfOptions) 
        let shelfOptions = Object.keys(allShelfs).map(function (key) {

            if (key === "moveto") {

                return <option key={key} value={key} disabled>{allShelfs[key]}</option>

            } else {

                return <option key={key} value={key}>{allShelfs[key]}</option>
            }

        });

        let shelfBooks

        if (typeof (showingBooks) !== "undefined" && showingBooks.length > 0) {

            shelfBooks = showingBooks.map(function (book) {

                currentShelf = shelf

                let classToLoad = "book-shelf-changer"

                if (shelf === "none") {

                    let bookShelf = booksInShelfs.filter(sb => sb.id === book.id)

                    if (bookShelf.length > 0) {

                        currentShelf = bookShelf[0].shelf 

                    }
                }

                //let bookChange = window.localStorage.getItem('bookChange') || '';

                if (bookIdUpdate !== "") {
               
                    if (bookIdUpdate ===  book.id) {
                      console.log("akakakka")
                        classToLoad = "book-shelf-on-changer"
                        window.localStorage.setItem('bookChange', "")

                    }

                }



                return <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                            <div className={classToLoad}  >
                                <select value={currentShelf} onChange={(event) => setUpdate(booksInShelfs, book, event.target.value, this)}>
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
        }

        return (
            <ol className="books-grid">
                {shelfBooks}
            </ol>
        )
    }


}

export default ListBooks