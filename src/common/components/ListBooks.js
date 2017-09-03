import React, { Component } from 'react';
import If from '../../If';
import RelatedBooks from '../../RelatedBooks'
import * as BooksAPI from '../../util/BooksAPI'


class ListBooks extends Component {


    state = {
        booksRelated: []
    }





    closePopUp = (objSend) => {

        console.log("akaiakakaaia: " + objSend)

    }




    render() {

        const { booksRelated } = this.state

        const { books, shelf, setUpdate, allShelfs, bookIdUpdate,
            filterRelatedBooks, classPopUp, relatedBooks, closePopUp, relatedBookId } = this.props

        let showingBooks = {}

        window.localStorage.setItem('ctrlDidMount', shelf)


        if (shelf === "allShelfs") {

            showingBooks = books

        } else {

            if (typeof (books) !== "undefined" && books.length > 0) {

                if (shelf === "none") {

                    showingBooks = books.filter((book) => typeof (book.shelf) === "undefined")

                }
                else {

                    showingBooks = books.filter((book) => book.shelf === shelf)

                }

            }

        }


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

                let classToLoad = "book-shelf-changer"

                let classToLoadRelatedBook = "book-shelf-read"
               // console.log("vai ver bookIdUpdate: "+ bookIdUpdate)
                if (bookIdUpdate === book.id) { classToLoad = "book-shelf-on-changer" }
               // console.log("vai ver: "+ relatedBookId)
                if (relatedBookId === book.id) {
                 
                    classToLoadRelatedBook = "book-shelf-read-loader"

                }



                return <li key={book.id}>
                    <div className="book">

                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' }}></div>
                            <If test={book.shelf === 'read'}>
                                <div onClick={(event) => filterRelatedBooks(book.title, book.id)}>

                                    <a className={classToLoadRelatedBook}></a>

                                </div>
                            </If>

                            <div className={classToLoad}>
                                <select value={book.shelf} onChange={(event) => setUpdate(book, event.target.value)}>
                                    {shelfOptions}
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                        <div className="book-authors">{book.shelf}</div>
                        <If test={book.shelf === 'read'}>
                            <div id="popup1" className={`overlay${classPopUp}`}>
                                <div className="popup">
                                    <a className="close" onClick={(event) => closePopUp()}>&times;</a>
                                    <RelatedBooks bookId={book.id} relatedBooks={relatedBooks}
                                        setUpdate={setUpdate}
                                        objShelfs={allShelfs}
                                        bookIdUpdate={bookIdUpdate} />
                                </div>
                            </div>


                        </If>



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